/**
 * Formulaire de contact, Cloudflare Pages Function.
 *
 * Deux modes de réponse, pour que le site marche aussi sans JavaScript :
 *   - Accept: application/json  -> réponse JSON, le formulaire affiche la
 *     confirmation sans rechargement
 *   - sinon                     -> page HTML de confirmation servie par la
 *     fonction, ce qui évite d'ajouter une route au site
 *
 * Variables d'environnement à définir dans Cloudflare Pages :
 *   RESEND_API_KEY  secret, obligatoire
 *   CONTACT_TO      destinataire, facultatif
 *   CONTACT_FROM    expéditeur sur un domaine vérifié chez Resend, facultatif
 */

const LIMITES = { nom: 120, societe: 160, email: 200, telephone: 40, message: 5000 };

const echappe = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

/** Page de confirmation ou d'erreur, pour les envois sans JavaScript. */
function pageHtml(titre, message) {
  return `<!doctype html><html lang="fr-FR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>${echappe(titre)} | sabi&amp;co</title>
<style>
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
       background:#0A2540;color:#fff;font:400 17px/1.6 system-ui,-apple-system,'Segoe UI',sans-serif;padding:24px}
  main{max-width:34rem}
  h1{font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:2.5rem;line-height:1.1;margin:0 0 1rem}
  p{color:#B9C6D4;margin:0 0 2rem}
  a{display:inline-block;background:#E3C57E;color:#0A2540;padding:14px 26px;text-decoration:none;font-weight:500}
</style></head><body><main>
<h1>${echappe(titre)}</h1><p>${echappe(message)}</p>
<a href="/contact">Revenir au site</a>
</main></body></html>`;
}

async function traiterPost(request, env) {
  const veutJson = (request.headers.get('accept') || '').includes('application/json');

  const repondre = (statut, titre, message, ok) =>
    veutJson
      ? new Response(JSON.stringify({ ok, message }), {
          status: statut,
          headers: { 'content-type': 'application/json; charset=utf-8' },
        })
      : new Response(pageHtml(titre, message), {
          status: statut,
          headers: { 'content-type': 'text/html; charset=utf-8' },
        });

  let donnees;
  try {
    const type = request.headers.get('content-type') || '';
    if (type.includes('application/json')) {
      donnees = await request.json();
    } else {
      donnees = Object.fromEntries(await request.formData());
    }
  } catch {
    return repondre(400, 'Requête illisible', "Le formulaire n'a pas pu être lu.", false);
  }

  // Piège à robots : rempli, donc ce n'est pas un humain. On répond comme si
  // tout allait bien, sans rien envoyer.
  if (donnees['societe-web']) {
    return repondre(200, 'Message envoyé', 'Nous revenons vers vous par email.', true);
  }

  const champ = (nom) => String(donnees[nom] ?? '').trim();
  const nom = champ('nom');
  const societe = champ('societe');
  const email = champ('email');
  const telephone = champ('telephone');
  const message = champ('message');

  const manquants = [];
  if (!nom) manquants.push('nom');
  if (!societe) manquants.push('société');
  if (!email) manquants.push('email');
  if (!message) manquants.push('message');
  if (!donnees.consentement) manquants.push('consentement');
  if (manquants.length) {
    return repondre(400, 'Formulaire incomplet', `Champs manquants : ${manquants.join(', ')}.`, false);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return repondre(400, 'Adresse invalide', "L'adresse électronique n'est pas valide.", false);
  }

  for (const [cle, max] of Object.entries(LIMITES)) {
    if (String(donnees[cle] ?? '').length > max) {
      return repondre(400, 'Message trop long', `Le champ ${cle} dépasse ${max} caractères.`, false);
    }
  }

  if (!env.RESEND_API_KEY) {
    // Mieux vaut le dire que de faire croire à un envoi réussi.
    return repondre(
      500,
      'Envoi indisponible',
      "Le service d'envoi n'est pas configuré. Écrivez directement à sacha.bitoun@essec.edu.",
      false,
    );
  }

  const destinataire = env.CONTACT_TO || 'sacha.bitoun@essec.edu';
  const expediteur = env.CONTACT_FROM || 'sabi&co <contact@sabi-co.fr>';

  const corps = [
    `Nom : ${nom}`,
    `Société : ${societe}`,
    `Email : ${email}`,
    telephone ? `Téléphone : ${telephone}` : 'Téléphone : non renseigné',
    '',
    'Message :',
    message,
  ].join('\n');

  try {
    const reponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: expediteur,
        to: [destinataire],
        reply_to: email,
        subject: `Site sabi&co : ${nom}, ${societe}`,
        text: corps,
      }),
    });

    if (!reponse.ok) {
      const detail = await reponse.text();
      console.error('Resend a refusé l\'envoi', reponse.status, detail);
      return repondre(
        502,
        'Envoi impossible',
        "Le message n'a pas pu être transmis. Écrivez directement à sacha.bitoun@essec.edu.",
        false,
      );
    }
  } catch (erreur) {
    console.error('Appel Resend en échec', erreur);
    return repondre(
      502,
      'Envoi impossible',
      "Le message n'a pas pu être transmis. Écrivez directement à sacha.bitoun@essec.edu.",
      false,
    );
  }

  return repondre(200, 'Message envoyé', 'Nous revenons vers vous par email.', true);
}

/**
 * Point d'entrée unique. Cloudflare appelle onRequest pour toutes les méthodes,
 * donc on branche ici plutôt que d'exporter aussi un onRequestPost, ce qui
 * rendrait le routage ambigu.
 */
export async function onRequest({ request, env }) {
  if (request.method !== 'POST') {
    return new Response('Méthode non autorisée', {
      status: 405,
      headers: { allow: 'POST' },
    });
  }
  return traiterPost(request, env);
}

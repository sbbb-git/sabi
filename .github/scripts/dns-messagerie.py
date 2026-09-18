#!/usr/bin/env python3
"""
Pose les enregistrements de messagerie de sabi-co.fr dans la zone Cloudflare.

Pourquoi ce script existe : la boîte sacha@sabi-co.fr est hébergée chez OVH,
mais la zone DNS est chez Cloudflare. Personne n'y a jamais recopié les MX
d'OVH, donc rien n'était livré. L'envoi marchait, la réception non.

Les cibles viennent du panneau OVH du domaine (Filerz 290). Le SPF est celui
déjà en place sur coincheur.fr et opti-cds.fr, les deux autres domaines du
même compte, qui eux reçoivent.

Le script ne supprime jamais rien. Il crée ce qui manque, corrige ce qui
diverge, et laisse le reste intact, à commencer par le TXT de vérification
Google déjà présent à la racine.
"""
import json
import os
import sys
import urllib.error
import urllib.request

API = 'https://api.cloudflare.com/client/v4'
DOMAINE = os.environ.get('DOMAINE', 'sabi-co.fr')
JETON = os.environ.get('CLOUDFLARE_API_TOKEN', '')

# Ce que la zone doit contenir. `cle` sert à retrouver l'enregistrement
# existant qui correspond, pour le corriger au lieu d'en ajouter un second.
SOUHAITE = [
    {'type': 'MX', 'name': DOMAINE, 'content': 'mx1.mail.ovh.net', 'priority': 1},
    {'type': 'MX', 'name': DOMAINE, 'content': 'mx2.mail.ovh.net', 'priority': 5},
    {'type': 'MX', 'name': DOMAINE, 'content': 'mx3.mail.ovh.net', 'priority': 100},
    {'type': 'TXT', 'name': DOMAINE, 'content': 'v=spf1 include:mx.ovh.com -all'},
    {
        'type': 'TXT',
        'name': f'_dmarc.{DOMAINE}',
        'content': f'v=DMARC1; p=none; rua=mailto:sacha@{DOMAINE}',
    },
]


def appel(methode, chemin, corps=None):
    requete = urllib.request.Request(
        API + chemin,
        method=methode,
        data=json.dumps(corps).encode() if corps is not None else None,
        headers={
            'Authorization': f'Bearer {JETON}',
            'Content-Type': 'application/json',
        },
    )
    try:
        with urllib.request.urlopen(requete, timeout=30) as reponse:
            charge = json.load(reponse)
    except urllib.error.HTTPError as erreur:
        charge = json.load(erreur)
    if not charge.get('success'):
        erreurs = charge.get('errors') or [{'message': 'réponse illisible'}]
        details = '; '.join(f"{e.get('code', '?')} {e.get('message', '')}" for e in erreurs)
        raise SystemExit(f'::error::Cloudflare a refusé {methode} {chemin} : {details}')
    return charge['result']


def correspond(existant, voulu):
    """Un enregistrement existant joue-t-il le même rôle que celui voulu ?

    Pour un MX, c'est la même cible : seule la priorité peut avoir bougé.
    Pour le SPF, c'est le seul TXT racine qui commence par v=spf1, parce qu'il
    ne doit jamais y en avoir deux. Pour le reste, le nom suffit.
    """
    if existant['type'] != voulu['type'] or existant['name'] != voulu['name']:
        return False
    if voulu['type'] == 'MX':
        return existant['content'].rstrip('.') == voulu['content']
    if voulu['content'].startswith('v=spf1'):
        return existant['content'].startswith('v=spf1')
    return True


def main():
    if not JETON:
        raise SystemExit('::error::CLOUDFLARE_API_TOKEN absent des secrets du dépôt.')

    zones = appel('GET', f'/zones?name={DOMAINE}')
    if not zones:
        raise SystemExit(
            f'::error::Zone {DOMAINE} introuvable. Le jeton porte-t-il bien '
            'Zone > Zone > Read sur ce domaine ?'
        )
    zone = zones[0]['id']
    print(f'Zone {DOMAINE} : {zone}\n')

    avant = appel('GET', f'/zones/{zone}/dns_records?per_page=500')
    print('Avant :')
    for e in sorted(avant, key=lambda x: (x['type'], x['name'])):
        if e['type'] in ('MX', 'TXT'):
            prio = f" (priorité {e['priority']})" if e['type'] == 'MX' else ''
            print(f"  {e['type']:4} {e['name']:24} {e['content'][:70]}{prio}")
    print()

    for voulu in SOUHAITE:
        charge = {k: v for k, v in voulu.items()}
        charge['ttl'] = 3600
        etiquette = f"{voulu['type']} {voulu['name']} → {voulu['content'][:50]}"

        existant = next((e for e in avant if correspond(e, voulu)), None)
        if existant is None:
            appel('POST', f'/zones/{zone}/dns_records', charge)
            print(f'  créé      {etiquette}')
            continue

        deja_bon = existant['content'].rstrip('.') == voulu['content'] and (
            voulu['type'] != 'MX' or existant['priority'] == voulu['priority']
        )
        if deja_bon:
            print(f'  inchangé  {etiquette}')
        else:
            appel('PATCH', f"/zones/{zone}/dns_records/{existant['id']}", charge)
            print(f'  corrigé   {etiquette}')

    apres = appel('GET', f'/zones/{zone}/dns_records?per_page=500')
    print('\nAprès :')
    for e in sorted(apres, key=lambda x: (x['type'], x['name'], x.get('priority') or 0)):
        if e['type'] in ('MX', 'TXT'):
            prio = f" (priorité {e['priority']})" if e['type'] == 'MX' else ''
            print(f"  {e['type']:4} {e['name']:24} {e['content'][:70]}{prio}")

    mx = [e for e in apres if e['type'] == 'MX']
    spf = [e for e in apres if e['type'] == 'TXT' and e['content'].startswith('v=spf1')]
    print()
    if len(mx) >= 3 and len(spf) == 1:
        print(f'{len(mx)} MX en place, un seul SPF. La réception peut fonctionner.')
    else:
        print(f'::warning::{len(mx)} MX et {len(spf)} SPF. Vérifier la zone à la main.')
        sys.exit(1)

    print("\nIl reste la clé DKIM, qu'OVH génère dans son panneau et qu'il faut")
    print('ajouter ici ensuite : ce script ne peut pas l\'inventer.')


if __name__ == '__main__':
    main()

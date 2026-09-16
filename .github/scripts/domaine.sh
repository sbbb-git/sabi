#!/usr/bin/env bash
# Rattache le domaine au projet Cloudflare Pages et pose l'enregistrement DNS.
# Idempotent : tourne à chaque déploiement sans rien casser.
#
# Attendus dans l'environnement :
#   CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, NOM_PROJET, DOMAINE
set -uo pipefail

CF="https://api.cloudflare.com/client/v4"
AUTH="Authorization: Bearer ${CLOUDFLARE_API_TOKEN}"
PROJET="${CF}/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects/${NOM_PROJET}"

# Lit un chemin dans une réponse JSON, sans dépendre de jq.
py() { python3 -c "$1" 2>/dev/null; }

echo "== Domaines déjà rattachés au projet =="
liste=$(curl -sS -H "${AUTH}" "${PROJET}/domains")
echo "${liste}" | py "
import sys, json
d = json.load(sys.stdin)
if not d.get('success'):
    print('  lecture refusée :', json.dumps(d.get('errors')))
    raise SystemExit
res = d.get('result') or []
print('  aucun' if not res else '')
for x in res:
    print(' ', x.get('name'), '->', x.get('status'))
" <<< "${liste}"

deja=$(echo "${liste}" | py "
import sys, json
d = json.load(sys.stdin)
print('oui' if any(x.get('name') == '${DOMAINE}' for x in (d.get('result') or [])) else 'non')
" <<< "${liste}")

if [ "${deja}" != "oui" ]; then
  echo "== Rattachement de ${DOMAINE} =="
  reponse=$(curl -sS -X POST -H "${AUTH}" -H "Content-Type: application/json" \
    --data "{\"name\":\"${DOMAINE}\"}" "${PROJET}/domains")
  echo "${reponse}" | py "
import sys, json
d = json.load(sys.stdin)
if d.get('success'):
    print('  enregistré côté Pages')
else:
    print('  refus de l API Pages :')
    for e in (d.get('errors') or []):
        print('   ', e.get('code'), e.get('message'))
" <<< "${reponse}"
else
  echo "== ${DOMAINE} est déjà rattaché =="
fi

echo "== Enregistrement DNS =="
zones=$(curl -sS -H "${AUTH}" "${CF}/zones?name=${DOMAINE}")
zone=$(echo "${zones}" | py "
import sys, json
d = json.load(sys.stdin)
r = d.get('result') or []
print(r[0]['id'] if r else '')
" <<< "${zones}")

if [ -z "${zone}" ]; then
  echo "::warning::Zone DNS illisible avec ce jeton. Il lui manque la permission Zone > DNS > Edit, ou la zone ${DOMAINE} n'est pas dans ce compte."
  echo "${zones}" | py "
import sys, json
d = json.load(sys.stdin)
for e in (d.get('errors') or []):
    print('   ', e.get('code'), e.get('message'))
" <<< "${zones}"
else
  echo "  zone trouvée : ${zone}"
  actuels=$(curl -sS -H "${AUTH}" "${CF}/zones/${zone}/dns_records?name=${DOMAINE}")
  nb=$(echo "${actuels}" | py "
import sys, json
d = json.load(sys.stdin)
print(len(d.get('result') or []))
" <<< "${actuels}")

  if [ "${nb}" = "0" ]; then
    echo "  création du CNAME ${DOMAINE} vers ${NOM_PROJET}.pages.dev"
    cree=$(curl -sS -X POST -H "${AUTH}" -H "Content-Type: application/json" \
      --data "{\"type\":\"CNAME\",\"name\":\"${DOMAINE}\",\"content\":\"${NOM_PROJET}.pages.dev\",\"proxied\":true}" \
      "${CF}/zones/${zone}/dns_records")
    echo "${cree}" | py "
import sys, json
d = json.load(sys.stdin)
if d.get('success'):
    r = d['result']
    print('  créé :', r['type'], r['name'], '->', r['content'], '(proxifié)' if r.get('proxied') else '')
else:
    print('  refus DNS :')
    for e in (d.get('errors') or []):
        print('   ', e.get('code'), e.get('message'))
" <<< "${cree}"
  else
    echo "  ${nb} enregistrement(s) déjà présent(s) pour ${DOMAINE} :"
    echo "${actuels}" | py "
import sys, json
d = json.load(sys.stdin)
for r in (d.get('result') or []):
    print('   ', r['type'], r['name'], '->', r['content'])
" <<< "${actuels}"
  fi
fi

echo "== État final =="
final=$(curl -sS -H "${AUTH}" "${PROJET}/domains")
echo "${final}" | py "
import sys, json
d = json.load(sys.stdin)
for x in (d.get('result') or []):
    print(' ', x.get('name'), '->', x.get('status'))
" <<< "${final}"

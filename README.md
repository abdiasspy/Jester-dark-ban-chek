# Jester Dark — WhatsApp Checker

## Installation

1. Installe Node.js 18 ou plus récent.
2. Ouvre un terminal dans ce dossier.
3. Lance :

npm install
npm start
4. Ouvre http://localhost:3000.

## Mode démo

Le projet démarre en demo.

Pour tester l'affichage "banni", utilise un numéro fictif au format international contenant 0000, par exemple :

+2250700000000

Pour tester "vivant", utilise un autre numéro fictif valide, par exemple :

+2250712345678

Cette logique est uniquement une simulation. Elle ne permet pas de déterminer réellement le statut d'un compte WhatsApp.

## Vérification réelle

WhatsApp/Meta ne fournit pas une API publique permettant de demander directement si un numéro est "banni". Pour une utilisation réelle, branche uniquement un service/API que tu es autorisé à utiliser et qui respecte les conditions de WhatsApp/Meta.

Tu peux passer :

- CHECKER_MODE=api
- CHECKER_API_URL=https://ton-service-autorise.example/check

Le service doit accepter :

{"phone":"+2250712345678"}
et retourner :

{"status":"alive"}
ou :

{"status":"banned"}
## Structure

- index.html : page principale
- style.css : design
- app.js : interactions du navigateur
- server.js : serveur et API locale
- config.js : configuration
- README.md : documentation
- package.json : dépendances Node.js

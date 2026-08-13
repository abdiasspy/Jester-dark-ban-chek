module.exports = {
  creator: "Jester Dark Ombres",
  port: process.env.PORT || 3000,

  // IMPORTANT :
  // WhatsApp ne fournit pas d'API publique permettant de demander
  // directement si un numéro est "banni".
  //
  // Le site fonctionne donc en MODE DEMO par défaut.
  // Pour une vérification autorisée, branche ici ton propre service/API
  // conforme aux conditions de WhatsApp/Meta.
  checker: {
    mode: process.env.CHECKER_MODE || "demo",
    apiUrl: process.env.CHECKER_API_URL || ""
  }
};

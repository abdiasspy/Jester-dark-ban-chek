const express = require("express");
const path = require("path");
const config = require("./config");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function normalizePhone(value) {
  return String(value || "").replace(/[^\d+]/g, "");
}

function isValidInternationalPhone(phone) {
  return /^\+[1-9]\d{7,14}$/.test(phone);
}

// MODE DEMO : ne prétend pas interroger WhatsApp.
// Il permet de tester toute l'interface avant de connecter
// un service autorisé. Les numéros contenant 0000 sont simulés
// comme "bannis" uniquement pour la démonstration.
function demoCheck(phone) {
  const digits = phone.replace(/\D/g, "");
  const banned = digits.includes("0000");

  return {
    status: banned ? "banned" : "alive",
    source: "demo",
    message: banned
      ? "Cet insectes a été écrasé par Moi Jester dark Ombres"
      : "Veillez augmenter la vawulence se numéro est vivant"
  };
}

app.post("/api/check", async (req, res) => {
  const phone = normalizePhone(req.body.phone);

  if (!isValidInternationalPhone(phone)) {
    return res.status(400).json({
      ok: false,
      error: "Numéro invalide. Utilise le format international, par exemple +2250700000000."
    });
  }

  try {
    if (config.checker.mode === "demo" || !config.checker.apiUrl) {
      return res.json({
        ok: true,
        phone,
        ...demoCheck(phone)
      });
    }

    // Adaptateur pour un service autorisé.
    // Le service doit recevoir { phone } et retourner :
    // { status: "banned" | "alive", message?: "..." }
    const response = await fetch(config.checker.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone })
    });

    if (!response.ok) {
      throw new Error("Le service de vérification a répondu avec une erreur.");
    }

    const result = await response.json();

    if (!["banned", "alive"].includes(result.status)) {
      throw new Error("Réponse de service invalide.");
    }

    return res.json({
      ok: true,
      phone,
      status: result.status,
      source: "api",
      message:
        result.message ||
        (result.status === "banned"
          ? "Cet insectes a été écrasé par Moi Jester dark Ombres"
          : "Veillez augmenter la vawulence se numéro est vivant")
    });
  } catch (error) {
    return res.status(502).json({
      ok: false,
      error: "Impossible de contacter le service de vérification."
    });
  }
});

app.get("/api/config", (req, res) => {
  res.json({
    creator: config.creator,
    mode: config.checker.mode === "demo" ? "demo" : "api"
  });
});

app.listen(config.port, () => {
  console.log(Jester Dark WhatsApp Checker lancé sur http://localhost:${config.port});
});

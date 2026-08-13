const form = document.getElementById("checkerForm");
const phoneInput = document.getElementById("phone");
const button = document.getElementById("checkButton");
const loading = document.getElementById("loading");
const result = document.getElementById("result");
const resultIcon = document.getElementById("resultIcon");
const resultLabel = document.getElementById("resultLabel");
const resultMessage = document.getElementById("resultMessage");
const resultNumber = document.getElementById("resultNumber");

function showResult(type, label, message, number = "") {
  result.className = result ${type};
  resultIcon.textContent = type === "banned" ? "×" : type === "alive" ? "✓" : "!";
  resultLabel.textContent = label;
  resultMessage.textContent = message;
  resultNumber.textContent = number;
  result.classList.remove("hidden");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const phone = phoneInput.value.trim();

  button.disabled = true;
  loading.classList.remove("hidden");
  result.classList.add("hidden");

  try {
    const response = await fetch("/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone })
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.error || "Erreur pendant la vérification.");
    }

    if (data.status === "banned") {
      showResult(
        "banned",
        "NUMÉRO BANNI",
        "Cet insectes a été écrasé par Moi Jester dark Ombres",
        data.phone
      );
    } else {
      showResult(
        "alive",
        "NUMÉRO VIVANT",
        "Veillez augmenter la vawulence se numéro est vivant",
        data.phone
      );
    }
  } catch (error) {
    showResult(
      "error",
      "ERREUR",
      error.message || "Une erreur est survenue."
    );
  } finally {
    loading.classList.add("hidden");
    button.disabled = false;
  }
})

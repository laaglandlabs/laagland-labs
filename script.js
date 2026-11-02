
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const status = document.getElementById("form-status");
    const button = form.querySelector('button[type="submit"]');

    button.disabled = true;
    status.classList.remove("error");
    status.textContent = "Bericht wordt verstuurd…";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Verzenden mislukt");
      }

      form.reset();
      status.textContent = "Bedankt! Je bericht is verstuurd.";
    } catch (error) {
      status.classList.add("error");
      status.textContent = "Verzenden mislukt: " + error.message;
      console.error("Web3Forms:", error);
    } finally {
      button.disabled = false;
    }
  });
}

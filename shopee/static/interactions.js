document.querySelectorAll("[data-print]").forEach((button) =>
  button.addEventListener("click", () => {
    const totals = document.querySelector(".totals");
    const wasOpen = totals.open;
    totals.open = true;
    globalThis.addEventListener("afterprint", () => {
      totals.open = wasOpen;
    }, { once: true });
    globalThis.print();
  })
);
document.querySelector("[data-copy]").addEventListener("click", async () => {
  const message = document.querySelector("#feedback");
  try {
    await navigator.clipboard.writeText(
      document.querySelector("#order-id").textContent,
    );
    message.textContent = "Order ID copied";
  } catch {
    message.textContent = "Copy unavailable. Select the order ID to copy it.";
  }
  message.classList.add("visible");
  setTimeout(() => message.classList.remove("visible"), 2500);
});

const installButton = document.querySelector("[data-install]");
let installPrompt;
const standalone =
  globalThis.matchMedia("(display-mode: standalone)").matches ||
  navigator.standalone === true;
globalThis.addEventListener("beforeinstallprompt", (event) => {
  if (standalone) return;
  event.preventDefault();
  installPrompt = event;
  installButton.hidden = false;
});
installButton.addEventListener("click", async () => {
  if (!installPrompt) return;
  const prompt = installPrompt;
  installPrompt = undefined;
  installButton.hidden = true;
  await prompt.prompt();
  await prompt.userChoice;
});
globalThis.addEventListener("appinstalled", () => {
  installPrompt = undefined;
  installButton.hidden = true;
});
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js", {
    scope: "./",
    updateViaCache: "none",
  }).catch(() => {
    // The invoice remains usable when service workers are unavailable.
  });
}

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

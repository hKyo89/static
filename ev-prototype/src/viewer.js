const home = document.querySelector("#home");
const detail = document.querySelector("#detail");
let homeScroll = 0;
function route() {
  const showDetail = location.hash === "#promo";
  if (showDetail && !home.hidden) homeScroll = globalThis.scrollY;
  home.hidden = showDetail;
  detail.hidden = !showDetail;
  document.title = showDetail
    ? "Home Charging Services 2.0 · PLN Mobile"
    : "PLN Mobile · EV Prototype";
  globalThis.scrollTo(0, showDetail ? 0 : homeScroll);
}
globalThis.addEventListener("hashchange", route);
document.querySelector("#back").addEventListener("click", (event) => {
  if (history.state?.promo) {
    event.preventDefault();
    history.back();
  }
});
document.querySelector('a[href="#promo"]').addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    homeScroll = globalThis.scrollY;
    history.pushState({ promo: true }, "", "#promo");
    route();
  },
);
globalThis.addEventListener("popstate", route);
for (const track of document.querySelectorAll(".banner-track")) {
  track.addEventListener("scroll", () => {
    const item = track.firstElementChild;
    const index = Math.round(
      track.scrollLeft /
        (item.getBoundingClientRect().width +
          parseFloat(getComputedStyle(track).columnGap)),
    );
    track.nextElementSibling.querySelectorAll("i").forEach((dot, i) =>
      dot.classList.toggle("active", i === index)
    );
  }, { passive: true });
}
let installPrompt;
const install = document.querySelector("#install");
globalThis.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  install.hidden = false;
});
install.addEventListener("click", async () => {
  if (!installPrompt) return;
  await installPrompt.prompt();
  installPrompt = null;
  install.hidden = true;
});
globalThis.addEventListener("appinstalled", () => {
  install.hidden = true;
});
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(
    console.error,
  );
}
route();

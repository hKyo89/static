import { events, promos, promotion } from "./model.ts";
const image = (name: string, alt = "") => (
  <img src={`./images/${name}.png`} alt={alt} />
);
function Carousel({ type, items }: { type: string; items: string[] }) {
  return (
    <div class="carousel-block">
      <div
        class="banner-track"
        aria-label={type === "promo" ? "Promosi" : "Event"}
      >
        {items.map((name, i) =>
          type === "promo" && i === 0
            ? (
              <a
                href="#promo"
                class="banner"
                aria-label="Lihat promo Home Charging Services 2.0"
              >
                {image(`${type}-${name}`, promotion.title)}
              </a>
            )
            : (
              <div class="banner">
                {image(`${type}-${name}`, name.replaceAll("-", " "))}
              </div>
            )
        )}
      </div>
      <div class="dots" aria-hidden="true">
        {items.map((_, i) => <i key={i} class={i === 0 ? "active" : ""} />)}
      </div>
    </div>
  );
}
export function EvPage() {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <title>PLN Mobile · EV Prototype</title>
        <meta
          name="description"
          content="Prototipe Beranda dan promo Home Charging Services 2.0."
        />
        <meta name="theme-color" content="#167da6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="./icon-192.png" />
        <link rel="manifest" href="./manifest.webmanifest" />
        <link rel="stylesheet" href="./styles.css" />
      </head>
      <body>
        <div class="app">
          <main id="home">
            <section class="hero">
              {image("hero", "Energikan Harimu!")}
              <div class="accounts" aria-label="Informasi pelanggan">
                {[1, 2, 3, 4].map((i) => (
                  <div class="account">
                    {image(`account-${i}`, `Informasi pelanggan ${i}`)}
                  </div>
                ))}
              </div>
              {image("account-footer")}
            </section>
            <section class="services" aria-label="Saldo dan layanan PLN">
              {image(
                "services",
                "Saldo Rp404.498, Point 450, Voucher 0. Listrik Saya, EV Digital Services, Token & Pembayaran, Pengaduan, Pulsa & Tagihan, Marketplace, E-Billing, Penyambungan Sementara.",
              )}
            </section>
            <section class="promotions">
              <div class="section-heading">
                <h2>Promosi &amp; Informasi</h2>
                <span>Lihat Semua</span>
              </div>
              <Carousel type="promo" items={promos} />
            </section>
            <section class="events">
              <div class="section-heading">
                <h2>Event Terbaru</h2>
                <span>Lihat Semua</span>
              </div>
              <Carousel type="event" items={events} />
            </section>
            <section class="recommendations" aria-label="Rekomendasi Kegiatan">
              {image(
                "recommendations",
                "Rekomendasi Kegiatan: Bali EV-cosystem, Civil Expo ITS, NTT Electric Run, PLN Mobile Padel, PLN Electric Night, Jawara Run.",
              )}
            </section>
            <aside class="helper">
              {image("assistant-trimmed", "Butuh bantuan?")}
            </aside>
            <nav
              class="bottom-nav"
              aria-label="Navigasi utama (tampilan prototipe)"
            >
              <img
                src="./images/navigation-trimmed.svg"
                alt="Beranda, Transaksi, Charge EV, Rewards, Akun"
              />
            </nav>
          </main>
          <main id="detail" hidden>
            <header class="detail-header">
              <a href="#home" id="back" aria-label="Kembali ke Beranda">←</a>
              <h1>Detail Promo</h1>
            </header>
            {image("promo-home-charging", promotion.title)}
            <article class="detail-card">
              <h2>{promotion.title}</h2>
              <div class="period">
                <span>Periode Promo</span>
                <p>
                  <img src="./images/calendar.png" alt="" />
                  {promotion.period}
                </p>
              </div>
              <h3>{promotion.heading}</h3>
              {promotion.paragraphs.map((text) => <p key={text}>{text}</p>)}
              <p>
                <strong>{promotion.closing}</strong>
              </p>
            </article>
          </main>
          <button type="button" id="install" hidden>Instal aplikasi</button>
        </div>
        <script type="module" src="./viewer.js"></script>
      </body>
    </html>
  );
}

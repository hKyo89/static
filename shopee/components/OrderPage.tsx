import data from "../data/order.json" with { type: "json" };
export const subtotal = data.items.reduce(
  (sum, item) => sum + item.quantity * item.unitPrice,
  0,
);
export const total = subtotal + data.costs.shipping -
  data.costs.shippingDiscount + data.costs.serviceFee - data.costs.discount;
const money = (value: number) =>
  new Intl.NumberFormat(data.locale, {
    style: "currency",
    currency: data.currency,
    maximumFractionDigits: 0,
  }).format(value);
function Icon({ kind }: { kind: string }) {
  const paths: Record<string, string> = {
    truck:
      "M3 6h12v11H3z M15 10h4l3 4v3h-7 M6 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4 M18 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4",
    pin:
      "M12 22s8-8 8-13a8 8 0 0 0-16 0c0 5 8 13 8 13 M12 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8",
    return:
      "M8 8h7a5 5 0 0 1 0 10h-3 M8 8l4-4 M8 8l4 4 M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20",
    chat:
      "M21 11a9 9 0 0 1-9 9H4l-2 2v-7a9 9 0 1 1 19-4 M7 11h1 M11 11h1 M15 11h1",
    headset:
      "M3 13v-2a9 9 0 0 1 18 0v2 M3 12h3v7H3z M18 12h3v7h-3z M21 19v2h-7 M10 21h4",
  };
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[kind] ?? paths.chat} />
    </svg>
  );
}
export function OrderPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{data.pageTitle} · {data.order.id}</title>
        <link rel="stylesheet" href="./styles.css" />
      </head>
      <body>
        <header>
          <a class="back" href="../" aria-label="Back to website">←</a>
          <h1>{data.pageTitle}</h1>
          <button type="button" class="print" data-print>Print invoice</button>
        </header>
        <main>
          <section class="card delivery">
            <div class="status">{data.status}</div>
            <div class="section">
              <h2>Shipping Information</h2>
              <p class="muted">
                {data.shipping.carrier}: {data.shipping.trackingNumber}
              </p>
              <div class="icon-row">
                <span class="icon">
                  <Icon kind="truck" />
                </span>
                <div>
                  <p class="teal">{data.shipping.status}</p>
                  <p class="muted small">{data.shipping.deliveredAt}</p>
                </div>
              </div>
            </div>
            <div class="section border">
              <h2>Delivery Information</h2>
              <div class="icon-row">
                <span class="icon">
                  <Icon kind="pin" />
                </span>
                <div>
                  <p>
                    {data.recipient.name}{" "}
                    <span class="muted">{data.recipient.phone}</span>
                  </p>
                  <details class="address">
                    <summary>{data.recipient.address}</summary>
                    <p>{data.recipient.address}</p>
                  </details>
                </div>
              </div>
            </div>
          </section>
          <section class="card products">
            <h2 class="shop">
              <span class="badge">{data.shop.badge}</span>
              {data.shop.name}
              <span class="chevron">›</span>
            </h2>
            <div class="items">
              {data.items.map((item) => (
                <article class="item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    width="100"
                    height="100"
                  />
                  <div class="item-info">
                    <h3 title={item.name}>{item.name}</h3>
                    <div class="variant">
                      <span>{item.variant}</span>
                      <span>x{item.quantity}</span>
                    </div>
                    <p class="price">{money(item.unitPrice)}</p>
                  </div>
                </article>
              ))}
            </div>
            <details class="totals">
              <summary>
                Order Total: <strong>{money(total)}</strong>
                <span class="chevron">⌄</span>
              </summary>
              <dl>
                <div>
                  <dt>Merchandise subtotal</dt>
                  <dd>{money(subtotal)}</dd>
                </div>
                <div>
                  <dt>Shipping</dt>
                  <dd>{money(data.costs.shipping)}</dd>
                </div>
                <div>
                  <dt>Shipping discount</dt>
                  <dd>−{money(data.costs.shippingDiscount)}</dd>
                </div>
                <div>
                  <dt>Service fee</dt>
                  <dd>{money(data.costs.serviceFee)}</dd>
                </div>
                <div>
                  <dt>Discount</dt>
                  <dd>−{money(data.costs.discount)}</dd>
                </div>
              </dl>
            </details>
          </section>
          <section class="card support">
            <h2>Support Center</h2>
            {data.support.map((action) => (
              <div class="support-row" key={action.label}>
                <span class="icon">
                  <Icon kind={action.icon} />
                </span>
                {action.url
                  ? <a href={action.url}>{action.label}</a>
                  : <span>{action.label}</span>}
                <span class="chevron">›</span>
              </div>
            ))}
            <p class="hint">
              Support links are available when configured by the seller.
            </p>
          </section>
          <section class="card metadata">
            <div class="order-id">
              <h2>Order ID</h2>
              <span id="order-id">{data.order.id}</span>
              <button type="button" data-copy>Copy</button>
            </div>
            <dl>
              <div>
                <dt>Paid by</dt>
                <dd>{data.order.paymentType}</dd>
              </div>
              <div>
                <dt>Nota Pesanan / Faktur</dt>
                <dd>
                  <button type="button" class="text-button" data-print>
                    View ›
                  </button>
                </dd>
              </div>
              <div class="border">
                <dt>Order Time</dt>
                <dd>{data.order.orderedAt}</dd>
              </div>
              <div>
                <dt>Payment Time</dt>
                <dd>{data.order.paidAt}</dd>
              </div>
            </dl>
          </section>
          <p class="notice">Sample invoice · Independent website</p>
        </main>
        <footer>
          {data.actions.buyAgainUrl
            ? <a href={data.actions.buyAgainUrl}>Buy Again</a>
            : (
              <button
                type="button"
                disabled
                title="Set actions.buyAgainUrl in order.json"
              >
                Buy Again
              </button>
            )}
          {data.actions.rateUrl
            ? <a class="accent" href={data.actions.rateUrl}>Rate</a>
            : (
              <button
                type="button"
                class="accent"
                disabled
                title="Set actions.rateUrl in order.json"
              >
                Rate
              </button>
            )}
        </footer>
        <div id="feedback" role="status" aria-live="polite" />
        <script src="./interactions.js" defer />
      </body>
    </html>
  );
}

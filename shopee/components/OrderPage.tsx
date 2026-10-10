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
  return (
    <img
      class="ui-icon"
      src={`./icons/${kind}.png`}
      alt=""
      aria-hidden="true"
    />
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
          <a class="back" href="../" aria-label="Back to website">
            <Icon kind="back" />
          </a>
          <h1>{data.pageTitle}</h1>
          <button type="button" class="print" data-print>Print invoice</button>
        </header>
        <main>
          <section class="card delivery">
            <div class="status">{data.status}</div>
            <div class="section">
              <h2 class="shipping-title">
                Shipping Information <Icon kind="right" />
              </h2>
              <p class="muted">
                {data.shipping.carrier}
                {data.shipping.trackingNumber
                  ? `: ${data.shipping.trackingNumber}`
                  : ""}
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
              <img
                class="badge-image"
                src="./icons/badge.png"
                alt={data.shop.badge}
              />
              {data.shop.name}
              <span class="chevron">
                <Icon kind="right" />
              </span>
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
                    <div class="item-secondary">
                      <div class="item-labels">
                        {item.variant && (
                          <span class="variant">{item.variant}</span>
                        )}
                        {item.preOrder && (
                          <span class="pre-order">Pre-Order</span>
                        )}
                      </div>
                      <span class="quantity">x{item.quantity}</span>
                    </div>
                    <p class="price">{money(item.unitPrice)}</p>
                  </div>
                </article>
              ))}
            </div>
            <details class="totals" open={data.totalsExpanded}>
              <summary>
                Order Total: <strong>{money(total)}</strong>
                <span class="chevron">
                  <Icon kind="down" />
                </span>
              </summary>
              <dl>
                <div>
                  <dt>Merchandise Subtotal</dt>
                  <dd>{money(subtotal)}</dd>
                </div>
                <div>
                  <dt>Shipping Fee</dt>
                  <dd>{money(data.costs.shipping)}</dd>
                </div>
                <div>
                  <dt>
                    Buyer Service Fee <Icon kind="info" />
                  </dt>
                  <dd>{money(data.costs.serviceFee)}</dd>
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
                <span class="chevron">
                  <Icon kind="right" />
                </span>
              </div>
            ))}
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
                    View <Icon kind="right" />
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
              <div>
                <dt>Shipping Time</dt>
                <dd>{data.shipping.deliveredAt}</dd>
              </div>
            </dl>
          </section>
          <p class="notice">Independent website</p>
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

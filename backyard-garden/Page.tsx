import { floorArea, model } from "./model.ts";
export function BackyardPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="An interactive 3D study of an L-shaped backyard with 3 metre walls and wall-wide windows."
        />
        <meta name="theme-color" content="#234e3c" />
        <title>Backyard Garden · 3D viewer</title>
        <link rel="stylesheet" href="./styles.css" />
        <script type="module" src="./viewer.js" />
      </head>
      <body>
        <header class="topbar">
          <a class="collection-link" href="../">← Projects</a>
          <span class="brand">BACKYARD / GARDEN</span>
          <button type="button" class="quiet-button" data-reference-open>
            View drawing ↗
          </button>
        </header>
        <main class="workspace">
          <aside class="sidebar">
            <p class="eyebrow">A space to explore</p>
            <h1>
              Backyard<br />Garden<span>.</span>
            </h1>
            <p class="intro">
              An L-shaped courtyard, wrapped by tall walls and full-width
              windows.
            </p>
            <div class="measurements">
              <div>
                <span>Wall height</span>
                <strong>
                  3.00 <small>m</small>
                </strong>
                <em>Confirmed</em>
              </div>
              <div>
                <span>Floor area</span>
                <strong>
                  {floorArea.toFixed(2)} <small>m²</small>
                </strong>
                <em>Approximate</em>
              </div>
            </div>
            <section class="controls">
              <h2>View the space</h2>
              <div class="view-buttons" role="group" aria-label="Camera view">
                <button
                  type="button"
                  data-camera="perspective"
                  aria-pressed="true"
                >
                  3D view
                </button>
                <button type="button" data-camera="plan" aria-pressed="false">
                  Floor plan
                </button>
                <button type="button" data-camera="inside" aria-pressed="false">
                  Inside
                </button>
              </div>
              <label class="toggle">
                <span>Cutaway walls</span>
                <input type="checkbox" data-cutaway checked />
              </label>
              <label class="toggle">
                <span>Show windows</span>
                <input type="checkbox" data-windows checked />
              </label>
              <label class="toggle">
                <span>Show dimensions</span>
                <input type="checkbox" data-dimensions checked />
              </label>
            </section>
            <details class="specifications">
              <summary>Measurements & assumptions</summary>
              <dl>
                <dt>Overall width</dt>
                <dd>{model.width.toFixed(3)} m</dd>
                <dt>Main strip depth</dt>
                <dd>{model.stripDepth.toFixed(3)} m</dd>
                <dt>Return width × depth</dt>
                <dd>1.350 × 2.025 m</dd>
                <dt>Main window width</dt>
                <dd>5.425 m</dd>
              </dl>
              <p>
                Plan dimensions are interpreted from the supplied screenshot.
                Wall thickness (0.12 m), window sill (0.12 m), window top (2.85
                m), frame divisions, and floor finish are illustrative. Confirm
                before construction.
              </p>
            </details>
            <div class="legend">
              <span>
                <i class="wall-key" />Boundary wall
              </span>
              <span>
                <i class="glass-key" />Wall-wide window
              </span>
            </div>
          </aside>
          <section class="viewer" aria-label="3D courtyard viewer">
            <div
              id="garden-stage"
              role="img"
              aria-label="Three-dimensional L-shaped backyard; drag to orbit, scroll or pinch to zoom"
            >
              <p class="loading" data-loading>Opening your courtyard…</p>
            </div>
            <div class="stage-tag">
              L-shaped courtyard <span>Open to the sky</span>
            </div>
            <div class="navigation">
              <span>Drag to orbit</span>
              <span>Scroll / pinch to zoom</span>
              <span>Right-drag / two fingers to pan</span>
              <button type="button" class="quiet-button" data-reset>
                Reset view
              </button>
            </div>
            <p class="view-status" data-status aria-live="polite">
              3D view · cutaway walls
            </p>
          </section>
        </main>
        <dialog class="reference-dialog">
          <header>
            <h2>Source drawing</h2>
            <button
              type="button"
              class="quiet-button"
              data-reference-close
              aria-label="Close drawing"
            >
              Close ×
            </button>
          </header>
          <img
            src="./reference/floor-plan.png"
            alt="Supplied house floor plan with the backyard highlighted in red at the rear."
          />
          <p>
            The red region is the modelled courtyard. The three close-ups
            identify long, return, and left-side windows.
          </p>
          <div class="reference-crops">
            <img
              src="./reference/main-window.png"
              alt="Main wall-wide window detail"
            />
            <img
              src="./reference/return-window.png"
              alt="Short return window detail"
            />
            <img
              src="./reference/side-window.png"
              alt="Left-side window detail"
            />
          </div>
        </dialog>
        <noscript>
          <p class="noscript">
            Enable JavaScript for the 3D viewer.{" "}
            <a href="./reference/floor-plan.png">Open the source floor plan</a>.
          </p>
        </noscript>
      </body>
    </html>
  );
}

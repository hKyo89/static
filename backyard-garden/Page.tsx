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
              An L-shaped courtyard with tall walls, a fixed window, and four
              sliding glass doors.
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
                <input type="checkbox" data-cutaway />
              </label>
              <label class="toggle">
                <span>Show windows</span>
                <input type="checkbox" data-windows checked />
              </label>
              <label class="toggle">
                <span>Show dimensions</span>
                <input type="checkbox" data-dimensions checked />
              </label>
              <label class="door-control" htmlFor="door-opening">
                <span>Open sliding doors</span>
                <output data-door-output aria-live="polite">Closed</output>
              </label>
              <input
                id="door-opening"
                class="door-range"
                data-door-opening
                type="range"
                min="0"
                max="100"
                step="1"
                defaultValue="0"
                aria-label="Sliding doors opening"
              />
            </section>
            <details class="specifications">
              <summary>Measurements & assumptions</summary>
              <dl>
                <dt>House & sunlight</dt>
                <dd>Two-storey house · sunlight from the open backyard side</dd>
                <dt>Finishes</dt>
                <dd>Rough grey granite tiles · ivory roughcast walls</dd>
                <dt>Long wall</dt>
                <dd>Seven sections with slim recessed U dividers</dd>
                <dt>Overall width</dt>
                <dd>{model.width.toFixed(3)} m</dd>
                <dt>Main strip depth</dt>
                <dd>{model.stripDepth.toFixed(3)} m</dd>
                <dt>Return width × depth</dt>
                <dd>1.350 × 2.025 m</dd>
                <dt>House frontage width</dt>
                <dd>5.425 m</dd>
                <dt>Fixed-window bay</dt>
                <dd>1.600 m</dd>
                <dt>Four sliding doors</dt>
                <dd>3.825 m</dd>
              </dl>
              <p>
                Plan dimensions are interpreted from the supplied screenshot.
                Wall thickness (0.12 m), window sill (0.12 m), window top (2.85
                m), wall separator width, track dimensions, tile size, and
                U-divider dimensions, 6 m house height, and sun angle are
                illustrative. Confirm before construction.
              </p>
            </details>
            <div class="legend">
              <span>
                <i class="wall-key" />Boundary wall
              </span>
              <span>
                <i class="glass-key" />Fixed glass / sliding doors
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
              3D view · full-height walls
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
            The red region is the modelled courtyard. The close-ups show
            frontage details. The short return is a solid wall; the long
            frontage has a fixed window, wall separator, and four sliding doors.
          </p>
          <div class="reference-crops">
            <img
              src="./reference/main-window.png"
              alt="Main wall-wide window detail"
            />
            <img
              src="./reference/return-window.png"
              alt="Original return detail; user confirmed this edge is a solid wall"
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

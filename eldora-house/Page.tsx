import { openingReferences } from "./openings.ts";
import { rooms } from "./house-model.ts";
import { floorArea, model } from "./model.ts";
export function BackyardPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Explore Eldora House first-floor walls, doors, windows and its Japanese courtyard garden."
        />
        <meta name="theme-color" content="#234e3c" />
        <title>Eldora House · 3D viewer</title>
        <link rel="stylesheet" href="./styles.css" />
        <script type="module" src="./viewer.js" />
      </head>
      <body>
        <header class="topbar">
          <a class="collection-link" href="../">← Projects</a>
          <span class="brand">ELDORA / HOUSE</span>
          <button type="button" class="quiet-button" data-reference-open>
            View drawing ↗
          </button>
        </header>
        <main class="workspace">
          <aside class="sidebar">
            <p class="eyebrow">A space to explore</p>
            <h1>
              Eldora<br />House<span>.</span>
            </h1>
            <p class="intro">
              House geometry and interiors from your SketchUp model, with our
              garden and walnut canopy preserved.
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
                <span>Garden area</span>
                <strong>
                  {floorArea.toFixed(2)} <small>m²</small>
                </strong>
                <em>Approximate</em>
              </div>
            </div>
            <section class="controls">
              <h2>View the space</h2>
              <label class="toggle">
                <span>Area</span>
                <select data-scope aria-label="Area view">
                  <option value="house">Whole house</option>
                  <option value="garden">Backyard garden</option>
                </select>
              </label>
              <label class="toggle">
                <span>Room names</span>
                <input type="checkbox" data-room-labels checked />
              </label>
              <label class="toggle">
                <span>Focus room</span>
                <select data-room-focus aria-label="Focus room">
                  <option value="">Overview</option>
                  {rooms.map((room) => (
                    <option value={room.id}>{room.id} · {room.name}</option>
                  ))}
                </select>
              </label>
              <details>
                <summary>Room / area map</summary>
                <ol>
                  {rooms.map((room) => (
                    <li>
                      <strong>{room.id} · {room.name}</strong>
                      <br />
                      <small>{room.note}</small>
                    </li>
                  ))}
                </ol>
              </details>
              <label class="toggle">
                <span>Door / window IDs</span>
                <input type="checkbox" checked data-opening-labels />
              </label>
              <label class="toggle">
                <span>Focus opening</span>
                <select data-opening-focus aria-label="Focus door or window">
                  <option value="">Choose reference</option>
                  {openingReferences.map((o) => (
                    <option value={o.id}>{o.id} · {o.name}</option>
                  ))}
                </select>
              </label>
              <details>
                <summary>Door / window references</summary>
                <ul>
                  {openingReferences.map((o) => (
                    <li>
                      <strong>{o.id}</strong> · {o.name}
                      <br />
                      <small>
                        {o.kind === "sliding"
                          ? "Leaves A–D from drawing-left to right"
                          : o.kind}
                      </small>
                    </li>
                  ))}
                </ul>
              </details>
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
              <div class="view-buttons" role="group" aria-label="Lighting">
                <button type="button" data-lighting="day" aria-pressed="true">
                  Day
                </button>
                <button
                  type="button"
                  data-lighting="night"
                  aria-pressed="false"
                >
                  Night
                </button>
              </div>
              <button type="button" class="quiet-button" data-hide-enclosure>
                Hide all walls and windows
              </button>
              <label class="toggle">
                <span>Garden back + right walls</span>
                <input type="checkbox" data-garden-boundary checked />
              </label>
              <label class="toggle">
                <span>Show house model</span>
                <input type="checkbox" data-walls checked />
              </label>
              <label class="toggle">
                <span>Show windows</span>
                <input type="checkbox" data-windows checked />
              </label>
              <label class="toggle">
                <span>Show dimensions</span>
                <input type="checkbox" data-dimensions checked />
              </label>
              <label class="toggle">
                <span>Upper floors and roof</span>
                <input type="checkbox" data-upper-floors />
              </label>
              <label class="toggle">
                <span>Show canopy roof</span>
                <input type="checkbox" data-canopy-roof checked />
              </label>
              <label class="toggle">
                <span>Show garden</span>
                <input type="checkbox" data-garden checked />
              </label>
              <label class="toggle">
                <span>Open sliding doors</span>
                <input type="checkbox" data-door-opening />
              </label>
              <output data-door-output aria-live="polite">Closed</output>
            </section>
            <details class="specifications">
              <summary>Measurements & assumptions</summary>
              <dl>
                <dt>Zen garden</dt>
                <dd>
                  Artificial bonsai · pebble bed · stone lantern · warm pebble
                  light
                </dd>
                <dt>Wall lights</dt>
                <dd>Six compact up/down lights · 2 m above floor</dd>
                <dt>House & sunlight</dt>
                <dd>Two-storey house · daylight directly overhead</dd>
                <dt>Finishes</dt>
                <dd>
                  Off-white inside walls · ivory courtyard roughcast · grey
                  garden granite
                </dd>
                <dt>Gutter</dt>
                <dd>
                  Tiled · about 20 cm wide × 5 cm deep · rear wall and
                  window-side edge
                </dd>
                <dt>Garden layers</dt>
                <dd>Draincell, geotextile, then pebbles and decoration</dd>
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
              aria-label="First floor of Eldora House; drag to orbit, scroll or pinch to zoom"
            >
              <p class="loading" data-loading>Opening Eldora House…</p>
            </div>
            <div class="stage-tag">
              Eldora House <span>House and courtyard study</span>
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
            src="./reference/first-floor.png"
            alt="Supplied full first-floor electrical plan of Eldora House."
          />
          <p>
            The full first floor is interpreted from the electrical drawing.
            Room uses and new opening sizes are provisional. The close-ups show
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

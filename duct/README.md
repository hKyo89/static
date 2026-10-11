# Kitchen exhaust viewer

The existing Opsi D Three.js viewer now runs within the repository's single
shared Fresh application. Public URL: <https://hkyo89.github.io/static/duct/>.

Run root tasks from the repository root; do not install a separate app here:

```sh
deno task dev
deno task check
deno task publish:files
```

Source markup: [page.html](page.html), wrapped by [Page.tsx](Page.tsx).
Browser/model source: [src/main.js](src/main.js),
[src/system.js](src/system.js), [src/content.js](src/content.js), and
[src/styles.css](src/styles.css). Generated `index.html`, `viewer.js` and
`styles.css` are refreshed by `publish:files`.

The old Vite config, npm manifests and compiled `dist/` assets were retired
during consolidation; retrieve historical files from baseline commit
`7c163bb5648ee1992a01ad4812da23506c713373` if needed. Model geometry, part
controls, languages, onboarding, component focus and technical information are
preserved. See [shared instructions](../STATIC_PROJECTS.md) for architecture and
SSH.

The former `/static/duct/dist/` URL redirects to `/static/duct/` through a tiny
static HTML redirect; it is also supported by the local Fresh router.

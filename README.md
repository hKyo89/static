# Static project collection

One Deno Fresh application, one dependency configuration, and one static export
for [hkyo89.github.io/static](https://hkyo89.github.io/static/).

| Project         | Public route                                                                 | Source / documentation                                 |
| --------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------ |
| Backyard Garden | [/static/backyard-garden/](https://hkyo89.github.io/static/backyard-garden/) | [backyard-garden/README.md](backyard-garden/README.md) |
| Duct viewer     | [/static/duct/](https://hkyo89.github.io/static/duct/)                       | [duct/README.md](duct/README.md)                       |
| Order details   | [/static/shopee/](https://hkyo89.github.io/static/shopee/)                   | [shopee/README.md](shopee/README.md)                   |

## Start here

Read [STATIC_PROJECTS.md](STATIC_PROJECTS.md) before adding another project. It
covers architecture, local development, adding routes, static limitations,
validation, GitHub Pages, SSH, and a reusable continuation prompt.
[AGENTS.md](AGENTS.md) gives the repository rules for coding assistants.

Requires Deno **2.8.3** (the CI version; newer versions require validation).
From the repository root:

```sh
deno install --frozen --allow-scripts=npm:esbuild
deno task dev
# http://localhost:8000/static/
deno task check
deno task test:links
deno task publish:files
```

`build` creates ignored `dist/`; `publish:files` also refreshes the tracked HTML
and assets used by the existing `main`/root GitHub Pages configuration. There is
no Fresh server running on GitHub Pages. Browser interactions run from bundled
JavaScript. The old independent Shopee Fresh app and Duct Vite build were
consolidated on 2026-10-11. Existing project URLs and invoice PWA scope remain.

## Project backup

The complete Backyard Garden continuation package is kept in this repository
under [backyard-garden/](backyard-garden/README.md), following the user's chosen
working repository. It adapts the reusable session-backup template from the
`prompts` repository; it does not create a second package in `prompts`.

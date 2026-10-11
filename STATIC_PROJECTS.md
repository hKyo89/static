# Creating and maintaining static web projects

This is the reusable instruction file for future sessions. Read it together with
[AGENTS.md](AGENTS.md), then read the affected project's README.

## Repository and baseline

- Local repository: `/Users/hkyo89/Codes/github.com/hkyo89/static`
- Remote: `git@github.com:hKyo89/static` (GitHub accepts the `.git` suffix too).
- Normal branch: `main`.
- Site root: <https://hkyo89.github.io/static/>.
- Migration baseline: `7c163bb5648ee1992a01ad4812da23506c713373`.
- Consolidation date: 2026-10-11, Asia/Jakarta.
- GitHub Pages was verified to use **legacy branch publishing**, `main`, `/`.
  This change preserves that setting; the build workflow validates and uploads
  an artifact, rather than changing Pages to Actions publishing.

## Shared architecture

The repository has **one** Fresh 2.3.0 application. Fresh renders HTML during
local development and static export. GitHub Pages serves the generated files; no
server, API, Fresh islands runtime, database, or authentication is required.

| File / directory                                            | Responsibility                                                                                |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `deno.json`, `deno.lock`                                    | Shared tasks, imports, pinned dependency graph                                                |
| `main.tsx`                                                  | Shared Fresh application, slash redirects, `/static/` routes and local exported-asset serving |
| `projects.ts`                                               | Single list of project slugs, page components, asset directories, and browser entries         |
| `routes/HomePage.tsx`                                       | Collection home at `/static/`, with links derived from the registry                           |
| `<slug>/Page.tsx`                                           | Project-specific page component (Shopee retains `components/OrderPage.tsx`)                   |
| `<slug>/src/`                                               | Browser source; `viewer.js` entry is bundled by esbuild                                       |
| `<slug>/static/`                                            | Optional assets copied as-is into the project's export                                        |
| `scripts/build.ts`                                          | Calls the actual Fresh handler for each route and builds local browser bundles                |
| `scripts/dev.ts`                                            | Builds assets and starts Fresh locally                                                        |
| `scripts/preview.ts`                                        | Pure static-file preview with the real `/static/` mount                                       |
| `scripts/publish.ts`                                        | Refreshes branch-published tracked outputs from `dist/`                                       |
| `scripts/site_test.ts`, `scripts/verify.ts`                 | Route, model, asset and deployment-prefix checks                                              |
| `scripts/links.ts`                                          | Repository Markdown relative-link check                                                       |
| `.github/workflows/build-static.yml`                        | Shared CI: frozen install, checks, output freshness, artifact                                 |
| `dist/`                                                     | Ignored complete static export; its contents map to `/static/`                                |
| `index.html`, `<slug>/index.html`, `<slug>/viewer.js`, etc. | Tracked Pages files regenerated from source                                                   |
| `.nojekyll`                                                 | Stops Jekyll processing of the published tree                                                 |

The build uses Fresh's `App.handler()` to render every enumerated page, then
esbuild bundles the browser entries. This is an explicit repository static
exporter; `fresh build` alone does not promise an arbitrary site's static
export. Reference:
[Fresh App documentation](https://usefresh.dev/docs/concepts/app) and
[static files](https://usefresh.dev/docs/concepts/static-files).

Dependencies: Deno 2.8.3, Fresh 2.3.0, Preact 10.29.8, Three.js 0.180.0, esbuild
0.25.12, `@std/http` 1.0.21. `deno.lock` also pins transitive packages.
Dependencies are installed once at root. Three.js is included in each viewer's
bundle, so viewers need no runtime CDN; it is one shared package installation,
not one cross-page browser bundle. This keeps projects independently loadable.

### Existing project adapters

- **Duct:** `duct/Page.tsx` wraps the trusted, checked-in `duct/page.html` body
  in a Fresh-rendered document. The browser entry is `duct/src/main.js` and the
  stylesheet is `duct/src/styles.css`. The original UI and model are retained.
  Vite configuration, npm manifests, old compiled `duct/dist/` assets, and the
  separate workflow were removed. A small redirect preserves
  `/static/duct/dist/` for old bookmarks. The baseline commit retains their
  history.
- **Shopee:** the existing Preact page, JSON, source assets, browser script and
  PWA are retained. Its nested Deno app, lockfile and exporter were removed.
  Tests import the shared root app and request `/static/shopee/`. The PWA's
  relative scope still resolves only to `/static/shopee/`.
- **Backyard Garden:** a Fresh page and Three.js browser viewer, with shared
  geometry definitions in `backyard-garden/model.ts` and source drawings in
  `backyard-garden/static/reference/`.

## Local development and validation

Always run from the repository root:

```sh
cd /Users/hkyo89/Codes/github.com/hkyo89/static
deno install --frozen --allow-scripts=npm:esbuild
deno task dev
```

Open `http://localhost:8000/static/` or a project path. The dev task rebuilds on
changes to its explicit watch paths and restarts Fresh; reload the browser after
changes. For a new project, add its source and static paths to that watch list.
A direct `deno run -A main.tsx` uses existing exported assets and does not
rebuild.

To validate the production-style static result:

```sh
deno task check
deno task test:links
deno task preview
# http://localhost:8001/static/backyard-garden/
```

`check` includes formatting, linting, TypeScript checks, Deno tests, a complete
build, and export-asset validation. `preview` serves only `dist/`; it proves the
site does not depend on Fresh being available at runtime. Stop local servers
when finished. Never preview the repository root as a public file server.

If sandbox permissions prohibit the default Deno cache, use a repo-local cache:

```sh
export DENO_DIR="$PWD/.deno-cache"
```

`.deno-cache/` and `node_modules/` are ignored. This is optional outside
sandboxed sessions. Repository writes and `.git` writes may need separate
permissions.

## Add a new project

1. Inspect `git status --short`, branch, remote, and relevant docs. Preserve
   unrelated work. Choose a unique lowercase kebab-case slug.
2. Create `<slug>/Page.tsx`, exporting a Preact component that renders the whole
   document (`html`, `head`, `body`) with title, description, viewport,
   language, and accessible controls.
3. Put browser code in `<slug>/src/viewer.js` (or a TS entry supported by
   esbuild). Use plain browser code for interactive behavior. Bundle
   dependencies locally. Do not add Fresh islands without extending and testing
   the static exporter.
4. Put images and other copy-only assets in `<slug>/static/`. Its contents
   appear at the exported project root. An asset named `static/styles.css`
   becomes `./styles.css`. Never place an `index.html` there; the renderer owns
   it. Do not give a project an asset named `viewer.js` if using the bundled
   client.
5. Import the page in `projects.ts` and append a descriptor. Example:

   ```ts
   import { ExamplePage } from "./example/Page.tsx";
   // Append to the existing projects array:
   {
     slug: "example",
     title: "Example",
     description: "A concise project description.",
     Page: ExamplePage,
     assets: "example/static",
     client: "example/src/viewer.js",
   }
   ```

   Omit `assets` or `client` if unnecessary. `stylesheet` can name a source CSS
   file to copy as `styles.css` (as Duct does). The shared router registers
   `/static/example/`; the home page and exporter update automatically.
6. Use relative links throughout: `./viewer.js`, `./styles.css`,
   `./images/photo.jpg`, `../` for the collection. Absolute `/images/...` paths
   break under the GitHub repository prefix. Project routes use trailing slashes
   so document-relative URLs resolve correctly. GitHub Pages supplies directory
   index behavior; Fresh supplies equivalent development redirects.
7. If adding a dependency, edit **root** imports only, run
   `deno install --allow-scripts=npm:esbuild`, and commit the updated root lock.
   esbuild resolves browser package imports through root `node_modules`; add
   bundler aliases/configuration if a custom Deno-only specifier is needed.
8. Add meaningful tests for model/data invariants or important interactions.
   Test desktop and mobile layouts and actual browser interactions. Check
   console/runtime failures and missing requests. Avoid tests that only mirror
   implementation details.
9. Add `<slug>/README.md` and update the root project index. For a project
   backup, use the five-document pattern demonstrated by Backyard Garden.
10. Run validation and regenerate Pages output:

    ```sh
    deno task check
    deno task test:links
    deno task publish:files
    git diff --stat
    git status --short
    ```

    Review generated changes as well as source. The publishing script only
    copies generated output; it never deletes project sources. When removing or
    renaming an asset/route, remove the obsolete tracked generated files
    explicitly after review so branch publishing does not retain a stale URL.

## Static-only constraints

Every public route must be enumerated at build time. Add a descriptor for a new
single-page project. If a project needs nested or data-driven routes, extend the
registry, router, exporter and tests together to enumerate those pages.

GitHub Pages cannot run request-time Deno handlers, secrets, database
operations, server-side user sessions, or server redirects configured by this
code. Use browser-local interactions or a separately approved external service
for those features. Do not pretend that a Fresh server endpoint will exist on
Pages.

Never include private information in page props or static assets unless the user
explicitly wants it published. Existing invoice contents predate this migration;
this work preserves them. Private keys and credentials never belong in source,
generated HTML, screenshots, logs, or documentation.

## SSH and safe Git workflow

The user specifies SSH keys under `/Users/hkyo89/.ssh`. For this machine:

- Use `/Users/hkyo89/.ssh/id_rsa`.
- It was verified as a symlink to
  `/Users/hkyo89/Codes/github.com/hkyo89/mac-setup/.ssh/id_rsa`, the path named
  by the backup template. These identify the same key.
- SSH config: `/Users/hkyo89/.ssh/config` (also a mac-setup symlink).
- Known hosts: `/Users/hkyo89/.ssh/known_hosts`.
- Inspect file existence, symlink targets, or SSH configuration when needed.
  **Never read or print the contents of a private key.** SSH itself consumes it.
- Use established host verification. Do not disable StrictHostKeyChecking. An
  unknown/changed host key requires verification rather than bypassing it.

Example, after the user authorizes publication:

```sh
git status --short
git branch --show-current
git remote -v
GIT_SSH_COMMAND='ssh -i /Users/hkyo89/.ssh/id_rsa -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes' git fetch origin
# If clean and strictly behind, update safely:
git merge --ff-only origin/main
# Review and stage only the intended files; choose a Conventional Commit message.
git commit -m "feat: add example static project"
GIT_SSH_COMMAND='ssh -i /Users/hkyo89/.ssh/id_rsa -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes' git push origin main
```

Do not blindly merge if branches diverge or user work is present. Do not reset,
clean, stash unrelated changes, overwrite them, or force-push. After pushing,
fetch/inspect `origin/main`, confirm the commit matches, verify the worktree,
and inspect both shared CI and Pages build status. A successful push alone is
not proof that the public site has deployed.

`gh api repos/hKyo89/static/pages` can read the Pages configuration, and
`gh run list` / `gh run view` inspect workflow results. `gh` uses the user's
configured authentication; never print tokens. This repository keeps Pages
branch publishing: `deno task publish:files` must run before committing. The
workflow verifies committed outputs match the build and uploads `dist/` but does
not itself deploy the artifact.

## Continuation prompt for any future static project

> Read `/Users/hkyo89/Codes/github.com/hkyo89/static/AGENTS.md` and
> `/Users/hkyo89/Codes/github.com/hkyo89/static/STATIC_PROJECTS.md`. Create or
> update my static web project named `<project-name>` in that repository. Use
> its one root Deno Fresh application, `projects.ts` registry and shared static
> exporter. Keep the URL under
> `https://hkyo89.github.io/static/<project-name>/`. Preserve existing projects,
> data, PWA scope, and unrelated work. Use root dependencies, project-relative
> assets, and locally bundled browser code. Document requirements, assumptions,
> operation, and continuation instructions. Validate routes, the `/static/`
> prefix, assets, mobile and desktop interactions, and relevant model/data
> behavior; run all root checks and refresh committed Pages outputs. Use
> `/Users/hkyo89/.ssh/id_rsa` for authorized GitHub SSH operations without
> printing key contents. Report changed files, validation, limitations, and
> publication state. Keep all instructions synchronized with the final
> implementation.

The optional registry field `legacyAliases` retains old single-folder URLs as
Fresh redirects and static redirect documents. Duct uses `["dist"]` so old
`/static/duct/dist/` bookmarks reach `/static/duct/`. This does not restore the
retired per-project build.

# Instructions for assistants

Read [STATIC_PROJECTS.md](STATIC_PROJECTS.md) first. Use this repository's
single root Fresh app and root `deno.json` for all projects. Do not create a
nested Fresh application, package manager setup, independent dev server, or
deployment workflow for each project.

- New projects belong in `<lowercase-kebab-case>/` with a `Page.tsx`, browser
  sources in `src/`, optional assets in `static/`, and project documentation.
- Register the project in `projects.ts`. The shared router and exporter consume
  this registry. Public routes live under `/static/<slug>/`.
- All page assets must use document-relative URLs (`./viewer.js`,
  `./styles.css`).
- Keep model values in a shared model/data file; state assumptions explicitly.
- Keep existing invoice data, interactions, images, and PWA scope unchanged
  unless the user requests changes. Preserve Duct's controls and model.
- Run checks, Markdown-link validation, static preview, and relevant browser
  interactions. Run `publish:files` after source changes so tracked Pages output
  matches source. Review the diff before committing.
- Do not commit caches, dependencies, secrets, private keys, or unrelated edits.
- Read SSH configuration or public-key metadata only when needed; never print
  private-key contents. Use `/Users/hkyo89/.ssh/id_rsa` for GitHub operations.
  It is a symlink to the mac-setup key path documented in STATIC_PROJECTS.md.
- Verify the branch, remote, and dirty state before Git operations. Preserve
  user changes, and use a fast-forward update when appropriate. Never
  force-push.
- Maintain root instructions and each project's documentation when behavior or
  architecture changes. Record source commit hashes as baselines, not invented
  final hashes.

For a new project, use the continuation prompt at the end of STATIC_PROJECTS.md.
For this courtyard, also read
[backyard-garden/CONTINUATION_PROMPT.md](backyard-garden/CONTINUATION_PROMPT.md).

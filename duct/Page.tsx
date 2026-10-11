const source = await Deno.readTextFile(new URL("./page.html", import.meta.url));
const body = source.match(/<body>([\s\S]*?)<\/body>/)?.[1].replace(
  /<script[\s\S]*?<\/script>/g,
  "",
).replace(/[ \t]+$/gm, "");
if (!body) throw new Error("Duct page template has no body");
export function DuctPage() {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light" />
        <meta name="description" content="Viewer sistem exhaust dapur Opsi D" />
        <title>Viewer sistem exhaust Opsi D</title>
        <link rel="stylesheet" href="./styles.css" />
        <script type="module" src="./viewer.js" />
      </head>
      <body dangerouslySetInnerHTML={{ __html: body! }} />
    </html>
  );
}

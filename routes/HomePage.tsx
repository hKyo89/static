import { projects } from "../projects.ts";

export function HomePage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Static · Project collection</title>
        <style>
          {`*{box-sizing:border-box}body{margin:0;background:#f5f5ee;color:#24372f;font:16px/1.6 system-ui,sans-serif}main{max-width:1000px;margin:0 auto;padding:70px 24px}small{letter-spacing:.12em;text-transform:uppercase}h1{font-size:clamp(32px,6vw,58px);font-weight:500;line-height:1.1}section{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:20px;margin-top:40px}a{display:block;padding:26px;background:#fff;border:1px solid #d5dfd6;border-radius:16px;color:inherit;text-decoration:none}a:hover{border-color:#3e705a}a:focus-visible{outline:3px solid #3e705a;outline-offset:4px}h2{font-weight:500}p{color:#5b6c62}.arrow{display:block;margin-top:28px;color:#285e45}`}
        </style>
      </head>
      <body>
        <main>
          <small>hKyo89 / static</small>
          <h1>A collection of useful spaces.</h1>
          <p>Viewers, tools, and small web projects.</p>
          <section aria-label="Projects">
            {projects.map((project) => (
              <a href={`./${project.slug}/`} key={project.slug}>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <span class="arrow">Open project →</span>
              </a>
            ))}
          </section>
        </main>
      </body>
    </html>
  );
}

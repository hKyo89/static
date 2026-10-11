import { buildSite } from "./build.ts";
import { app } from "../main.tsx";
await buildSite();
console.log("Local: http://localhost:8000/static/eldora-house/");
await app.listen({ hostname: "127.0.0.1", port: 8000 });

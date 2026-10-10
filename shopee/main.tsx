import { App, staticFiles } from "fresh";
import { OrderPage } from "./components/OrderPage.tsx";
export const app = new App().use(staticFiles()).get(
  "/",
  (ctx) => ctx.render(<OrderPage />),
);
if (import.meta.main) await app.listen();

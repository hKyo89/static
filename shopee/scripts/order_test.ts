import { app } from "../main.tsx";
import { subtotal, total } from "../components/OrderPage.tsx";
Deno.test("invoice arithmetic and static response", async () => {
  if (subtotal !== 396000 || total !== 400000) {
    throw new Error("Incorrect sample totals");
  }
  const response = await app.handler()(new Request("http://localhost/"));
  const html = await response.text();
  if (response.status !== 200 || !html.includes("260906AKVP4BHB")) {
    throw new Error("Missing invoice");
  }
  if (html.includes('src="/') || html.includes('href="/')) {
    throw new Error("Root-relative asset");
  }
  if ((html.match(/class="item"/g) ?? []).length !== 10) {
    throw new Error("Missing items");
  }
});

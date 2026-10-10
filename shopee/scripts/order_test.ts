import { app } from "../main.tsx";
import { subtotal, total } from "../components/OrderPage.tsx";
Deno.test("invoice arithmetic and static response", async () => {
  if (subtotal !== 3079170 || total !== 3609170) {
    throw new Error("Incorrect ducting totals");
  }
  const response = await app.handler()(new Request("http://localhost/"));
  const html = await response.text();
  if (response.status !== 200 || !html.includes("260906AKVP4BHB")) {
    throw new Error("Missing invoice");
  }
  if (html.includes('src="/') || html.includes('href="/')) {
    throw new Error("Root-relative asset");
  }
  if ((html.match(/class="item"/g) ?? []).length !== 5) {
    throw new Error("Missing items");
  }
  if ((html.match(/class="pre-order"/g) ?? []).length !== 5) {
    throw new Error("Missing pre-order labels");
  }
  if (
    !html.includes("Shipping Time") || !html.includes("09-10-2026") ||
    !html.includes("28-09-2026")
  ) throw new Error("Incorrect dates");
});

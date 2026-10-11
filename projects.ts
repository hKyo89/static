import type { ComponentType } from "preact";
import { BackyardPage } from "./backyard-garden/Page.tsx";
import { DuctPage } from "./duct/Page.tsx";
import { OrderPage } from "./shopee/components/OrderPage.tsx";

export const basePath = "/static";
export interface Project {
  slug: string;
  title: string;
  description: string;
  Page: ComponentType;
  assets?: string;
  client?: string;
  stylesheet?: string;
  legacyAliases?: string[];
}
// Add a project here once: both Fresh routing and static export use this list.
export const projects: Project[] = [
  {
    slug: "backyard-garden",
    title: "Backyard Garden",
    description: "Explore the L-shaped backyard in 3D.",
    Page: BackyardPage,
    assets: "backyard-garden/static",
    client: "backyard-garden/src/viewer.js",
  },
  {
    slug: "duct",
    title: "Duct viewer",
    description: "Inspect the kitchen exhaust system and its components.",
    Page: DuctPage,
    client: "duct/src/main.js",
    stylesheet: "duct/src/styles.css",
    legacyAliases: ["dist"],
  },
  {
    slug: "shopee",
    title: "Order details",
    description: "View the ducting order, delivery, and invoice.",
    Page: OrderPage,
    assets: "shopee/static",
  },
];

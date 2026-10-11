import type { ComponentType } from "preact";
import { BackyardPage } from "./eldora-house/Page.tsx";
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
    slug: "eldora-house",
    title: "Eldora House",
    description: "Explore the first floor and Japanese courtyard garden in 3D.",
    Page: BackyardPage,
    assets: "eldora-house/static",
    client: "eldora-house/src/viewer.js",
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

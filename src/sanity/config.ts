import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { table } from "@sanity/table";
import { schema } from "./schemaTypes";
import { apiVersion, dataset, projectId } from "./env";

export default defineConfig({
  name: "default",
  title: "My Portfolio",

  basePath: "/studio",
  projectId,
  dataset,

  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
    table(),
  ],

  schema,
});

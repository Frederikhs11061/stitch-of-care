import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "stitch-of-care",
  title: "Stitch of Care",
  projectId: "xfq0ct3d",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});

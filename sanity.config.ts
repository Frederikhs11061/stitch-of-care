import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

const singletons = ["globalSettings", "homePage", "aboutPage", "faqPage", "patternsPage", "blogPage"];

const singletonLabels: Record<string, string> = {
  globalSettings: "⚙️ Indstillinger",
  homePage: "🏠 Forside",
  aboutPage: "👤 Om mig",
  faqPage: "❓ FAQ",
  patternsPage: "🧶 Opskrifter side",
  blogPage: "📖 Journal side",
};

export default defineConfig({
  name: "stitch-of-care",
  title: "Stitch of Care",
  projectId: "xfq0ct3d",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Indhold")
          .items([
            S.listItem().title("⚙️ Globale indstillinger").id("globalSettings")
              .child(S.document().schemaType("globalSettings").documentId("globalSettings")),
            S.divider(),
            S.listItem().title("🏠 Forside").id("homePage")
              .child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem().title("👤 Om mig").id("aboutPage")
              .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
            S.listItem().title("❓ FAQ").id("faqPage")
              .child(S.document().schemaType("faqPage").documentId("faqPage")),
            S.listItem().title("🧶 Opskrifter side").id("patternsPage")
              .child(S.document().schemaType("patternsPage").documentId("patternsPage")),
            S.listItem().title("📖 Journal side").id("blogPage")
              .child(S.document().schemaType("blogPage").documentId("blogPage")),
            S.divider(),
            S.documentTypeListItem("pattern").title("🧶 Opskrifter"),
            S.documentTypeListItem("post").title("📖 Blogindlæg"),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletons.includes(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletons.includes(context.schemaType)
        ? input.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : input,
  },
});

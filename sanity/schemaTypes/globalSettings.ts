import { defineType, defineField } from "sanity";

const loc = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "da", title: "Dansk", type: "string" }),
      defineField({ name: "en", title: "Engelsk", type: "string" }),
    ],
  });

export const globalSettingsType = defineType({
  name: "globalSettings",
  title: "Globale indstillinger",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "Standard SEO",
      type: "object",
      fields: [
        defineField({ name: "defaultTitle", title: "Standard title tag", type: "string" }),
        defineField({ name: "defaultDescription", title: "Standard meta description", type: "text", rows: 2 }),
        defineField({ name: "defaultOgImage", title: "Standard OG-billede", type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "nav",
      title: "Navigation",
      type: "object",
      fields: [
        loc("patternsLabel", "Opskrifter label"),
        loc("blogLabel", "Blog label"),
        loc("faqLabel", "FAQ label"),
        loc("aboutLabel", "Om mig label"),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        loc("tagline", "Tagline"),
        loc("madeWith", "Lavet med-tekst"),
        loc("privacyLabel", "Privatliv label"),
        loc("termsLabel", "Vilkår label"),
      ],
    }),
    defineField({
      name: "contact",
      title: "Kontaktoplysninger",
      type: "object",
      fields: [
        defineField({ name: "email", title: "E-mail", type: "string" }),
        defineField({ name: "instagram", title: "Instagram handle (uden @)", type: "string" }),
      ],
    }),
  ],
});

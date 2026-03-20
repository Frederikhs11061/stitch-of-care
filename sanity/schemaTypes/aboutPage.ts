import { defineType, defineField } from "sanity";

const loc = (name: string, title: string, rows?: number) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "da", title: "Dansk", type: rows ? "text" : "string", ...(rows ? { rows } : {}) }),
      defineField({ name: "en", title: "Engelsk", type: rows ? "text" : "string", ...(rows ? { rows } : {}) }),
    ],
  });

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Om mig",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title tag", type: "string" }),
        defineField({ name: "description", title: "Meta description", type: "text", rows: 2 }),
        defineField({ name: "ogImage", title: "OG-billede", type: "image", options: { hotspot: true } }),
      ],
    }),
    loc("eyebrow", "Eyebrow"),
    defineField({ name: "heading", title: "Overskrift", type: "string" }),
    loc("intro", "Intro-tekst", 3),
    defineField({
      name: "portrait",
      title: "Portræt-billede",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "portraitAlt", title: "Portræt alt-tekst", type: "object", fields: [
      defineField({ name: "da", title: "Dansk", type: "string" }),
      defineField({ name: "en", title: "Engelsk", type: "string" }),
    ]}),
    loc("storyHeading", "Historien overskrift"),
    loc("story", "Historien (brug to linjeskift for nyt afsnit)", 8),
    loc("valuesHeading", "Værdier overskrift"),
    defineField({
      name: "values",
      title: "Værdier",
      type: "array",
      of: [{
        type: "object",
        fields: [
          loc("title", "Titel"),
          loc("body", "Tekst", 3),
        ],
        preview: { select: { title: "title.da" } },
      }],
    }),
    loc("contactHeading", "Kontakt overskrift"),
    loc("contactBody", "Kontakt tekst", 3),
    loc("contactCta", "Kontakt knap tekst"),
    loc("followHeading", "Følg med overskrift"),
  ],
});

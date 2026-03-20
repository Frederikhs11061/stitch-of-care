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

export const faqPageType = defineType({
  name: "faqPage",
  title: "FAQ",
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
    loc("heading", "Overskrift"),
    loc("body", "Undertekst"),
    defineField({
      name: "items",
      title: "FAQ spørgsmål",
      type: "array",
      of: [{
        type: "object",
        fields: [
          loc("question", "Spørgsmål"),
          loc("answer", "Svar", 4),
        ],
        preview: { select: { title: "question.da" } },
      }],
    }),
    loc("stillQuestions", "Har du stadig spørgsmål? overskrift"),
    loc("stillBody", "Har du stadig spørgsmål? tekst"),
    loc("contactCta", "Kontakt knap tekst"),
  ],
});

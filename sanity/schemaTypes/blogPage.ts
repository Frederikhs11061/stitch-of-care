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

export const blogPageType = defineType({
  name: "blogPage",
  title: "Blog/Journal side",
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
  ],
});

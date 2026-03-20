import { defineType, defineField } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blogindlæg",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "object",
      fields: [
        defineField({ name: "da", title: "Dansk", type: "string", validation: (r) => r.required() }),
        defineField({ name: "en", title: "Engelsk", type: "string" }),
      ],
    }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title.da" }, validation: (r) => r.required() }),
    defineField({ name: "publishedAt", title: "Udgivet", type: "datetime" }),
    defineField({ name: "coverImage", title: "Forsidebillede", type: "image", options: { hotspot: true } }),
    defineField({
      name: "excerpt",
      title: "Uddrag",
      type: "object",
      fields: [
        defineField({ name: "da", title: "Dansk", type: "text", rows: 3 }),
        defineField({ name: "en", title: "Engelsk", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "body",
      title: "Indhold",
      type: "object",
      fields: [
        defineField({ name: "da", title: "Dansk", type: "array", of: [{ type: "block" }] }),
        defineField({ name: "en", title: "Engelsk", type: "array", of: [{ type: "block" }] }),
      ],
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: { list: ["guides", "lifestyle"] },
    }),
    defineField({ name: "readingTime", title: "Læsetid (min)", type: "number" }),
  ],
  preview: {
    select: { title: "title.da", media: "coverImage" },
  },
});

import { defineType, defineField } from "sanity";

export const patternType = defineType({
  name: "pattern",
  title: "Opskrift",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Navn", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "featured", title: "Fremhævet på forsiden", type: "boolean", initialValue: false }),
    defineField({ name: "new", title: "Ny", type: "boolean", initialValue: false }),
    defineField({ name: "price", title: "Pris (DKK)", type: "number" }),
    defineField({ name: "priceEur", title: "Pris (EUR)", type: "number" }),
    defineField({ name: "difficulty", title: "Sværhedsgrad", type: "string" }),
    defineField({
      name: "difficultyLabel",
      title: "Sværhedsgrad label",
      type: "object",
      fields: [
        defineField({ name: "da", title: "Dansk", type: "string" }),
        defineField({ name: "en", title: "Engelsk", type: "string" }),
      ],
    }),
    defineField({ name: "yarnWeight", title: "Garnvægt", type: "string" }),
    defineField({ name: "pages", title: "Antal sider", type: "number" }),
    defineField({ name: "sizes", title: "Størrelser", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "backText", title: "Tekst på ryggen", type: "string" }),
    defineField({
      name: "description",
      title: "Kort beskrivelse",
      type: "object",
      fields: [
        defineField({ name: "da", title: "Dansk", type: "text", rows: 3 }),
        defineField({ name: "en", title: "Engelsk", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "longDescription",
      title: "Lang beskrivelse",
      type: "object",
      fields: [
        defineField({ name: "da", title: "Dansk", type: "text", rows: 6 }),
        defineField({ name: "en", title: "Engelsk", type: "text", rows: 6 }),
      ],
    }),
    defineField({
      name: "images",
      title: "Billeder",
      type: "object",
      fields: [
        defineField({ name: "front", title: "Forside", type: "image", options: { hotspot: true } }),
        defineField({ name: "back", title: "Bagside", type: "image", options: { hotspot: true } }),
        defineField({ name: "detail", title: "Detalje", type: "image", options: { hotspot: true } }),
        defineField({ name: "lifestyle", title: "Lifestyle", type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
  ],
  preview: {
    select: { title: "name", media: "images.front" },
  },
});

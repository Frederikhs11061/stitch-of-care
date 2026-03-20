import { defineType, defineField } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site-indstillinger",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero-sektion",
      type: "object",
      fields: [
        defineField({ name: "mainImage", title: "Stort billede (venstre)", type: "image", options: { hotspot: true } }),
        defineField({ name: "tile1", title: "Lille billede 1", type: "image", options: { hotspot: true } }),
        defineField({ name: "tile2", title: "Lille billede 2", type: "image", options: { hotspot: true } }),
        defineField({ name: "tile3", title: "Lille billede 3", type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "about",
      title: "Om mig-billeder",
      type: "object",
      fields: [
        defineField({ name: "portrait", title: "Portræt", type: "image", options: { hotspot: true } }),
        defineField({ name: "studio", title: "Studio/arbejde", type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "featuredPattern",
      title: "Fremhævet opskrift",
      type: "reference",
      to: [{ type: "pattern" }],
    }),
  ],
  preview: { select: { title: "Indstillinger" } },
});

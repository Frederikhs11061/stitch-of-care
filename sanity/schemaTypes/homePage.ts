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

const heroTile = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "image", title: "Billede", type: "image", options: { hotspot: true } }),
      defineField({ name: "imageAlt", title: "Alt-tekst", type: "object", fields: [
        defineField({ name: "da", title: "Dansk", type: "string" }),
        defineField({ name: "en", title: "Engelsk", type: "string" }),
      ]}),
      loc("eyebrow", "Eyebrow-tekst"),
      loc("title", "Titel"),
    ],
  });

export const homePageType = defineType({
  name: "homePage",
  title: "Forside",
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
    defineField({
      name: "hero",
      title: "Hero-sektion",
      type: "object",
      fields: [
        loc("eyebrow", "Eyebrow"),
        defineField({ name: "heading1", title: "Overskrift linje 1", type: "string" }),
        defineField({ name: "heading2", title: "Overskrift linje 2", type: "string" }),
        loc("tagline", "Tagline"),
        loc("ctaLabel", "CTA knap tekst"),
        heroTile("mainTile", "Stort billede (venstre/top)"),
        heroTile("tile1", "Lille billede 1 (øverst højre)"),
        heroTile("tile2", "Lille billede 2 (midten højre)"),
        heroTile("tile3", "Lille billede 3 (nederst højre)"),
      ],
    }),
    defineField({
      name: "aboutTeaser",
      title: "Om mig-teaser",
      type: "object",
      fields: [
        loc("eyebrow", "Eyebrow"),
        loc("heading", "Overskrift"),
        loc("body", "Brødtekst", 3),
        loc("ctaLabel", "CTA-knap tekst"),
        defineField({ name: "image", title: "Billede", type: "image", options: { hotspot: true } }),
        defineField({ name: "imageAlt", title: "Billede alt-tekst", type: "object", fields: [
          defineField({ name: "da", title: "Dansk", type: "string" }),
          defineField({ name: "en", title: "Engelsk", type: "string" }),
        ]}),
        loc("imageCaption", "Billedtekst"),
      ],
    }),
    defineField({
      name: "newsletter",
      title: "Nyhedsbrev-sektion",
      type: "object",
      fields: [
        loc("eyebrow", "Eyebrow"),
        loc("heading", "Overskrift"),
        loc("body", "Brødtekst", 3),
        loc("placeholder", "Input placeholder"),
        loc("ctaLabel", "Knap tekst"),
        loc("successMessage", "Succes-besked"),
        loc("disclaimer", "Disclaimer-tekst"),
      ],
    }),
  ],
});

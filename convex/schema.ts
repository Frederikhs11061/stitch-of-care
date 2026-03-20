import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  images: defineTable({
    // "broke-sweater", "hero", "about", etc.
    category: v.string(),
    // "front", "back", "detail", "lifestyle", "main", "tile1", "tile2", "tile3"
    slot: v.string(),
    storageId: v.id("_storage"),
    label: v.optional(v.string()),
    order: v.optional(v.number()),
    uploadedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_category_slot", ["category", "slot"]),
});

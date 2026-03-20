import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Step 1: generate a short-lived upload URL
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// Step 2: save the storageId after upload
export const saveImage = mutation({
  args: {
    category: v.string(),
    slot: v.string(),
    storageId: v.id("_storage"),
    label: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Replace existing image in the same slot
    const existing = await ctx.db
      .query("images")
      .withIndex("by_category_slot", (q) =>
        q.eq("category", args.category).eq("slot", args.slot)
      )
      .first();

    if (existing) {
      await ctx.storage.delete(existing.storageId);
      await ctx.db.delete(existing._id);
    }

    return await ctx.db.insert("images", {
      category: args.category,
      slot: args.slot,
      storageId: args.storageId,
      label: args.label,
      order: args.order,
      uploadedAt: Date.now(),
    });
  },
});

// Get all images for a category with resolved URLs
export const getImages = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const images = await ctx.db
      .query("images")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();

    return await Promise.all(
      images.map(async (img) => ({
        ...img,
        url: await ctx.storage.getUrl(img.storageId),
      }))
    );
  },
});

// Get a single image by category + slot
export const getImage = query({
  args: { category: v.string(), slot: v.string() },
  handler: async (ctx, args) => {
    const img = await ctx.db
      .query("images")
      .withIndex("by_category_slot", (q) =>
        q.eq("category", args.category).eq("slot", args.slot)
      )
      .first();

    if (!img) return null;
    return { ...img, url: await ctx.storage.getUrl(img.storageId) };
  },
});

// Delete an image
export const deleteImage = mutation({
  args: { id: v.id("images") },
  handler: async (ctx, args) => {
    const img = await ctx.db.get(args.id);
    if (img) {
      await ctx.storage.delete(img.storageId);
      await ctx.db.delete(args.id);
    }
  },
});

// List all images (for admin overview)
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const images = await ctx.db.query("images").order("desc").collect();
    return await Promise.all(
      images.map(async (img) => ({
        ...img,
        url: await ctx.storage.getUrl(img.storageId),
      }))
    );
  },
});

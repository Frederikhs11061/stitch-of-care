"use client";

import { useState, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

const SLOTS: Record<string, { label: string; slots: string[] }> = {
  "broke-sweater": {
    label: "The Broke Sweater",
    slots: ["front", "back", "detail", "lifestyle"],
  },
  hero: {
    label: "Hero-sektion",
    slots: ["main", "tile1", "tile2", "tile3"],
  },
  about: {
    label: "Om mig",
    slots: ["portrait", "studio"],
  },
};

export default function AdminPage() {
  const [category, setCategory] = useState("broke-sweater");
  const [slot, setSlot] = useState("front");
  const [label, setLabel] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.images.generateUploadUrl);
  const saveImage = useMutation(api.images.saveImage);
  const deleteImage = useMutation(api.images.deleteImage);
  const allImages = useQuery(api.images.listAll);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("");
    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await res.json();
      await saveImage({
        category,
        slot,
        storageId: storageId as Id<"_storage">,
        label: label || undefined,
      });
      setMessage(`✓ Billede uploadet til ${category} / ${slot}`);
      if (fileRef.current) fileRef.current.value = "";
      setLabel("");
    } catch {
      setMessage("Upload fejlede — prøv igen.");
    }
    setUploading(false);
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-10">
          <span className="block w-8 h-px bg-warm-gray/60" />
          <span className="font-sans text-xs tracking-widest uppercase text-warm-gray">Admin</span>
        </div>
        <h1 className="font-serif text-5xl font-light text-dark-brown mb-12">Upload billeder</h1>

        {/* Upload form */}
        <form onSubmit={handleUpload} className="bg-soft-white border border-sand/50 p-8 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-warm-gray mb-2">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSlot(SLOTS[e.target.value].slots[0]);
                }}
                className="w-full h-12 px-4 bg-soft-white border border-sand text-dark-brown font-sans text-sm focus:outline-none focus:border-dark-brown/40"
              >
                {Object.entries(SLOTS).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-warm-gray mb-2">
                Slot / position
              </label>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="w-full h-12 px-4 bg-soft-white border border-sand text-dark-brown font-sans text-sm focus:outline-none focus:border-dark-brown/40"
              >
                {SLOTS[category].slots.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-sans text-xs tracking-widest uppercase text-warm-gray mb-2">
              Label (valgfri)
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="f.eks. Forsidebillede sommer 2025"
              className="w-full h-12 px-4 bg-soft-white border border-sand text-dark-brown font-sans text-sm placeholder:text-warm-gray/50 focus:outline-none focus:border-dark-brown/40"
            />
          </div>

          <div className="mb-8">
            <label className="block font-sans text-xs tracking-widest uppercase text-warm-gray mb-2">
              Billedfil
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              required
              className="w-full font-sans text-sm text-dark-brown file:mr-4 file:py-2 file:px-4 file:border file:border-sand file:bg-cream file:text-dark-brown file:font-sans file:text-xs file:tracking-widest file:uppercase file:cursor-pointer hover:file:bg-sand/20"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="h-12 px-8 bg-dark-brown text-cream font-sans text-xs tracking-widest uppercase hover:bg-deep-brown transition-colors duration-300 disabled:opacity-50"
          >
            {uploading ? "Uploader…" : "Upload billede"}
          </button>

          {message && (
            <p className={`mt-4 font-sans text-sm ${message.startsWith("✓") ? "text-dark-brown" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </form>

        {/* Uploaded images */}
        <h2 className="font-serif text-2xl font-light text-dark-brown mb-6">Uploadede billeder</h2>
        {!allImages ? (
          <p className="font-sans text-sm text-warm-gray">Indlæser…</p>
        ) : allImages.length === 0 ? (
          <p className="font-sans text-sm text-warm-gray">Ingen billeder endnu.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {allImages.map((img) => (
              <div key={img._id} className="group relative border border-sand/50 bg-soft-white overflow-hidden">
                {img.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img.url} alt={img.label ?? img.slot} className="w-full aspect-square object-cover" />
                )}
                <div className="p-3">
                  <p className="font-sans text-[0.65rem] tracking-wider uppercase text-warm-gray">
                    {img.category} / {img.slot}
                  </p>
                  {img.label && (
                    <p className="font-sans text-xs text-dark-brown mt-0.5 truncate">{img.label}</p>
                  )}
                </div>
                <button
                  onClick={() => deleteImage({ id: img._id })}
                  className="absolute top-2 right-2 w-7 h-7 bg-dark-brown/80 text-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-sans text-xs"
                  title="Slet"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

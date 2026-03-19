import { Metadata } from "next";
import { notFound } from "next/navigation";
import { patterns, getPatternBySlug } from "@/data/patterns";
import { PatternDetailClient } from "./PatternDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return patterns.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pattern = getPatternBySlug(slug);
  if (!pattern) return {};
  return {
    title: pattern.name,
    description: pattern.description.en,
  };
}

export default async function PatternDetailPage({ params }: Props) {
  const { slug } = await params;
  const pattern = getPatternBySlug(slug);
  if (!pattern) notFound();
  return <PatternDetailClient pattern={pattern} />;
}

export const dynamic = 'force-dynamic';

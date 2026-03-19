"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils";
import { blogPosts } from "@/data/blogPosts";

interface Props {
  post: BlogPost;
}

export function BlogPostClient({ post }: Props) {
  const { t, language } = useLanguage();

  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const nextPost = blogPosts[currentIndex + 1] || null;
  const prevPost = blogPosts[currentIndex - 1] || null;

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Hero */}
      <div className="relative aspect-[21/9] bg-cream overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title[language]}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-brown/20 to-dark-brown/60" />
        {/* Breadcrumb */}
        <div className="absolute top-0 left-0 right-0 pt-24 px-6 lg:px-10">
          <Link
            href="/blog"
            className="flex items-center gap-1.5 font-sans text-xs tracking-widest uppercase text-soft-white/80 hover:text-soft-white transition-colors w-fit"
          >
            <ArrowLeft size={12} strokeWidth={1.5} />
            {t.blog.back}
          </Link>
        </div>
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16 max-w-4xl">
          <span className="inline-block bg-soft-white text-dark-brown font-sans text-2xs tracking-widest uppercase px-3 py-1 mb-4">
            {post.category}
          </span>
          <h1 className="font-serif text-4xl lg:text-6xl font-light text-soft-white leading-tight">
            {post.title[language]}
          </h1>
          <p className="font-sans text-xs text-soft-white/70 mt-3 tracking-wider">
            {formatDate(post.publishedAt, language)} · {post.readingTime} {t.blog.readingTime}
          </p>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
        <AnimatedSection>
          <div
            className="prose-custom font-sans text-sm text-warm-gray leading-relaxed space-y-4
              [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-light [&_h2]:text-dark-brown [&_h2]:mt-10 [&_h2]:mb-4
              [&_p]:leading-[1.85] [&_p]:text-warm-gray
              [&_strong]:text-dark-brown [&_strong]:font-medium"
            dangerouslySetInnerHTML={{ __html: post.content[language] }}
          />
        </AnimatedSection>

        {/* Tags */}
        {post.tags.length > 0 && (
          <AnimatedSection delay={0.1} className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-sand/40">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-2xs tracking-widest uppercase text-warm-gray bg-cream px-3 py-1.5"
              >
                {tag}
              </span>
            ))}
          </AnimatedSection>
        )}
      </div>

      {/* Next / prev navigation */}
      <div className="border-t border-sand/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-sand/40">
          <div className="bg-soft-white p-8">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="group block">
                <p className="font-sans text-2xs tracking-widest uppercase text-warm-gray mb-2 flex items-center gap-1">
                  <ArrowLeft size={10} /> Previous
                </p>
                <p className="font-serif text-xl font-light text-dark-brown group-hover:text-warm-gray transition-colors">
                  {prevPost.title[language]}
                </p>
              </Link>
            ) : (
              <Link href="/blog" className="group flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-warm-gray hover:text-dark-brown transition-colors">
                <ArrowLeft size={12} /> {t.blog.allPosts}
              </Link>
            )}
          </div>
          <div className="bg-soft-white p-8 text-right">
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="group block">
                <p className="font-sans text-2xs tracking-widest uppercase text-warm-gray mb-2 flex items-center gap-1 justify-end">
                  Next <ArrowRight size={10} />
                </p>
                <p className="font-serif text-xl font-light text-dark-brown group-hover:text-warm-gray transition-colors">
                  {nextPost.title[language]}
                </p>
              </Link>
            ) : (
              <Link href="/patterns" className="group inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-warm-gray hover:text-dark-brown transition-colors">
                {t.nav.patterns} <ArrowRight size={12} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

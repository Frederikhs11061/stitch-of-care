"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/utils";

interface Props {
  posts: BlogPost[];
}

export function BlogListingClient({ posts }: Props) {
  const { t, language } = useLanguage();

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Page header */}
      <div className="bg-cream border-b border-sand/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16">
          <AnimatedSection direction="down">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-warm-gray" />
              <span className="font-sans text-xs tracking-widest uppercase text-warm-gray">
                {t.blog.eyebrow}
              </span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="font-serif text-6xl lg:text-8xl font-light text-dark-brown">
              {t.blog.heading}
            </h1>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        {/* Featured post — large */}
        {featured && (
          <AnimatedSection className="mb-16 lg:mb-24">
            <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="relative aspect-[4/3] bg-cream overflow-hidden img-zoom">
                <Image
                  src={featured.coverImage}
                  alt={featured.title[language]}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute top-5 left-5">
                  <span className="bg-dark-brown text-soft-white font-sans text-2xs tracking-widest uppercase px-3 py-1.5">
                    {featured.category}
                  </span>
                </div>
              </div>
              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-warm-gray mb-4">
                  {formatDate(featured.publishedAt, language)} · {featured.readingTime} {t.blog.readingTime}
                </p>
                <h2 className="font-serif text-4xl lg:text-5xl font-light text-dark-brown leading-tight mb-4 group-hover:text-warm-gray transition-colors duration-300">
                  {featured.title[language]}
                </h2>
                <p className="font-sans text-sm text-warm-gray leading-relaxed mb-8 max-w-sm">
                  {featured.excerpt[language]}
                </p>
                <span className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-dark-brown border-b border-dark-brown pb-0.5 w-fit group-hover:text-warm-gray group-hover:border-warm-gray transition-colors">
                  {t.blog.readMore}
                  <ArrowRight size={12} strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          </AnimatedSection>
        )}

        {/* Divider */}
        <div className="border-t border-sand/40 mb-16" />

        {/* Rest of posts — grid */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {rest.map((post) => (
            <StaggerItem key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] bg-cream overflow-hidden img-zoom mb-5">
                  <Image
                    src={post.coverImage}
                    alt={post.title[language]}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-soft-white/90 text-dark-brown font-sans text-2xs tracking-widest uppercase px-2.5 py-1">
                      {post.category}
                    </span>
                  </div>
                </div>
                <p className="font-sans text-2xs tracking-widest uppercase text-warm-gray mb-2">
                  {formatDate(post.publishedAt, language)} · {post.readingTime} {t.blog.readingTime}
                </p>
                <h3 className="font-serif text-2xl font-light text-dark-brown leading-snug mb-3 group-hover:text-warm-gray transition-colors">
                  {post.title[language]}
                </h3>
                <p className="font-sans text-xs text-warm-gray leading-relaxed">
                  {post.excerpt[language]}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}

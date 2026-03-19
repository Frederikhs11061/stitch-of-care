import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-soft-white flex flex-col items-center justify-center px-6 text-center">
      <p className="font-sans text-xs tracking-widest uppercase text-warm-gray mb-4">404</p>
      <h1 className="font-serif text-6xl lg:text-8xl font-light text-dark-brown mb-6 leading-none">
        Lost stitch
      </h1>
      <p className="font-sans text-sm text-warm-gray max-w-xs leading-relaxed mb-10">
        The page you're looking for has unravelled. Let's get you back on track.
      </p>
      <Link
        href="/"
        className="font-sans text-xs tracking-widest uppercase text-dark-brown border-b border-dark-brown pb-0.5 hover:text-warm-gray hover:border-warm-gray transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}

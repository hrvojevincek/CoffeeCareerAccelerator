import { Link } from 'react-router-dom';

export default function BlogPage() {
  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0 bg-[url('/hero-1920.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Blog</h1>
          <p className="mt-4 text-lg md:text-2xl">This page is under construction.</p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-block px-5 py-2 text-sm font-semibold text-white rounded-full border border-white/80 bg-transparent hover:text-white/90 hover:border-white">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

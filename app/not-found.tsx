import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <Link href="/" className="underline text-lg hover:opacity-70">
        Go back home
      </Link>
    </div>
  );
}

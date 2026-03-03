import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NewsNotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <Image
        src="/images/01Home/Aura_Logo.svg"
        alt="Aura"
        width={120}
        height={120}
        className="mx-auto mb-8 opacity-20"
      />
      <h1 className="mb-4 text-2xl font-bold text-gray-800">
        Article Not Found
      </h1>
      <p className="mb-8 text-gray-500">
        The article you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <Link href="/news">
        <Button variant="primary">Back to News Center</Button>
      </Link>
    </div>
  );
}

import Header from "@/components/header";
import Hero from "@/components/sections/hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen text-zinc-700 border bg-secondary border-red-500">
      <Header />
      <Hero/>
    </main>
  );
}

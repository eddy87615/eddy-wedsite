import Image from "next/image";
import HomeHero from "@/components/HomeHero";
import MainLayout from "@/components/MainLayout";

export default function AboutMe() {
  return (
    <MainLayout>
      <header className="min-h-[calc(100vh-200px)]">
        <div className="flex min-h-[20vh] justify-between">
          <h1 className="text-sm font-thin uppercase">about me</h1>
          <p className="[writing-mode:vertical-rl]">
            <small>陳品叡</small>
          </p>
        </div>
        <div className="flex h-full">
          <HomeHero />
        </div>
      </header>
      <section>
        <Image src="/eddy.jpg" width={500} height={500} alt="eddy" />
      </section>
    </MainLayout>
  );
}

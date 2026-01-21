import Link from "next/link";
import { FuzzyText } from "@/components/animation";

const hoverIntensity = 0.5;
const enableHover = true;
const fuzzRange = 79;
const fps = 120;

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="text-center space-y-4">
        <FuzzyText
          className="mx-auto"
          fontSize="8rem"
          baseIntensity={0.2}
          hoverIntensity={hoverIntensity}
          enableHover={enableHover}
          fuzzRange={fuzzRange}
          fps={fps}
        >
          404
        </FuzzyText>
        <FuzzyText
          className="mx-auto"
          fontSize="2.5rem"
          baseIntensity={0.2}
          hoverIntensity={hoverIntensity}
          enableHover={enableHover}
          fps={fps}
        >
          not found
        </FuzzyText>
        <p className="text-white/70">Essa página não existe ou foi movida.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition"
        >
          Voltar para Home
        </Link>
      </div>
    </main>
  );
}

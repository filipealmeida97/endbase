import { LoginForm } from "@/components/forms/LoginForm";
import {Galaxy, Beams} from "@/components/animation";
import Image from "next/image";
import { StarBorder } from "@/components/animation";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
        {/* Background Beams full screen */}
        <div className="absolute inset-0 bg-black">
            <div className="h-full w-full opacity-100">
                <Beams
                    beamWidth={2}
                    beamHeight={15}
                    beamNumber={12}
                    lightColor="#97a7f7"
                    speed={2}
                    noiseIntensity={1.75}
                    scale={0.2}
                    rotation={30}
                />
            </div>

        </div>

        <header className="max-w-lg mx-auto mt-3 absolute top-0 left-0 right-0 p-6 flex justify-center rounded-full border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
            <Image src="/Logo CORE1.png" alt="Logo" width={100} height={100} />
        </header>

        {/* Card de login por cima */}
        <div className="relative z-10 w-full max-w-md space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
            <h1 className="text-xl font-semibold text-white">Login</h1>
            <LoginForm className="text-white"/>
        </div>
    </main>
  );
}

import { LoginForm } from "@/components/forms/LoginForm";
import {Galaxy} from "@/components/animation";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
        {/* Background Beams full screen */}
        <div className="absolute inset-0 bg-black">
            <div className="h-full w-full opacity-100">
                <Galaxy
                    starSpeed={0.5}
                    density={1}
                    hueShift={140}
                    speed={1}
                    glowIntensity={0.3}
                    saturation={0}
                    mouseRepulsion
                    repulsionStrength={2}
                    twinkleIntensity={0.3}
                    rotationSpeed={0.1}
                    transparent
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

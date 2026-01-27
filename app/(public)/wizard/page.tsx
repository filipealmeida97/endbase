// src/app/exemplo-wizard/page.tsx
"use client";

import { Wizard } from "@/components/Wizard";
import type { WizardAllData } from "@/components/Wizard/steps/StepAccount";
import { StepAccount } from "@/components/Wizard/steps/StepAccount";
import { StepProfile } from "@/components/Wizard/steps/StepProfile";
import { Particles } from "@/components/animation";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
        <div className="absolute inset-0 z-0">
            <Particles
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleColors={["#ffffff"]}
                moveParticlesOnHover
                particleHoverFactor={1}
                alphaParticles={false}
                particleBaseSize={100}
                sizeRandomness={1}
                cameraDistance={20}
                disableRotation={false}
                className=""
            />
        </div>
        <Wizard<WizardAllData>
            steps={[
            {
                id: "account",
                title: "Conta",
                render: (props) => <StepAccount {...props} />,
            },
            {
                id: "profile",
                title: "Perfil",
                render: (props) => <StepProfile {...props} />,
            },
            ]}
            onFinish={(data) => {
            // data consolidado (juntado dos steps)
            console.log("FINAL:", data);
            }}
            className="z-10"
        />
    </div>
  );
}

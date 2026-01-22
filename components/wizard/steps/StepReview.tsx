"use client";

import { useWizardStore } from "@/stores/wizard.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function StepReview() {
  const { data, prevStep, reset } = useWizardStore();

  const handleFinish = async () => {
    // aqui você manda pro backend
    console.log("Payload final:", data);

    reset();
    alert("Cadastro finalizado ✅");
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Revisão</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg border p-3 text-sm">
          <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={prevStep}>
            Voltar
          </Button>

          <Button onClick={handleFinish}>Finalizar</Button>
        </div>
      </CardContent>
    </Card>
  );
}

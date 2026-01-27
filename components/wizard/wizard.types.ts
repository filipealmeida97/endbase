// src/components/wizard/wizard.types.ts
import type { ReactNode } from "react";

export interface WizardStepRenderProps<
  TAllData extends Record<string, unknown>,
  TStepData extends Record<string, unknown>
> {
  /** Dados consolidados do wizard até agora */
  data: Partial<TAllData>;

  /** Valores default do step (se quiser preencher com o que já existe no store) */
  defaultValues: Partial<TStepData>;

  /** Avança para o próximo step com dados validados */
  onNext: (payload: TStepData) => void;

  /** Volta para o step anterior */
  onBack: () => void;

  isFirstStep: boolean;
  isLastStep: boolean;
}

export interface WizardStepConfig<
  TAllData extends Record<string, unknown>,
  TStepData extends Record<string, unknown>
> {
  /** Identificador (útil pra analytics, logs, keys, etc) */
  id: string;

  /** Título opcional no header do wizard */
  title?: string;

  /** Render do step */
  render: (props: WizardStepRenderProps<TAllData, TStepData>) => ReactNode;
}

export interface WizardProps<TAllData extends Record<string, unknown>> {
  steps: Array<WizardStepConfig<TAllData, Record<string, unknown>>>;

  /** Chamado quando o último step manda onNext */
  onFinish: (data: TAllData) => void;

  /** Se quiser começar de um step diferente */
  initialStep?: number;

  /** Se true, mostra cabeçalho e progresso */
  showHeader?: boolean;

  /** Props adicionais para customização futura */
  className?: string;
}

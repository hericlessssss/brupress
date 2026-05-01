import type { PressureClassification } from '../types/pressure';

export const classificationLabels: Record<PressureClassification, string> = {
  normal: 'Normal',
  attention: 'Atencao',
  severe: 'Muito alto',
};

export const classificationSuccessMessages: Record<
  PressureClassification,
  string
> = {
  normal: 'Registro salvo. Pressao dentro da faixa esperada definida inicialmente.',
  attention:
    'Registro salvo. Valor elevado. Se esse padrao se repetir ou houver sintomas, siga a orientacao da obstetra.',
  severe:
    'Registro salvo. Valor muito alto. Procure orientacao medica conforme combinado no pre-natal.',
};


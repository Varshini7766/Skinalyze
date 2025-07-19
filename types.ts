
export enum AppScreen {
  Welcome,
  Camera,
  Preview,
}

export interface AnalysisResult {
  condition: string;
  description: string;
  confidence: number;
  isNormal: boolean;
  cautionary_note: string;
}

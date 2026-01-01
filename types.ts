export interface SolarCalculationResult {
  monthlyBill: number;
  systemSizeKWp: number;
  monthlyGenerationKWh: number;
  annualSavings: number;
  totalInvestment: number;
  paybackYears: number;
  co2Savings: number;
}

export interface GroupAResult {
  currentDemand: number;
  optimizedDemand: number;
  annualSavings: number;
  technicalRecommendation: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export enum UserType {
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL = 'COMMERCIAL',
  INDUSTRIAL = 'INDUSTRIAL',
  RURAL = 'RURAL'
}
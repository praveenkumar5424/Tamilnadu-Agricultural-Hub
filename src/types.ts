export interface SoilData {
  region: string;
  ph: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  moisture: string;
  pastCrop: string;
}

export interface RecommendedCrop {
  cropName: string;
  cropNameLocal: string;
  suitabilityScore: number;
  expectedYield: string;
  sowingWindow: string;
  duration: string;
  estimatedCost: number;
  estimatedRevenue: number;
  profitMargin: number;
  sustainabilityScore: number;
  sustainabilityReason: string;
  waterRequirement: string;
  fertilizerRequirement: string;
  keyRisks: string;
}

export interface RecommendationResult {
  recommendedCrops: RecommendedCrop[];
  soilHealthAssessment: string;
  cropRotationSuggestion: string;
}

export interface DiseaseResult {
  healthStatus: string;
  diseaseName: string;
  diseaseNameEnglish: string;
  severity: string;
  symptoms: string[];
  causes: string;
  organicControl: string;
  chemicalControl: string;
  preventionTips: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  isOfflineQueued?: boolean;
}

export interface MandiCrop {
  name: string;
  price: number;
  unit: string;
  trend: "up" | "down" | "stable";
  demand: string;
  category: string;
}

export interface MandiData {
  mandi: string;
  district: string;
  crops: MandiCrop[];
}

export interface WeatherData {
  temp: number;
  humidity: number;
  rainfall: string;
  condition: string;
  wind: string;
  advisory: string;
}

export type SupportedLanguage = "en" | "hi" | "bn" | "sat" | "ta";

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  languageSelect: string;
  tabRecommend: string;
  tabDisease: string;
  tabMarket: string;
  tabChat: string;
  
  // Soil Form
  soilHeader: string;
  soilSubtitle: string;
  fieldRegion: string;
  fieldPH: string;
  fieldNitrogen: string;
  fieldPhosphorus: string;
  fieldPotassium: string;
  fieldMoisture: string;
  fieldPastCrop: string;
  phPlaceholder: string;
  nutrientPlaceholder: string;
  moisturePlaceholder: string;
  pastCropPlaceholder: string;
  btnGetRecommendation: string;
  btnAnalyzing: string;

  // Recommendations
  recommendationHeader: string;
  soilHealthTitle: string;
  rotationTitle: string;
  suitability: string;
  yield: string;
  sowing: string;
  duration: string;
  cost: string;
  revenue: string;
  profit: string;
  sustainability: string;
  water: string;
  fertilizer: string;
  risks: string;

  // Disease Scanner
  diseaseHeader: string;
  diseaseSubtitle: string;
  btnUploadImage: string;
  btnCaptureImage: string;
  btnScanDisease: string;
  scanningText: string;
  diseaseTitle: string;
  statusText: string;
  severityText: string;
  symptomsTitle: string;
  causesTitle: string;
  organicTitle: string;
  chemicalTitle: string;
  preventionTitle: string;

  // Market & Weather
  marketWeatherHeader: string;
  weatherTitle: string;
  humidityText: string;
  rainfallText: string;
  windText: string;
  advisoryTitle: string;
  marketTitle: string;
  trendUp: string;
  trendDown: string;
  trendStable: string;
  demandLabel: string;
  searchMandi: string;

  // Chat
  chatHeader: string;
  chatSubtitle: string;
  chatPlaceholder: string;
  btnSend: string;
  voiceListen: string;
  voiceStop: string;

  // Offline
  offlineBanner: string;
  offlineToggle: string;
  offlineStatus: string;
  offlineQueuedCount: string;
}

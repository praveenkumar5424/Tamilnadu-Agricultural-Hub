import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sprout, 
  Compass, 
  Camera, 
  MessageSquare, 
  TrendingUp, 
  Globe, 
  Calendar,
  Layers,
  Thermometer,
  ShieldAlert,
  ArrowRight,
  TreePalm,
  Sparkles
} from "lucide-react";
import { 
  SoilData, 
  RecommendationResult, 
  DiseaseResult, 
  ChatMessage, 
  MandiData, 
  WeatherData, 
  SupportedLanguage 
} from "./types";
import { translations } from "./translations";
import { INDIA_STATES } from "./indiaData";
import OfflineIndicator from "./components/OfflineIndicator";
import WeatherMandiSidebar from "./components/WeatherMandiSidebar";
import SoilForm from "./components/SoilForm";
import DiseaseScanner from "./components/DiseaseScanner";
import ChatMitra from "./components/ChatMitra";
import FarmerIcon from "./components/FarmerIcon";

// Sample offline fallback crop recommendations for Jharkhand to make offline mode work fully
const OFFLINE_RECOMMENDATIONS_CACHE: Record<string, RecommendationResult> = {
  ranchi: {
    recommendedCrops: [
      {
        cropName: "Finger Millet",
        cropNameLocal: "मड़ुआ (Mandua / Ragi)",
        suitabilityScore: 95,
        expectedYield: "12-15 Quintals / Acre",
        sowingWindow: "June - July (Kharif)",
        duration: "110-120 Days",
        estimatedCost: 12000,
        estimatedRevenue: 38000,
        profitMargin: 68,
        sustainabilityScore: 98,
        sustainabilityReason: "Extremely drought-resistant, binds Jharkhand's red soil, low nitrogen depletion, low water demand.",
        waterRequirement: "Low",
        fertilizerRequirement: "Organic compost, 10kg/acre Bio-fertilizers",
        keyRisks: "Blast disease under waterlogged conditions."
      },
      {
        cropName: "Black Gram",
        cropNameLocal: "उड़द दाल (Urad)",
        suitabilityScore: 90,
        expectedYield: "6-8 Quintals / Acre",
        sowingWindow: "July - August",
        duration: "80-90 Days",
        estimatedCost: 9500,
        estimatedRevenue: 48000,
        profitMargin: 80,
        sustainabilityScore: 96,
        sustainabilityReason: "Leguminous crop that actively fixes atmospheric nitrogen in the soil, reducing fertilizer cost.",
        waterRequirement: "Low",
        fertilizerRequirement: "Phosphate Solubilizing Bacteria (PSB), minimal chemical N",
        keyRisks: "Yellow Mosaic Virus, pod borer."
      },
      {
        cropName: "Pigeon Pea",
        cropNameLocal: "अरहर दाल (Arhar)",
        suitabilityScore: 88,
        expectedYield: "8-10 Quintals / Acre",
        sowingWindow: "June - July",
        duration: "160-180 Days",
        estimatedCost: 15000,
        estimatedRevenue: 65000,
        profitMargin: 76,
        sustainabilityScore: 94,
        sustainabilityReason: "Deep rooting system breaks subsoil hardpan, excellent soil restorer for upland fields.",
        waterRequirement: "Medium",
        fertilizerRequirement: "N: 20, P: 40, K: 20 kg/acre or vermicompost",
        keyRisks: "Fusarium wilt, pod fly in flowering stage."
      }
    ],
    soilHealthAssessment: "Typical Jharkhand acidic red sandy-loam soil. Low water retention, deficient in nitrogen and phosphorus, rich in potassium. pH 5.8 is moderately acidic.",
    cropRotationSuggestion: "Follow Paddy-Urad-Mustard sequence. Planting leguminous Black Gram (Urad) after heavy-feeding Paddy naturally refills nitrogen reserves without costly synthetic chemical inputs."
  }
};

// Sample offline fallback crop recommendations for Tamil Nadu
const OFFLINE_RECOMMENDATIONS_CACHE_TN: Record<string, RecommendationResult> = {
  coimbatore: {
    recommendedCrops: [
      {
        cropName: "Turmeric (Manjal)",
        cropNameLocal: "மஞ்சள் (Manjal)",
        suitabilityScore: 94,
        expectedYield: "20-24 Quintals / Acre",
        sowingWindow: "June - July (Kharif/Samba)",
        duration: "270-290 Days",
        estimatedCost: 35000,
        estimatedRevenue: 140000,
        profitMargin: 75,
        sustainabilityScore: 92,
        sustainabilityReason: "Turmeric is a high-value root crop that thrives in well-drained loamy soils of Coimbatore; responds perfectly to drip irrigation and Panchagavya.",
        waterRequirement: "Medium",
        fertilizerRequirement: "Panchagavya foliar spray, 10 tonnes vermicompost/acre",
        keyRisks: "Rhizome rot under excessive stagnation, thrips."
      },
      {
        cropName: "Cotton (Paruthi)",
        cropNameLocal: "பருத்தி (Paruthi)",
        suitabilityScore: 91,
        expectedYield: "8-10 Quintals / Acre",
        sowingWindow: "August - September",
        duration: "150-165 Days",
        estimatedCost: 18000,
        estimatedRevenue: 60000,
        profitMargin: 70,
        sustainabilityScore: 88,
        sustainabilityReason: "Thrives in black cotton clay soils, excellent taproot system aerates subsoil layer naturally.",
        waterRequirement: "Medium",
        fertilizerRequirement: "N: 40, P: 20, K: 20 kg/acre or neem cake manure",
        keyRisks: "Bollworm infestation, sucking pests."
      },
      {
        cropName: "Paddy (Nellu)",
        cropNameLocal: "நெல் (Nellu)",
        suitabilityScore: 88,
        expectedYield: "24-28 Quintals / Acre",
        sowingWindow: "June - October",
        duration: "120-135 Days",
        estimatedCost: 22000,
        estimatedRevenue: 65000,
        profitMargin: 66,
        sustainabilityScore: 85,
        sustainabilityReason: "Ensures local food security, well-suited for lowland clay basins under traditional tank irrigation.",
        waterRequirement: "High",
        fertilizerRequirement: "Azospirillum bio-fertilizer, organic manure",
        keyRisks: "Blast disease, stem borer."
      }
    ],
    soilHealthAssessment: "Coimbatore region fertile red-loam/black clayey soil. Excellent drainage potential, rich in iron, moderate in nitrogen and phosphorus, high in potassium. pH 6.8 is neutral and ideal.",
    cropRotationSuggestion: "Follow Turmeric-Pulse (Black Gram) rotation. Planting short-cycle nitrogen-fixing black gram after turmeric naturally replenishes soil nitrogen reserves."
  }
};

const OFFLINE_DISEASE_REMEDY_CACHE: Record<string, DiseaseResult> = {
  leafspot: {
    healthStatus: "Diseased",
    diseaseName: "झुलसा रोग / पत्ती धब्बा (Leaf Spot)",
    diseaseNameEnglish: "Cercospora Leaf Spot",
    severity: "Medium",
    symptoms: ["Circular dark brown spots on lower leaves", "Yellow ring around the necrotic brown center", "Premature defoliation of leaves"],
    causes: "Fungal pathogen promoted by prolonged high relative humidity (above 85%) and monsoon warmth.",
    organicControl: "Spray fresh organic Neem Seed Kernel Extract (5%) or home-brewed Cow Urine-Sour Whey mixture (1:10 ratio) every 10 days.",
    chemicalControl: "If damage exceeds 20%, spray Mancozeb 75 WP at 2g/litre of water or Carbendazim 50 WP at 1g/litre under dry sky conditions.",
    preventionTips: ["Ensure field is well-drained, avoiding stagnation.", "Use certified disease-free seeds.", "Incorporate previous crop residues deep into the soil."]
  }
};

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<"recommend" | "disease" | "market" | "chat">("recommend");
  const [language, setLanguage] = useState<SupportedLanguage>("en");
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<string>("tamilnadu");

  // Weather & Mandi State
  const [mandiSearch, setMandiSearch] = useState("");
  const [rawFeed, setRawFeed] = useState<any>(null);
  const [mandis, setMandis] = useState<MandiData[]>([]);
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData>>({});
  const [selectedWeatherDistrict, setSelectedWeatherDistrict] = useState("Coimbatore");

  // Soil Form State
  const [soilForm, setSoilForm] = useState<SoilData>({
    region: "Coimbatore",
    ph: "6.5",
    nitrogen: "50",
    phosphorus: "20",
    potassium: "135",
    moisture: "35",
    pastCrop: "Sesame"
  });
  const [isAnalyzingSoil, setIsAnalyzingSoil] = useState(false);
  const [soilRecommendation, setSoilRecommendation] = useState<RecommendationResult | null>(null);

  // Disease Scanner State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanningLeaf, setIsScanningLeaf] = useState(false);
  const [diseaseDiagnosis, setDiseaseDiagnosis] = useState<DiseaseResult | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [queuedQueries, setQueuedQueries] = useState<string[]>([]);
  const [voiceFeedbackEnabled, setVoiceFeedbackEnabled] = useState(false);
  const [isListeningVoice, setIsListeningVoice] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const t = translations[language];

  // Load initial Mandi and Weather feed
  useEffect(() => {
    async function loadFeed() {
      try {
        const response = await fetch("/api/weather-market");
        if (response.ok) {
          const data = await response.json();
          setRawFeed(data);
          
          if (selectedState === "tamilnadu") {
            setMandis(data.tamilnadu?.mandis || []);
            setWeatherData(data.tamilnadu?.weather || {});
          } else {
            setMandis(data.jharkhand?.mandis || data.mandis || []);
            setWeatherData(data.jharkhand?.weather || data.weather || {});
          }
        }
      } catch (err) {
        console.error("Failed to load weather/mandi data", err);
      }
    }
    loadFeed();
  }, []);

  // Update mandis and weather based on selectedState
  useEffect(() => {
    if (selectedState === "tamilnadu") {
      if (rawFeed) {
        const baseMandis = rawFeed.tamilnadu?.mandis || [];
        const baseWeather = rawFeed.tamilnadu?.weather || {};

        const stateInfo = INDIA_STATES.find(s => s.id === "tamilnadu");
        if (stateInfo) {
          // Merge real mock weather data with generated ones for all 38 districts of Tamil Nadu
          const mergedWeather: Record<string, WeatherData> = { ...baseWeather };
          stateInfo.districts.forEach(dist => {
            if (!mergedWeather[dist]) {
              const hash = dist.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
              const temp = 29 + (hash % 8); // 29 to 36
              const humidity = 60 + (hash % 21); // 60 to 80
              const rainfall = (hash % 3) === 0 ? `${hash % 15}mm` : "0mm";
              const condition = temp > 33 ? "Dry and Warm" : rainfall !== "0mm" ? "Light Rain" : "Partly Cloudy";
              const wind = `${10 + (hash % 9)} km/h`;
              const advisory = `Weekly Agromet Advisory for ${dist}: Practice effective micro-irrigation. Monitor moisture levels around root systems of ${stateInfo.crops[hash % stateInfo.crops.length]} crops.`;
              mergedWeather[dist] = { temp, humidity, rainfall, condition, wind, advisory };
            }
          });
          setWeatherData(mergedWeather);

          // Merge real mock mandi data with generated ones for all 38 districts of Tamil Nadu
          const mergedMandis = [...baseMandis];
          const baseDistrictSet = new Set(baseMandis.map(m => m.district));
          stateInfo.districts.forEach((dist) => {
            if (!baseDistrictSet.has(dist)) {
              const crops = stateInfo.crops.map((cropName) => {
                const hash = (dist + cropName).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
                let basePrice = 2500;
                let category = "Cash Crop";
                if (cropName === "Turmeric") { basePrice = 8200; category = "Spice"; }
                else if (cropName === "Paddy") { basePrice = 2300; category = "Grain"; }
                else if (cropName === "Cotton") { basePrice = 7100; category = "Fiber"; }
                else if (cropName === "Groundnut") { basePrice = 6700; category = "Oilseed"; }
                else if (cropName === "Sugarcane") { basePrice = 300; category = "Sugar"; }
                else if (cropName === "Coconut") { basePrice = 1750; category = "Horticulture"; }

                const price = basePrice + (hash % 15) * 20;
                const trend: "up" | "down" | "stable" = (hash % 3) === 0 ? "up" : (hash % 3) === 1 ? "down" : "stable";
                const demand = (hash % 2) === 0 ? "High" : "Medium";
                const unit = cropName === "Sugarcane" ? "Ton" : cropName === "Coconut" ? "100 pcs" : "Quintal";

                const localNameMap: Record<string, string> = {
                  "Paddy": "Paddy (Nellu)",
                  "Turmeric": "Turmeric (Manjal)",
                  "Cotton": "Cotton (Paruthi)",
                  "Groundnut": "Groundnut (Verkadalai)",
                  "Sugarcane": "Sugarcane (Karumbu)",
                  "Coconut": "Coconut (Thennai)",
                  "Banana": "Banana (Vazhai)",
                  "Tapioca": "Tapioca (Maravalli Kizhangu)"
                };

                return {
                  name: localNameMap[cropName] || cropName,
                  price,
                  unit,
                  trend,
                  demand,
                  category
                };
              });

              mergedMandis.push({
                mandi: `${dist} Mandi`,
                district: dist,
                crops
              });
            }
          });
          setMandis(mergedMandis);
        } else {
          setMandis(baseMandis);
          setWeatherData(baseWeather);
        }
      }
    } else if (selectedState === "jharkhand") {
      if (rawFeed) {
        setMandis(rawFeed.jharkhand?.mandis || rawFeed.mandis || []);
        setWeatherData(rawFeed.jharkhand?.weather || rawFeed.weather || {});
      }
    } else {
      // Dynamic generation for other states
      const stateInfo = INDIA_STATES.find(s => s.id === selectedState);
      if (stateInfo) {
        const dynamicWeather: Record<string, WeatherData> = {};
        stateInfo.districts.forEach(dist => {
          const hash = dist.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const temp = 26 + (hash % 11); // 26 to 36
          const humidity = 60 + (hash % 31); // 60 to 90
          const rainfall = (hash % 2) === 0 ? `${hash % 25}mm` : "0mm";
          const condition = temp > 33 ? "Hot & Sunny" : rainfall !== "0mm" ? "Monsoon Showers" : "Partly Cloudy";
          const wind = `${8 + (hash % 11)} km/h`;
          const advisory = `Weekly Agromet Advisory for ${dist}: Ensure stable soil drainage. Maintain moisture around root systems for ${stateInfo.crops[hash % stateInfo.crops.length]} crops.`;
          dynamicWeather[dist] = { temp, humidity, rainfall, condition, wind, advisory };
        });
        setWeatherData(dynamicWeather);

        const dynamicMandis: MandiData[] = [];
        const numMandis = Math.min(4, stateInfo.districts.length);
        for (let i = 0; i < numMandis; i++) {
          const dist = stateInfo.districts[i];
          const crops = stateInfo.crops.map((cropName, idx) => {
            const hash = (dist + cropName).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const price = 2200 + (hash % 70) * 100; // 2200 to 9200 INR
            const trend: "up" | "down" | "stable" = (hash % 3) === 0 ? "up" : (hash % 3) === 1 ? "down" : "stable";
            const demand = (hash % 2) === 0 ? "High" : "Medium";
            return {
              name: cropName,
              price,
              unit: "Quintal",
              trend,
              demand,
              category: idx % 2 === 0 ? "Grain" : "Cash Crop"
            };
          });
          dynamicMandis.push({
            mandi: `${dist} Mandi`,
            district: dist,
            crops
          });
        }
        setMandis(dynamicMandis);
      }
    }
  }, [selectedState, rawFeed]);

  // Handle active state selection and auto-align default values & languages
  const handleSelectState = (stateId: string) => {
    setSelectedState(stateId);
    setSoilRecommendation(null); // Clear previous reports
    
    if (stateId === "tamilnadu") {
      setLanguage("ta");
      setSelectedWeatherDistrict("Coimbatore");
      setSoilForm({
        region: "Coimbatore",
        ph: "6.8",
        nitrogen: "46",
        phosphorus: "18",
        potassium: "125",
        moisture: "35",
        pastCrop: "Sesame"
      });
    } else if (stateId === "jharkhand") {
      setLanguage("hi");
      setSelectedWeatherDistrict("Ranchi");
      setSoilForm({
        region: "Ranchi",
        ph: "5.8",
        nitrogen: "45",
        phosphorus: "18",
        potassium: "120",
        moisture: "40",
        pastCrop: "Paddy"
      });
    } else {
      const stateInfo = INDIA_STATES.find(s => s.id === stateId);
      if (stateInfo) {
        setLanguage("en");
        const defaultDist = stateInfo.districts[0];
        setSelectedWeatherDistrict(defaultDist);
        setSoilForm({
          region: defaultDist,
          ph: "6.5",
          nitrogen: "40",
          phosphorus: "15",
          potassium: "110",
          moisture: "30",
          pastCrop: stateInfo.crops[0] || "None"
        });
      }
    }
  };

  // Sync queued messages once back online
  useEffect(() => {
    if (!isOffline && queuedQueries.length > 0) {
      const processQueue = async () => {
        const toSync = [...queuedQueries];
        setQueuedQueries([]); // Clear first to prevent double-firing
        
        for (const queryText of toSync) {
          setChatMessages(prev => [
            ...prev,
            {
              id: `sync-${Date.now()}`,
              sender: "bot",
              text: `🔄 Syncing your offline question: "${queryText}"...`,
              timestamp: new Date()
            }
          ]);

          try {
            const res = await fetch("/api/chat", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                messages: [{ sender: "user", text: queryText }],
                language,
                state: selectedState
              })
            });
            if (res.ok) {
              const data = await res.json();
              setChatMessages(prev => [
                ...prev,
                {
                  id: `sync-reply-${Date.now()}`,
                  sender: "bot",
                  text: `✅ ${data.text}`,
                  timestamp: new Date()
                }
              ]);
              if (voiceFeedbackEnabled) speakOut(data.text);
            }
          } catch (e) {
            console.error("Queue sync error:", e);
          }
        }
      };
      processQueue();
    }
  }, [isOffline, queuedQueries]);

  // Keep chat scrolled
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isBotTyping]);

  // Trigger automated soil estimation via simulated satellite data
  const triggerSatelliteSoilScan = () => {
    setIsAnalyzingSoil(true);
    setTimeout(() => {
      let randPH = "";
      let randN = "";
      let randP = "";
      let randK = "";
      let randMoisture = "";

      if (selectedState === "tamilnadu") {
        randPH = (6.2 + Math.random() * 1.4).toFixed(1); // 6.2 to 7.6
        randN = Math.floor(40 + Math.random() * 40).toString(); // 40 to 80
        randP = Math.floor(15 + Math.random() * 20).toString(); // 15 to 35
        randK = Math.floor(110 + Math.random() * 100).toString(); // 110 to 210
        randMoisture = Math.floor(30 + Math.random() * 45).toString(); // 30% to 75%
      } else {
        randPH = (5.1 + Math.random() * 1.3).toFixed(1); // 5.1 to 6.4
        randN = Math.floor(30 + Math.random() * 45).toString(); // 30 to 75
        randP = Math.floor(10 + Math.random() * 20).toString(); // 10 to 30
        randK = Math.floor(80 + Math.random() * 90).toString(); // 80 to 170
        randMoisture = Math.floor(25 + Math.random() * 40).toString(); // 25% to 65%
      }

      setSoilForm(prev => ({
        ...prev,
        ph: randPH,
        nitrogen: randN,
        phosphorus: randP,
        potassium: randK,
        moisture: randMoisture
      }));

      setIsAnalyzingSoil(false);
    }, 1200);
  };

  // Handle recommendation submission
  const handleGetRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzingSoil(true);

    if (isOffline) {
      setTimeout(() => {
        const cacheKey = soilForm.region.toLowerCase();
        let result;
        if (selectedState === "tamilnadu") {
          result = OFFLINE_RECOMMENDATIONS_CACHE_TN[cacheKey] || OFFLINE_RECOMMENDATIONS_CACHE_TN["coimbatore"];
        } else {
          result = OFFLINE_RECOMMENDATIONS_CACHE[cacheKey] || OFFLINE_RECOMMENDATIONS_CACHE["ranchi"];
        }
        setSoilRecommendation(result);
        setIsAnalyzingSoil(false);
      }, 1000);
      return;
    }

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...soilForm,
          requestedLanguage: language,
          state: selectedState
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSoilRecommendation(data);
      } else {
        const result = selectedState === "tamilnadu" 
          ? OFFLINE_RECOMMENDATIONS_CACHE_TN["coimbatore"] 
          : OFFLINE_RECOMMENDATIONS_CACHE["ranchi"];
        setSoilRecommendation(result);
      }
    } catch (err) {
      console.error(err);
      const result = selectedState === "tamilnadu" 
        ? OFFLINE_RECOMMENDATIONS_CACHE_TN["coimbatore"] 
        : OFFLINE_RECOMMENDATIONS_CACHE["ranchi"];
      setSoilRecommendation(result);
    } finally {
      setIsAnalyzingSoil(false);
    }
  };

  // Camera Management
  const startCamera = async () => {
    setCameraActive(true);
    setDiseaseDiagnosis(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access failed", err);
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setSelectedImage(dataUrl);
        
        const stream = videoRef.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        setCameraActive(false);
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
    setCameraActive(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setDiseaseDiagnosis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Disease Scanner API call
  const handleAnalyzeDisease = async () => {
    if (!selectedImage) return;
    setIsScanningLeaf(true);

    if (isOffline) {
      setTimeout(() => {
        setDiseaseDiagnosis(OFFLINE_DISEASE_REMEDY_CACHE["leafspot"]);
        setIsScanningLeaf(false);
      }, 1500);
      return;
    }

    try {
      const response = await fetch("/api/analyze-crop-disease", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: selectedImage,
          language
        })
      });

      if (response.ok) {
        const data = await response.json();
        setDiseaseDiagnosis(data);
      } else {
        setDiseaseDiagnosis(OFFLINE_DISEASE_REMEDY_CACHE["leafspot"]);
      }
    } catch (err) {
      console.error(err);
      setDiseaseDiagnosis(OFFLINE_DISEASE_REMEDY_CACHE["leafspot"]);
    } finally {
      setIsScanningLeaf(false);
    }
  };

  // Chat API call
  const handleSendChatMessage = async (overrideText?: string) => {
    const textToSend = overrideText || chatInput;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!overrideText) setChatInput("");

    if (isOffline) {
      setQueuedQueries(prev => [...prev, textToSend]);
      
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {
            id: `offline-${Date.now()}`,
            sender: "bot",
            text: `📝 Stored offline. I will immediately synchronize this once your network connectivity restores! Currently operating on safe cached records. Try seeking basic soil advice.`,
            timestamp: new Date(),
            isOfflineQueued: true
          }
        ]);
      }, 600);
      return;
    }

    setIsBotTyping(true);

    try {
      const threadContext = [...chatMessages, userMsg].map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: threadContext,
          language,
          state: selectedState
        })
      });

      if (response.ok) {
        const data = await response.json();
        setChatMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: data.text,
            timestamp: new Date()
          }
        ]);
        if (voiceFeedbackEnabled) {
          speakOut(data.text);
        }
      } else {
        throw new Error("Chat call failed");
      }
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: "bot",
          text: "Technical link interruption. I am retaining your questions. Please verify your connection status.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsBotTyping(false);
    }
  };

  // Text-to-Speech (TTS)
  const speakOut = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#_`]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      if (language === "hi") utterance.lang = "hi-IN";
      else if (language === "bn") utterance.lang = "bn-IN";
      else if (language === "ta") utterance.lang = "ta-IN";
      else utterance.lang = "en-IN";

      window.speechSynthesis.speak(utterance);
    }
  };

  // Web Speech API STT
  const toggleVoiceListening = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRec();
      
      if (isListeningVoice) {
        setIsListeningVoice(false);
        return;
      }

      recognition.continuous = false;
      recognition.interimResults = false;
      
      if (language === "hi") recognition.lang = "hi-IN";
      else if (language === "bn") recognition.lang = "bn-IN";
      else if (language === "ta") recognition.lang = "ta-IN";
      else recognition.lang = "en-IN";

      recognition.onstart = () => {
        setIsListeningVoice(true);
      };

      recognition.onerror = (e: any) => {
        console.error("Speech Recognition Error", e);
        setIsListeningVoice(false);
      };

      recognition.onend = () => {
        setIsListeningVoice(false);
      };

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        if (text) {
          setChatInput(text);
          handleSendChatMessage(text);
        }
      };

      recognition.start();
    } else {
      alert("Voice speech recognition is restricted or not supported in this browser. Try typing your query in the input below!");
    }
  };

  // Dynamic values depending on selected State
  const pageSubtitleText = selectedState === "tamilnadu"
    ? (language === "ta" ? "காவிரி டெல்டா மற்றும் தமிழ்நாட்டின் கரிசல் பூமி விவசாயிகளுக்கான செயற்கை நுண்ணறிவு வழிகாட்டி" : "Satellite-Linked Agro-Decision Engine for Tamil Nadu's Kaveri Plain & Coastal Zones")
    : t.appSubtitle;

  const headerLocationText = selectedState === "tamilnadu"
    ? "🛰️ TN Space Link • 11.01° N, 76.95° E • Coimbatore, Tamil Nadu"
    : "🛰️ Birsa Satellite Link • 23.34° N, 85.30° E • Ranchi, Jharkhand";

  return (
    <div className="w-full min-h-screen bg-[#faf9f5] text-stone-800 font-sans flex flex-col justify-between overflow-x-hidden relative selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Decorative Editorial Background Ornaments */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50/30 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-amber-50/40 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      {/* Fine-lined decorative grid overlay for editorial drafting board style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-20"></div>

      {/* Top Header Panel - Premium Editorial Header */}
      <header className="border-b border-stone-200/60 bg-white/70 backdrop-blur-md px-4 py-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 z-20 shadow-[0_1px_3px_rgba(0,0,0,0.01)] sticky top-0">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-amber-100 flex items-center justify-center shadow-[0_4px_12px_rgba(20,83,45,0.15)] border border-emerald-800">
            <FarmerIcon className="w-6.5 h-6.5 text-amber-100 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-display font-black tracking-tight text-stone-900 flex items-center gap-2">
                {t.appName}
                <span className="text-emerald-800 font-mono text-[9px] tracking-widest bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 font-bold uppercase">
                  v3.5 Multi-Region Active
                </span>
              </h1>
            </div>
            <p className="text-[10px] md:text-xs text-stone-400 font-sans tracking-wide">
              {headerLocationText}
            </p>
          </div>
        </div>

        {/* Dynamic Controls Row */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          {/* Language Selector Pill */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-2xl border border-stone-200/40 shadow-inner">
            <Globe className="w-3.5 h-3.5 text-stone-400 ml-2.5 shrink-0" />
            {[
              { code: "en", label: "EN", title: "English" },
              { code: "hi", label: "हिन्दी", title: "Hindi" },
              { code: "bn", label: "বাংলা", title: "Bengali" },
              { code: "sat", label: "ᱥᱟᱱᱛᱟᱲᱤ", title: "Santali" },
              { code: "ta", label: "தமிழ்", title: "Tamil" }
            ].map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code as SupportedLanguage)}
                className={`px-3 py-1.5 text-[10px] font-black rounded-xl transition-all cursor-pointer ${
                  language === lang.code
                    ? "bg-white text-emerald-900 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-stone-200/25"
                    : "text-stone-500 hover:text-stone-800"
                }`}
                title={lang.title}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Responsive Grid Layout (Asymmetrical Split View) */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 z-10 space-y-6">
        
        {/* Offline Simulation Hub */}
        <OfflineIndicator 
          isOffline={isOffline} 
          setIsOffline={setIsOffline} 
          queuedCount={queuedQueries.length} 
          language={language}
        />

        {/* ========================================================= */}
        {/* COMPLETELY REDESIGNED PREMIUM HERO STATE BANNER */}
        {/* ========================================================= */}
        <div className="space-y-3.5">
          <div className="bg-gradient-to-r from-teal-850 via-teal-900 to-teal-950 border border-teal-700/50 text-white rounded-[2rem] p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md shadow-teal-900/10">
            {/* Background ambient accents */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/5 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none"></div>

            <div className="space-y-2 z-10">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-teal-800/80 text-amber-200 border border-teal-700/50">
                  {language === "ta" ? "செயலில் உள்ள விவசாய மண்டலம்" : "Active Region Zone • Tamil Nadu"}
                </span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-teal-800/40 text-teal-200">
                  {language === "ta" ? "38 மாவட்டங்கள்" : "38 Districts Telemetry"}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-black tracking-tight">
                {language === "ta" ? "தமிழ்நாடு விவசாய மையம்" : "Tamil Nadu Agricultural Hub (தமிழ்நாடு)"}
              </h3>
              <p className="text-xs md:text-sm text-teal-100/85 font-sans leading-relaxed max-w-2xl">
                {language === "ta" 
                  ? "தமிழ்நாட்டின் 38 மாவட்டங்களுக்கான விரிவான மண் வளம், நிகழ்நேர பயிர் ஆலோசனைகள், வானிலை தகவல்கள் மற்றும் நேரடி மண்டி சந்தை விலைகள்."
                  : "Comprehensive soil intelligence, agromet advisory, real-time weather analytics, and live market mandi rates synchronized across all 38 districts of Tamil Nadu."}
              </p>
            </div>
            <div className="p-4 bg-teal-800/60 border border-teal-700 rounded-2.5xl text-teal-200 shrink-0 self-start md:self-center shadow-lg shadow-teal-950/30 transition-all duration-300 hover:scale-105">
              <TreePalm className="w-8 h-8 md:w-10 md:h-10 text-emerald-300" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PERSISTENT COLUMN (Weather & Mandi Telemetry Widget) */}
          <div className="lg:col-span-4 space-y-6">
            <WeatherMandiSidebar
              selectedDistrict={selectedWeatherDistrict}
              onSelectDistrict={setSelectedWeatherDistrict}
              weatherData={weatherData}
              mandis={mandis}
              mandiSearch={mandiSearch}
              onMandiSearchChange={setMandiSearch}
              language={language}
              selectedState={selectedState}
            />
          </div>

          {/* RIGHT ACTIVE WORKSPACE COLUMN */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Wooden-accented Tactile Tab Bar Deck */}
            <div className="bg-white border border-stone-200/80 p-2 rounded-3xl flex gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
              {[
                { id: "recommend", label: t.tabRecommend, icon: <Compass className="w-4 h-4" /> },
                { id: "disease", label: t.tabDisease, icon: <Camera className="w-4 h-4" /> },
                { id: "market", label: language === "ta" ? "விவசாய அட்டவணை" : "Seasonal Calendar", icon: <Calendar className="w-4 h-4" /> },
                { id: "chat", label: t.tabChat, icon: <MessageSquare className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-3 rounded-2xl font-display font-bold text-[11px] md:text-xs uppercase tracking-wider transition-all border cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-stone-900 border-stone-900 text-white shadow-[0_4px_16px_rgba(28,25,23,0.12)]"
                      : "bg-transparent border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-50"
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Render Workspace Window */}
            <div className="bg-white border border-stone-200/70 rounded-[2.5rem] p-6 md:p-8 shadow-[0_12px_45px_rgba(28,25,23,0.02)] relative min-h-[450px]">
              <AnimatePresence mode="wait">
                
                {/* WORKSPACE 1: CROP ADVISORY & SOIL ASSESSOR */}
                {activeTab === "recommend" && (
                  <motion.div
                    key="recommend"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="grid grid-cols-1 xl:grid-cols-12 gap-8"
                  >
                    {/* Left Sub-form - 5 Cols */}
                    <div className="xl:col-span-5">
                      <SoilForm
                        soilForm={soilForm}
                        setSoilForm={setSoilForm}
                        isAnalyzingSoil={isAnalyzingSoil}
                        onGetRecommendation={handleGetRecommendation}
                        onSatelliteScan={triggerSatelliteSoilScan}
                        language={language}
                        selectedState={selectedState}
                      />
                    </div>

                    {/* Right Results - 7 Cols */}
                    <div className="xl:col-span-7 space-y-6">
                      {soilRecommendation ? (
                        <div className="space-y-6">
                          {/* Soil Health assessment alert block */}
                          <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-5.5 relative overflow-hidden shadow-sm">
                            <h3 className="text-xs font-display font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-2 mb-2">
                              {t.soilHealthTitle}
                            </h3>
                            <p className="text-xs md:text-sm text-stone-800 leading-relaxed font-sans">
                              {soilRecommendation.soilHealthAssessment}
                            </p>
                          </div>

                          {/* Rotation Suggest Block */}
                          <div className="bg-blue-50/30 border border-blue-100 rounded-2xl p-5.5 shadow-sm">
                            <h3 className="text-xs font-display font-bold text-blue-800 uppercase tracking-widest flex items-center gap-2 mb-2">
                              {t.rotationTitle}
                            </h3>
                            <p className="text-xs md:text-sm text-stone-800 leading-relaxed font-sans">
                              {soilRecommendation.cropRotationSuggestion}
                            </p>
                          </div>

                          {/* Recommended Crops List */}
                          <div className="space-y-4">
                            <h3 className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest">
                              🌱 {language === "ta" ? "பரிந்துரைக்கப்பட்ட விதைப்பு பொருத்தங்கள்" : "Recommended Sowing Matches"}
                            </h3>

                            {soilRecommendation.recommendedCrops.map((crop, idx) => (
                              <div 
                                key={idx}
                                className="bg-white border border-stone-200/80 rounded-3xl p-5 relative overflow-hidden hover:border-emerald-300 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md"
                              >
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                                  <div>
                                    <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-100/50 px-2.5 py-0.5 rounded-lg">
                                      {language === "ta" ? `பொருத்தம் #${idx + 1}` : `Match #${idx + 1}`}
                                    </span>
                                    <h4 className="text-lg font-display font-bold text-stone-900 mt-1.5">{crop.cropName}</h4>
                                    <p className="text-xs text-stone-500 italic mt-0.5">{crop.cropNameLocal}</p>
                                  </div>

                                  <div className="text-right">
                                    <span className="text-2xl font-display font-black text-stone-950 block">
                                      {crop.suitabilityScore}%
                                    </span>
                                    <span className="text-[9px] uppercase text-stone-400 font-bold tracking-wider">
                                      {t.suitability}
                                    </span>
                                  </div>
                                </div>

                                {/* core stats row */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-100 text-[10px] font-mono mb-3.5">
                                  <div>
                                    <span className="text-stone-400 block uppercase font-bold tracking-wider">{t.yield}</span>
                                    <span className="text-stone-800 font-bold">{crop.expectedYield}</span>
                                  </div>
                                  <div>
                                    <span className="text-stone-400 block uppercase font-bold tracking-wider">{t.duration}</span>
                                    <span className="text-stone-800 font-bold">{crop.duration}</span>
                                  </div>
                                  <div>
                                    <span className="text-stone-400 block uppercase font-bold tracking-wider">{t.profit}</span>
                                    <span className="text-emerald-700 font-bold">+{crop.profitMargin}% Margin</span>
                                  </div>
                                  <div>
                                    <span className="text-stone-400 block uppercase font-bold tracking-wider">{t.water}</span>
                                    <span className="text-stone-800 font-bold">{crop.waterRequirement}</span>
                                  </div>
                                </div>

                                {/* formulas */}
                                <div className="space-y-1.5 text-xs text-stone-600 font-sans border-t border-stone-100 pt-3">
                                  <p className="flex items-start gap-2">
                                    <span className="text-stone-400 font-mono font-bold text-[9px] uppercase tracking-wider mt-0.5">Fertilizer:</span>
                                    <span className="text-stone-800 font-medium">{crop.fertilizerRequirement}</span>
                                  </p>
                                  <p className="flex items-start gap-2">
                                    <span className="text-stone-400 font-mono font-bold text-[9px] uppercase tracking-wider mt-0.5">Rotation:</span>
                                    <span className="text-stone-800 leading-normal">{crop.sustainabilityReason}</span>
                                  </p>
                                  <p className="flex items-start gap-2">
                                    <span className="text-rose-700 font-mono font-bold text-[9px] uppercase tracking-wider mt-0.5">Key Risk:</span>
                                    <span className="text-rose-900/80 font-medium leading-normal">{crop.keyRisks}</span>
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="h-full min-h-[350px] border border-dashed border-stone-200 rounded-[2rem] flex flex-col items-center justify-center text-center p-8 bg-stone-50/30">
                          <Sprout className="w-12 h-12 text-stone-300 mb-3" />
                          <h3 className="text-lg font-display font-bold text-stone-800">
                            {language === "ta" ? "உள்ளீடுகளுக்காக காத்திருக்கிறது" : "Awaiting Assessor Inputs"}
                          </h3>
                          <p className="text-xs text-stone-400 max-w-sm leading-relaxed mx-auto font-sans">
                            {language === "ta" ? "இடது பலகத்தில் அளவுருக்களை மாற்றி சமர்ப்பிக்கவும். மாற்றாக, முன்கூட்டியே அளவிடப்பட்ட மதிப்புகளை உடனடியாக ஏற்ற மேலே உள்ள வரைபடத்தில் ஏதேனும் ஒரு வயல் கட்டத்தை அழுத்தவும்." : "Modify parameters on the left pane and submit. Alternatively, click any micro-plot on the virtual field grid above to instant load pre-measured coordinates."}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* WORKSPACE 2: LEAF SCANNER */}
                {activeTab === "disease" && (
                  <motion.div
                    key="disease"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                  >
                    <DiseaseScanner
                      selectedImage={selectedImage}
                      setSelectedImage={setSelectedImage}
                      isScanningLeaf={isScanningLeaf}
                      onAnalyzeDisease={handleAnalyzeDisease}
                      diseaseDiagnosis={diseaseDiagnosis}
                      cameraActive={cameraActive}
                      videoRef={videoRef}
                      fileInputRef={fileInputRef}
                      language={language}
                      startCamera={startCamera}
                      capturePhoto={capturePhoto}
                      stopCamera={stopCamera}
                      handleImageUpload={handleImageUpload}
                    />
                  </motion.div>
                )}

                {/* WORKSPACE 3: DEDICATED SEASONAL CALENDAR BENTO */}
                {activeTab === "market" && (
                  <motion.div
                    key="market"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-6"
                  >
                    {selectedState === "tamilnadu" ? (
                      // Tamil Nadu Calendar View
                      <>
                        <div>
                          <h2 className="text-xl md:text-2xl font-display font-black text-stone-900 flex items-center gap-2.5">
                            <Calendar className="w-6 h-6 text-teal-700" />
                            Tamil Nadu Agro-Climatic Calendar & Soils
                          </h2>
                          <p className="text-xs md:text-sm text-stone-500 mt-1 leading-relaxed font-sans">
                            Cauvery Delta, Western and Southern zone farming schedules & traditional soil conditioning.
                          </p>
                        </div>

                        {/* Calendar Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
                          {/* Kuruvai card */}
                          <div className="border border-teal-100 bg-teal-50/10 rounded-2xl p-5 space-y-3">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-md">
                              Kuruvai (Short Monsoon: Jun - Sep)
                            </span>
                            <h3 className="font-display font-bold text-stone-900 text-sm">Quick Grain & Millets</h3>
                            <p className="text-xs text-stone-500 leading-normal">
                              Thrives under high warmth & summer solar intensity. Quick-duration Samba rice varieties, Sorghum (Cholam), and Pearl Millets (Kambu) with stable canal irrigation.
                            </p>
                            <div className="flex flex-wrap gap-1 pt-1 text-[10px] font-mono text-teal-900 font-semibold">
                              <span>Paddy</span> • <span>Cholam</span> • <span>Kambu</span> • <span>Ragi</span>
                            </div>
                          </div>

                          {/* Samba card */}
                          <div className="border border-amber-100 bg-amber-50/10 rounded-2xl p-5 space-y-3">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md">
                              Samba (Major Monsoon: Aug - Jan)
                            </span>
                            <h3 className="font-display font-bold text-stone-900 text-sm">Heavy Cash Crops & Fibers</h3>
                            <p className="text-xs text-stone-500 leading-normal">
                              Relies heavily on the critical North-East Monsoon rains. Major sowing of long-cycle Samba Paddy (Nellu), Sugarcane (Karumbu), Cotton, and high-value Turmeric.
                            </p>
                            <div className="flex flex-wrap gap-1 pt-1 text-[10px] font-mono text-amber-900 font-semibold">
                              <span>Samba Paddy</span> • <span>Sugarcane</span> • <span>Turmeric</span> • <span>Cotton</span>
                            </div>
                          </div>

                          {/* Navarai card */}
                          <div className="border border-stone-200 bg-stone-100/30 rounded-2xl p-5 space-y-3">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-stone-600 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-md">
                              Navarai (Dry Season: Dec - May)
                            </span>
                            <h3 className="font-display font-bold text-stone-900 text-sm">Residual Pulse & Oilseeds</h3>
                            <p className="text-xs text-stone-500 leading-normal">
                              Grown with subterranean pumps or residual winter moisture. Highly favorable for Groundnut (Verkadalai), Black Gram (Ulundu), Sesame oilseeds, and cowpea.
                            </p>
                            <div className="flex flex-wrap gap-1 pt-1 text-[10px] font-mono text-stone-800 font-semibold">
                              <span>Groundnut</span> • <span>Ulundu</span> • <span>Sesame</span> • <span>Fodder</span>
                            </div>
                          </div>
                        </div>

                        {/* TN Soil Conditioning protocols */}
                        <div className="border border-stone-200 bg-stone-50/40 rounded-3xl p-6 space-y-4">
                          <div className="flex items-center gap-2">
                            <Layers className="w-5 h-5 text-teal-700" />
                            <h3 className="font-display font-bold text-stone-900 text-sm">
                              Tamil Nadu Soil Optimization Protocols
                            </h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-stone-600 font-sans leading-normal">
                            <div className="space-y-2">
                              <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                                <Thermometer className="w-3.5 h-3.5 text-teal-600" />
                                1. Conditioning Black Cotton Soil (Karisal)
                              </p>
                              <p>
                                Deep summer tilling (Sithai) helps break tight clay subsoil layers. Incorporate gypsum at 200 kg/acre to improve water drainage permeability, actively preventing water pooling.
                              </p>
                            </div>

                            <div className="space-y-2">
                              <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                                2. Micro-Nutrient Boosting (Panchagavya)
                              </p>
                              <p>
                                Apply foliar sprays of Panchagavya (a traditional organic preparation of cow dung, urine, milk, curd, and ghee) or Amrit Karaisal at 3% concentration. This triggers massive microbial activity.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      // Jharkhand Calendar View (Default)
                      <>
                        <div>
                          <h2 className="text-xl md:text-2xl font-display font-black text-stone-900 flex items-center gap-2.5">
                            <Calendar className="w-6 h-6 text-emerald-700" />
                            Jharkhand Agro-Climatic Calendar & Soils
                          </h2>
                          <p className="text-xs md:text-sm text-stone-500 mt-1 leading-relaxed font-sans">
                            Chota Nagpur zone farming schedule and red sandy clay conditioning protocols.
                          </p>
                        </div>

                        {/* Calendar Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
                          {/* Kharif card */}
                          <div className="border border-emerald-100 bg-emerald-50/10 rounded-2xl p-5 space-y-3">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                              Kharif (Monsoon: Jun - Oct)
                            </span>
                            <h3 className="font-display font-bold text-stone-900 text-sm">Heavy Grain & Millets</h3>
                            <p className="text-xs text-stone-500 leading-normal">
                              High moisture reliance. Sowing of Paddy nurseries, Finger Millets (Mandua), Pigeon Pea (Arhar), and black pulse (Urad). Ideal for Chota Nagpur plateaus.
                            </p>
                            <div className="flex flex-wrap gap-1 pt-1 text-[10px] font-mono text-emerald-900 font-semibold">
                              <span>Paddy</span> • <span>Urad</span> • <span>Arhar</span> • <span>Mandua</span>
                            </div>
                          </div>

                          {/* Rabi card */}
                          <div className="border border-orange-100 bg-orange-50/10 rounded-2xl p-5 space-y-3">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-orange-800 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md">
                              Rabi (Winter: Nov - Mar)
                            </span>
                            <h3 className="font-display font-bold text-stone-900 text-sm">Oilseeds & Vegetables</h3>
                            <p className="text-xs text-stone-500 leading-normal">
                              Cold season residual soil humidity. Planting of Yellow Mustard (Sarson), Gram (Chana), Wheat, Potato, and cool cabbages.
                            </p>
                            <div className="flex flex-wrap gap-1 pt-1 text-[10px] font-mono text-orange-900 font-semibold">
                              <span>Mustard</span> • <span>Wheat</span> • <span>Potato</span> • <span>Chana</span>
                            </div>
                          </div>

                          {/* Zaid card */}
                          <div className="border border-blue-100 bg-blue-50/10 rounded-2xl p-5 space-y-3">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-800 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                              Zaid (Summer: Apr - May)
                            </span>
                            <h3 className="font-display font-bold text-stone-900 text-sm">Short-Cycle Hydration</h3>
                            <p className="text-xs text-stone-500 leading-normal">
                              Requires access to tube wells or micro-dobhas. Cultivating riverbed watermelons, green Moong pulses, and cowpea fodder.
                            </p>
                            <div className="flex flex-wrap gap-1 pt-1 text-[10px] font-mono text-blue-900 font-semibold">
                              <span>Moong</span> • <span>Cowpea</span> • <span>Watermelon</span>
                            </div>
                          </div>
                        </div>

                        {/* Plateau Red Soil conditioning protocols */}
                        <div className="border border-stone-200 bg-stone-50/40 rounded-3xl p-6 space-y-4">
                          <div className="flex items-center gap-2">
                            <Layers className="w-5 h-5 text-emerald-700" />
                            <h3 className="font-display font-bold text-stone-900 text-sm">
                              Plateau Red Soil Conditioning Protocols (Acidic Soils 5.0 - 6.5)
                            </h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-stone-600 font-sans leading-normal">
                            <div className="space-y-2">
                              <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                                <Thermometer className="w-3.5 h-3.5 text-emerald-600" />
                                1. Reducing Soil Acidity Naturally
                              </p>
                              <p>
                                Incorporate agricultural limestone (lime) or dolomite powder during summer tilling at 150-200 kg/acre every 3 years. This raises red soil pH back to optimal crop absorption targets.
                              </p>
                            </div>

                            <div className="space-y-2">
                              <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                                2. Restoring Nitrogen Reserves
                              </p>
                              <p>
                                Avoid double-cropping heavy cereals back-to-back. Sowing leguminous pulses like Black Gram (Urad) or sunn hemp between rice seasons fixes pure atmospheric nitrogen without costly chemical urea.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {/* WORKSPACE 4: AGRI-MITRA CHATBOT */}
                {activeTab === "chat" && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                  >
                    <ChatMitra
                      chatMessages={chatMessages}
                      chatInput={chatInput}
                      setChatInput={setChatInput}
                      isBotTyping={isBotTyping}
                      voiceFeedbackEnabled={voiceFeedbackEnabled}
                      setVoiceFeedbackEnabled={setVoiceFeedbackEnabled}
                      isListeningVoice={isListeningVoice}
                      toggleVoiceListening={toggleVoiceListening}
                      handleSendChatMessage={handleSendChatMessage}
                      speakOut={speakOut}
                      language={language}
                      chatEndRef={chatEndRef}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Editorial Elegant Footer Bar */}
      <footer className="border-t border-stone-200 bg-white py-6 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans z-10">
        <div>
          <p className="text-stone-400 uppercase text-[9px] tracking-widest font-bold">Decision Support Matrix</p>
          <p className="text-stone-700 font-semibold mt-0.5">
            {selectedState === "tamilnadu" 
              ? "Tamil Nadu Agricultural Decision Support Engine • Tamil Nadu Department of Agriculture" 
              : "Built for Department of Higher & Technical Education"}
          </p>
        </div>
        <div className="flex items-center gap-5 text-right">
          <div>
            <span className="text-stone-400 block text-[9px] uppercase tracking-wider font-bold">Active Soil Domain</span>
            <span className="text-emerald-800 font-bold uppercase text-xs">
              {selectedState === "tamilnadu" ? "Tamil Nadu Alluvial/Clayey" : "Chota Nagpur Red Soil"}
            </span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></div>
        </div>
      </footer>
    </div>
  );
}

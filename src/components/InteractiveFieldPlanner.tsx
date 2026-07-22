import React from "react";
import { motion } from "motion/react";
import { Sprout, Layers, Droplet, Thermometer, Flower2, TreePalm } from "lucide-react";
import { SoilData, SupportedLanguage } from "../types";
import { INDIA_STATES } from "../indiaData";

interface InteractiveFieldPlannerProps {
  onSelectPlot: (soilData: SoilData) => void;
  currentRegion: string;
  language: SupportedLanguage;
  state?: string;
}

interface Plot {
  id: string;
  nameEn: string;
  nameLocal: string;
  descriptionEn: string;
  descriptionLocal: string;
  data: SoilData;
  color: string;
  icon: React.ReactNode;
}

export default function InteractiveFieldPlanner({
  onSelectPlot,
  currentRegion,
  language,
  state = "tamilnadu",
}: InteractiveFieldPlannerProps) {
  
  // Crop planner plots based on selected region's topography
  const jharkhandPlots: Plot[] = [
    {
      id: "upland",
      nameEn: "Sukhra Don (Dry Upland)",
      nameLocal: "सुखड़ा दोन (ऊपरी सूखी भूमि)",
      descriptionEn: "Highly acidic red gravelly soil. Poor water holding capacity. Ideal for drought-resistant millets and tubers.",
      descriptionLocal: "अत्यधिक अम्लीय लाल पथरीली मिट्टी। कम जल धारण क्षमता। मड़ुआ और कंद के लिए उत्तम।",
      color: "from-amber-600/10 to-amber-700/5 hover:to-amber-600/15 border-amber-200/60 hover:border-amber-400",
      icon: <Layers className="w-5 h-5 text-amber-700" />,
      data: {
        region: currentRegion,
        ph: "5.2",
        nitrogen: "35",
        phosphorus: "12",
        potassium: "90",
        moisture: "25",
        pastCrop: "None",
      },
    },
    {
      id: "lowland",
      nameEn: "Gara Don (Lowland Valley)",
      nameLocal: "गड़ा दोन (तराई घाटी)",
      descriptionEn: "Clayey loam, rich alluvial deposits. Excellent moisture retention. Highly compatible with paddy and heavy-feeding grains.",
      descriptionLocal: "दोमट मिट्टी, उपजाऊ जलोढ़। उत्कृष्ट नमी धारण क्षमता। धान और दलहन के लिए सर्वोत्तम।",
      color: "from-emerald-600/10 to-emerald-700/5 hover:to-emerald-600/15 border-emerald-200/60 hover:border-emerald-400",
      icon: <Sprout className="w-5 h-5 text-emerald-700" />,
      data: {
        region: currentRegion,
        ph: "6.2",
        nitrogen: "55",
        phosphorus: "24",
        potassium: "150",
        moisture: "65",
        pastCrop: "Paddy",
      },
    },
    {
      id: "homestead",
      nameEn: "Bari (Homestead Garden)",
      nameLocal: "बारी (घर की बाड़ी)",
      descriptionEn: "Rich organic matter, fertile sandy loam. Well-drained. Excellent for cash vegetables, potato, and ginger nursery.",
      descriptionLocal: "जैविक पदार्थों से भरपूर उपजाऊ बलुई मिट्टी। अच्छी जल निकासी। नकद सब्जियों और आलू के लिए उत्तम।",
      color: "from-yellow-600/10 to-yellow-700/5 hover:to-yellow-600/15 border-yellow-200/60 hover:border-yellow-400",
      icon: <Thermometer className="w-5 h-5 text-yellow-700" />,
      data: {
        region: currentRegion,
        ph: "5.9",
        nitrogen: "65",
        phosphorus: "20",
        potassium: "140",
        moisture: "45",
        pastCrop: "Maize",
      },
    },
    {
      id: "basin",
      nameEn: "Tari (Irrigated Basin)",
      nameLocal: "तारी (सिंचित मैदान)",
      descriptionEn: "Deep silt loam, managed canals. Stable nutrient indices. Prefers high-yield oilseeds, mustard, and winter wheat.",
      descriptionLocal: "गहरी गाद वाली मिट्टी, नहर सिंचित। स्थिर पोषक तत्व। सरसों, मक्का और गेहूं के लिए आदर्श।",
      color: "from-blue-600/10 to-blue-700/5 hover:to-blue-600/15 border-blue-200/60 hover:border-blue-400",
      icon: <Droplet className="w-5 h-5 text-blue-700" />,
      data: {
        region: currentRegion,
        ph: "5.7",
        nitrogen: "48",
        phosphorus: "18",
        potassium: "110",
        moisture: "50",
        pastCrop: "Vegetables",
      },
    },
  ];

  const tamilNaduPlots: Plot[] = [
    {
      id: "karisal",
      nameEn: "Karisal Bhumi (Black Cotton Clay)",
      nameLocal: "கரிசல் பூமி (கறுப்பு பருத்தி மண்)",
      descriptionEn: "Fine clayey soil with deep cracking. Strong water retention. Highly compatible with cotton, groundnuts, and sunflower.",
      descriptionLocal: "களிமண் நிறைந்த கரிசல் மண். ஈரப்பதம் தக்கவைக்கும் திறன் கொண்டது. பருத்தி, நிலக்கடலை சாகுபடிக்கு உகந்தது.",
      color: "from-stone-700/10 to-stone-800/5 hover:to-stone-700/15 border-stone-200/60 hover:border-stone-400",
      icon: <Layers className="w-5 h-5 text-stone-700" />,
      data: {
        region: currentRegion,
        ph: "7.6",
        nitrogen: "38",
        phosphorus: "14",
        potassium: "180",
        moisture: "45",
        pastCrop: "None",
      },
    },
    {
      id: "nanjai",
      nameEn: "Nanjai Vayal (Wet Delta Basin)",
      nameLocal: "நஞ்சை வயல் (ஆற்றுப்பாசன வண்டல்)",
      descriptionEn: "Rich alluvial loam with active canal feeds. Highly fertile. Perfect for Samba/Kuruvai paddy or heavy sugarcane.",
      descriptionLocal: "வளமான வண்டல் மண். ஆற்று நீர்ப்பாசன வசதி கொண்டது. நெல் (சம்பா) மற்றும் கரும்புக்கு உகந்தது.",
      color: "from-teal-600/10 to-teal-700/5 hover:to-teal-600/15 border-teal-200/60 hover:border-teal-400",
      icon: <Sprout className="w-5 h-5 text-teal-700" />,
      data: {
        region: currentRegion,
        ph: "6.8",
        nitrogen: "62",
        phosphorus: "25",
        potassium: "140",
        moisture: "70",
        pastCrop: "Paddy",
      },
    },
    {
      id: "punjai",
      nameEn: "Punjai / Thottam (Red Sandy Loam)",
      nameLocal: "புஞ்சை / தோட்டம் (செம்மண் நிலம்)",
      descriptionEn: "Well-drained red sandy gravelly loam. Superb for cash turmeric, tapioca, and aromatic jasmine farms.",
      descriptionLocal: "நல்ல வடிகால் வசதி கொண்ட செம்மண் நிலம். மஞ்சள், மரவள்ளிக்கிழங்கு மற்றும் பூக்கள் பயிரிட சிறந்தது.",
      color: "from-amber-600/10 to-amber-700/5 hover:to-amber-600/15 border-amber-200/60 hover:border-amber-400",
      icon: <Flower2 className="w-5 h-5 text-amber-700" />,
      data: {
        region: currentRegion,
        ph: "6.2",
        nitrogen: "46",
        phosphorus: "18",
        potassium: "125",
        moisture: "35",
        pastCrop: "Sesame",
      },
    },
    {
      id: "thennathoppu",
      nameEn: "Thennathoppu (Sandy Coastal Plain)",
      nameLocal: "தென்னந்தோப்பு (மணற்பாங்கான தோப்பு)",
      descriptionEn: "Deep light sandy loam. High subterranean water table. Ideal for coconut palm groves and intercropped banana plantations.",
      descriptionLocal: "மணற்பாங்கான கடலோர தோப்பு நிலம். தென்னை மற்றும் வாழை ஊடுபயிர் சாகுபடிக்கு உகந்தது.",
      color: "from-emerald-600/10 to-emerald-700/5 hover:to-emerald-600/15 border-emerald-200/60 hover:border-emerald-400",
      icon: <TreePalm className="w-5 h-5 text-emerald-700" />,
      data: {
        region: currentRegion,
        ph: "7.1",
        nitrogen: "32",
        phosphorus: "10",
        potassium: "160",
        moisture: "50",
        pastCrop: "Vegetables",
      },
    },
  ];

  const stateInfo = INDIA_STATES.find(s => s.id === state);
  const stateName = stateInfo ? stateInfo.name : state === "tamilnadu" ? "Tamil Nadu" : "Jharkhand";
  const primaryCrop = stateInfo?.crops[0] || "Paddy";
  const secondaryCrop = stateInfo?.crops[1] || "Mustard";
  const cashCrop = stateInfo?.crops[3] || "Sugarcane";

  const genericPlots: Plot[] = [
    {
      id: "general_upland",
      nameEn: "Dhani Shreni (Upland Plot)",
      nameLocal: `${stateName} Upland (ऊपरी भूमि)`,
      descriptionEn: `Well-drained typical upland of ${stateName}. Suitable for grains like millet and maize.`,
      descriptionLocal: `जल निकासी वाली ऊपरी भूमि। अनाज, बाजरा और मक्का के लिए उत्तम।`,
      color: "from-amber-600/10 to-amber-700/5 hover:to-amber-600/15 border-amber-200/60 hover:border-amber-400",
      icon: <Layers className="w-5 h-5 text-amber-700" />,
      data: {
        region: currentRegion,
        ph: "6.5",
        nitrogen: "40",
        phosphorus: "15",
        potassium: "110",
        moisture: "30",
        pastCrop: "None",
      },
    },
    {
      id: "general_lowland",
      nameEn: "Samtal Vayal (Lowland Basin)",
      nameLocal: `${stateName} Lowland (तराई क्षेत्र)`,
      descriptionEn: `Deep fertile loam, excellent moisture retention. Ideal for ${primaryCrop} crops.`,
      descriptionLocal: `गहरी उपजाऊ दोमट मिट्टी। ${primaryCrop} சாகுபடிக்கு உகந்தது.`,
      color: "from-teal-600/10 to-teal-700/5 hover:to-teal-600/15 border-teal-200/60 hover:border-teal-400",
      icon: <Sprout className="w-5 h-5 text-teal-700" />,
      data: {
        region: currentRegion,
        ph: "6.8",
        nitrogen: "55",
        phosphorus: "22",
        potassium: "140",
        moisture: "60",
        pastCrop: primaryCrop,
      },
    },
    {
      id: "general_gardens",
      nameEn: "Bageecha (Irrigated Plains)",
      nameLocal: `${stateName} Plains (मैदानी भाग)`,
      descriptionEn: `Highly fertilized rich soils, near main water channels. Great for ${secondaryCrop} and vegetables.`,
      descriptionLocal: `पोषक तत्वों से भरपूर सिंचित मिट्टी। सब्जियों और ${secondaryCrop} के लिए उपयुक्त।`,
      color: "from-yellow-600/10 to-yellow-700/5 hover:to-yellow-600/15 border-yellow-200/60 hover:border-yellow-400",
      icon: <Flower2 className="w-5 h-5 text-yellow-700" />,
      data: {
        region: currentRegion,
        ph: "6.4",
        nitrogen: "50",
        phosphorus: "18",
        potassium: "130",
        moisture: "45",
        pastCrop: secondaryCrop,
      },
    },
    {
      id: "general_plantation",
      nameEn: "Bagicha (Cash plantation / Grove)",
      nameLocal: `${stateName} Grove (बागान / बगीचा)`,
      descriptionEn: `Well-spaced high-organic loam. Suited for commercial agroforestry and crops like ${cashCrop}.`,
      descriptionLocal: `வளமான தோட்டக்கலை நிலம். ${cashCrop} சாகுபடிக்கு உகந்தது.`,
      color: "from-emerald-600/10 to-emerald-700/5 hover:to-emerald-600/15 border-emerald-200/60 hover:border-emerald-400",
      icon: <TreePalm className="w-5 h-5 text-emerald-700" />,
      data: {
        region: currentRegion,
        ph: "7.0",
        nitrogen: "45",
        phosphorus: "20",
        potassium: "150",
        moisture: "50",
        pastCrop: "Vegetables",
      },
    },
  ];

  const plots = state === "tamilnadu" ? tamilNaduPlots : state === "jharkhand" ? jharkhandPlots : genericPlots;

  const isHindi = language === "hi";
  const isBengali = language === "bn";
  const isSanthali = language === "sat";
  const isTamil = language === "ta";
  const showLocal = isHindi || isBengali || isSanthali || isTamil;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-mono font-bold uppercase text-stone-400 tracking-wider">
            {isTamil 
              ? "இன்டராக்டிவ் விவசாயத் திட்டமிடல்" 
              : `Interactive ${stateName} Land Grid & Field Planner`}
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            {isTamil 
              ? "உங்கள் வயலின் அமைப்பைத் தேர்ந்தெடுத்து மண்ணின் அளவீடுகளை ஏற்றவும்" 
              : "Select a micro-plot to automatically load diagnostic sensor parameters."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {plots.map((plot) => (
          <motion.button
            key={plot.id}
            type="button"
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelectPlot(plot.data)}
            className={`text-left p-4.5 rounded-2xl border bg-gradient-to-br ${plot.color} transition-all cursor-pointer flex flex-col justify-between gap-3 shadow-sm`}
          >
            <div className="flex items-start justify-between w-full">
              <div className="p-2 rounded-xl bg-white border border-stone-100 shadow-sm">
                {plot.icon}
              </div>
              <span className="text-[10px] font-mono font-bold bg-white/80 border border-stone-200/40 px-2 py-0.5 rounded-lg text-stone-600">
                pH {plot.data.ph} • {plot.data.moisture}% H₂O
              </span>
            </div>

            <div>
              <h4 className="font-display font-bold text-sm text-stone-900 leading-tight">
                {showLocal ? plot.nameLocal : plot.nameEn}
              </h4>
              <p className="text-xs text-stone-500 leading-snug mt-1.5 line-clamp-2">
                {showLocal ? plot.descriptionLocal : plot.descriptionEn}
              </p>
            </div>

            <div className="flex items-center gap-1.5 pt-2 border-t border-stone-100/40 text-[10px] font-mono font-bold uppercase text-stone-500 tracking-wider">
              <span>N:{plot.data.nitrogen}</span>
              <span>•</span>
              <span>P:{plot.data.phosphorus}</span>
              <span>•</span>
              <span>K:{plot.data.potassium}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

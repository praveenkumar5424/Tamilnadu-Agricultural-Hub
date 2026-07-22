import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize GoogleGenAI SDK with server-side API Key
// We set User-Agent to 'aistudio-build' for telemetry as required by guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

app.use(express.json({ limit: "15mb" }));

// Helper function to strip base64 prefix
function getBase64Image(dataUrl: string) {
  const matches = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
  if (matches && matches.length === 3) {
    return {
      mimeType: matches[1],
      data: matches[2],
    };
  }
  // If not a data url, return as is (assuming raw base64)
  return {
    mimeType: "image/jpeg",
    data: dataUrl,
  };
}

// Simulated regional data for Jharkhand markets
const JHARKHAND_MANDIS = [
  {
    mandi: "Ranchi Mandi",
    district: "Ranchi",
    crops: [
      { name: "Paddy (Dhan)", price: 2183, unit: "Quintal", trend: "stable", demand: "High", category: "Kharif Grain" },
      { name: "Maize (Makka)", price: 1960, unit: "Quintal", trend: "up", demand: "Medium", category: "Coarse Grain" },
      { name: "Potato (Aloo)", price: 1350, unit: "Quintal", trend: "down", demand: "High", category: "Vegetable" },
      { name: "Tomato (Tamatar)", price: 2100, unit: "Quintal", trend: "up", demand: "High", category: "Vegetable" },
      { name: "Mustard (Sarson)", price: 5450, unit: "Quintal", trend: "stable", demand: "Medium", category: "Oilseed" }
    ]
  },
  {
    mandi: "Hazaribagh Mandi",
    district: "Hazaribagh",
    crops: [
      { name: "Paddy (Dhan)", price: 2200, unit: "Quintal", trend: "up", demand: "High", category: "Kharif Grain" },
      { name: "Wheat (Gehun)", price: 2275, unit: "Quintal", trend: "stable", demand: "High", category: "Rabi Grain" },
      { name: "Mustard (Sarson)", price: 5500, unit: "Quintal", trend: "up", demand: "High", category: "Oilseed" },
      { name: "Gram (Chana)", price: 5335, unit: "Quintal", trend: "up", demand: "High", category: "Pulse" },
      { name: "Brinjal (Baingan)", price: 1200, unit: "Quintal", trend: "down", demand: "Medium", category: "Vegetable" }
    ]
  },
  {
    mandi: "Dumka Mandi (Santhal Pargana)",
    district: "Dumka",
    crops: [
      { name: "Paddy (Dhan)", price: 2150, unit: "Quintal", trend: "stable", demand: "High", category: "Kharif Grain" },
      { name: "Black Gram (Urad)", price: 6800, unit: "Quintal", trend: "up", demand: "High", category: "Pulse" },
      { name: "Pigeon Pea (Arhar)", price: 7200, unit: "Quintal", trend: "up", demand: "High", category: "Pulse" },
      { name: "Sweet Potato (Shakarkand)", price: 1600, unit: "Quintal", trend: "stable", demand: "Medium", category: "Tuber" }
    ]
  },
  {
    mandi: "Dhanbad Mandi",
    district: "Dhanbad",
    crops: [
      { name: "Rice (Chawal)", price: 3250, unit: "Quintal", trend: "up", demand: "High", category: "Processed Grain" },
      { name: "Onion (Pyaj)", price: 2400, unit: "Quintal", trend: "stable", demand: "High", category: "Vegetable" },
      { name: "Potato (Aloo)", price: 1400, unit: "Quintal", trend: "down", demand: "High", category: "Vegetable" },
      { name: "Cabbage (Patta Gobi)", price: 1000, unit: "down", demand: "Medium", category: "Vegetable" }
    ]
  }
];

const JHARKHAND_WEATHER = {
  "Ranchi": { temp: 28, humidity: 82, rainfall: "12mm", condition: "Monsoon Showers", wind: "14 km/h", advisory: "Sowing of Paddy (Kharif) is highly recommended. Ensure proper drainage in fields." },
  "Hazaribagh": { temp: 27, humidity: 85, rainfall: "18mm", condition: "Heavy Rain", wind: "16 km/h", advisory: "Postpone pesticide spraying due to active rainfall. Clean field drainage channels." },
  "Dumka": { temp: 29, humidity: 80, rainfall: "8mm", condition: "Light Rain", wind: "12 km/h", advisory: "Favorable conditions for transplantation of paddy nursery. Apply urea in split doses." },
  "Dhanbad": { temp: 30, humidity: 78, rainfall: "5mm", condition: "Cloudy", wind: "10 km/h", advisory: "Ideal weather for weeding and land preparation for maize and pulses." },
  "Jamshedpur": { temp: 31, humidity: 75, rainfall: "4mm", condition: "Partly Cloudy", wind: "9 km/h", advisory: "Maintain soil moisture for vegetable nurseries. Monitor for early shoot borer." }
};

// Simulated regional data for Tamil Nadu markets
const TAMIL_NADU_MANDIS = [
  {
    mandi: "Coimbatore Mandi",
    district: "Coimbatore",
    crops: [
      { name: "Paddy (Nellu)", price: 2350, unit: "Quintal", trend: "up", demand: "High", category: "Grain" },
      { name: "Turmeric (Manjal)", price: 8400, unit: "Quintal", trend: "up", demand: "High", category: "Spice" },
      { name: "Groundnut (Verkadalai)", price: 6900, unit: "Quintal", trend: "stable", demand: "Medium", category: "Oilseed" },
      { name: "Cotton (Paruthi)", price: 7200, unit: "Quintal", trend: "up", demand: "High", category: "Fiber" },
      { name: "Coconut (Thennai)", price: 1800, unit: "100 pcs", trend: "down", demand: "High", category: "Horticulture" }
    ]
  },
  {
    mandi: "Thanjavur Mandi",
    district: "Thanjavur",
    crops: [
      { name: "Paddy (Nellu - Samba)", price: 2420, unit: "Quintal", trend: "up", demand: "High", category: "Grain" },
      { name: "Black Gram (Ulundu)", price: 7100, unit: "Quintal", trend: "stable", demand: "High", category: "Pulse" },
      { name: "Sugarcane (Karumbu)", price: 310, unit: "Ton", trend: "stable", demand: "High", category: "Sugar" },
      { name: "Banana (Vazhai)", price: 450, unit: "Bunch", trend: "up", demand: "Medium", category: "Fruit" }
    ]
  },
  {
    mandi: "Madurai Mandi",
    district: "Madurai",
    crops: [
      { name: "Paddy (Nellu)", price: 2280, unit: "Quintal", trend: "stable", demand: "Medium", category: "Grain" },
      { name: "Malli (Jasmine)", price: 15000, unit: "Quintal", trend: "up", demand: "High", category: "Flower" },
      { name: "Tomato (Thakkali)", price: 1800, unit: "Quintal", trend: "down", demand: "High", category: "Vegetable" },
      { name: "Chilli (Milagai)", price: 12000, unit: "Quintal", trend: "up", demand: "High", category: "Spice" }
    ]
  },
  {
    mandi: "Salem Mandi",
    district: "Salem",
    crops: [
      { name: "Tapioca (Maravalli Kizhangu)", price: 2100, unit: "Quintal", trend: "up", demand: "High", category: "Tuber" },
      { name: "Mango (Mampazham)", price: 4500, unit: "Quintal", trend: "stable", demand: "Medium", category: "Fruit" },
      { name: "Sorghum (Cholam)", price: 2600, unit: "Quintal", trend: "up", demand: "Medium", category: "Millet" },
      { name: "Turmeric (Manjal)", price: 8250, unit: "Quintal", trend: "stable", demand: "High", category: "Spice" }
    ]
  }
];

const TAMIL_NADU_WEATHER = {
  "Coimbatore": { temp: 30, humidity: 65, rainfall: "2mm", condition: "Partly Cloudy", wind: "18 km/h", advisory: "Favorable conditions for sowing Cotton and Turmeric. Maintain efficient micro-irrigation." },
  "Thanjavur": { temp: 34, humidity: 75, rainfall: "0mm", condition: "Sunny", wind: "12 km/h", advisory: "Samba Paddy sowing/transplantation is in full swing. Ensure continuous irrigation using traditional Eri tanks." },
  "Madurai": { temp: 36, humidity: 55, rainfall: "0mm", condition: "Dry and Warm", wind: "14 km/h", advisory: "Protect crops from high heat. Drip irrigation is highly recommended. Apply mulch to conserve soil moisture." },
  "Salem": { temp: 32, humidity: 60, rainfall: "1mm", condition: "Clear Sky", wind: "10 km/h", advisory: "Excellent period for weeding and soil loosening for Tapioca and Turmeric crops." },
  "Trichy": { temp: 35, humidity: 62, rainfall: "0mm", condition: "Hot and Humid", wind: "13 km/h", advisory: "Monitor Paddy fields for blast disease. Apply recommended organic bio-fertilizers like Panchagavya." }
};

// 1. API: Get Weather & Market Information (Simulated Live Multi-Region Feed)
app.get("/api/weather-market", (req, res) => {
  res.json({
    jharkhand: {
      mandis: JHARKHAND_MANDIS,
      weather: JHARKHAND_WEATHER
    },
    tamilnadu: {
      mandis: TAMIL_NADU_MANDIS,
      weather: TAMIL_NADU_WEATHER
    },
    // Backwards compatible defaults
    mandis: TAMIL_NADU_MANDIS,
    weather: TAMIL_NADU_WEATHER,
    lastUpdated: new Date().toISOString()
  });
});

// 2. API: Crop Recommendations based on Soil, Weather, Region, Rotation
app.post("/api/recommend", async (req, res) => {
  const {
    region,
    ph,
    nitrogen,
    phosphorus,
    potassium,
    moisture,
    pastCrop,
    requestedLanguage = "en",
    state = "tamilnadu"
  } = req.body;

  // Validate presence of key fields
  if (!region || !ph) {
    return res.status(400).json({ error: "Missing required fields: region and pH are mandatory." });
  }

  // Construct structured prompt for Gemini based on State
  let prompt = "";
  if (state === "tamilnadu") {
    prompt = `
      You are Tamil Nadu Agricultural Gyaan, a brilliant full-stack agricultural AI scientist specializing in southern India, particularly Tamil Nadu's diverse agro-climatic zones.
      Analyze the following farmer's environmental parameters:
      - Region/District in Tamil Nadu: ${region}
      - Soil pH: ${ph}
      - Soil Nutrients: Nitrogen (N): ${nitrogen || "Unknown"} mg/kg, Phosphorus (P): ${phosphorus || "Unknown"} mg/kg, Potassium (K): ${potassium || "Unknown"} mg/kg
      - Soil Moisture: ${moisture || "Medium"}%
      - Previous Crop Cultivated: ${pastCrop || "None"}
      - Target Language for Local Translations: ${requestedLanguage} (e.g., ta for Tamil, or en for English)

      Please determine:
      1. The top 3 most recommended, high-yielding, and soil-appropriate crops for this farmer that fit the current monsoon/season. Tamil Nadu has diverse soils (Karisal/black cotton soil, Semman/red loamy, Vandal/fertile alluvial delta clay, and coastal sandy) and tropical wet-dry climate governed by South-West and North-East monsoons (Samba, Kuruvai, Thaladi seasons).
      2. Suggest a sustainable crop rotation plan keeping in mind the past crop to preserve soil fertility (like leguminous crop sequence like Black Gram/Ulundu or Green Gram/Pasi Payaru).
      3. Generate estimated yield, profit margin, water requirements, and sustainability score.
      
      Provide your response in JSON matching the exact schema specified. Keep the local crop name translated perfectly in ${requestedLanguage} (use proper Tamil names like 'நெல்லு' for Paddy, 'மஞ்சள்' for Turmeric, 'கரும்பு' for Sugarcane, 'பருத்தி' for Cotton, etc.).
    `;
  } else if (state === "jharkhand") {
    prompt = `
      You are Tamil Nadu Agricultural Gyaan, a brilliant full-stack agricultural AI scientist specializing in eastern India, particularly Jharkhand's plateau and hill zones.
      Analyze the following farmer's environmental parameters:
      - Region/District in Jharkhand: ${region}
      - Soil pH: ${ph}
      - Soil Nutrients: Nitrogen (N): ${nitrogen || "Unknown"} mg/kg, Phosphorus (P): ${phosphorus || "Unknown"} mg/kg, Potassium (K): ${potassium || "Unknown"} mg/kg
      - Soil Moisture: ${moisture || "Medium"}%
      - Previous Crop Cultivated: ${pastCrop || "None"}
      - Target Language for Local Translations: ${requestedLanguage} (e.g., hi for Hindi, bn for Bengali, sat for Santhali, or en for English)

      Please determine:
      1. The top 3 most recommended, high-yielding, and soil-appropriate crops for this farmer that fit the monsoon/season. Jharkhand mostly has acidic red-loamy soil (low pH 5.0 to 6.5) and Chota Nagpur plateau topography (upland/don lands).
      2. Suggest a sustainable crop rotation plan keeping in mind the past crop to preserve soil fertility (like leguminous crop sequence like black gram / Urad or pigeon pea / Arhar).
      3. Generate estimated yield, profit margin, water requirements, and sustainability score.
      
      Provide your response in JSON matching the exact schema specified. Keep the local crop name translated perfectly in ${requestedLanguage}.
    `;
  } else {
    prompt = `
      You are Tamil Nadu Agricultural Gyaan, a brilliant full-stack agricultural AI scientist specializing in the diverse agro-climatic zones of India.
      Analyze the following farmer's environmental parameters:
      - State of India: ${state}
      - Region/District in ${state}: ${region}
      - Soil pH: ${ph}
      - Soil Nutrients: Nitrogen (N): ${nitrogen || "Unknown"} mg/kg, Phosphorus (P): ${phosphorus || "Unknown"} mg/kg, Potassium (K): ${potassium || "Unknown"} mg/kg
      - Soil Moisture: ${moisture || "Medium"}%
      - Previous Crop Cultivated: ${pastCrop || "None"}
      - Target Language for Local Translations: ${requestedLanguage}

      Please determine:
      1. The top 3 most recommended, high-yielding, and soil-appropriate crops for this farmer that fit the current regional monsoon/season of the state of ${state} and district of ${region}. Use your expert knowledge of typical local soil chemistry, water availability, and traditional or modern high-value crops in that region.
      2. Suggest a sustainable crop rotation plan keeping in mind the past crop to preserve soil fertility (such as introducing regional nitrogen-fixing pulses or green manure).
      3. Generate estimated yield, profit margin, water requirements, and sustainability score.
      
      Provide your response in JSON matching the exact schema specified. Keep the local crop name translated perfectly in ${requestedLanguage} (e.g. use proper local script and regional terms).
    `;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedCrops: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  cropName: { type: Type.STRING },
                  cropNameLocal: { type: Type.STRING, description: "Translation/representation of the crop name in " + requestedLanguage },
                  suitabilityScore: { type: Type.INTEGER, description: "Suitability percent from 1 to 100" },
                  expectedYield: { type: Type.STRING, description: "Yield range (e.g., '12-16 Quintals / Acre' or '40-50 Tonnes / Acre')" },
                  sowingWindow: { type: Type.STRING, description: "Month window for sowing" },
                  duration: { type: Type.STRING, description: "Crop duration in days" },
                  estimatedCost: { type: Type.INTEGER, description: "Estimated cultivation cost in INR per acre" },
                  estimatedRevenue: { type: Type.INTEGER, description: "Estimated gross revenue in INR per acre based on market prices" },
                  profitMargin: { type: Type.INTEGER, description: "Net profit margin percentage (Revenue - Cost) / Revenue * 100" },
                  sustainabilityScore: { type: Type.INTEGER, description: "Score 1-100 of how sustainable it is for the soil" },
                  sustainabilityReason: { type: Type.STRING, description: "Reason why this is sustainable, particularly mentioning soil health effects or crop rotation" },
                  waterRequirement: { type: Type.STRING, description: "Low, Medium, High" },
                  fertilizerRequirement: { type: Type.STRING, description: "e.g., N: 60, P: 30, K: 30 kg/acre or organic alternatives like Panchagavya, Jeevamrutham, Vermicompost" },
                  keyRisks: { type: Type.STRING, description: "Known diseases, pest risks, or weather risks in the region" }
                },
                required: [
                  "cropName", "cropNameLocal", "suitabilityScore", "expectedYield", 
                  "sowingWindow", "duration", "estimatedCost", "estimatedRevenue", 
                  "profitMargin", "sustainabilityScore", "sustainabilityReason", 
                  "waterRequirement", "fertilizerRequirement", "keyRisks"
                ]
              }
            },
            soilHealthAssessment: { type: Type.STRING, description: "Brief plain text evaluation of soil pH and nutrient status based on regional soil conditions (mentioning red sandy loam/plateau soils for Jharkhand, or alluvial/black cotton/red clayey for Tamil Nadu)." },
            cropRotationSuggestion: { type: Type.STRING, description: "Practical advice on crop sequence to prevent exhaustion of nutrients." }
          },
          required: ["recommendedCrops", "soilHealthAssessment", "cropRotationSuggestion"]
        }
      }
    });

    const jsonText = response.text || "{}";
    res.json(JSON.parse(jsonText));
  } catch (error: any) {
    console.error("Failed to generate recommendations:", error);
    res.status(500).json({ error: "Failed to generate recommendations. Please try again.", details: error.message });
  }
});

// 3. API: Image-based Crop Disease Detection
app.post("/api/analyze-crop-disease", async (req, res) => {
  const { imageBase64, language = "en" } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: "Missing required parameter imageBase64." });
  }

  try {
    const { mimeType, data } = getBase64Image(imageBase64);
    
    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: data,
      },
    };

    const textPart = {
      text: `
        Analyze this agricultural crop image. Identify if the plant is healthy, diseased, or suffering from nutrient deficiency.
        Provide the response strictly in JSON format.
        Translate all explanations, disease names, symptoms, and remedies into the requested language: "${language}" (such as hi for Hindi, bn for Bengali, sat for Santhali, ta for Tamil, en for English). 
        Ensure that the tone is helpful and actions are highly practical and affordable for a small-holder farmer in India (preferring low-cost organic options like Panchagavya, Neem Seed Kernel Extract, Cow Urine alongside safe chemical recommendations with precise dosage instructions).
      `
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            healthStatus: { type: Type.STRING, description: "e.g., 'Diseased', 'Healthy', 'Nutrient Deficient', 'Pest Attack'" },
            diseaseName: { type: Type.STRING, description: "Name of the disease or pest or deficiency in the requested language" },
            diseaseNameEnglish: { type: Type.STRING, description: "Scientific or English common name" },
            severity: { type: Type.STRING, description: "Low, Medium, or High" },
            symptoms: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of observable symptoms in the image" },
            causes: { type: Type.STRING, description: "What causes this condition (fungus, bacteria, watering, weather, etc.)" },
            organicControl: { type: Type.STRING, description: "Immediate low-cost organic, natural, or biological remedies (e.g. neem oil, Panchagavya, ash spray)" },
            chemicalControl: { type: Type.STRING, description: "Standard chemical pesticides or fungicides if severe, with dosage instructions" },
            preventionTips: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Tips to prevent this in the next cropping cycle" }
          },
          required: [
            "healthStatus", "diseaseName", "diseaseNameEnglish", "severity", 
            "symptoms", "causes", "organicControl", "chemicalControl", "preventionTips"
          ]
        }
      }
    });

    const jsonText = response.text || "{}";
    res.json(JSON.parse(jsonText));
  } catch (error: any) {
    console.error("Failed to analyze crop disease:", error);
    res.status(500).json({ error: "Failed to analyze plant disease. Please try again.", details: error.message });
  }
});

// 4. API: Conversational Multilingual Chatbot (TN AI Mitra)
app.post("/api/chat", async (req, res) => {
  const { messages, language = "en", state = "tamilnadu" } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request. messages must be an array." });
  }

  // Format messages into contents format for chats
  // The system instruction specifies the persona depending on the State selected
  let systemInstruction = "";
  if (state === "tamilnadu") {
    systemInstruction = `
      You are 'Tamil Nadu Agricultural Mitra' (தமிழ்நாடு அக்ரி-மித்ரா), a supportive, respectful agricultural expert chatbot specializing in Tamil Nadu, India.
      Your mission is to guide farmers with highly practical, scientific, yet low-cost organic-friendly advice.
      You must reply in the language requested by the farmer (current language: ${language}). If they speak in Tamil, communicate in natural, friendly Tamil (using beautiful Tamil script).
      Provide guidance on:
      - Crops suitable for Tamil Nadu (Paddy/Nellu, Sugarcane/Karumbu, Turmeric/Manjal, Groundnut, Cotton, Cholam, Millets).
      - Natural farming, organic liquid manure (Panchagavya, Jeevamrutham, Vermicompost).
      - Water harvesting (Eri tanks, farm ponds / Pannai Kuttai, drip/sprinkler micro-irrigation).
      - Tamil Nadu State Schemes (Kalaignar All Village Integrated Agricultural Development Programme - KAVIADP, Chief Minister's Solar Pump Scheme, Organic Farming Mission).
      Keep your answers clear, brief, structured with bullet points, and highly encouraging. Use warm, regional metaphors.
    `;
  } else if (state === "jharkhand") {
    systemInstruction = `
      You are 'Tamil Nadu Agricultural Mitra', a supportive, respectful agricultural expert chatbot in Jharkhand, India.
      Your mission is to guide farmers with highly practical, scientific, yet low-cost organic-friendly advice.
      You must reply in the language requested by the farmer (current language: ${language}). If they speak in Hindi, Bengali, or Santhali, communicate in that language (using Devanagari, Bengali, or Roman script as natural).
      Provide guidance on:
      - Crops suitable for Jharkhand (Red soil, upland/don lands, millets/Mandua, Pigeon Pea/Arhar, pulses).
      - Natural farming, organic compost (Jeevamrut, Vermicompost, Neem Astra).
      - Water harvesting (Dobha construction, drip irrigation, check dams).
      - Jharkhand State Schemes (Birsa Harit Gram Yojana, Jharkhand Fasal Rahat Yojana, Nilamber-Pitamber Jal Samridhi Yojana).
      Keep your answers clear, brief, structured with bullet points, and highly encouraging. Use warm, regional metaphors.
    `;
  } else {
    systemInstruction = `
      You are 'Tamil Nadu Agricultural Mitra', a supportive, respectful agricultural expert chatbot specializing in the state of ${state}, India.
      Your mission is to guide farmers with highly practical, scientific, yet low-cost organic-friendly advice tailored specifically to the regional conditions of ${state}, India.
      You must reply in the language requested by the farmer (current language: ${language}). Speak in their chosen language in a warm, helpful, clear, and natural manner.
      Provide guidance on:
      - Crops suitable for ${state} based on local soil profiles, typical water availability, and regional practices.
      - Natural farming, organic compost (Jeevamrut, Vermicompost, Neem Astra, Panchagavya, organic fertilizers).
      - Water harvesting, micro-irrigation, and region-appropriate conservation methods.
      - Relevant state and central agricultural schemes, seeds, and local crop care.
      Keep your answers clear, brief, structured with bullet points, and highly encouraging.
    `;
  }

  try {
    // Format messages for gemini: role 'user' or 'model'
    const formattedContents = messages.slice(-8).map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text || "I apologize, I could not formulate a response. Please try again." });
  } catch (error: any) {
    console.error("Failed during chat execution:", error);
    res.status(500).json({ error: "Failed to generate response.", details: error.message });
  }
});

// Vite Middleware & SPA serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

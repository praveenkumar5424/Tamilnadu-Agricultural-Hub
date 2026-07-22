import React from "react";
import { Database, MapPin, RefreshCw, Sparkles, Sprout } from "lucide-react";
import { SoilData, SupportedLanguage } from "../types";
import { translations } from "../translations";
import { INDIA_STATES } from "../indiaData";
import InteractiveFieldPlanner from "./InteractiveFieldPlanner";

interface SoilFormProps {
  soilForm: SoilData;
  setSoilForm: React.Dispatch<React.SetStateAction<SoilData>>;
  isAnalyzingSoil: boolean;
  onGetRecommendation: (e: React.FormEvent) => void;
  onSatelliteScan: () => void;
  language: SupportedLanguage;
  selectedState?: string;
}

export default function SoilForm({
  soilForm,
  setSoilForm,
  isAnalyzingSoil,
  onGetRecommendation,
  onSatelliteScan,
  language,
  selectedState = "tamilnadu",
}: SoilFormProps) {
  const t = translations[language];

  // Callback from InteractiveFieldPlanner to populate the form
  const handleSelectPlot = (selectedData: SoilData) => {
    setSoilForm(selectedData);
  };

  const isTamil = language === "ta";

  // Dynamic label for field region depending on state
  const stateInfo = INDIA_STATES.find(s => s.id === selectedState);
  const stateName = stateInfo ? stateInfo.name : "Tamil Nadu";

  const fieldRegionText = isTamil ? "தமிழ்நாடு மாவட்டம் / பிராந்தியம்" : "Tamil Nadu District / Region";

  // Dynamic placeholder text for pH range depending on state
  const phPlaceholderText = isTamil ? "எ.கா., 6.8 (தமிழ்நாடு மண் பெரும்பாலும் 6.0 முதல் 7.8 வரை இருக்கும்)" : "e.g., 6.8 (Tamil Nadu soils are mostly 6.0 to 7.8)";

  // Dynamic subtitle override for Tamil Nadu state context
  const subtitleOverride = isTamil ? "உங்கள் வயல் ஆயத்தொலைவுகள், மண் அளவீடுகளை உள்ளிடவும் அல்லது தமிழ்நாட்டின் கரிசல் மற்றும் காவிரி வண்டல் மண் நிலங்களுக்கு தானியங்கி IoT/செயற்கைக்கோள் மதிப்பீட்டைத் தொடங்கவும்." : "Enter your field coordinates, soil measurements, or trigger automated IoT/satellite estimation for Tamil Nadu's fertile black, red, and Kaveri alluvial lands.";

  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-display font-black text-stone-900 flex items-center gap-2.5">
          <Database className="w-5.5 h-5.5 text-emerald-700" />
          {t.soilHeader}
        </h2>
        <p className="text-xs md:text-sm text-stone-500 mt-1.5 leading-relaxed">
          {subtitleOverride}
        </p>
      </div>

      {/* Visual Plot Planner integrated directly in form flow */}
      <div className="p-5.5 rounded-[1.8rem] bg-stone-50 border border-stone-200/80 space-y-4">
        <div className="flex items-center gap-2 text-stone-900 font-display font-bold text-sm">
          <Sprout className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>
            {isTamil ? "விளக்கக் காட்சி வயல் கட்டம்" : "Kisan Field Grid Quick-Load"}
          </span>
        </div>
        <InteractiveFieldPlanner
          onSelectPlot={handleSelectPlot}
          currentRegion={soilForm.region}
          language={language}
          state={selectedState}
        />
      </div>

      {/* Actual Form */}
      <form onSubmit={onGetRecommendation} className="space-y-5">
        {/* District Select */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-emerald-800 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {fieldRegionText}
          </label>
          <select
            value={soilForm.region}
            onChange={(e) => setSoilForm({ ...soilForm, region: e.target.value })}
            className="w-full bg-white border border-stone-200 text-stone-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 transition-all cursor-pointer font-medium"
          >
            {(() => {
              const stateInfo = INDIA_STATES.find(s => s.id === selectedState);
              if (stateInfo) {
                return stateInfo.districts.map(dist => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ));
              }
              return (
                <>
                  <option value="Ranchi">Ranchi</option>
                  <option value="Coimbatore">Coimbatore</option>
                </>
              );
            })()}
          </select>
        </div>

        {/* pH and Moisture row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-emerald-800 mb-1.5">
              {t.fieldPH}
            </label>
            <input
              type="text"
              value={soilForm.ph}
              onChange={(e) => setSoilForm({ ...soilForm, ph: e.target.value })}
              placeholder={phPlaceholderText}
              className="w-full bg-white border border-stone-200 text-stone-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 transition-all placeholder:text-stone-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-emerald-800 mb-1.5">
              {t.fieldMoisture}
            </label>
            <input
              type="text"
              value={soilForm.moisture}
              onChange={(e) => setSoilForm({ ...soilForm, moisture: e.target.value })}
              placeholder={t.moisturePlaceholder}
              className="w-full bg-white border border-stone-200 text-stone-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 transition-all placeholder:text-stone-400 font-mono"
            />
          </div>
        </div>

        {/* NPK Matrix Card */}
        <div className="border border-stone-200/80 bg-stone-50/50 rounded-[1.5rem] p-4.5 space-y-3.5">
          <span className="text-[10px] font-mono font-bold uppercase text-stone-400 tracking-wider block">
            NPK Soil Nutrient Array (mg/kg)
          </span>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[10px] font-mono font-bold text-stone-600 mb-1">Nitrogen (N)</label>
              <input
                type="text"
                value={soilForm.nitrogen}
                onChange={(e) => setSoilForm({ ...soilForm, nitrogen: e.target.value })}
                placeholder="e.g. 45"
                className="w-full bg-white border border-stone-200 text-stone-900 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 transition-all placeholder:text-stone-400 font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono font-bold text-stone-600 mb-1">Phosphorus (P)</label>
              <input
                type="text"
                value={soilForm.phosphorus}
                onChange={(e) => setSoilForm({ ...soilForm, phosphorus: e.target.value })}
                placeholder="e.g. 18"
                className="w-full bg-white border border-stone-200 text-stone-900 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 transition-all placeholder:text-stone-400 font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono font-bold text-stone-600 mb-1">Potassium (K)</label>
              <input
                type="text"
                value={soilForm.potassium}
                onChange={(e) => setSoilForm({ ...soilForm, potassium: e.target.value })}
                placeholder="e.g. 120"
                className="w-full bg-white border border-stone-200 text-stone-900 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 transition-all placeholder:text-stone-400 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Previous crop */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-emerald-800 mb-1.5">
            {t.fieldPastCrop}
          </label>
          <input
            type="text"
            value={soilForm.pastCrop}
            onChange={(e) => setSoilForm({ ...soilForm, pastCrop: e.target.value })}
            placeholder={t.pastCropPlaceholder}
            className="w-full bg-white border border-stone-200 text-stone-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 transition-all placeholder:text-stone-400 font-medium"
          />
        </div>

        {/* Action Button Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          <button
            type="button"
            onClick={onSatelliteScan}
            disabled={isAnalyzingSoil}
            className="w-full bg-stone-100 border border-stone-300 hover:bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider py-4 px-4 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-stone-600 ${isAnalyzingSoil ? "animate-spin" : ""}`} />
            {isTamil ? "சென்சார் தானியங்கி லோட்" : "Auto-Load Sensors"}
          </button>

          <button
            type="submit"
            disabled={isAnalyzingSoil}
            className="w-full bg-emerald-800 hover:bg-emerald-700 disabled:bg-emerald-900/60 text-white text-xs font-bold uppercase tracking-wider py-4 px-4 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-900/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            {isAnalyzingSoil ? t.btnAnalyzing : t.btnGetRecommendation}
          </button>
        </div>
      </form>
    </div>
  );
}

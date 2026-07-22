import React from "react";
import { motion } from "motion/react";
import { 
  Sun, 
  Search, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus,
  Sparkles
} from "lucide-react";
import { WeatherData, MandiData, SupportedLanguage } from "../types";
import { translations } from "../translations";
import { INDIA_STATES } from "../indiaData";

interface WeatherMandiSidebarProps {
  selectedDistrict: string;
  onSelectDistrict: (district: string) => void;
  weatherData: Record<string, WeatherData>;
  mandis: MandiData[];
  mandiSearch: string;
  onMandiSearchChange: (search: string) => void;
  language: SupportedLanguage;
  selectedState?: string;
}

export default function WeatherMandiSidebar({
  selectedDistrict,
  onSelectDistrict,
  weatherData,
  mandis,
  mandiSearch,
  onMandiSearchChange,
  language,
  selectedState = "tamilnadu",
}) {
  const t = translations[language];

  const currentWeatherData = weatherData[selectedDistrict] || {
    temp: 28,
    humidity: 82,
    rainfall: "12mm",
    condition: "Monsoon Showers",
    wind: "12 km/h",
    advisory: "Sowing of Paddy is highly recommended. Ensure proper drainage in fields."
  };

  const formatINR = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);
  };

  const isTamil = language === "ta";

  // Dynamic overrides for state-specific weather sidebar
  const stateInfo = INDIA_STATES.find(s => s.id === selectedState);
  const stateName = stateInfo ? stateInfo.name : "Tamil Nadu";

  const weatherTitleText = isTamil ? "தமிழ்நாடு வானிலை & அக்ரோ முன்னறிவிப்பு" : "Tamil Nadu Weather & Agro Forecast";

  const weatherBadgeText = isTamil ? "காவிரி டெல்டா ஏர் லிங்க்" : "Kaveri Delta Air Link";

  const marketTitleText = isTamil ? "நேரடி தமிழ்நாடு மண்டி விலை பட்டியல்" : "Live Tamil Nadu Mandi Price Index";

  // e-NAM and scraper sources
  const sourceText = isTamil ? "நேரடி TN e-NAM சந்தை தரவு" : "Live TN e-NAM Integrated Feed";

  // Filtered crops based on search query
  const filteredCrops = mandis.flatMap((mandiGroup) => 
    mandiGroup.crops
      .filter(crop => crop.name.toLowerCase().includes(mandiSearch.toLowerCase()))
      .map(crop => ({
        ...crop,
        mandi: mandiGroup.mandi,
        district: mandiGroup.district
      }))
  );

  return (
    <div className="space-y-6 lg:h-[calc(100vh-140px)] lg:overflow-y-auto lg:pr-2 scrollbar-thin">
      {/* SECTION 1: METEOROLOGICAL FORECAST */}
      <div className="bg-white border border-stone-200/80 rounded-[2rem] p-5.5 space-y-4.5 shadow-[0_4px_24px_rgba(28,25,23,0.01)] relative overflow-hidden">
        {/* Background watermark */}
        <div className="absolute -right-8 -top-8 text-stone-100 opacity-20 pointer-events-none">
          <Sun className="w-32 h-32 animate-spin-slow" />
        </div>

        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-500 animate-pulse" />
            <h3 className="font-display font-black text-stone-900 tracking-tight text-sm">
              {weatherTitleText}
            </h3>
          </div>
          <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-100/50 uppercase tracking-wider shrink-0">
            {weatherBadgeText}
          </span>
        </div>

        {/* District Selection Chips */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider block">
            📍 Selector Location
          </span>
          {Object.keys(weatherData).length > 6 ? (
            <div className="space-y-2">
              <select
                value={selectedDistrict}
                onChange={(e) => onSelectDistrict(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 text-stone-900 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 transition-all cursor-pointer font-bold"
              >
                {Object.keys(weatherData).sort().map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
              {/* Quick Select Buttons for Main TN Districts */}
              {selectedState === "tamilnadu" && (
                <div className="flex flex-wrap gap-1">
                  {["Coimbatore", "Thanjavur", "Madurai", "Salem", "Trichy"].filter(d => weatherData[d]).map((dist) => (
                    <button
                      key={dist}
                      type="button"
                      onClick={() => onSelectDistrict(dist)}
                      className={`px-2 py-1 text-[9px] font-bold rounded-lg border transition-all cursor-pointer ${
                        selectedDistrict === dist
                          ? "bg-stone-900 text-white border-stone-900"
                          : "bg-stone-50 text-stone-500 border-stone-200/50 hover:bg-stone-100 hover:text-stone-800"
                      }`}
                    >
                      {dist}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(weatherData).map((dist) => (
                <button
                  key={dist}
                  type="button"
                  onClick={() => onSelectDistrict(dist)}
                  className={`px-3 py-1.5 text-[11px] font-bold rounded-xl border transition-all cursor-pointer ${
                    selectedDistrict === dist
                      ? "bg-stone-900 text-white border-stone-900 shadow-md"
                      : "bg-stone-50 text-stone-600 border-stone-200/60 hover:bg-stone-100/80 hover:text-stone-900"
                  }`}
                >
                  {dist}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Climate Details */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/50 to-orange-50/30 border border-amber-100/40">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-display font-black tracking-tight text-stone-950">
              {currentWeatherData.temp}°C
            </span>
            <span className="text-xs text-amber-800 font-display font-bold uppercase tracking-wide">
              {currentWeatherData.condition}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-stone-200/50 text-[10px] font-mono text-stone-500">
            <div>
              <span className="block text-stone-400 font-bold uppercase tracking-widest">{t.humidityText}</span>
              <span className="text-xs text-stone-800 font-black">{currentWeatherData.humidity}%</span>
            </div>
            <div>
              <span className="block text-stone-400 font-bold uppercase tracking-widest">{t.rainfallText}</span>
              <span className="text-xs text-stone-800 font-black">{currentWeatherData.rainfall}</span>
            </div>
            <div>
              <span className="block text-stone-400 font-bold uppercase tracking-widest">{t.windText}</span>
              <span className="text-xs text-stone-800 font-black">{currentWeatherData.wind}</span>
            </div>
          </div>
        </div>

        {/* Micro Agromet Advisory */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4.5 space-y-2">
          <div className="flex items-center gap-1.5 text-emerald-800 text-[10px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            {t.advisoryTitle}
          </div>
          <p className="text-xs leading-relaxed text-stone-600 font-sans">
            {currentWeatherData.advisory}
          </p>
        </div>
      </div>

      {/* SECTION 2: LIVE e-NAM MARKET INDEX */}
      <div className="bg-white border border-stone-200/80 rounded-[2rem] p-5.5 space-y-4 shadow-[0_4px_24px_rgba(28,25,23,0.01)]">
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <h3 className="font-display font-black text-stone-900 tracking-tight text-sm">
                {marketTitleText}
              </h3>
            </div>
            <p className="text-[10px] text-stone-400 font-sans">{sourceText}</p>
          </div>
        </div>

        {/* Search input inside sidebar */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
          <input
            type="text"
            value={mandiSearch}
            onChange={(e) => onMandiSearchChange(e.target.value)}
            placeholder={t.searchMandi}
            className="w-full bg-stone-50 border border-stone-200/80 text-stone-900 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 transition-all font-medium placeholder:text-stone-400"
          />
        </div>

        {/* Market Rates List */}
        <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
          {filteredCrops.length > 0 ? (
            filteredCrops.map((crop, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3.5 rounded-2xl border border-stone-100 hover:border-emerald-100 hover:bg-stone-50/50 transition-all"
              >
                <div>
                  <h4 className="text-xs font-display font-bold text-stone-900">{crop.name}</h4>
                  <p className="text-[10px] text-stone-400 mt-0.5 font-sans">
                    {crop.mandi} ({crop.category})
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-xs font-mono font-bold text-stone-900">
                      {formatINR(crop.price)}
                    </span>
                    <span className="text-[9px] text-stone-400 font-sans font-medium">/{crop.unit}</span>
                  </div>
                  
                  {/* Trend Indicator */}
                  <div className="flex items-center justify-end gap-1 mt-0.5 text-[9px] font-mono">
                    {crop.trend === "up" && (
                      <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                        <ArrowUpRight className="w-3 h-3" /> {t.trendUp}
                      </span>
                    )}
                    {crop.trend === "down" && (
                      <span className="text-rose-700 font-bold flex items-center gap-0.5">
                        <ArrowDownRight className="w-3 h-3" /> {t.trendDown}
                      </span>
                    )}
                    {crop.trend === "stable" && (
                      <span className="text-stone-400 font-bold flex items-center gap-0.5">
                        <Minus className="w-2.5 h-2.5" /> {t.trendStable}
                      </span>
                    )}
                    <span className="text-stone-300">•</span>
                    <span className="text-stone-500">{crop.demand}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-xs text-stone-400 border border-dashed border-stone-200 rounded-2xl">
              No crop records match your query.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

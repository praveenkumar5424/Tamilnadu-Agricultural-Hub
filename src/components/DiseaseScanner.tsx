import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, 
  Upload, 
  CornerDownRight, 
  Heart, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles,
  RefreshCw,
  Cpu
} from "lucide-react";
import { DiseaseResult, SupportedLanguage } from "../types";
import { translations } from "../translations";

interface DiseaseScannerProps {
  selectedImage: string | null;
  setSelectedImage: (img: string | null) => void;
  isScanningLeaf: boolean;
  onAnalyzeDisease: () => void;
  diseaseDiagnosis: DiseaseResult | null;
  cameraActive: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  language: SupportedLanguage;
  startCamera: () => void;
  capturePhoto: () => void;
  stopCamera: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DiseaseScanner({
  selectedImage,
  setSelectedImage,
  isScanningLeaf,
  onAnalyzeDisease,
  diseaseDiagnosis,
  cameraActive,
  videoRef,
  fileInputRef,
  language,
  startCamera,
  capturePhoto,
  stopCamera,
  handleImageUpload,
}: DiseaseScannerProps) {
  const t = translations[language];
  const [scanStep, setScanStep] = useState(0);

  // Automated scanning terminal logging
  const scanSteps = [
    language === "ta" ? "செயற்கைக்கோள் இணைப்பை நிறுவுகிறது..." : "Establishing orbital plant-health satellite telemetry link...",
    language === "ta" ? "இலை குளோரோபில் அளவீடுகளை எடுக்கிறது..." : "Reading cellular leaf reflectance & chlorophyll indicators...",
    language === "ta" ? "பாதிக்கப்பட்ட செல்களை ஒப்பிடுகிறது..." : "Matching lesion geometries against Eastern India disease databases...",
    language === "ta" ? "இயற்கை மற்றும் கரிம தீர்வுகளைக் கணக்கிடுகிறது..." : "Compiling organic bio-control & low-cost chemical remedies..."
  ];

  useEffect(() => {
    let interval: any;
    if (isScanningLeaf) {
      setScanStep(0);
      interval = setInterval(() => {
        setScanStep((prev) => (prev < scanSteps.length - 1 ? prev + 1 : prev));
      }, 1000);
    } else {
      setScanStep(0);
    }
    return () => clearInterval(interval);
  }, [isScanningLeaf]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Visual Capture Console - 5 Cols */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <h2 className="text-xl md:text-2xl font-display font-black text-stone-900 flex items-center gap-2.5">
            <Camera className="w-5.5 h-5.5 text-emerald-700" />
            {t.diseaseHeader}
          </h2>
          <p className="text-xs md:text-sm text-stone-500 mt-1.5 leading-relaxed">
            {t.diseaseSubtitle}
          </p>
        </div>

        {/* Interactive Camera Screen */}
        {cameraActive ? (
          <div className="relative aspect-square rounded-[2.5rem] overflow-hidden border border-stone-200 bg-stone-950 flex flex-col items-center justify-center shadow-lg">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
              <button
                type="button"
                onClick={capturePhoto}
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-display font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer transition-colors"
              >
                Capture Picture
              </button>
              <button
                type="button"
                onClick={stopCamera}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-display font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Image Box with Sweeper Laser Overlay */}
            <div 
              onClick={() => !isScanningLeaf && fileInputRef.current?.click()}
              className="aspect-square rounded-[2.5rem] border-2 border-dashed border-stone-200 bg-stone-50/50 hover:bg-stone-50/80 transition-all flex flex-col items-center justify-center p-6 text-center cursor-pointer group shadow-[inset_0_1px_4px_rgba(0,0,0,0.01)] relative overflow-hidden"
            >
              {selectedImage ? (
                <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden shadow-inner">
                  <img src={selectedImage} alt="Uploaded crop leaf view" className="w-full h-full object-cover" />
                  
                  {/* Glowing Laser Scan Effect */}
                  {isScanningLeaf && (
                    <>
                      {/* Laser Bar */}
                      <motion.div 
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "reverse", 
                          duration: 2, 
                          ease: "easeInOut" 
                        }}
                        className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500/20 via-emerald-400 to-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.8)] z-10"
                      />
                      {/* Laser Hue Overlay */}
                      <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none mix-blend-overlay" />
                    </>
                  )}

                  {!isScanningLeaf && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-xs font-bold text-white uppercase tracking-widest bg-stone-900/80 px-4 py-2 rounded-xl border border-stone-700/50">
                        {language === "ta" ? "படத்தை மாற்றவும்" : "Change leaf image"}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 mx-auto shadow-sm group-hover:scale-105 transition-transform">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-sm font-display font-bold text-stone-800 mb-1">
                      {language === "ta" ? "இலை புகைப்படத்தை இங்கே பதிவேற்றவும்" : "Upload or Drop leaf photo"}
                    </h4>
                    <p className="text-xs text-stone-400 max-w-xs leading-relaxed mx-auto font-sans">
                      {language === "ta" ? "சாதனத்திலிருந்து படத்தைத் தேர்ந்தெடுக்க தட்டவும்" : "Avoid blurry shadows or soil backgrounds for the highest clinical diagnostics accuracy."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />

            {/* Launchers Controls */}
            {!isScanningLeaf && (
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="py-3 px-4 bg-white border border-stone-200 hover:border-stone-300 rounded-xl hover:bg-stone-50 text-stone-700 font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  <Upload className="w-4 h-4 text-emerald-600" />
                  {t.btnUploadImage}
                </button>

                <button
                  type="button"
                  onClick={startCamera}
                  className="py-3 px-4 bg-white border border-stone-200 hover:border-stone-300 rounded-xl hover:bg-stone-50 text-stone-700 font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  <Camera className="w-4 h-4 text-emerald-600" />
                  {t.btnCaptureImage}
                </button>
              </div>
            )}

            {/* Active Analyze Button */}
            {selectedImage && !cameraActive && (
              <button
                type="button"
                onClick={onAnalyzeDisease}
                disabled={isScanningLeaf}
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_4px_12px_rgba(16,185,129,0.15)] disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                {isScanningLeaf ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    {t.scanningText}
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4" />
                    {t.btnScanDisease}
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Live Diagnostics Terminal Logs */}
        <AnimatePresence>
          {isScanningLeaf && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-stone-900 text-emerald-400 font-mono text-[10px] p-4.5 rounded-[1.5rem] space-y-2.5 border border-stone-800 shadow-inner"
            >
              <div className="flex items-center justify-between border-b border-stone-800 pb-1.5 text-stone-500">
                <span>SYSTEM DIAGNOSTIC FEED</span>
                <span className="animate-pulse">● RUNNING</span>
              </div>
              <div className="space-y-1">
                {scanSteps.map((step, idx) => (
                  <p 
                    key={idx} 
                    className={`transition-opacity duration-300 ${
                      idx <= scanStep ? "opacity-100" : "opacity-35"
                    }`}
                  >
                    <span className="text-stone-500">[{idx + 1}/4]</span> {step}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Diagnosis Outcomes - 7 Cols */}
      <div className="lg:col-span-7 space-y-6">
        {diseaseDiagnosis ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Health Overview Block */}
            <div className="bg-white border border-stone-200 rounded-[2rem] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-5 border-b border-stone-100">
                <div>
                  <span className={`text-[10px] font-bold tracking-wider font-mono px-3 py-1 rounded-lg border uppercase ${
                    diseaseDiagnosis.healthStatus.toLowerCase().includes("healthy")
                      ? "bg-emerald-50 text-emerald-800 border-emerald-100"
                      : "bg-red-50 text-red-800 border-red-100"
                  }`}>
                    {t.statusText}: {diseaseDiagnosis.healthStatus}
                  </span>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-stone-900 mt-3">
                    {diseaseDiagnosis.diseaseName}
                  </h3>
                  <p className="text-xs text-stone-500 italic mt-0.5">
                    {diseaseDiagnosis.diseaseNameEnglish}
                  </p>
                </div>

                <div>
                  <span className={`text-[10px] font-display font-bold uppercase px-3 py-1.5 rounded-full border ${
                    diseaseDiagnosis.severity.toLowerCase() === "high" 
                      ? "bg-red-50 text-red-800 border-red-100" 
                      : diseaseDiagnosis.severity.toLowerCase() === "medium"
                      ? "bg-amber-50 text-amber-800 border-amber-100"
                      : "bg-emerald-50 text-emerald-800 border-emerald-100"
                  }`}>
                    {t.severityText}: {diseaseDiagnosis.severity}
                  </span>
                </div>
              </div>

              {/* causes and symptoms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono font-bold uppercase text-stone-400">
                    {t.causesTitle}
                  </h4>
                  <p className="text-xs leading-relaxed text-stone-700 font-sans">
                    {diseaseDiagnosis.causes}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase text-stone-400">
                    {t.symptomsTitle}
                  </h4>
                  <ul className="space-y-1.5">
                    {diseaseDiagnosis.symptoms.map((s, i) => (
                      <li key={i} className="text-xs text-stone-600 flex items-start gap-2">
                        <CornerDownRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-sans leading-snug">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* organic treatment card */}
            <div className="bg-gradient-to-br from-emerald-50/40 to-emerald-50/10 border border-emerald-100/80 rounded-2xl p-5 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
                <Heart className="w-24 h-24 text-emerald-600" />
              </div>
              <h4 className="text-xs font-display font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-2 mb-2">
                🌱 {t.organicTitle}
              </h4>
              <p className="text-xs md:text-sm text-stone-800 leading-relaxed font-sans font-medium">
                {diseaseDiagnosis.organicControl}
              </p>
            </div>

            {/* chemical card */}
            <div className="bg-gradient-to-br from-amber-50/40 to-amber-50/10 border border-amber-200/60 rounded-2xl p-5 shadow-sm">
              <h4 className="text-xs font-display font-bold text-amber-800 uppercase tracking-widest flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 animate-bounce" />
                {t.chemicalTitle}
              </h4>
              <p className="text-xs md:text-sm text-amber-900 leading-relaxed font-sans font-semibold">
                {diseaseDiagnosis.chemicalControl}
              </p>
            </div>

            {/* prevention steps */}
            <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase text-stone-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {t.preventionTitle}
              </h4>
              <ul className="space-y-2">
                {diseaseDiagnosis.preventionTips.map((tip, idx) => (
                  <li key={idx} className="text-xs text-stone-600 flex items-start gap-2.5">
                    <span className="text-emerald-700 font-black shrink-0">•</span>
                    <span className="font-sans leading-snug">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : (
          <div className="h-full min-h-[380px] border border-dashed border-stone-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-8 bg-stone-50/40">
            <Cpu className="w-12 h-12 text-stone-300 mb-4 animate-pulse" />
            <h3 className="text-lg font-display font-bold text-stone-800 mb-1">
              {language === "ta" ? "நோய் பகுப்பாய்வு அறிக்கை" : "Leaf Diagnostic Diagnostic Desk"}
            </h3>
            <p className="text-xs text-stone-500 max-w-sm leading-relaxed mx-auto font-sans">
              {language === "ta" 
                ? "இலையின் படத்தைப் பதிவேற்றி, அதன் நோய்களைக் கண்டறிந்து திருத்தங்களை அறியவும்" 
                : "Submit a leaf photograph above. The diagnostic system runs deep cellular scanning models against global and local plant pathology indices."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

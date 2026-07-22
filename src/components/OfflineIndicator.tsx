import { motion } from "motion/react";
import { Wifi, WifiOff } from "lucide-react";
import { SupportedLanguage } from "../types";
import { translations } from "../translations";

interface OfflineIndicatorProps {
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  queuedCount: number;
  language: SupportedLanguage;
}

export default function OfflineIndicator({
  isOffline,
  setIsOffline,
  queuedCount,
  language,
}: OfflineIndicatorProps) {
  const t = translations[language];

  return (
    <div className="bg-white border border-stone-200/80 rounded-3xl p-5 shadow-[0_4px_20px_rgba(139,92,26,0.02)] mb-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(139,92,26,0.05)]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className={`p-2.5 rounded-2xl transition-colors duration-300 ${
            isOffline 
              ? "bg-amber-50 text-amber-600 border border-amber-200/50" 
              : "bg-emerald-50 text-emerald-600 border border-emerald-200/50"
          }`}>
            {isOffline ? <WifiOff className="w-5 h-5 animate-pulse" /> : <Wifi className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="font-display font-semibold text-stone-900 text-sm sm:text-base tracking-tight">
              {isOffline ? t.offlineStatus : "Status: Online (High-Speed Satellite Connected)"}
            </h4>
            <p className="text-xs text-stone-500 font-sans mt-0.5">
              {isOffline 
                ? "Simulating remote village networks (low connectivity)" 
                : "Continuous synchronization enabled with Birsa Agri Cloud Hub"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          {isOffline && queuedCount > 0 && (
            <span className="text-xs font-mono font-medium bg-amber-100 text-amber-800 px-3 py-1 rounded-full animate-pulse border border-amber-200/40">
              {t.offlineQueuedCount} {queuedCount}
            </span>
          )}

          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isOffline}
              onChange={(e) => setIsOffline(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            <span className="ml-2.5 text-xs font-sans font-medium text-stone-600">
              {t.offlineToggle}
            </span>
          </label>
        </div>
      </div>

      {isOffline && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 bg-amber-50/50 border border-amber-200/50 rounded-2xl p-4 text-xs text-amber-800 leading-relaxed font-sans"
        >
          {t.offlineBanner}
        </motion.div>
      )}
    </div>
  );
}

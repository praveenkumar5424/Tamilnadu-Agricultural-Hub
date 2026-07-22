import React from "react";
import { motion } from "motion/react";
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sprout, 
  HelpCircle,
  Clock,
  ExternalLink
} from "lucide-react";
import { ChatMessage, SupportedLanguage } from "../types";
import { translations } from "../translations";
import FarmerIcon from "./FarmerIcon";

interface ChatMitraProps {
  chatMessages: ChatMessage[];
  chatInput: string;
  setChatInput: (val: string) => void;
  isBotTyping: boolean;
  voiceFeedbackEnabled: boolean;
  setVoiceFeedbackEnabled: (val: boolean) => void;
  isListeningVoice: boolean;
  toggleVoiceListening: () => void;
  handleSendChatMessage: (overrideText?: string) => void;
  speakOut: (text: string) => void;
  language: SupportedLanguage;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
}

export default function ChatMitra({
  chatMessages,
  chatInput,
  setChatInput,
  isBotTyping,
  voiceFeedbackEnabled,
  setVoiceFeedbackEnabled,
  isListeningVoice,
  toggleVoiceListening,
  handleSendChatMessage,
  speakOut,
  language,
  chatEndRef,
}: ChatMitraProps) {
  const t = translations[language];

  // Quick suggestions based on local agriculture and Tamil Nadu welfare schemes
  const quickPrompts = [
    { label: "KAVIADP Scheme?", text: "Explain the benefits and eligibility for Kalaignarin All Village Integrated Agricultural Development Program (KAVIADP) in Tamil Nadu." },
    { label: "Black soil care?", text: "How do I prepare and condition black cotton soil (Karisal) for cotton sowing?" },
    { label: "Organic Panchagavya?", text: "How do I prepare and apply traditional organic Panchagavya or Amrit Karaisal liquid fertilizer?" },
    { label: "Micro Irrigation?", text: "What are the subsidies and installation steps for drip and sprinkler irrigation in dry blocks of Tamil Nadu?" }
  ];

  const handleQuickPromptClick = (text: string) => {
    handleSendChatMessage(text);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Voice Controls Panel - 4 Cols */}
      <div className="lg:col-span-4 space-y-6">
        <div>
          <h2 className="text-xl md:text-2xl font-display font-black text-stone-900 flex items-center gap-2.5">
            <FarmerIcon className="w-5.5 h-5.5 text-emerald-700" />
            {t.chatHeader}
          </h2>
          <p className="text-xs md:text-sm text-stone-500 mt-1.5 leading-relaxed">
            {t.chatSubtitle}
          </p>
        </div>

        {/* Dynamic Voice Panel */}
        <div className="bg-white border border-stone-200/80 rounded-[2rem] p-5.5 space-y-4 shadow-[0_4px_24px_rgba(28,25,23,0.01)]">
          <span className="text-[10px] font-mono font-bold uppercase text-stone-400 tracking-wider block">
            Kisan Voice Assistant
          </span>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-xs font-display font-bold text-stone-800">Voice Audio Feedback</h4>
              <p className="text-[10px] text-stone-400 font-sans">Read back AI replies automatically in your language.</p>
            </div>

            <button
              type="button"
              onClick={() => {
                setVoiceFeedbackEnabled(!voiceFeedbackEnabled);
                if ("speechSynthesis" in window) {
                  window.speechSynthesis.cancel();
                }
              }}
              className={`p-2.5 rounded-xl transition-all cursor-pointer border ${
                voiceFeedbackEnabled
                  ? "bg-emerald-50 text-emerald-800 border-emerald-100/80"
                  : "bg-stone-50 text-stone-400 border-stone-200 hover:bg-stone-100 hover:text-stone-700"
              }`}
            >
              {voiceFeedbackEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>

          <div className="border-t border-stone-100 pt-3.5">
            <button
              type="button"
              onClick={toggleVoiceListening}
              className={`w-full py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isListeningVoice
                  ? "bg-rose-600 text-white animate-pulse shadow-[0_4px_12px_rgba(220,38,38,0.2)] border-rose-500"
                  : "bg-emerald-700 hover:bg-emerald-600 text-white shadow-[0_4px_12px_rgba(16,185,129,0.15)] border-emerald-700"
              }`}
            >
              {isListeningVoice ? <MicOff className="w-4 h-4 animate-bounce" /> : <Mic className="w-4 h-4" />}
              {isListeningVoice ? t.voiceListen : t.voiceStop}
            </button>
          </div>
        </div>

        {/* Tamil Nadu State Schemes Info Widget */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 shadow-sm space-y-2.5">
          <span className="text-[8px] font-mono font-bold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 tracking-widest inline-block">
            Scheme Spotlight
          </span>
          <h4 className="text-xs font-display font-bold text-stone-900">
            KAVIADP Scheme (Tamil Nadu)
          </h4>
          <p className="text-xs leading-relaxed text-stone-600 font-sans">
            Kalaignarin All Village Integrated Agricultural Development Programme brings massive water source creation, farm mechanization, solar pump installation, and community boring wells to Tamil Nadu rural blocks.
          </p>
          <button
            type="button"
            onClick={() => handleQuickPromptClick("Provide full details, benefits and application steps for Kalaignarin All Village Integrated Agricultural Development Program (KAVIADP) in Tamil Nadu.")}
            className="text-xs text-emerald-800 font-bold underline font-sans hover:text-emerald-600 flex items-center gap-1 cursor-pointer"
          >
            Ask TN-Mitra details <ExternalLink className="w-3 h-3 inline" />
          </button>
        </div>
      </div>

      {/* Chat Terminal - 8 Cols */}
      <div className="lg:col-span-8 flex flex-col h-[520px] bg-stone-50/60 border border-stone-200 rounded-[2.5rem] overflow-hidden relative shadow-[inset_0_2px_8px_rgba(0,0,0,0.01)]">
        
        {/* Messages Log */}
        <div className="flex-grow p-4 md:p-6 overflow-y-auto space-y-4">
          {chatMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-sm">
                <FarmerIcon className="w-7 h-7 text-emerald-700 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-black text-stone-800 text-sm">
                  {language === "ta" ? "அக்ரி-மித்ரா அசிஸ்டெண்ட்" : "Welcome to Tamil Nadu Agricultural Mitra"}
                </h4>
                <p className="text-xs text-stone-400 max-w-sm leading-relaxed mx-auto font-sans">
                  {language === "ta" 
                    ? "விதை, உரம், பூச்சி தீர்வுகள் அல்லது அரசு திட்டங்கள் பற்றி கேளுங்கள்."
                    : "How can I support your agricultural decisions today? Ask about water harvesting, organic fertilizers, seed selection, or plateau soil conditioning."}
                </p>
              </div>

              {/* Quick Suggest Chips Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-4 w-full max-w-md">
                {quickPrompts.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickPromptClick(q.text)}
                    className="text-left p-3.5 rounded-2xl bg-white border border-stone-200/80 hover:border-emerald-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)] text-xs text-stone-700 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <span className="font-display font-bold block text-[9px] text-emerald-800 mb-1 tracking-wider uppercase font-mono">
                      {q.label}
                    </span>
                    <span className="line-clamp-2 text-stone-500 text-[11px] leading-snug font-sans">
                      {q.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed border ${
                    msg.sender === "user"
                      ? "bg-stone-900 text-white font-medium rounded-br-none border-stone-900 shadow-md"
                      : "bg-white text-stone-800 rounded-bl-none border-stone-200 shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-1.5 opacity-70 font-mono text-[9px] font-bold">
                    <span>
                      {msg.sender === "user" ? "Kisan Operator" : "Agricultural Mitra"}
                    </span>
                    {msg.isOfflineQueued && (
                      <span className="text-[8px] px-2 py-0.5 bg-amber-50 text-amber-800 rounded border border-amber-200 font-mono uppercase font-bold">
                        Offline Queue
                      </span>
                    )}
                  </div>
                  <p className="whitespace-pre-line font-sans leading-relaxed">{msg.text}</p>
                  
                  {/* Speech Trigger */}
                  {msg.sender === "bot" && (
                    <button
                      type="button"
                      onClick={() => speakOut(msg.text)}
                      className="mt-2.5 text-[9px] uppercase font-bold font-mono tracking-wider text-emerald-800 hover:text-emerald-600 flex items-center gap-1.5 cursor-pointer bg-stone-50 hover:bg-stone-100 px-2 py-1 rounded border border-stone-200 transition-all w-fit"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Speak Out
                    </button>
                  )}
                </div>
              </div>
            ))
          )}

          {/* Typing Sprout Indicator */}
          {isBotTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-stone-800 border border-stone-200 rounded-2xl rounded-bl-none p-4 max-w-[80%] text-xs flex items-center gap-2.5 shadow-sm font-mono">
                <Sprout className="w-4 h-4 animate-spin text-emerald-600" />
                <span className="text-[9px] font-bold tracking-wider text-stone-400">
                  Agri-Mitra is formulating reply...
                </span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Interactive Chat Input Area */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendChatMessage();
          }}
          className="p-4 border-t border-stone-200 bg-white flex items-center gap-3"
        >
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={t.chatPlaceholder}
            className="flex-grow bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3.5 text-xs md:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 transition-all placeholder:text-stone-400 font-medium"
          />

          {/* Microphone Launcher */}
          <button
            type="button"
            onClick={toggleVoiceListening}
            className={`p-3.5 rounded-xl transition-all shrink-0 cursor-pointer border ${
              isListeningVoice
                ? "bg-rose-600 text-white border-rose-500 animate-pulse"
                : "bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100 hover:text-stone-800"
            }`}
          >
            <Mic className="w-4 h-4" />
          </button>

          <button
            type="submit"
            disabled={!chatInput.trim()}
            className="p-3.5 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 text-white font-bold rounded-xl transition-all shrink-0 cursor-pointer shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

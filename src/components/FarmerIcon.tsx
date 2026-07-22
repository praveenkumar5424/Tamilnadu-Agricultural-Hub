import React from "react";

interface FarmerIconProps {
  className?: string;
}

export default function FarmerIcon({ className = "w-12 h-12" }: FarmerIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Sky Sunset Gradient */}
        <linearGradient id="skySunset" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EA580C" /> {/* orange-600 */}
          <stop offset="60%" stopColor="#F97316" /> {/* orange-500 */}
          <stop offset="100%" stopColor="#FACC15" /> {/* yellow-400 */}
        </linearGradient>

        {/* Lush Green Field Gradient */}
        <linearGradient id="greenField" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" /> {/* green-500 */}
          <stop offset="100%" stopColor="#15803D" /> {/* green-700 */}
        </linearGradient>

        {/* Sun Glow */}
        <radialGradient id="sunGlow" cx="35%" cy="32%" r="40%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="30%" stopColor="#FEF08A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
        </radialGradient>

        {/* Circular Clip Path */}
        <clipPath id="circleClip">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>

      {/* Main Circular Badge */}
      <circle cx="50" cy="50" r="48" fill="url(#skySunset)" stroke="#E2E8F0" strokeWidth="1" />

      {/* Group clipped to circle for neat edges */}
      <g clipPath="url(#circleClip)">
        {/* Sun Aura */}
        <circle cx="35" cy="32" r="30" fill="url(#sunGlow)" />
        {/* Bright Core Sun */}
        <circle cx="35" cy="32" r="12" fill="#FEF08A" />

        {/* Flying Birds Silhouettes */}
        {/* Bird 1 */}
        <path
          d="M 52,22 Q 56,18 60,22 Q 64,18 68,22"
          stroke="#1E293B"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Bird 2 */}
        <path
          d="M 64,14 Q 67,11 70,14 Q 73,11 76,14"
          stroke="#1E293B"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Green Grass Ground */}
        <path
          d="M 0,65 Q 50,58 100,65 L 100,100 L 0,100 Z"
          fill="url(#greenField)"
        />

        {/* Individual grass blades sticking up */}
        <path d="M 8,66 L 10,58 L 13,66" stroke="#15803D" strokeWidth="1.5" fill="none" />
        <path d="M 18,65 L 19,55 L 22,65" stroke="#16A34A" strokeWidth="1.5" fill="none" />
        <path d="M 30,64 L 32,54 L 35,64" stroke="#15803D" strokeWidth="2" fill="none" />
        <path d="M 45,63 L 47,56 L 50,63" stroke="#16A34A" strokeWidth="1.5" fill="none" />
        <path d="M 62,64 L 64,55 L 67,64" stroke="#15803D" strokeWidth="2" fill="none" />
        <path d="M 78,65 L 79,56 L 82,65" stroke="#16A34A" strokeWidth="1.5" fill="none" />
        <path d="M 90,66 L 92,57 L 95,66" stroke="#15803D" strokeWidth="1.5" fill="none" />

        {/* Bull / Ox Silhouette */}
        {/* Main Body */}
        <path
          d="M 15,50 C 18,46 22,44 26,46 C 30,48 35,47 40,48 C 45,49 48,51 51,55 C 53,58 54,62 53,68 C 50,70 48,70 45,69 C 41,68 35,68 31,68 C 26,67 21,68 18,65 C 16,63 14,58 15,50 Z"
          fill="#0F172A"
        />
        {/* Head and Nose */}
        <path
          d="M 16,51 C 14,50 11,51 9,55 C 11,58 14,59 17,57 Z"
          fill="#0F172A"
        />
        {/* Majestic Curved Horns */}
        <path
          d="M 13,52 C 10,48 9,40 6,42 C 8,46 11,49 13,52 Z"
          fill="#0F172A"
        />
        {/* Front Legs */}
        <path
          d="M 18,63 L 15,76 L 19,76 L 22,64 Z"
          fill="#0F172A"
        />
        <path
          d="M 23,64 L 21,75 L 24,75 L 26,64 Z"
          fill="#0F172A"
          opacity="0.9"
        />
        {/* Back Legs */}
        <path
          d="M 46,65 L 45,76 L 49,76 L 49,65 Z"
          fill="#0F172A"
        />
        <path
          d="M 42,65 L 41,74 L 44,74 L 45,65 Z"
          fill="#0F172A"
          opacity="0.9"
        />
        {/* Tail */}
        <path
          d="M 52,56 C 55,60 54,67 53,72 C 54,72 55,67 54,58 Z"
          fill="#0F172A"
        />

        {/* Plow Equipment */}
        {/* Horizontal beam from bull to plow */}
        <path
          d="M 35,58 L 64,62"
          stroke="#1E293B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Plowing wooden frame in the ground */}
        <path
          d="M 64,62 L 62,75 M 62,75 L 58,78"
          stroke="#0F172A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Farmer Silhouette */}
        {/* Head with Turban */}
        <path
          d="M 72,45 C 71,43 72,40 74,40 C 76,40 77,42 77,44 C 76,46 74,47 72,45 Z"
          fill="#0F172A"
        />
        {/* Torso / Clothes */}
        <path
          d="M 73,46 C 74,46 76,47 77,48 L 76,62 L 70,61 Z"
          fill="#0F172A"
        />
        {/* Active guiding arm holding whip */}
        <path
          d="M 72,49 L 60,44"
          stroke="#0F172A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Legs walking */}
        {/* Front Leg */}
        <path
          d="M 71,61 L 68,75 L 72,75 L 73,61 Z"
          fill="#0F172A"
        />
        {/* Back Leg */}
        <path
          d="M 75,61 L 78,73 L 81,73 L 77,61 Z"
          fill="#0F172A"
        />
      </g>

      {/* Elegant Circular Gold Ring Accent */}
      <circle cx="50" cy="50" r="47.5" stroke="#FBBF24" strokeWidth="1.5" strokeOpacity="0.8" />
    </svg>
  );
}

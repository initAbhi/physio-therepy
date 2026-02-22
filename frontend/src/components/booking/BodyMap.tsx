import { useMemo } from "react";
import { BodyPartId } from "@/data/painCategories";
import DetailedBodyMap from "./DetailedBodyMap";

interface BodyPartPainLevel {
  selected: boolean;
  painLevel: number;
  side?: "left" | "right" | "both";
}

interface BodyMapProps {
  bodyPartStates: Record<BodyPartId, BodyPartPainLevel>;
  onPartClick: (part: BodyPartId) => void;
  view: "front" | "back";
}

// Mapping from muscle slugs to our body part IDs
// NOTE: This might be redundant if we use paperDollMapping in handleClick, 
// but useful if we ever use muscle names directly.
const muscleToPartMap: Record<string, BodyPartId> = {};

// Reverse mapping: body part to associated muscles
// Reverse mapping: body part to associated muscles (SVG IDs)
const partToMusclesMap: Record<BodyPartId, string[]> = {
  neck: ['head'],
  shoulder: ['left-shoulder', 'right-shoulder'],
  chest: ['chest'],
  biceps: ['left-arm-bicep', 'right-arm-bicep'],
  elbow: ['left-arm-elbow', 'right-arm-elbow'],
  forearm: ['left-arm-forearm', 'right-arm-forearm'],
  wrist: ['left-arm-forearm', 'right-arm-forearm'], // Map to forearm visuals
  hand: ['left-hand', 'right-hand', 'hands'],
  back: ['back'], // Upper back
  abdomen: ['stomach'],
  hip: ['left-hip', 'right-hip', 'lower-back'], // Hips and lower back/glutes
  thigh: ['left-thigh', 'right-thigh', 'thighs'],
  knee: ['left-knee', 'right-knee', 'knees'],
  shin: ['left-shin', 'right-shin', 'calves'],
  ankle: ['left-ankle', 'right-ankle', 'ankles'],
  foot: ['left-foot', 'right-foot', 'feet'],
};

// Get color based on pain level
const getPainLevelColor = (painLevel: number): string => {
  if (painLevel <= 3) return "#EAB308"; // Yellow - Mild
  if (painLevel <= 6) return "#F97316"; // Orange - Moderate
  return "#EF4444"; // Red - Severe
};

const BodyMap = ({ bodyPartStates, onPartClick, view }: BodyMapProps) => {
  // Build data array for highlighting with pain levels
  const { data, colorMap } = useMemo(() => {
    const exercises: { name: string; muscles: string[] }[] = [];
    const muscleColorMap: Record<string, string> = {};

    Object.entries(bodyPartStates).forEach(([partId, state]) => {
      if (state.selected) {
        let muscles = partToMusclesMap[partId as BodyPartId] || [];

        // Filter muscles based on selected side
        if (state.side === 'left') {
          muscles = muscles.filter(m => !m.includes('right'));
        } else if (state.side === 'right') {
          muscles = muscles.filter(m => !m.includes('left'));
        }

        if (muscles.length > 0) {
          exercises.push({ name: partId, muscles });
          // Map each muscle to its pain level color
          const color = getPainLevelColor(state.painLevel);
          muscles.forEach(muscle => {
            muscleColorMap[muscle] = color;
          });
        }
      }
    });

    return { data: exercises, colorMap: muscleColorMap };
  }, [bodyPartStates]);

  // Handle muscle click and map to body part
  const handleClick = (muscle: string) => {
    // Map paper doll parts to our body part IDs
    // Map paper doll parts to our body part IDs
    const paperDollMapping: Record<string, BodyPartId> = {
      // Head/Neck
      'head': 'neck',

      // Shoulders
      'left-shoulder': 'shoulder',
      'right-shoulder': 'shoulder',

      // Arms
      'left-arm-bicep': 'biceps',
      'right-arm-bicep': 'biceps',
      'left-arm-elbow': 'elbow',
      'right-arm-elbow': 'elbow',
      'left-arm-forearm': 'forearm',
      'right-arm-forearm': 'forearm',

      // Hands
      'left-hand': 'hand',
      'right-hand': 'hand',
      'hands': 'hand',

      // Torso
      'chest': 'chest',
      'stomach': 'abdomen',
      'back': 'back',
      'lower-back': 'hip', // Maps to Hip/Glutes category

      // Legs
      'left-hip': 'hip',
      'right-hip': 'hip',
      'left-thigh': 'thigh',
      'right-thigh': 'thigh',
      'thighs': 'thigh',
      'left-knee': 'knee',
      'right-knee': 'knee',
      'knees': 'knee',
      'left-shin': 'shin',
      'right-shin': 'shin',
      'calves': 'shin', // Map calves to shin category (lower leg)
      'left-ankle': 'ankle',
      'right-ankle': 'ankle',
      'ankles': 'ankle',
      'left-foot': 'foot',
      'right-foot': 'foot',
      'feet': 'foot',
    };

    const mappedPart = muscleToPartMap[muscle] || paperDollMapping[muscle];

    if (mappedPart) {
      onPartClick(mappedPart);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <DetailedBodyMap
        type={view === "front" ? "anterior" : "posterior"}
        data={data}
        colorMap={colorMap}
        style={{ width: "100%", maxWidth: "280px", height: "auto", aspectRatio: "1/2" }}
        onClick={handleClick}
        bodyColor="#9CA3AF" // Grey default
      />
    </div>
  );
};

export default BodyMap;

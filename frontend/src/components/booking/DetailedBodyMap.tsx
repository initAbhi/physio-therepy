import React from 'react';
import { anteriorData, posteriorData } from './body-data';
import { paperDollData, posteriorPaperDollData } from './paper-doll-data';

interface DetailedBodyMapProps {
  data: { name: string; muscles: string[] }[];
  colorMap?: Record<string, string>;
  bodyColor?: string;
  onClick: (muscle: string) => void;
  svgStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  type?: 'anterior' | 'posterior';
}

const DetailedBodyMap = ({
  data = [],
  colorMap = {},
  bodyColor = '#9CA3AF', // Grey default
  onClick,
  svgStyle,
  style,
  type = 'anterior',
}: DetailedBodyMapProps) => {
  const modelData = type === 'anterior' ? anteriorData : posteriorData;

  // Helper to determine color based on colorMap or default
  const getMuscleColor = (muscleName: string) => {
    // Check if muscle has a specific color from pain level
    if (colorMap[muscleName]) {
      return colorMap[muscleName];
    }

    // Check if muscle is in any selected data
    const isSelected = data.some(d => d.muscles && d.muscles.includes(muscleName));
    if (isSelected) {
      return colorMap[muscleName] || '#EAB308'; // Default to yellow if selected but no color
    }

    return bodyColor;
  };

  // Non-interactive parts (skin tone)
  const skinToneParts = ['head', 'hands', 'feet'];
  const interactiveSkinParts = ['head'];
  const skinToneColor = '#D4C4B0';

  // Determine data based on type
  const layoutData = type === 'anterior' ? paperDollData : posteriorPaperDollData;

  return (
    <div style={{ ...style, position: 'relative', width: '207px', height: '460px', margin: '0 auto' }} className="body-map-wrapper">
      {layoutData.map((part) => {
        // Determine color for this aggregate part
        let partColor = skinToneColor;

        if (!skinToneParts.includes(part.id)) {
          partColor = bodyColor; // Default body color

          // Use part.id directly to check for highlighting
          const relatedMuscles = [part.id];

          if (colorMap[part.id]) {
            partColor = colorMap[part.id];
          } else {
            // Check if any related muscle is selected
            // Since relatedMuscles is just [part.id], this reduces to checking if part.id is in data
            const isSelected = data.some(d => d.muscles && d.muscles.includes(part.id));
            if (isSelected) {
              partColor = '#EAB308'; // Default highlight
            }
          }
        }

        const isInteractive = !skinToneParts.includes(part.id) || interactiveSkinParts.includes(part.id);

        return (
          <svg
            key={part.id}
            className={`paper-doll-part ${isInteractive ? 'hover:brightness-110 cursor-pointer' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            width={part.width}
            height={part.height}
            viewBox={part.viewBox}
            style={{
              position: 'absolute',
              left: '50%',
              fill: partColor,
              transition: 'all 0.3s ease',
              ...part.style,
            }}
            onClick={() => {
              if (isInteractive) {
                onClick(part.id);
              }
            }}
          >
            <path d={part.path} />
          </svg>
        );
      })}
    </div>
  );
};

export default DetailedBodyMap;

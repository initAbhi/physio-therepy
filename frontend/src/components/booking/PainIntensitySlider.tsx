import { cn } from "@/lib/utils";

interface PainIntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const PainIntensitySlider = ({ value, onChange }: PainIntensitySliderProps) => {
  const getColor = (val: number) => {
    if (val <= 3) return "bg-pain-low";
    if (val <= 6) return "bg-pain-medium";
    return "bg-pain-high";
  };

  const getLabel = (val: number) => {
    if (val <= 2) return "Mild";
    if (val <= 4) return "Moderate";
    if (val <= 6) return "Significant";
    if (val <= 8) return "Severe";
    return "Extreme";
  };

  const getDescription = (val: number) => {
    if (val <= 2) return "Noticeable but doesn't affect daily activities";
    if (val <= 4) return "Affects some activities but manageable";
    if (val <= 6) return "Significantly impacts daily activities";
    if (val <= 8) return "Difficult to perform most activities";
    return "Unable to perform any activities";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="font-medium">Pain Intensity</label>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-2xl font-bold font-display transition-colors",
              value <= 3 ? "text-pain-low" : value <= 6 ? "text-pain-medium" : "text-pain-high"
            )}
          >
            {value}
          </span>
          <span className="text-muted-foreground text-sm">/10</span>
        </div>
      </div>

      <div className="relative">
        {/* Track background */}
        <div className="h-3 rounded-full pain-gradient opacity-30" />
        
        {/* Filled track */}
        <div
          className={cn("absolute top-0 left-0 h-3 rounded-full transition-all", getColor(value))}
          style={{ width: `${(value / 10) * 100}%` }}
        />

        {/* Input slider */}
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute top-0 left-0 w-full h-3 opacity-0 cursor-pointer"
        />

        {/* Thumb indicator */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full shadow-lg border-4 border-card transition-all pointer-events-none",
            getColor(value)
          )}
          style={{ left: `calc(${(value / 10) * 100}% - 12px)` }}
        />
      </div>

      {/* Scale markers */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
      </div>

      {/* Status label */}
      <div
        className={cn(
          "p-3 rounded-xl text-center transition-colors",
          value <= 3
            ? "bg-pain-low/10 text-pain-low"
            : value <= 6
            ? "bg-pain-medium/10 text-pain-medium"
            : "bg-pain-high/10 text-pain-high"
        )}
      >
        <p className="font-semibold">{getLabel(value)}</p>
        <p className="text-sm opacity-80">{getDescription(value)}</p>
      </div>
    </div>
  );
};

export default PainIntensitySlider;

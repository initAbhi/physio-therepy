import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { painCategories, BodyPartId } from "@/data/painCategories";
import { cn } from "@/lib/utils";

interface BodyPartPainLevel {
  selected: boolean;
  painLevel: number;
  side?: "left" | "right" | "both";
}

interface BodyPartSelectorProps {
  bodyPartStates: Record<BodyPartId, BodyPartPainLevel>;
  onTogglePart: (partId: BodyPartId) => void;
  onPainLevelChange: (partId: BodyPartId, level: number) => void;
  onSideChange: (partId: BodyPartId, side: "left" | "right" | "both") => void;
  selectedConditions: Record<string, string[]>;
  onConditionToggle: (partId: string, condition: string) => void;
}

const allBodyParts: BodyPartId[] = [
  "neck", "shoulder", "biceps", "elbow", "forearm", "wrist", "hand",
  "chest", "back", "abdomen",
  "hip", "thigh", "knee", "shin", "ankle", "foot"
];

const sidedBodyParts: BodyPartId[] = [
  "shoulder", "biceps", "elbow", "forearm", "hand",
  "hip", "thigh", "knee", "shin", "foot", "ankle"
];

const getPainLevelLabel = (level: number) => {
  if (level <= 3) return "Mild";
  if (level <= 6) return "Moderate";
  return "Severe";
};

const getPainLevelColor = (level: number) => {
  if (level <= 3) return "bg-pain-mild";
  if (level <= 6) return "bg-pain-moderate";
  return "bg-pain-severe";
};

const getPainLevelTextColor = (level: number) => {
  if (level <= 3) return "text-pain-mild";
  if (level <= 6) return "text-pain-moderate";
  return "text-pain-severe";
};

const BodyPartSelector = ({
  bodyPartStates,
  onTogglePart,
  onPainLevelChange,
  onSideChange,
  selectedConditions,
  onConditionToggle,
}: BodyPartSelectorProps) => {
  return (
    <div className="space-y-4 p-4 max-h-[500px] overflow-y-auto">
      <h3 className="font-display font-semibold text-lg mb-4">Select Pain Areas</h3>

      {allBodyParts.map((partId) => {
        const category = painCategories[partId];
        const state = bodyPartStates[partId] || { selected: false, painLevel: 1 };
        const conditions = selectedConditions[partId] || [];

        return (
          <div
            key={partId}
            className={cn(
              "rounded-xl border-2 p-4 transition-all duration-200",
              state.selected
                ? "border-primary bg-primary/5"
                : "border-border bg-muted/30 hover:bg-muted/50"
            )}
          >
            {/* Checkbox and Label */}
            <div className="flex items-center gap-3 mb-3">
              <Checkbox
                id={partId}
                checked={state.selected}
                onCheckedChange={() => onTogglePart(partId)}
                className="h-5 w-5"
              />
              <Label
                htmlFor={partId}
                className="font-medium text-base cursor-pointer flex-1"
              >
                {category?.name || partId}
              </Label>
              {state.selected && (
                <span
                  className={cn(
                    "text-sm font-semibold px-2 py-0.5 rounded-full",
                    getPainLevelTextColor(state.painLevel)
                  )}
                >
                  {getPainLevelLabel(state.painLevel)} ({state.painLevel}/10)
                </span>
              )}
            </div>

            {/* Pain Intensity Slider and Conditions (visible when selected) */}
            {state.selected && (
              <div className="mt-4 space-y-4 animate-fade-in-up">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Mild</span>
                    <span>Moderate</span>
                    <span>Severe</span>
                  </div>

                  <div className="relative">
                    {/* Background track */}
                    <div className="h-2 rounded-full bg-gradient-to-r from-pain-mild via-pain-moderate to-pain-severe opacity-30" />

                    {/* Filled track */}
                    <div
                      className={cn(
                        "absolute top-0 left-0 h-2 rounded-full transition-all",
                        getPainLevelColor(state.painLevel)
                      )}
                      style={{ width: `${(state.painLevel / 10) * 100}%` }}
                    />

                    {/* Input slider */}
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={state.painLevel}
                      onChange={(e) => onPainLevelChange(partId, parseInt(e.target.value))}
                      className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                    />

                    {/* Thumb indicator */}
                    <div
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-lg border-2 border-background transition-all pointer-events-none",
                        getPainLevelColor(state.painLevel)
                      )}
                      style={{ left: `calc(${(state.painLevel / 10) * 100}% - 8px)` }}
                    />
                  </div>

                  {/* Scale markers */}
                  <div className="flex justify-between text-[10px] text-muted-foreground/60 px-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <span key={n}>{n}</span>
                    ))}
                  </div>
                </div>

                {/* Side Selection for applicable body parts */}
                {sidedBodyParts.includes(partId) && (
                  <div className="flex gap-2 p-2 bg-background/50 rounded-lg">
                    {(["left", "right", "both"] as const).map((side) => (
                      <label
                        key={side}
                        className={cn(
                          "flex-1 text-center py-1.5 text-xs font-medium rounded-md cursor-pointer transition-all",
                          state.side === side
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "hover:bg-muted text-muted-foreground"
                        )}
                      >
                        <input
                          type="radio"
                          name={`${partId}-side`}
                          value={side}
                          checked={state.side === side}
                          onChange={() => onSideChange(partId, side)}
                          className="sr-only"
                        />
                        {side.charAt(0).toUpperCase() + side.slice(1)}
                      </label>
                    ))}
                  </div>
                )}

                {/* Conditions Selection */}
                {category?.conditions && category.conditions.length > 0 && (
                  <div className="pt-2 border-t border-border/50">
                    <Label className="text-xs text-muted-foreground mb-2 block">Specific Conditions (Select all that apply):</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {category.conditions.map((condition) => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${partId}-${condition}`}
                            checked={conditions.includes(condition)}
                            onCheckedChange={() => onConditionToggle(partId, condition)}
                            className="h-4 w-4"
                          />
                          <Label
                            htmlFor={`${partId}-${condition}`}
                            className="text-xs font-normal cursor-pointer leading-tight"
                          >
                            {condition}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BodyPartSelector;

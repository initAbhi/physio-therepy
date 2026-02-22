import { painCategories, BodyPartId } from "@/data/painCategories";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface PainSelectorProps {
  selectedParts: BodyPartId[];
  selectedConditions: Record<string, string[]>;
  onConditionToggle: (partId: string, condition: string) => void;
}

const PainSelector = ({ selectedParts, selectedConditions, onConditionToggle }: PainSelectorProps) => {
  if (selectedParts.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8">
        <div>
          <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 15l6 6m-11-4a7 7 0 110-14 7 7 0 010 14z" />
            </svg>
          </div>
          <h3 className="font-display font-semibold text-lg mb-2">Select a Body Part</h3>
          <p className="text-muted-foreground text-sm">
            Click on the body diagram to select the area where you're experiencing pain.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 overflow-y-auto max-h-[500px]">
      {selectedParts.map((partId) => {
        const category = painCategories[partId];
        if (!category) return null;

        const partConditions = selectedConditions[partId] || [];

        return (
          <div key={partId} className="space-y-3">
            <h3 className="font-display font-semibold text-lg flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary" />
              {category.name} Pain
            </h3>
            <div className="grid gap-2">
              {category.conditions.map((condition) => {
                const isSelected = partConditions.includes(condition);
                return (
                  <button
                    key={condition}
                    type="button"
                    onClick={() => onConditionToggle(partId, condition)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200",
                      isSelected
                        ? "bg-primary/10 border-2 border-primary text-primary"
                        : "bg-muted/50 border-2 border-transparent hover:bg-muted hover:border-border"
                    )}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center transition-all",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "border-2 border-border"
                      )}
                    >
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <span className="text-sm font-medium">{condition}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PainSelector;

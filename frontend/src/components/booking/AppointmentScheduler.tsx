import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface AppointmentSchedulerProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  selectedTime: string | undefined;
  onTimeSelect: (time: string) => void;
}

const timeSlots: TimeSlot[] = [
  { time: "9:00 AM", available: true },
  { time: "9:30 AM", available: true },
  { time: "10:00 AM", available: false },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "11:30 AM", available: false },
  { time: "12:00 PM", available: true },
  { time: "12:30 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: false },
  { time: "3:00 PM", available: true },
  { time: "3:30 PM", available: true },
  { time: "4:00 PM", available: true },
  { time: "4:30 PM", available: false },
  { time: "5:00 PM", available: true },
  { time: "5:30 PM", available: true },
  { time: "6:00 PM", available: true },
  { time: "6:30 PM", available: true },
  { time: "7:00 PM", available: true },
  { time: "7:30 PM", available: false },
];

const AppointmentScheduler = ({
  selectedDate,
  onDateSelect,
  selectedTime,
  onTimeSelect,
}: AppointmentSchedulerProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Date Picker */}
      <div>
        <h3 className="font-display font-semibold text-lg mb-4">Select Date</h3>
        <div className="bg-card rounded-2xl border shadow-card p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            disabled={(date) => date < new Date() || date.getDay() === 0}
            className="pointer-events-auto"
          />
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <h3 className="font-display font-semibold text-lg mb-4">
          {selectedDate
            ? `Available Times for ${format(selectedDate, "MMMM d, yyyy")}`
            : "Select a date first"}
        </h3>

        {selectedDate ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                type="button"
                disabled={!slot.available}
                onClick={() => slot.available && onTimeSelect(slot.time)}
                className={cn(
                  "p-3 rounded-xl text-sm font-medium transition-all duration-200",
                  !slot.available && "opacity-40 cursor-not-allowed bg-muted text-muted-foreground line-through",
                  slot.available && selectedTime !== slot.time && "bg-muted hover:bg-primary/10 hover:text-primary",
                  selectedTime === slot.time && "bg-primary text-primary-foreground shadow-glow"
                )}
              >
                {slot.time}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 bg-muted/50 rounded-2xl">
            <p className="text-muted-foreground">Please select a date to view available times</p>
          </div>
        )}

        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-muted" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-muted opacity-40" />
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary" />
            <span>Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;

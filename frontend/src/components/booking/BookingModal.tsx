"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, CheckCircle2, User, MapPin } from "lucide-react";
// import { format } from "date-fns";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import { PolicyModal } from "@/components/modals/PolicyModal";

import StepIndicator from "@/components/booking/StepIndicator";
// import AppointmentScheduler from "@/components/booking/AppointmentScheduler";
import { createBooking } from "@/services/bookingService";
import { Loader2 } from "lucide-react";
import BodyMap from "@/components/booking/BodyMap";
import BodyPartSelector from "@/components/booking/BodyPartSelector";
import { painCategories, BodyPartId } from "@/data/painCategories";

const steps = [
    { id: 1, title: "Personal", description: "Contact info" },
    { id: 2, title: "Pain Details", description: "Describe condition" },
    { id: 3, title: "More Info", description: "Final details" },
    { id: 4, title: "Confirm", description: "Review & submit" },
];

interface PersonalDetails {
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
    phone: string;
    email: string;
    address: string;
}

interface PainDetails {
    description: string;
    duration: string;
    previousTreatment: string;
    additionalNotes: string;
}

interface BodyPartPainLevel {
    selected: boolean;
    painLevel: number;
    side?: "left" | "right" | "both";
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [bodyView, setBodyView] = useState<"front" | "back">("front");
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
    });

    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [selectedTime, setSelectedTime] = useState<string | undefined>();

    // Body part states with individual pain levels
    const [bodyPartStates, setBodyPartStates] = useState<Record<BodyPartId, BodyPartPainLevel>>({
        neck: { selected: false, painLevel: 1 },
        shoulder: { selected: false, painLevel: 1, side: "right" },
        biceps: { selected: false, painLevel: 1, side: "right" },
        elbow: { selected: false, painLevel: 1, side: "right" },
        forearm: { selected: false, painLevel: 1, side: "right" },
        wrist: { selected: false, painLevel: 1, side: "right" },
        hand: { selected: false, painLevel: 1, side: "right" },
        chest: { selected: false, painLevel: 1 },
        back: { selected: false, painLevel: 1 },
        abdomen: { selected: false, painLevel: 1 },
        hip: { selected: false, painLevel: 1, side: "right" },
        thigh: { selected: false, painLevel: 1, side: "right" },
        knee: { selected: false, painLevel: 1, side: "right" },
        shin: { selected: false, painLevel: 1, side: "right" },
        ankle: { selected: false, painLevel: 1, side: "right" },
        foot: { selected: false, painLevel: 1, side: "right" },
    });
    const [selectedConditions, setSelectedConditions] = useState<Record<string, string[]>>({});

    const [painDetails, setPainDetails] = useState<PainDetails>({
        description: "",
        duration: "",
        previousTreatment: "",
        additionalNotes: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    // Get selected body parts as array
    const selectedBodyParts = Object.entries(bodyPartStates)
        .filter(([_, state]) => state.selected)
        .map(([partId]) => partId as BodyPartId);

    const handleTogglePart = (partId: BodyPartId) => {
        setBodyPartStates((prev) => ({
            ...prev,
            [partId]: {
                ...prev[partId],
                selected: !prev[partId].selected,
            },
        }));
    };

    const handlePainLevelChange = (partId: BodyPartId, level: number) => {
        setBodyPartStates((prev) => ({
            ...prev,
            [partId]: {
                ...prev[partId],
                painLevel: level,
            },
        }));
    };

    const handleSideChange = (partId: BodyPartId, side: "left" | "right" | "both") => {
        setBodyPartStates((prev) => ({
            ...prev,
            [partId]: {
                ...prev[partId],
                side: side,
            },
        }));
    };

    const handleConditionToggle = (partId: string, condition: string) => {
        setSelectedConditions((prev) => {
            const current = prev[partId] || [];
            const updated = current.includes(condition)
                ? current.filter((c) => c !== condition)
                : [...current, condition];
            return { ...prev, [partId]: updated };
        });
    };

    const termsContent = (
        <div className="space-y-4 text-sm text-foreground">
            <h3 className="font-bold text-lg">1. Introduction</h3>
            <p>Welcome to adaptus. By booking an appointment, you agree to these Terms and Conditions.</p>

            <h3 className="font-bold text-lg">2. Booking & Cancellation</h3>
            <p>Appointments must be booked in advance. Cancellations made less than 24 hours before the scheduled time may incur a fee.</p>

            <h3 className="font-bold text-lg">3. Medical Disclaimer</h3>
            <p>Our physiotherapy services are intended to support your health. However, outcomes vary. Please consult with your physician for serious conditions.</p>

            <h3 className="font-bold text-lg">4. Payment</h3>
            <p>Payment is due at the time of service unless otherwise arranged. We accept major credit cards and insurance plans as listed.</p>
        </div>
    );

    const privacyContent = (
        <div className="space-y-4 text-sm text-foreground">
            <h3 className="font-bold text-lg">1. Data Collection</h3>
            <p>We collect personal and medical information necessary to provide you with safe and effective treatment.</p>

            <h3 className="font-bold text-lg">2. Data Usage</h3>
            <p>Your data is used solely for your treatment, appointment management, and communication with you. We do not sell your data.</p>

            <h3 className="font-bold text-lg">3. Security</h3>
            <p>We employ industry-standard security measures to protect your personal health information.</p>

            <h3 className="font-bold text-lg">4. Your Rights</h3>
            <p>You have the right to access, correct, or request deletion of your personal data, subject to legal retention requirements.</p>
        </div>
    );

    const validateStep = (step: number): boolean => {
        switch (step) {
            case 1:
                // Basic validation
                if (!personalDetails.firstName || !personalDetails.lastName || !personalDetails.email || !personalDetails.phone || !personalDetails.age || !personalDetails.gender || !personalDetails.address) {
                    toast({
                        title: "Required Fields",
                        description: "Please fill in all required fields marked with *.",
                        variant: "destructive",
                    });
                    return false;
                }

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(personalDetails.email)) {
                    toast({
                        title: "Invalid Email",
                        description: "Please enter a valid email address.",
                        variant: "destructive",
                    });
                    return false;
                }

                // Phone validation (10 digits only)
                const phoneRegex = /^\d{10}$/;
                if (!phoneRegex.test(personalDetails.phone)) {
                    toast({
                        title: "Invalid Phone Number",
                        description: "Please enter a valid 10-digit phone number (numbers only).",
                        variant: "destructive",
                    });
                    return false;
                }

                // Age validation
                const ageNum = parseInt(personalDetails.age);
                if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
                    toast({
                        title: "Invalid Age",
                        description: "Please enter a valid age.",
                        variant: "destructive",
                    });
                    return false;
                }

                return true;

            case 2:
                if (selectedBodyParts.length === 0) {
                    toast({
                        title: "Pain Location Required",
                        description: "Please select at least one area where you're experiencing pain.",
                        variant: "destructive",
                    });
                    return false;
                }
                return true;

            case 3:
                if (!painDetails.description || !painDetails.duration) {
                    toast({
                        title: "Pain Details Required",
                        description: "Please describe your pain and its duration.",
                        variant: "destructive",
                    });
                    return false;
                }
                return true;

            case 4:
                return true;
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            if (currentStep < 4) {
                setCurrentStep(currentStep + 1);
            } else {
                handleSubmit();
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {

        setIsLoading(true);
        try {
            // Prepare data for API
            const bookingData = {
                personalDetails,
                bodyParts: Object.entries(bodyPartStates)
                    .filter(([_, state]) => state.selected)
                    .map(([partId, state]) => ({
                        partId,
                        painLevel: state.painLevel,
                        side: state.side,
                        selected: state.selected
                    })),
                selectedConditions,
                painDetails
            };

            await createBooking(bookingData);

            setIsSubmitted(true);
            toast({
                title: "Appointment Booked!",
                description: "We've received your appointment request. You'll receive a confirmation shortly.",
            });
        } catch (error) {
            console.error("Booking error:", error);
            toast({
                title: "Booking Failed",
                description: "There was an error submitting your booking. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95vw] sm:w-full sm:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                <DialogTitle className="sr-only">Booking Dialog</DialogTitle>
                <div className="py-4">
                    {isSubmitted ? (
                        <div className="text-center animate-scale-in py-8">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-accent mx-auto mb-6 flex items-center justify-center">
                                <CheckCircle2 className="w-10 h-10 text-secondary-foreground" />
                            </div>

                            <h1 className="font-display text-3xl font-bold mb-4">Appointment Confirmed!</h1>
                            <p className="text-muted-foreground mb-8">
                                Thank you for booking with adaptus. We've sent a confirmation to your email.
                            </p>

                            <div className="bg-muted/50 rounded-2xl p-6 text-left space-y-4 mb-8">
                                <div className="grid gap-3">
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-primary" />
                                        <span>{personalDetails.firstName} {personalDetails.lastName}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-primary" />
                                        <span>adaptus Clinic, 123 Wellness Street</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 justify-center">
                                <Button variant="glass" onClick={onClose}>
                                    Return Home
                                </Button>
                                <Button variant="hero" onClick={() => {
                                    setIsSubmitted(false);
                                    setCurrentStep(1);
                                    setPersonalDetails({ firstName: "", lastName: "", age: "", gender: "", phone: "", email: "", address: "" });
                                    setSelectedDate(undefined);
                                    setSelectedTime(undefined);
                                    setBodyPartStates({
                                        neck: { selected: false, painLevel: 1 },
                                        shoulder: { selected: false, painLevel: 1, side: "right" },
                                        biceps: { selected: false, painLevel: 1, side: "right" },
                                        elbow: { selected: false, painLevel: 1, side: "right" },
                                        forearm: { selected: false, painLevel: 1, side: "right" },
                                        wrist: { selected: false, painLevel: 1, side: "right" },
                                        hand: { selected: false, painLevel: 1, side: "right" },
                                        chest: { selected: false, painLevel: 1 },
                                        back: { selected: false, painLevel: 1 },
                                        abdomen: { selected: false, painLevel: 1 },
                                        hip: { selected: false, painLevel: 1, side: "right" },
                                        thigh: { selected: false, painLevel: 1, side: "right" },
                                        knee: { selected: false, painLevel: 1, side: "right" },
                                        shin: { selected: false, painLevel: 1, side: "right" },
                                        ankle: { selected: false, painLevel: 1, side: "right" },
                                        foot: { selected: false, painLevel: 1, side: "right" },
                                    });
                                    setSelectedConditions({});
                                    setPainDetails({ description: "", duration: "", previousTreatment: "", additionalNotes: "" });
                                    setPainDetails({ description: "", duration: "", previousTreatment: "", additionalNotes: "" });
                                }}>
                                    Book Another
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-8">
                                <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
                                    Book Your <span className="gradient-text">Session</span>
                                </h1>
                                <p className="text-muted-foreground">
                                    Complete the form below to schedule your physiotherapy session
                                </p>
                            </div>

                            <div className="mb-8">
                                <StepIndicator steps={steps} currentStep={currentStep} />
                            </div>

                            <div className="min-h-[500px]">


                                {currentStep === 1 && (
                                    <div className="animate-fade-in-up">
                                        <h2 className="font-display text-xl font-semibold mb-6">Personal Information</h2>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name *</Label>
                                                <Input
                                                    id="firstName"
                                                    placeholder="Enter First Name"
                                                    value={personalDetails.firstName}
                                                    onChange={(e) => setPersonalDetails({ ...personalDetails, firstName: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name *</Label>
                                                <Input
                                                    id="lastName"
                                                    placeholder="Enter Last Name"
                                                    value={personalDetails.lastName}
                                                    onChange={(e) => setPersonalDetails({ ...personalDetails, lastName: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="age">Age *</Label>
                                                <Input
                                                    id="age"
                                                    type="number"
                                                    placeholder="Enter Age"
                                                    value={personalDetails.age}
                                                    onChange={(e) => setPersonalDetails({ ...personalDetails, age: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="gender">Gender *</Label>
                                                <Select
                                                    value={personalDetails.gender}
                                                    onValueChange={(value) => setPersonalDetails({ ...personalDetails, gender: value })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="male">Male</SelectItem>
                                                        <SelectItem value="female">Female</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number *</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    placeholder="Enter Phone Number"
                                                    value={personalDetails.phone}
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/\D/g, "");
                                                        setPersonalDetails({ ...personalDetails, phone: value });
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="Enter Email"
                                                    value={personalDetails.email}
                                                    onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <Label htmlFor="address">Address *</Label>
                                                <Input
                                                    id="address"
                                                    placeholder="Enter Address"
                                                    value={personalDetails.address}
                                                    onChange={(e) => setPersonalDetails({ ...personalDetails, address: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="animate-fade-in-up">
                                        <h2 className="font-display text-xl font-semibold mb-6">Select Pain Areas & Conditions</h2>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            {/* Body Map */}
                                            <div>
                                                <div className="flex items-center justify-center gap-4 mb-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => setBodyView("front")}
                                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${bodyView === "front"
                                                            ? "bg-primary text-primary-foreground"
                                                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                                                            }`}
                                                    >
                                                        Front View
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setBodyView("back")}
                                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${bodyView === "back"
                                                            ? "bg-primary text-primary-foreground"
                                                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                                                            }`}
                                                    >
                                                        Back View
                                                    </button>
                                                </div>
                                                <div className="bg-muted/30 rounded-2xl p-4">
                                                    <BodyMap
                                                        bodyPartStates={bodyPartStates}
                                                        onPartClick={handleTogglePart}
                                                        view={bodyView}
                                                    />
                                                </div>
                                                <p className="text-center text-sm text-muted-foreground mt-3">
                                                    Click on body parts to select pain areas
                                                </p>
                                            </div>

                                            {/* Body Part Selector */}
                                            <div className="bg-muted/30 rounded-2xl">
                                                <BodyPartSelector
                                                    bodyPartStates={bodyPartStates}
                                                    onTogglePart={handleTogglePart}
                                                    onPainLevelChange={handlePainLevelChange}
                                                    onSideChange={handleSideChange}
                                                    selectedConditions={selectedConditions}
                                                    onConditionToggle={handleConditionToggle}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="animate-fade-in-up space-y-6">
                                        <h2 className="font-display text-xl font-semibold mb-6">Describe Your Pain</h2>

                                        <div className="space-y-2">
                                            <Label htmlFor="description">Pain Description *</Label>
                                            <Textarea
                                                id="description"
                                                placeholder="Describe your pain in detail..."
                                                rows={4}
                                                value={painDetails.description}
                                                onChange={(e) => setPainDetails({ ...painDetails, description: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="duration">Duration of Pain *</Label>
                                            <Select
                                                value={painDetails.duration}
                                                onValueChange={(value) => setPainDetails({ ...painDetails, duration: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="How long...?" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="days">A few days</SelectItem>
                                                    <SelectItem value="weeks">1-4 weeks</SelectItem>
                                                    <SelectItem value="months">1-6 months</SelectItem>
                                                    <SelectItem value="6months+">More than 6 months</SelectItem>
                                                    <SelectItem value="years">Over a year</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="previousTreatment">Previous Treatment (Optional)</Label>
                                            <Textarea
                                                id="previousTreatment"
                                                placeholder="Any treatment...?"
                                                rows={3}
                                                value={painDetails.previousTreatment}
                                                onChange={(e) => setPainDetails({ ...painDetails, previousTreatment: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                                            <Textarea
                                                id="additionalNotes"
                                                placeholder="Any other info..."
                                                rows={3}
                                                value={painDetails.additionalNotes}
                                                onChange={(e) => setPainDetails({ ...painDetails, additionalNotes: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}

                                {currentStep === 4 && (
                                    <div className="animate-fade-in-up">
                                        <h2 className="font-display text-xl font-semibold mb-6">Review & Confirm</h2>

                                        <div className="space-y-6">
                                            {/* Summary */}
                                            <div className="bg-muted/50 rounded-2xl p-6 space-y-4">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Personal Details</h4>
                                                        <p className="font-medium">{personalDetails.firstName} {personalDetails.lastName}</p>
                                                        <p className="text-sm text-muted-foreground">{personalDetails.email}</p>
                                                        <p className="text-sm text-muted-foreground">{personalDetails.phone}</p>
                                                    </div>
                                                </div>

                                                <div className="pt-4 border-t">
                                                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Pain Areas</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedBodyParts.map((part) => (
                                                            <span key={part} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                                                                {painCategories[part]?.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Note: Terms Accepted in Step 1 */}
                                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                                <span>Terms & Conditions accepted</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8 pt-6 border-t">
                                <Button
                                    variant="ghost"
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className="gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Previous
                                </Button>

                                <Button
                                    variant="hero"
                                    onClick={nextStep}
                                    className="gap-2"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            {currentStep === 5 ? "Confirm Booking" : "Continue"}
                                            {currentStep !== 5 && <ArrowRight className="w-4 h-4" />}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

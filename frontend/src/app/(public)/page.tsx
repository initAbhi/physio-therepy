"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, Award, Clock, Activity, Dumbbell, Stethoscope, UserCheck, HelpingHand, ShieldCheck } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

const AuroraBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
        <div className="aurora-orb aurora-orb-4" />
    </div>
);

const HeroSection = () => {
    const { openBooking } = useBooking();

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 md:pt-0 aurora-bg">
            <AuroraBackground />
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in-up">
                        <Heart className="w-4 h-4" />
                        Expert Care, Lasting Results
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        Personalized Physiotherapy Care for{" "}
                        <span className="gradient-text">Pain-Free Living</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        Our expert team provides comprehensive pain diagnosis and personalized recovery plans
                        to help you regain mobility and live life without limitations.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                        <Button variant="hero" size="xl" onClick={openBooking} className="gap-2 w-full sm:w-auto">
                            Book Appointment
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                        <Button asChild variant="glass" size="xl" className="w-full sm:w-auto">
                            <Link href="/about">Learn More</Link>
                        </Button>
                    </div>

                    {/* Trust badges */}
                    <div className="mt-10 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                        {[
                            { icon: Shield, label: "Licensed Experts" },
                            { icon: Award, label: "Award Winning" },
                            { icon: Heart, label: "100+ Patients" },
                            { icon: Clock, label: "Same Day Booking" },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card/50 backdrop-blur-sm shadow-sm md:shadow-none hover:shadow-card transition-shadow">
                                <Icon className="w-6 h-6 text-primary" />
                                <span className="text-sm font-medium text-muted-foreground">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const ServicesSection = () => (
    <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                    Comprehensive Care for Every Need
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    From acute injuries to chronic conditions, our specialized treatments help you
                    recover faster and prevent future problems.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    {
                        title: "Pain Management",
                        description: "Advanced techniques to diagnose and treat chronic and acute pain conditions.",
                        icon: Activity,
                        color: "from-primary/20 to-primary/5",
                    },
                    {
                        title: "Sports Rehabilitation",
                        description: "Get back in the game with specialized sports injury recovery programs.",
                        icon: Dumbbell,
                        color: "from-secondary/20 to-secondary/5",
                    },
                    {
                        title: "Post-Surgery Recovery",
                        description: "Comprehensive rehabilitation programs for optimal surgical outcomes.",
                        icon: Stethoscope,
                        color: "from-accent/20 to-accent/5",
                    },
                    {
                        title: "Posture Correction",
                        description: "Improve your posture and prevent long-term musculoskeletal issues.",
                        icon: UserCheck,
                        color: "from-aurora-pink/20 to-aurora-pink/5",
                    },
                    {
                        title: "Manual Therapy",
                        description: "Hands-on techniques to improve mobility and reduce pain.",
                        icon: HelpingHand,
                        color: "from-aurora-green/20 to-aurora-green/5",
                    },
                    {
                        title: "Preventive Care",
                        description: "Proactive treatments to maintain health and prevent injuries.",
                        icon: ShieldCheck,
                        color: "from-aurora-blue/20 to-aurora-blue/5",
                    },
                ].map((service) => (
                    <div
                        key={service.title}
                        className={`group p-6 rounded-2xl bg-gradient-to-br ${service.color} border border-border/50 hover:shadow-card transition-all duration-300 hover:-translate-y-1`}
                    >
                        <div className="mb-4 inline-flex p-3 rounded-lg bg-background/50 text-foreground group-hover:text-primary transition-colors">
                            <service.icon className="w-8 h-8" />
                        </div>
                        <h3 className="font-display text-xl font-semibold mb-2">{service.title}</h3>
                        <p className="text-muted-foreground text-sm">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const CTASection = () => {
    const { openBooking } = useBooking();

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-10" />
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                        Ready to Start Your Recovery Journey?
                    </h2>
                    <p className="text-muted-foreground mb-8 text-lg">
                        Take the first step towards a pain-free life. Book your consultation today and
                        let our experts create a personalized treatment plan for you.
                    </p>
                    <Button variant="hero" size="xl" onClick={openBooking} className="gap-2">
                        Schedule Your Appointment
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default function Index() {
    return (
        <>
            <HeroSection />
            <ServicesSection />
            <CTASection />
        </>
    );
}

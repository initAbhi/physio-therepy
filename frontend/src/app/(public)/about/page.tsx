import { Heart, Users, Award, BookOpen, Target, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 aurora-bg">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="aurora-orb aurora-orb-1" />
                    <div className="aurora-orb aurora-orb-2" />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                            About <span className="gradient-text">PhysioHeal</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Dedicated to transforming lives through expert physiotherapy care and
                            evidence-based treatment approaches.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 bg-card">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                <Target className="w-4 h-4" />
                                Our Mission
                            </div>
                            <h2 className="font-display text-3xl font-bold mb-4">
                                Empowering You to Live Without Pain
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                At PhysioHeal, we believe that everyone deserves to live a life free from physical
                                limitations. Our mission is to provide accessible, personalized, and effective
                                physiotherapy care that helps you achieve your health goals.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Patient-centered care approach",
                                    "Evidence-based treatment protocols",
                                    "Continuous progress monitoring",
                                    "Holistic wellness focus",
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                                        <span className="text-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-8 flex items-center justify-center">
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { value: "10+", label: "Years Experience" },
                                        { value: "5000+", label: "Happy Patients" },
                                        { value: "98%", label: "Success Rate" },
                                        { value: "15+", label: "Expert Therapists" },
                                    ].map((stat) => (
                                        <div key={stat.label} className="p-6 rounded-2xl bg-card shadow-card text-center">
                                            <div className="font-display text-3xl font-bold gradient-text">{stat.value}</div>
                                            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl font-bold mb-4">Our Philosophy</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We combine modern medical science with compassionate care to deliver
                            treatments that truly make a difference.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Heart,
                                title: "Compassionate Care",
                                description: "We treat every patient with empathy, understanding that healing is both physical and emotional.",
                            },
                            {
                                icon: BookOpen,
                                title: "Evidence-Based",
                                description: "All our treatments are backed by the latest research and clinical best practices.",
                            },
                            {
                                icon: Users,
                                title: "Collaborative Approach",
                                description: "We work with you to create personalized treatment plans that fit your lifestyle.",
                            },
                        ].map(({ icon: Icon, title, description }) => (
                            <div key={title} className="p-8 rounded-2xl bg-card shadow-card hover:shadow-glow transition-all duration-300">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
                                    <Icon className="w-7 h-7 text-primary-foreground" />
                                </div>
                                <h3 className="font-display text-xl font-semibold mb-3">{title}</h3>
                                <p className="text-muted-foreground">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-card">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                            <Award className="w-4 h-4" />
                            Expert Team
                        </div>
                        <h2 className="font-display text-3xl font-bold mb-4">Meet Our Specialists</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Our team of licensed physiotherapists brings years of experience and specialized
                            training to help you achieve optimal recovery.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Dr. Sarah Mitchell",
                                role: "Lead Physiotherapist",
                                specialty: "Sports & Orthopedic Rehabilitation",
                                experience: "12 years",
                            },
                            {
                                name: "Dr. James Chen",
                                role: "Senior Therapist",
                                specialty: "Neurological Physiotherapy",
                                experience: "10 years",
                            },
                            {
                                name: "Dr. Emily Rodriguez",
                                role: "Specialist",
                                specialty: "Pediatric & Women's Health",
                                experience: "8 years",
                            },
                        ].map((member) => (
                            <div key={member.name} className="group p-6 rounded-2xl bg-muted/50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-3xl font-display font-bold text-primary-foreground">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div className="text-center">
                                    <h3 className="font-display text-lg font-semibold">{member.name}</h3>
                                    <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                                    <p className="text-muted-foreground text-sm">{member.specialty}</p>
                                    <p className="text-muted-foreground text-xs mt-2">{member.experience} experience</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

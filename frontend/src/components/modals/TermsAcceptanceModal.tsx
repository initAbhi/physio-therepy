"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsAcceptanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
}

export function TermsAcceptanceModal({ isOpen, onClose, onAccept }: TermsAcceptanceModalProps) {
    const [accepted, setAccepted] = useState(false);

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

    const handleAccept = () => {
        if (accepted) {
            onAccept();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl h-[90vh] sm:h-[600px] flex flex-col p-0 gap-0">
                <DialogHeader className="p-6 pb-2 flex-none">
                    <DialogTitle>Terms & Policy Review</DialogTitle>
                    <DialogDescription>
                        Please review and accept our policies to proceed.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="terms" className="flex-1 flex flex-col min-h-0 w-full px-6 mt-2">
                    <TabsList className="grid w-full grid-cols-2 flex-none">
                        <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
                        <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
                    </TabsList>

                    <div className="flex-1 min-h-0 mt-4 border rounded-md bg-muted/20 overflow-hidden relative">
                        <TabsContent value="terms" className="h-full m-0 p-0 absolute inset-0">
                            <ScrollArea className="h-full w-full">
                                <div className="p-4">
                                    {termsContent}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="privacy" className="h-full m-0 p-0 absolute inset-0">
                            <ScrollArea className="h-full w-full">
                                <div className="p-4">
                                    {privacyContent}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </div>
                </Tabs>

                <div className="flex-none p-6 mt-4 border-t bg-background">
                    <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg border mb-4">
                        <Checkbox
                            id="terms-accept"
                            checked={accepted}
                            onCheckedChange={(checked) => setAccepted(checked as boolean)}
                        />
                        <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="terms-accept" className="text-sm font-medium cursor-pointer">
                                I confirm that I have read and agree to the Terms & Conditions and Privacy Policy
                            </Label>
                        </div>
                    </div>

                    <Button
                        onClick={handleAccept}
                        disabled={!accepted}
                        className="w-full"
                    >
                        Agree & Continue
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

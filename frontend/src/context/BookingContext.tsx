"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { BookingModal } from "@/components/booking/BookingModal";

interface BookingContextType {
    openBooking: () => void;
    closeBooking: () => void;
    isOpen: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

import { TermsAcceptanceModal } from "@/components/modals/TermsAcceptanceModal";

// ... existing code ...

export function BookingProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isTermsOpen, setIsTermsOpen] = useState(false);

    const openBooking = () => setIsTermsOpen(true);
    const closeBooking = () => setIsOpen(false);
    const closeTerms = () => setIsTermsOpen(false);

    const handleTermsAccepted = () => {
        setIsTermsOpen(false);
        setIsOpen(true);
    };

    return (
        <BookingContext.Provider value={{ openBooking, closeBooking, isOpen }}>
            {children}
            <TermsAcceptanceModal
                isOpen={isTermsOpen}
                onClose={closeTerms}
                onAccept={handleTermsAccepted}
            />
            <BookingModal isOpen={isOpen} onClose={closeBooking} />
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error("useBooking must be used within a BookingProvider");
    }
    return context;
}

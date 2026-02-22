const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface BookingData {
    personalDetails: {
        firstName: string;
        lastName: string;
        age: string;
        gender: string;
        phone: string;
        email: string;
        address: string;
    };
    bodyParts: Array<{
        partId: string;
        painLevel: number;
        side?: "left" | "right" | "both";
        selected: boolean;
    }>;
    selectedConditions: Record<string, string[]>;
    painDetails: {
        description: string;
        duration: string;
        previousTreatment: string;
        additionalNotes: string;
    };
}

export const createBooking = async (bookingData: BookingData) => {
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create booking");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

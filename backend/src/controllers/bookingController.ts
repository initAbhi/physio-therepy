import { Request, Response } from 'express';
import Booking from '../models/Booking';
import { sendBookingNotification } from '../services/emailService';

export const createBooking = async (req: Request, res: Response) => {
    try {
        // Basic validation could go here if not handled by Mongoose
        console.log('Incoming booking data:', JSON.stringify(req.body, null, 2));
        const newBooking = new Booking(req.body);
        const savedBooking = await newBooking.save();
        console.log('Saved booking:', JSON.stringify(savedBooking.toObject({ flattenMaps: true }), null, 2));

        // Send email notification asynchronously
        console.log('Triggering email notification for booking:', savedBooking._id);
        // Convert to plain object to handle Map types correctly
        const bookingObject = savedBooking.toObject({ flattenMaps: true });
        sendBookingNotification(bookingObject)
            .then(info => console.log('Email notification result:', info ? 'Success' : 'Failed'))
            .catch(err => console.error('Failed to trigger email:', err));

        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
};

export const getBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

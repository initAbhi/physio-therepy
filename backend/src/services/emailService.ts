import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

console.log('Email Service Config:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO
});

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendBookingNotification = async (bookingDetails: any) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: 'New Appointment Booking - PhysioHeal',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">New Appointment Booking</h2>
                    
                    <h3>Personal Details</h3>
                    <p><strong>Name:</strong> ${bookingDetails.personalDetails.firstName} ${bookingDetails.personalDetails.lastName}</p>
                    <p><strong>Phone:</strong> ${bookingDetails.personalDetails.phone}</p>
                    <p><strong>Email:</strong> ${bookingDetails.personalDetails.email}</p>
                    <p><strong>Age/Gender:</strong> ${bookingDetails.personalDetails.age} / ${bookingDetails.personalDetails.gender}</p>
                    <p><strong>Address:</strong> ${bookingDetails.personalDetails.address}</p>

                    <h3>Pain Details</h3>
                    <p><strong>Description:</strong> ${bookingDetails.painDetails.description}</p>
                    <p><strong>Duration:</strong> ${bookingDetails.painDetails.duration}</p>
                    <p><strong>Previous Treatment:</strong> ${bookingDetails.painDetails.previousTreatment || 'None/Not provided'}</p>
                    <p><strong>Additional Notes:</strong> ${bookingDetails.painDetails.additionalNotes || 'None'}</p>
                    
                    <h3>Selected Areas & Conditions</h3>
                    <ul>
                        ${bookingDetails.bodyParts.map((part: any) => `
                            <li>
                                <strong>${part.partId.toUpperCase()}</strong> 
                                (Pain Level: ${part.painLevel}/10${part.side ? `, Side: ${part.side}` : ''})
                                ${bookingDetails.selectedConditions && bookingDetails.selectedConditions[part.partId] && bookingDetails.selectedConditions[part.partId].length > 0
                    ? `<br><em>Conditions: ${bookingDetails.selectedConditions[part.partId].join(', ')}</em>`
                    : ''}
                            </li>
                        `).join('')}
                    </ul>

                    <p style="margin-top: 20px; font-size: 12px; color: #888;">
                        Booking ID: ${bookingDetails._id}<br>
                        Created At: ${new Date(bookingDetails.createdAt).toLocaleString()}
                    </p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        // We don't throw here to avoid failing the booking request if email fails
        return null;
    }
};

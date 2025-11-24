import nodemailer from "nodemailer";

export const sendAppointmentEmail = async (appointment, pdfFilePath) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:"", // तुम्हारा Gmail
            pass: "", // तुम्हारा App Password
        },
    });

    const mailOptions = {
        from: "ravikumarstm333@gmail.com", // तुम्हारा Gmail
        to: appointment.email,
        subject: "Your Appointment is Confirmed!",
        text: `
            Dear ${appointment.firstName} ${appointment.lastName},

            Your appointment has been confirmed with Dr. ${appointment.doctorId.firstName} ${appointment.doctorId.lastName}.

            Department: ${appointment.department}
            Date: ${appointment.appointment_date}
            Address: ${appointment.address}

            Please be on time. If you have any queries, feel free to contact us.

            Thank you,
            Prime Care Hospital
            📞 Contact: +91 7061042974
        `,
        attachments: pdfFilePath ? [{ filename: "Appointment_Details.pdf", path: pdfFilePath }] : [],
    };

    await transporter.sendMail(mailOptions);
};

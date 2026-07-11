import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as z from "zod";

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");

// Define the validation schema (matching the client-side schema)
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the incoming data
    const validatedData = contactSchema.parse(body);

    // Send the email using Resend
    // Note: onboarding@resend.dev is used for testing. 
    // In production, this should be a verified domain on Resend (e.g., info@royaleffect.com)
    const { data, error } = await resend.emails.send({
      from: "Royal Effect Website <onboarding@resend.dev>", 
      to: ["hello@royaleffect.com"], // The destination email address
      subject: `Website Inquiry: ${validatedData.subject}`,
      replyTo: validatedData.email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data", details: error.errors }, { status: 400 });
    }
    
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

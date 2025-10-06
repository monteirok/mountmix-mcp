import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InquiryReplyRequest {
  to: string;
  customerName: string;
  subject: string;
  message: string;
  inquiryDetails: {
    eventType: string;
    guestCount: string;
    eventDate: string;
    budget: string;
    venue: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, customerName, subject, message, inquiryDetails }: InquiryReplyRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Mountain Mixology <inquiries@mountainmixology.ca>",
      to: [to],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e293b, #334155); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Mountain Mixology</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Premium Bartending Services</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="color: #1e293b; font-size: 16px; margin-bottom: 20px;">Dear ${customerName},</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #059669;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            
            <div style="background: #e2e8f0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #1e293b; margin-top: 0;">Your Event Details:</h3>
              <ul style="color: #475569; list-style: none; padding: 0;">
                <li style="margin-bottom: 8px;"><strong>Event Type:</strong> ${inquiryDetails.eventType}</li>
                <li style="margin-bottom: 8px;"><strong>Guest Count:</strong> ${inquiryDetails.guestCount}</li>
                <li style="margin-bottom: 8px;"><strong>Event Date:</strong> ${inquiryDetails.eventDate}</li>
                <li style="margin-bottom: 8px;"><strong>Budget:</strong> ${inquiryDetails.budget}</li>
                <li style="margin-bottom: 8px;"><strong>Venue:</strong> ${inquiryDetails.venue}</li>
              </ul>
            </div>
            
            <p style="color: #64748b; font-size: 14px; margin-bottom: 0;">
              Best regards,<br>
              <strong>Mountain Mixology Team</strong><br>
              inquiries@mountainmixology.ca
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-inquiry-reply function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
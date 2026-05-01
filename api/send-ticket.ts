/**
 * REFERENCE: Vercel Serverless Function Template for sending tickets via email
 * 
 * To use this:
 * 1. Create a /api/send-ticket.ts file in your project root (if using Vercel)
 * 2. Set up a Resend account and add RESEND_API_KEY to your environment variables
 */

/* 
import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, ticketData, pdfBase64 } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Crezine Events <tickets@crezine.com>',
      to: [email],
      subject: `Your Ticket for ${ticketData.eventName}`,
      html: `
        <h1>Your ticket is ready!</h1>
        <p>Thank you for your purchase. Please find your ticket for <strong>${ticketData.eventName}</strong> attached as a PDF.</p>
        <p>Order ID: ${ticketData.orderId}</p>
      `,
      attachments: [
        {
          filename: 'ticket.pdf',
          content: pdfBase64, // Base64 string of the PDF generated on frontend or backend
        },
      ],
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
}
*/

console.log("API Template for Emailing Ticket set up. See api/send-ticket.ts for reference.");

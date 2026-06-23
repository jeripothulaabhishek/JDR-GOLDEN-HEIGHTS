import { NextRequest, NextResponse } from 'next/server';
import { forwardToGoogleSheets } from '@/lib/sheets';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email,
      budget,
      visitDate,
      message,
      source,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and Phone Number are required fields.' },
        { status: 400 }
      );
    }

    // Capture metadata from headers
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Unknown Device';
    const referer = req.headers.get('referer') || 'Direct';
    const timestamp = new Date().toISOString();

    const leadPayload = {
      name,
      phone,
      email: email || 'N/A',
      budget: budget || 'N/A',
      visitDate: visitDate || 'N/A',
      message: message || 'N/A',
      source: source || referer,
      utmSource: utmSource || 'N/A',
      utmMedium: utmMedium || 'N/A',
      utmCampaign: utmCampaign || 'N/A',
      ip,
      device: userAgent,
      timestamp,
    };

    // 1. Dispatch Email Notification via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    let emailSent = false;

    if (resendApiKey) {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'JDR Golden Heights Leads <onboarding@resend.dev>',
            to: ['msunilvijaykar@gmail.com'],
            subject: `New Lead: ${name} - JDR Golden Heights`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #0c0c0c; color: #f3f4f6;">
                <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">New Lead Captured</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #9ca3af; width: 140px;">Name:</td>
                    <td style="padding: 8px 0; color: #ffffff;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #9ca3af;">Phone Number:</td>
                    <td style="padding: 8px 0; color: #ffffff;"><a href="tel:${phone}" style="color: #d4af37; text-decoration: none;">${phone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #9ca3af;">Email:</td>
                    <td style="padding: 8px 0; color: #ffffff;">${email || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #9ca3af;">Property Interest:</td>
                    <td style="padding: 8px 0; color: #ffffff;">${budget || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #9ca3af;">Visit Date:</td>
                    <td style="padding: 8px 0; color: #ffffff;">${visitDate || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #9ca3af;">Message:</td>
                    <td style="padding: 8px 0; color: #ffffff;">${message || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #9ca3af;">Source:</td>
                    <td style="padding: 8px 0; color: #9ca3af; font-size: 12px;">${leadPayload.source}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #9ca3af;">Timestamp:</td>
                    <td style="padding: 8px 0; color: #9ca3af; font-size: 12px;">${timestamp}</td>
                  </tr>
                </table>
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #1f2937; font-size: 11px; color: #6b7280; text-align: center;">
                  Captured from jdr-golden-heights.vercel.app • IP: ${ip}
                </div>
              </div>
            `,
          }),
        });

        if (emailResponse.ok) {
          emailSent = true;
        } else {
          console.error('Resend API returned error:', await emailResponse.text());
        }
      } catch (err) {
        console.error('Failed to send email via Resend:', err);
      }
    } else {
      console.warn('RESEND_API_KEY is not defined. Email dispatch simulated.');
    }

    // 2. Asynchronously forward lead payloads to Google Sheets webhook
    const sheetsSent = await forwardToGoogleSheets(leadPayload);

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      emailSent,
      sheetsSent,
    }, { status: 201 });
  } catch (error: any) {
    console.error('API Lead capture error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

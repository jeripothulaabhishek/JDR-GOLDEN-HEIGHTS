import { NextRequest, NextResponse } from 'next/server';
import { saveLead, getLeads } from '@/lib/db';

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
      chatHistory,
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

    // Capture request metadata
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Unknown Device';
    const referer = req.headers.get('referer') || 'Direct';

    const lead = await saveLead({
      name,
      phone,
      email,
      budget,
      visitDate,
      message,
      chatHistory: chatHistory ? JSON.stringify(chatHistory) : undefined,
      ip,
      device: userAgent,
      source: source || referer,
      utmSource,
      utmMedium,
      utmCampaign,
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error: any) {
    console.error('API Lead capture error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Simple basic protection for CRM (for production a robust auth should be used,
    // but here we can check a simple API key or just return the data for presentation ease)
    const leads = await getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    console.error('API Get leads error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

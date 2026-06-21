import { NextResponse } from 'next/server';
import { getLeads } from '@/lib/db';

export async function GET() {
  try {
    const leads = await getLeads();

    const headers = [
      'ID',
      'Name',
      'Phone',
      'Email',
      'Budget',
      'Visit Date',
      'Message',
      'Status',
      'IP Address',
      'Device',
      'Source',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'Created At'
    ];

    const escapeCsvValue = (val: any) => {
      if (val === null || val === undefined) return '';
      const str = String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const csvRows = [headers.join(',')];

    for (const lead of leads) {
      const row = [
        lead.id,
        lead.name,
        lead.phone,
        lead.email || '',
        lead.budget || '',
        lead.visitDate || '',
        lead.message || '',
        lead.status,
        lead.ip || '',
        lead.device || '',
        lead.source || '',
        lead.utmSource || '',
        lead.utmMedium || '',
        lead.utmCampaign || '',
        lead.createdAt
      ];
      csvRows.push(row.map(escapeCsvValue).join(','));
    }

    const csvContent = csvRows.join('\n');

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="jdr_golden_heights_leads.csv"',
        'Cache-Control': 'no-store'
      }
    });
  } catch (error: any) {
    console.error('API CSV Export error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

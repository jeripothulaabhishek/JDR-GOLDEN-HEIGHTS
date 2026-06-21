import { NextRequest, NextResponse } from 'next/server';
import { updateLeadStatus, deleteLead } from '@/lib/db';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid Lead ID' }, { status: 400 });
    }

    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const validStatuses = ['New', 'Contacted', 'Site Visit Scheduled', 'Interested', 'Booked'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid Status value' }, { status: 400 });
    }

    const success = await updateLeadStatus(id, status);
    if (!success) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Status updated successfully' });
  } catch (error: any) {
    console.error('API Update lead error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid Lead ID' }, { status: 400 });
    }

    const success = await deleteLead(id);
    if (!success) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error: any) {
    console.error('API Delete lead error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

export interface SheetsLeadPayload {
  name: string;
  phone: string;
  email?: string;
  budget?: string;
  visitDate?: string;
  message?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  ip?: string;
  device?: string;
  timestamp: string;
}

export async function forwardToGoogleSheets(payload: SheetsLeadPayload): Promise<boolean> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('GOOGLE_SHEETS_WEBHOOK_URL environment variable is not defined. Skipping Google Sheets logging.');
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Google Sheets webhook returned status ${response.status}:`, await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error forwarding lead to Google Sheets:', error);
    return false;
  }
}

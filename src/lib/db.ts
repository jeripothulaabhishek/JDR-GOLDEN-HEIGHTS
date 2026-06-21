import fs from 'fs';
import path from 'path';

export interface Lead {
  id: number;
  name: string;
  phone: string;
  email?: string;
  budget?: string;
  visitDate?: string;
  message?: string;
  chatHistory?: string; // JSON string of chat log
  status: 'New' | 'Contacted' | 'Site Visit Scheduled' | 'Interested' | 'Booked';
  ip?: string;
  device?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt: string;
}

const JSON_DB_PATH = path.join(process.cwd(), 'leads.json');
const SQLITE_DB_PATH = path.join(process.cwd(), 'leads.db');

let sqliteInstance: any = null;
let useJsonFallback = false;

// Attempt to load SQLite
async function getSqliteDb() {
  if (useJsonFallback) return null;
  if (sqliteInstance) return sqliteInstance;

  try {
    const sqlite3 = require('sqlite3').verbose();
    const { open } = require('sqlite');
    
    sqliteInstance = await open({
      filename: SQLITE_DB_PATH,
      driver: sqlite3.Database
    });

    // Create table if it doesn't exist
    await sqliteInstance.exec(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        budget TEXT,
        visitDate TEXT,
        message TEXT,
        chatHistory TEXT,
        status TEXT DEFAULT 'New',
        ip TEXT,
        device TEXT,
        source TEXT,
        utmSource TEXT,
        utmMedium TEXT,
        utmCampaign TEXT,
        createdAt TEXT
      )
    `);
    
    return sqliteInstance;
  } catch (error) {
    console.error('Failed to initialize SQLite. Falling back to JSON database.', error);
    useJsonFallback = true;
    return null;
  }
}

// Helpers for JSON Fallback
function readJsonDb(): Lead[] {
  try {
    if (!fs.existsSync(JSON_DB_PATH)) {
      fs.writeFileSync(JSON_DB_PATH, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(JSON_DB_PATH, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading JSON DB:', err);
    return [];
  }
}

function writeJsonDb(leads: Lead[]) {
  try {
    fs.writeFileSync(JSON_DB_PATH, JSON.stringify(leads, null, 2));
  } catch (err) {
    console.error('Error writing JSON DB:', err);
  }
}

export async function initDb() {
  await getSqliteDb();
}

export async function saveLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<Lead> {
  const createdAt = new Date().toISOString();
  const status = 'New';
  
  const db = await getSqliteDb();
  if (db) {
    try {
      const result = await db.run(
        `INSERT INTO leads (
          name, phone, email, budget, visitDate, message, chatHistory, status, ip, device, source, utmSource, utmMedium, utmCampaign, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          leadData.name,
          leadData.phone,
          leadData.email || null,
          leadData.budget || null,
          leadData.visitDate || null,
          leadData.message || null,
          leadData.chatHistory || null,
          status,
          leadData.ip || null,
          leadData.device || null,
          leadData.source || null,
          leadData.utmSource || null,
          leadData.utmMedium || null,
          leadData.utmCampaign || null,
          createdAt
        ]
      );
      return {
        id: result.lastID,
        ...leadData,
        status,
        createdAt
      };
    } catch (error) {
      console.error('SQLite insert failed, trying JSON fallback:', error);
      // Fall through to JSON
    }
  }

  // JSON Fallback
  const leads = readJsonDb();
  const newId = leads.length > 0 ? Math.max(...leads.map(l => l.id)) + 1 : 1;
  const newLead: Lead = {
    id: newId,
    ...leadData,
    status,
    createdAt
  };
  leads.push(newLead);
  writeJsonDb(leads);
  return newLead;
}

export async function getLeads(): Promise<Lead[]> {
  const db = await getSqliteDb();
  if (db) {
    try {
      return await db.all('SELECT * FROM leads ORDER BY id DESC');
    } catch (error) {
      console.error('SQLite fetch failed, trying JSON fallback:', error);
    }
  }

  // JSON Fallback
  const leads = readJsonDb();
  return leads.sort((a, b) => b.id - a.id);
}

export async function updateLeadStatus(
  id: number,
  status: Lead['status']
): Promise<boolean> {
  const db = await getSqliteDb();
  if (db) {
    try {
      const result = await db.run('UPDATE leads SET status = ? WHERE id = ?', [status, id]);
      return result.changes > 0;
    } catch (error) {
      console.error('SQLite update failed, trying JSON fallback:', error);
    }
  }

  // JSON Fallback
  const leads = readJsonDb();
  const idx = leads.findIndex(l => l.id === id);
  if (idx !== -1) {
    leads[idx].status = status;
    writeJsonDb(leads);
    return true;
  }
  return false;
}

export async function deleteLead(id: number): Promise<boolean> {
  const db = await getSqliteDb();
  if (db) {
    try {
      const result = await db.run('DELETE FROM leads WHERE id = ?', [id]);
      return result.changes > 0;
    } catch (error) {
      console.error('SQLite delete failed, trying JSON fallback:', error);
    }
  }

  // JSON Fallback
  const leads = readJsonDb();
  const idx = leads.findIndex(l => l.id === id);
  if (idx !== -1) {
    leads.splice(idx, 1);
    writeJsonDb(leads);
    return true;
  }
  return false;
}

// routes/register.js
import express from "express";
import { google } from "googleapis";

const credentials = {
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLIENT_EMAIL
};


const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;

// Auth setup
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export default async function handler (req, res) {
  try {
    const { formType, data } = req.body;

    if (!formType || !data) {
      return res.status(400).json({ error: "formType and data required" });
    }

    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    let values;
    let sheetName;

    if (formType === "freelancer") {
      const { name, email, field, experience, phone } = data;
      values = [[name, email, field, experience, phone, new Date().toISOString()]];
      sheetName = "Freelancers";
    } else if (formType === "client") {
      const { name, email, company, years, phone } = data;
      values = [[name, email, company, years, phone, new Date().toISOString()]];
      sheetName = "Clients";
    } else {
      return res.status(400).json({ error: "Invalid formType" });
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:E`,
      valueInputOption: "RAW",
      requestBody: { values },
    });

    res.json({ success: true, message: "Data added to Google Sheets" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ error: "Failed to add data" });
  }
};
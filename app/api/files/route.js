import { NextResponse } from "next/server";
import { google } from "googleapis";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const folderId = searchParams.get("folderID");

  const documents = [];
  const folders = [];

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );

  // Set the access token and refresh token for the OAuth2 client
  oauth2Client.setCredentials({
    access_token: ACCESS_TOKEN,
    refresh_token: REFRESH_TOKEN,
  });

  try {
    const drive = google.drive({ version: "v3", auth: oauth2Client });

    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      pageSize: 1000,
      fields: "nextPageToken, files(id, name, mimeType, webViewLink)",
    });

    const files = response.data.files;

    if (files && files.length) {
      files.forEach((file) => {
        switch (file.mimeType) {
          case "application/vnd.google-apps.folder":
            folders.push(file);
            break;
          case "application/pdf":
            documents.push(file);
            break;
          default:
            break;
        }
      });

      return NextResponse.json({
        Folders: folders,
        Documents: documents,
      });
    } else {
      console.log("No files found.");
      return NextResponse.json({
        Folders: [],
        Documents: [],
      });
    }
  } catch (err) {
    return NextResponse.json("Error listing files:", err.message);
  }
}

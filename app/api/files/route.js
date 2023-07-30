import { NextResponse } from "next/server";
import { google } from "googleapis";

const CLIENT_ID =
  "623004627887-gmsapnut5t19hrmk84eogm8i85o4tp20.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";

const ACCESS_TOKEN =
  "ya29.a0AbVbY6MGpfnQhxSNsjXl_xi2TZx-6PSPEGWrbpLIPpwscKpogiOS-MTwNkw8-poh-Q-o20Poicw-L30b3LHZ46IGdN7VinjaMYVvD_Ifs3V_YWQfilCMHjO6qmKVxD7I_O_uH0N9IFJ4D56O_yLXpbx5dd7oaCgYKAR0SARESFQFWKvPlWT5EHb4fcM_449B5VTMp2Q0163";
const REFRESH_TOKEN =
  "1//04KAs8-Z17t6hCgYIARAAGAQSNwF-L9IrFND1NuE0Tpjz6x80EqHIGm-Z8gqNrPlFvgko9jhR0HRf0A31owibx0fuyjkm7SQTXRQ";

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
          default:documents.push(file);
            break;
        }
      });

      return NextResponse.json({
        Folders: folders,
        Documents: documents,
      });
    } else {
      console.log("No files found.");
    }
  } catch (err) {
    return NextResponse.json("Error listing files:", err.message);
  }
}

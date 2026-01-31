// ----------------------------------------------------------------------------------
// INSTRUCTIONS (HOW TO UPDATE):
// 1. Go to your Google Sheet > Extensions > Apps Script.
// 2. Erase the old code and paste this NEW code.
// 3. IMPORTANT: Click "Deploy" > "Manage deployments".
// 4. Click the "Edit" (pencil icon) next to your existing deployment.
// 5. Under "Version", select "New version".
// 6. Click "Deploy".
// 7. You DO NOT need to change the URL in the website if you update the deployment correctly.
// ----------------------------------------------------------------------------------

function doPost(e) {
    try {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

        var rawData = e.postData.contents;
        var jsonData = JSON.parse(rawData);

        var accountId = jsonData.accountId;
        var accessMode = jsonData.mode;
        var name = jsonData.name;
        var contact = jsonData.contact;
        var expiryDate = jsonData.expiryDate;
        var timestamp = new Date();

        // Append in this order (as requested):
        // A: Account ID
        // B: Expiry Date
        // C: Name
        // D: Contact
        // E: Mode
        // F: Timestamp
        sheet.appendRow([accountId, expiryDate, name, contact, accessMode, timestamp]);

        return ContentService.createTextOutput(JSON.stringify({
            "result": "success",
            "message": "Data saved"
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({
            "result": "error",
            "message": error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

function doGet(e) {
    return ContentService.createTextOutput(JSON.stringify({
        "result": "success",
        "message": "BCB Elevate Licensing Server is Online."
    })).setMimeType(ContentService.MimeType.JSON);
}

# How to Connect Your Website to Google Sheets

The link you provided (`.../pub?output=csv`) is a **read-only** link. Your website cannot write data to it directly.

To allow your website to **save** data to your Sheet, you must create a "connector" script inside your Google Sheet.

Follow these exact steps:

### 1. Open Your Google Sheet
Open your Google Sheet (the one where you can edit cells).
*Do not use the published link.*

### 2. Open the Script Editor
1. In the top menu, click on **Extensions**.
2. Select **Apps Script**.
   *(A new tab will open with a code editor)*

### 3. Paste the Connector Code
1. Open the file `apps-script.js` located in your project folder:
   `c:/Users/jabir/OneDrive/Documents/BCB Elevate Trading Website/apps-script.js`
2. Copy all the code from that file.
3. Go back to the Google Apps Script tab.
4. Delete any code there (like `function myFunction() {...}`).
5. **Paste** the code you copied.
6. Press `Ctrl + S` to save. Name it "BCB Connector".

### 4. Deploy as a Web App (Crucial Step)
1. Click the blue **Deploy** button (top right).
2. Select **New deployment**.
3. Click the "Select type" (gear icon) next to "Select type".
4. Choose **Web app**.
5. Fill in these fields:
   - **Description**: `BCB Trading`
   - **Execute as**: `Me (your email)`
   - **Who has access**: **Anyone** (This is very important! If you don't select 'Anyone', it won't work).
6. Click **Deploy**.
7. You might be asked to "Authorize access". Click **Review permissions**, choose your account, click **Advanced**, and then **Go to BCB Connector (unsafe)** (it is safe, it's your own code).

### 5. Get the Link
1. Once deployed, you will see a box with a **Web app URL**.
2. It looks like this: `https://script.google.com/macros/s/AKfycbx.../exec`
3. **Copy** this URL.

### 6. Add the Link to Your Website
1. Open the file `script.js` in your project folder:
   `c:/Users/jabir/OneDrive/Documents/BCB Elevate Trading Website/script.js`
2. At the very top, look for:
   ```javascript
   const GOOGLE_SCRIPT_URL = ""; 
   ```
3. Paste your URL inside the quotes:
   ```javascript
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx.../exec"; 
   ```
4. Save the file.

### 7. Test It
1. Open `index.html` in your browser.
2. Fill out the "Access Now" form.
3. Check your Google Sheet. A new row should appear with the Account ID!

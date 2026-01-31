# How to Set Up Google Sign-In (Firebase)

To make the "Sign In" button work, you need to get your own free keys from Google.

### Step 1: Create a Firebase Project
1. Go to [https://console.firebase.google.com/](https://console.firebase.google.com/).
2. Click **Create a project**.
3. Name it `BCB Trading` and click Continue/Create.

### Step 2: Enable Google Sign-In
1. On the left menu, click **Build** > **Authentication**.
2. Click **Get started**.
3. Select **Google** from the list of Sign-in providers.
4. Click **Enable**.
5. Select your support email.
6. Click **Save**.

### Step 3: Get Your Config Keys
1. Click the **Project settings** (gear icon) next to "Project Overview" at the top left.
2. Scroll down to the "Your apps" section.
3. Click the `</>` icon (Web).
4. Register app (Name: `BCB Website`). Uncheck "Firebase Hosting". Click **Register app**.
5. You will see a code block with `const firebaseConfig = { ... };`.
6. Copy ONLY the content inside the curly braces `{ ... }` (apiKey, authDomain, etc.).

### Step 4: Add Keys to Your Website
1. Open the file `firebase-config.js` in your folder:
   `c:/Users/jabir/OneDrive/Documents/BCB Elevate Trading Website/firebase-config.js`
2. Replace the placeholder config with your copied keys.

Example of what your file should look like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "bcb-trading.firebaseapp.com",
  projectId: "bcb-trading",
  storageBucket: "bcb-trading.appspot.com",
  messagingSenderId: "123456...",
  appId: "1:12345:web:..."
};
```
3. Save the file.

### Step 5: Test
1. Refresh your website.
2. Click "Sign In".
3. A Google popup should appear!

# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Running On Your Local Machine

To run this project on your local system, follow these steps:

1.  **Copy Files:** Copy all the files from this project into a folder on your computer.

2.  **Install Dependencies:** Open a terminal in the project folder and run the following command. This will read the `package.json` file and install all the necessary packages automatically.

    ```bash
    npm install
    ```

3.  **Set Up Environment Variables:** Create a file named `.env.local` in the root of your project. You will need to add your Firebase configuration and your Google AI API key to this file.

    ```
    # Firebase configuration from your project
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
    NEXT_PUBLIC_FIREBASE_APP_ID="..."
    # ... and other Firebase config keys

    # Google AI API Key
    GEMINI_API_KEY=...
    ```

4.  **Run the App:** Start the local development server with this command:
    ```bash
    npm run dev
    ```

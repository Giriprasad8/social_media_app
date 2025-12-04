# Social Community App (Backend + Frontend + Database Setup)

This repository contains the complete source code for the Community Application, including:

- **Backend** – Node.js, TypeScript, TypeORM, PostgreSQL  
- **Frontend** – React / Next.js (or your framework)  
- **Database** – PostgreSQL setup with required tables  

--- System requirements

## | Component             | Version Required        |
| --------------------- | ----------------------- |
| **Node.js**           | 18.x LTS (NOT 20 or 24) |
| **npm**               | 9+                      |
| **PostgreSQL**        | 14 or 15                |
| **pgAdmin**           | Any version             |
| **React Native CLI**  | Latest                  |
| **Android Studio**    | For running mobile app  |
| **Qdrant (Optional)** | 1.x (Local or Cloud)    |


## 🚀 Project Requirements
This project can be run locally using:

- Node.js v18+  (** IMPORTANT **)
- ## 💻 1. Prerequisites

Before running the application, ensure you have the following installed on your system:

* **Node.js:** Version 18.x or higher (recommended).
* **npm:** Comes bundled with Node.js.
* **Expo CLI:** Install the command-line interface globally.
    ```bash
    npm install -g expo-cli
    ```
* **Mobile Device/Simulator:**
    * **Android/iOS Simulator/Emulator**
    * **Expo Go App** installed on a physical device.
    * 
## ⚙️ 2. Setup and Installation
Follow these steps to get the project running locally.

### 2.1. Clone the Repository

bash
# Clone this repository (assuming you are in the directory above the project folder)
git clone <YOUR_REPO_URL>
cd <YOUR_PROJECT_FOLDER_NAME>

## 2.2Install Dependencies
Install the core dependencies listed in package.json ------ npm install

## 2.3. Install Community Modules
This project requires a specific module for the radius slider functionality used in the filter screen------  npx expo install @react-native-community/slider

## 2.4. Resolve Expo Compatibility (Recommended)
To clear the compatibility warning (expo@54.0.25 expecting ~54.0.26), run the official fix command: ---- npx expo install --fix

## 3. Running the Application
3.1. Start the Expo Development Server
Start the bundler and server. This will open a Metro Bundler interface in your browser ----- npx expo start

## 3.2 Launch the App
Android	Press a	Opens on connected Android device/emulator.
iOS	Press i	Opens on connected iOS simulator/device (macOS only).
QR Code	Scan with Expo Go	Use the Expo Go app on your physical device to scan the QR code displayed in the terminal.

## Frontend Folder structure
.
├── App.tsx                   # Main Navigation Stack
├── index.ts                  # Expo Entry Point
├── package.json              # Dependencies and Scripts
├── tsconfig.json             # TypeScript Configuration
├── tailwind.config.js        # NativeWind/Tailwind Configuration
└── src/                      # Application Logic
    ├── components/           # Reusable UI elements (e.g., PostItem, FilterBottomSheet)
    │   ├── PostItem.tsx
    │   └── FilterBottomSheet.tsx
    └── screens/              # Full-page components/screens
        ├── CommunityScreen.tsx     # Main Feed & Filter Logic
        ├── CreatePostScreen.tsx    # Post Creation Form
        ├── PostDetailScreen.tsx    # Discussion Thread View
        └── SearchResultsScreen.tsx # RAG Search Results View


/my-backend
 ├── src
 │   ├── app.ts
 │   ├── server.ts
 │   ├── entities/
 │   ├── routes/
 │   ├── utils/
 │   ├── vector/
 │   └── database.ts
 ├── package.json
 └── .env


## Backend Setup (Node.js + TypeScript + PostgreSQL)

|--- Navigate to backend folder - cd my-backend
|--- Install dependencies       - npm install
|--- Create postgresSQL         - open postgres -> Create a DataBase ---> Database name: mydb
                                                                          Username: postgres
                                                                          Password: your_password

|--- Create .env file  - Create a new file Named .env inside my-backend/: OPENAI_API_KEY=YOUR_KEY_HERE
                                                                          QDRANT_API_URL=http://localhost:6333
                                                                          QDRANT_API_KEY=YOUR_KEY_HERE
                                                                          DB_HOST=localhost
                                                                          DB_PORT=5432
                                                                          DB_USERNAME=postgres
                                                                          DB_PASSWORD=your_password
                                                                          DB_NAME=mydb
|--- start the backend  - npm run dev
|--- If successfullget  - Server running on http://localhost:3000
                          Database connected

## Running the full project
|--- Start postgreSQL
|--- Start Backend (my-backend)
|--- Start Frontend (communityapp)
|--- App loads posts, login, create post, search, Filter


## API Endpoints

| Method | Endpoint       | Description                           |
| ------ | -------------- | ------------------------------------- |
| POST   | /auth/register | Register user                         |
| POST   | /auth/login    | Login user                            |
| GET    | /posts         | Get all posts                         |
| POST   | /posts         | Create a post                         |
| POST   | /replies       | Add reply to post                     |
| GET    | /posts/filter  | Apply filter (type + radius + search) |


## Optional: Vector DB + RAG (Qdrant)

|--- Start Qdrant locally (DOCKER) --docker run -p 6333:6333 qdrant/qdrant
|--- The Backend run automatically --- Generates embedding
                                   --- Stores Vectors
                                   --- Enables sematic search


##  Testing

|--- After setup      --- Backend must run without any error
                      --- Frontend must open the app
                      --- Login and Signup must work
                      --- Create Post must work
                      --- Replies must work
                      --- Search + Filter must work

## Troubleshooting

❌ “ECONNREFUSED 5432”        --- PostgreSQL is not running.
❌ “Missing OPENAI_API_KEY”   --- Check .env file.
❌ React Native build fails   --- cd android
                                   ./gradlew clean

                                











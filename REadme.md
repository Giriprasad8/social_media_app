# Community App (Backend + Frontend + Database Setup)

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

/communityapp  (React Native Frontend)
 ├── src/
 │   ├── screens/
 │   ├── components/
 │   ├── types/
 ├── App.tsx
 ├── package.json
 └── metro.config.js

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

## Frontend Setup (React Native)

|--- Navigate to Frontend Folder - cd communityapp
|--- Install dependencies        - npm install
|--- Create .env file            - API_BASE_URL=http://YOUR_LOCAL_IP:3000
|--- Find your ip                - ipconfig - use IPV4
|--- Run the Android app         - npm start


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

                                










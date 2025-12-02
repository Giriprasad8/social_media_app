# Community App (Backend + Frontend + Database Setup)

This repository contains the complete source code for the Community Application, including:

- **Backend** – Node.js, TypeScript, TypeORM, PostgreSQL  
- **Frontend** – React / Next.js (or your framework)  
- **Database** – PostgreSQL setup with required tables  

---

## 🚀 Project Requirements
This project can be run locally using:

- Node.js v18+  
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

## Database Setup (PostgreSQL)
## Create a new database

CREATE DATABASE mydb;

## inside pqsl

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

## update your .env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourPassword
DB_NAME=mydb

## Backend node setup
 cb my-backend

 ## install

 npm install
  ## add your rnvironmental variable
  ## create .env file in my-backend
  OPENAI_API_KEY=yourkey
QDRANT_API_URL=http://localhost:6333
QDRANT_API_KEY=your_qdrant_key

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=mydb

 ## start the backend
npm run dev

runs on = http://localhost:3000

## Frontend setup
cd communityapp
npm install
npx pod-install
## run the app
npx react-native run andriod

## running full project
make sure your DB is connected

cd my-backend
npm run dev

cd communityapp
npx react-native run andriod

## Environment variable 
.env (Backend)
OPENAI_API_KEY=yourkey
QDRANT_API_URL=http://localhost:6333
QDRANT_API_KEY=your_key

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=mydb

.env (Frontend)
API_URL=http://YOUR_LOCAL_IP:3000

## Find your ip
ipconfig


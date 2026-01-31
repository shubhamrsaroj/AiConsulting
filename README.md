# AI Consult - Interactive Landing Page

A modern, mobile-friendly landing page for an AI Consulting business, featuring a futuristic design, interactive elements, and a working contact form.

## Tech Stack

**Client:**
- React (Vite)
- Tailwind CSS
- Framer Motion (Animations)
- EmailJS (Frontend email sending)

**Server:**
- Node.js & Express
- MongoDB (Mongoose)
- Nodemailer (Backend email service)

## Prerequisites

- Node.js installed
- MongoDB installed and running (or a MongoDB Atlas connection string)

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Client Setup
Navigate to the client folder and install dependencies:
```bash
cd client
npm install
```

Create a `.env` file in the `client` directory (or use `.env.local`):
```
VITE_API_URL=http://localhost:5000
```
*(Note: EmailJS credentials are currently hardcoded in `CyberContact.jsx`, consider moving them to `.env` for better security)*

### 3. Server Setup
Navigate to the server folder and install dependencies:
```bash
cd ../server
npm install
```

Create a `.env` file in the `server` directory:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/contact_form_db
# Add other backend credentials if needed
```

## Running the Application

You need to run both the client and server terminals.

**Terminal 1 (Server):**
```bash
cd server
npm run dev
```

**Terminal 2 (Client):**
```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Deployment

- **Frontend:** Netlify / Vercel
- **Backend:** Render / Railway / Heroku

# Team Task Manager Pro

Team Task Manager Pro is a modern SaaS-style collaboration and project management platform.

## Features
- **Project Management**: Create, edit, and delete projects.
- **Task Tracking**: Kanban board for visual task management.
- **Team Collaboration**: Role-based access control (Admin/Member).
- **Analytics Dashboard**: Real-time productivity charts and stats.
- **Responsive UI**: Built with Next.js, Tailwind CSS, and ShadCN UI.
- **Secure Auth**: JWT-based authentication with protected routes.

## Tech Stack
- **Frontend**: Next.js 14, React, Tailwind CSS, ShadCN UI, Zustand, React Query, Recharts.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your credentials:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Design Aesthetic
The application features a premium, minimalist design inspired by modern tools like Linear and Asana, utilizing an indigo and slate color palette for a professional look.

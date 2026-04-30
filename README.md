# Synergy 🚀

A high-performance, role-based SaaS platform for modern team collaboration and project oversight. Build, track, and deliver projects with precision.

## 🔗 Live Links
- **Live Application**: [https://synergy-task-manager.railway.app/](https://synergy-task-manager.railway.app/)
- **Backend API**: [https://synergy-api.railway.app/](https://synergy-api.railway.app/)

---

## ✨ Key Features

### 🛡️ Secure Role-Based Access Control (RBAC)
- **Admin Dashboard**: Full visibility into team productivity, project distribution, and member management.
- **Member Dashboard**: Focused workspace for assigned tasks, deadlines, and personal progress tracking.

### 📊 Advanced Analytics & Visualization
- **Overdue Task Tracking**: Real-time identification of critical deadlines and overdue missions.
- **Interactive Charts**: Visual breakdown of task statuses and team productivity using Recharts.
- **Project Distribution**: Analysis of project volume and team member density.

### 👥 Team & Project Management
- **Project Oversight**: Create projects, assign team members, and set priority levels.
- **Member Invitations**: Admins can invite new members and manage roles directly from the platform.
- **Secure Deletion**: Admins can remove members safely, with built-in protections for administrative accounts.

### 🔔 Real-Time Awareness
- **Notification System**: Instant alerts for task assignments and project updates.
- **Activity Logs**: Complete audit trail of system-wide actions for transparency.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS (v4) with OKLCH color tokens
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **UI Components**: custom premium design with Lucide icons
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt
- **Deployment**: Railway

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string (Atlas)

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   ```

2. Install Backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install Frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. Set up Environment Variables:
   - Create `server/.env` with `MONGODB_URI`, `JWT_SECRET`, and `FRONTEND_URL`.
   - Create `client/.env.local` with `NEXT_PUBLIC_API_URL`.

5. Run the project:
   - Server: `npm run dev`
   - Client: `npm run dev`

---

## 📄 License
This project is licensed under the MIT License.

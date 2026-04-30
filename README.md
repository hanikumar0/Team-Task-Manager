# Team Task Manager Pro 🚀

A high-performance, role-based SaaS platform for modern team collaboration and project oversight. Build, track, and deliver projects with precision.

## 🔗 Live Links
- **Live Application**: [https://team-task-manager-pro.vercel.app/](https://team-task-manager-pro.vercel.app/)
- **Backend API**: [https://team-task-manager-pro.onrender.com/](https://team-task-manager-pro.onrender.com/)

---

## ✨ Key Features

### 🛡️ Secure Role-Based Access Control (RBAC)
- **Admin Dashboard**: Full visibility into team productivity, project distribution, and member management.
- **Member Dashboard**: Focused workspace for assigned tasks, deadlines, and personal progress tracking.

### 📊 Advanced Analytics & Visualization
- **Interactive Charts**: Real-time visualization of task statuses and team productivity using Recharts.
- **Kanban Board**: Drag-and-drop-ready task management with status categorization (Todo, In Progress, Review, Completed).
- **Interactive Calendar**: Visualize deadlines and project timelines at a glance.

### 👥 Team & Project Management
- **Project Oversight**: Create projects, assign team members, and set priority levels.
- **Member Invitations**: Admins can invite new members and manage roles directly from the platform.
- **Secure Deletion**: Admins can remove members safely, with built-in protections for administrative accounts.

### 🔔 Real-Time Awareness
- **Notification System**: Instant alerts for task assignments and project updates with a dedicated history view.
- **Activity Logs**: Complete audit trail of system-wide actions for transparency and accountability.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **UI Components**: Base UI + custom ShadCN-inspired design
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt
- **Deployment**: Render

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string

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

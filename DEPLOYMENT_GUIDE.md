# 🚀 Synergy Deployment Guide (Full-Stack Vercel)

This guide walks you through deploying the **Synergy** platform entirely on **Vercel**. We will deploy the frontend and backend as two separate projects on Vercel to maintain clean separation and optimal performance.

---

## 🏗️ Architecture Overview
-   **Frontend**: Next.js (Project 1 on Vercel)
-   **Backend**: Node.js/Express (Project 2 on Vercel)
-   **Database**: MongoDB Atlas (External)

---

## 1. Backend Deployment (Vercel)

Vercel can host standalone Express apps as Serverless Functions.

1.  **Preparation**: Ensure your `server/` directory has a `vercel.json` file (provided below).
2.  **Import to Vercel**: Click **Add New** > **Project** and select your repo.
3.  **Configure Project**:
    *   **Project Name**: `synergy-api`
    *   **Root Directory**: Set this to `server`.
    *   **Framework Preset**: Select **Other**.
4.  **Environment Variables**:
    *   `MONGODB_URI`: Your MongoDB Atlas connection string.
    *   `JWT_SECRET`: A long random string.
    *   `FRONTEND_URL`: Your future Vercel frontend URL.
5.  **Deploy**: Once deployed, Vercel will give you a domain (e.g., `https://synergy-api.vercel.app`).

---

## 2. Frontend Deployment (Vercel)

1.  **Import to Vercel**: Click **Add New** > **Project** and select the same repo.
2.  **Configure Project**:
    *   **Project Name**: `synergy-app`
    *   **Root Directory**: Set this to `client`.
    *   **Framework Preset**: Select **Next.js**.
3.  **Environment Variables**:
    *   `NEXT_PUBLIC_API_URL`: Paste your Vercel Backend URL (e.g., `https://synergy-api.vercel.app/api`).
4.  **Deploy**: Vercel will give you your live application link!

---

## 3. The "CORS" Handshake

1.  Copy your live **Frontend URL**.
2.  Go to your **Backend Project** settings on Vercel.
3.  Update the `FRONTEND_URL` environment variable.
4.  Redeploy the backend.

---

## 🛠️ Essential `vercel.json` for Backend

Create a file named `vercel.json` inside the `server/` folder with this content:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

---

## 🔍 Why Vercel instead of Railway?
Due to the expiration of the Railway trial period, the platform has been migrated to a full Vercel environment. This ensures the application remains live and accessible for evaluation without interruption.

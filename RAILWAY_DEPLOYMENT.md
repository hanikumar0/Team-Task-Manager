# 🚂 Railway Deployment Guide for Synergy

This guide walks you through deploying the **Synergy** platform (Next.js + Express + MongoDB) to Railway. Since the project is structured as a monorepo (separate `client` and `server` folders), we will deploy them as two separate services within a single Railway project.

---

## 1. Prerequisites
- A [Railway.app](https://railway.app/) account.
- Your project pushed to a GitHub repository.
- A MongoDB Atlas connection string (or you can provision MongoDB directly on Railway).

---

## 2. Deploy the Backend (Express Server)

1.  **Create New Project**: On Railway, click `New Project` > `Deploy from GitHub repo`.
2.  **Select Repository**: Choose your Synergy repository.
3.  **Configure Service**:
    *   Once the project is created, click on the service card.
    *   Go to **Settings** > **General** > **Root Directory**.
    *   Set this to `/server`.
4.  **Add Environment Variables**:
    *   Go to the **Variables** tab and add:
        *   `PORT`: `5000` (Railway will automatically assign a port, but this is a safe default).
        *   `MONGODB_URI`: Your MongoDB Atlas connection string.
        *   `JWT_SECRET`: A long, random string.
        *   `FRONTEND_URL`: Your future frontend URL (e.g., `https://synergy-client.up.railway.app`).
5.  **Expose Domain**:
    *   Go to **Settings** > **Networking** and click **Generate Domain**.
    *   **Note this URL**: This will be your `NEXT_PUBLIC_API_URL` for the frontend.

---

## 3. Deploy the Frontend (Next.js App)

1.  **Add New Service**: In the same Railway project, click **+ New** > **GitHub Repo**.
2.  **Select Repository**: Choose the same Synergy repository again.
3.  **Configure Service**:
    *   Go to **Settings** > **General** > **Root Directory**.
    *   Set this to `/client`.
4.  **Add Environment Variables**:
    *   Go to the **Variables** tab and add:
        *   `NEXT_PUBLIC_API_URL`: The Backend URL you generated in step 2 (e.g., `https://synergy-server.up.railway.app/api`).
5.  **Expose Domain**:
    *   Go to **Settings** > **Networking** and click **Generate Domain**.
    *   **Note this URL**: This is your live application link!

---

## 4. Final Configuration (CORS)

1.  Go back to your **Backend Service** variables.
2.  Update the `FRONTEND_URL` variable with the final URL from your Frontend service (e.g., `https://synergy-client.up.railway.app`).
3.  Railway will automatically redeploy the backend with the correct CORS permissions.

---

## 💡 Pro Tips for Railway
- **Build Commands**: Railway automatically detects `npm run build` and `npm start`. Ensure your `server/package.json` has a `"start": "node index.js"` script.
- **Node Version**: You can specify your Node version by adding `"engines": { "node": "18.x" }` to your `package.json` files.
- **Health Checks**: If the backend fails to deploy, check the **Deploy Logs**. Ensure your MongoDB IP whitelist allows "Access from Anywhere" (`0.0.0.0/0`) if using Atlas.

---

### ✅ Deployment Checklist
- [ ] Backend is live at `.../api`
- [ ] Frontend is live and displays the landing page
- [ ] You can Sign Up/Login on the live URL
- [ ] MongoDB connection is successful (check backend logs)

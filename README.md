# 📝 React Todo App — Enhanced

A fast, modern Todo app built with React + TypeScript. Includes **date filters** and **priority management**, task sharing via link/QR, P2P sync, themes, and offline PWA support.

**Live Demo:**  
👉 **http://reeact-tudo-app.s3-website.eu-north-1.amazonaws.com/**

---

## ✨ Features

- **Date Filters** – Filter tasks by custom range or quick presets
- **Priority Management** – High/Medium/Low with color badges & sorting
- **Share by Link / QR** – Send a task to anyone instantly
- **P2P Task Sync (WebRTC)** – Sync tasks device-to-device
- **Themes & Dark Mode** – Multiple color themes, auto dark
- **PWA Offline** – Installable, works offline, app badges
- **Import/Export JSON** – Backup/restore tasks easily
- **Read Aloud** – SpeechSynthesis reads tasks
- **Update Prompt** – In-app notice for new versions

---

## ☁️ AWS Deployment — S3 + CodeBuild + CodePipeline

This project is deployed on AWS using **S3 Static Website Hosting** with an automated **CI/CD pipeline** powered by **CodePipeline** and **CodeBuild**.

````bash
npm run build
# Output goes to: dist/
## 🧱 Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **MUI** + **Emotion**
- **React Context** for state
- **Vitest** for tests

---

## 🚀 Getting Started

```bash
# 1) Install
npm install

# 2) Start dev server
npm run dev
# App at http://localhost:5173

# 3) (Optional) Host dev over HTTPS for mobile testing
npm run dev:host
````

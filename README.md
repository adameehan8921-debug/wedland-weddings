# Wedland Weddings 🌿✨

**Royal Ethnic Curation & Legacy Textiles**

Wedland Weddings is a premium e-commerce platform dedicated to the finest wedding ethnic wear.

---

## 📥 Download the Code
To download the complete source code as a ZIP file:
1. Open the **Settings** menu in AI Studio (top-right gear icon).
2. Go to **Export**.
3. Select **Export to ZIP**.

---

## 🏛️ Features

- **Immersive Narrative UI**: A dark-themed, cinematic shopping experience using modern aesthetic principles.
- **Archive Explorer**: Effortlessly browse through legacy collections with smooth animations.
- **Secure Transaction Vault**: Integrated Razorpay authentication for global transactions.
- **AI-Powered Curation**: Personalized recommendations for your style journey.
- **Real-time Order Tracking**: Securely track your lineage from the weaver to your estate.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion (motion/react)
- **Backend/Database**: Firebase (Auth & Firestore)
- **Icons**: Lucide React

---

## 🚀 Running Locally

Follow these steps to replicate the archive on your local machine:

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **NPM** or **Yarn**

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and add your required keys (refer to `.env.example`).
```env
GEMINI_API_KEY=your_gemini_key
```

### 4. Launch Development Server
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000`.

---

## 📦 Deployment

### GitHub + Render
1. Push your code to a GitHub repository.
2. Connect your repository to **Render.com**.
3. Select **Web Service** or **Static Site** for the service type.
4. Set the Build Command: `npm run build`
5. Set the Publish Directory: `dist`
6. Add your Environment Variables in the Render dashboard.

### Firebase Deployment
If you wish to host using Firebase:
```bash
npm run build
firebase deploy
```

---

## 📜 Archives
*Curated by Wedland Direct.*
The journey of a thousand weaves begins with a single authentication.

---
© 2026 Wedland Weddings. All rights reserved.

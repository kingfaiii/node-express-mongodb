# 🛒 E-Commerce API & Ecosystem

A scalable, secure, and production-ready E-commerce ecosystem built with a focus on **Data Integrity**, **Layered Architecture**, and **Modern Security Standards**.

---

## 🚀 Current Progress & Engineering Standards

### 1. Security & Identity Architecture
Implemented a multi-layered security perimeter to ensure user data protection and granular access control:
*   **One-Way Cryptographic Hashing ([Bcryptjs](https://www.npmjs.com)):** Raw passwords are never stored; only non-reversible fingerprints exist in the database.
*   **Stateless Authentication ([JWT](https://jwt.io)):** Utilized JSON Web Tokens for session management, allowing the server to remain horizontally scalable.
*   **Security Hardening:** Integrated **Helmet.js** for secure HTTP headers and **Express-Rate-Limit** to mitigate Brute-force attacks.
*   **Role-Based Access Control (RBAC):** Tiered permissions system using `isAdmin` logic in JWT payloads to protect administrative routes.

### 2. High-Performance Product Engine
Designed an inventory and social proof system optimized for "Read-Heavy" traffic:
*   **Atomic Aggregations:** Review system uses **Atomic Updates** to calculate average ratings on-the-fly, avoiding expensive database joins.
*   **Payload Optimization:** Utilized **Database Projections** to exclude heavy fields from bulk fetch requests, reducing response size by up to 70%.
*   **SEO-Friendly Architecture:** Engineered a **Native JS Slugify** utility for human-readable URLs.

### 3. Data Integrity & Validation
Defense-in-depth implementation to prevent injection and mass assignment:
*   **Schema-First Validation ([Zod](https://zod.dev)):** Acts as a strict "Bouncer" for all incoming data.
*   **Mass Assignment Protection:** Used **Rest Destructuring** in the Service Layer to whitelist allowed fields explicitly.

### 4. Advanced Frontend Guarding (Recently Added)
*   **Bouncer Component Pattern:** Implemented a reusable `ProtectedRoute` that intercepts navigation based on authentication status and user roles.
*   **Dynamic Breadcrumbs:** Integrated a dynamic navigation trail using `useMatches` (React Router v6) to map route hierarchies to UI labels automatically.
*   **Client-Side Redirection:** Programmatic "Back Button Loop" prevention using the `replace` prop during unauthorized access attempts.

---

## 🗺️ Future Roadmap & Upcoming Features

### Phase 4: Transactional Logic (Active Development)
*   **Inventory Locking:** Temporary reservation mechanism during checkout to prevent overselling.
*   **Financial Orchestration:** Integration with **Stripe** or **PayPal** using secure Webhooks for real-time synchronization.

### Phase 5: Infrastructure & UX
*   **[Cloudinary](https://cloudinary.com) Media Pipeline:** Server-side image resizing and automatic WebP optimization for faster load times.
*   **Strict CORS Policy:** Finalizing production domain whitelisting to prevent unauthorized cross-origin requests.

---

## 🛠️ Tech Stack
*   **Frontend:** React, React Router v6, Context API
*   **Backend:** Node.js, Express
*   **Database:** MongoDB (Native Driver)
*   **Validation:** [Zod](https://zod.dev)
*   **Security:** Helmet, Bcryptjs, JWT, Express-Rate-Limit

---

## 🔧 Installation & Setup

### 1. Backend Setup
1. Create a `.env` file (refer to `.env.example`).
2. Run `npm install` in the root.
3. Start the server: `npm run dev`.

### 2. Frontend Setup
1. Navigate to the client folder: `cd client`.
2. Run `npm install`.
3. Start the development server: `npm run dev`.
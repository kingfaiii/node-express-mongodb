# 🛒 E-Commerce API Backend

A scalable, secure, and production-ready E-commerce backend built with a focus on **Data Integrity**, **Layered Architecture**, and **Modern Security Standards**.

## 🚀 Project Progress & Engineering Standards

### 1. Security & Identity Architecture
I have implemented a multi-layered security perimeter to ensure user data protection and granular access control:
*   **One-Way Cryptographic Hashing ([Bcryptjs](https://www.npmjs.com)):** Implemented industry-standard Salting and Hashing. Raw passwords are never stored; only non-reversible fingerprints exist in the database.
*   **Stateless Authentication ([JWT](https://jwt.io)):** Utilized JSON Web Tokens for session management. This decoupled approach allows the server to remain lightweight and horizontally scalable.
*   **Security Hardening:** Integrated **Helmet.js** to enforce 15+ secure HTTP headers and **Express-Rate-Limit** to mitigate Brute-force and DDoS attacks on sensitive endpoints (Login/Reviews).
*   **Role-Based Access Control (RBAC):** Built a tiered permissions system. By injecting `isAdmin` logic into the JWT payload and utilizing dedicated middleware, I ensured administrative routes remain strictly protected.

### 2. High-Performance Product Engine (Phase 3)
Designed an inventory and social proof system optimized for "Read-Heavy" e-commerce traffic:
*   **Atomic Aggregations:** Developed a review system using **Atomic Updates** to calculate average ratings and review counts on-the-fly, ensuring the "Shop Grid" remains high-performance without expensive database joins.
*   **Payload Optimization:** Utilized **Database Projections** to exclude heavy fields (descriptions/galleries) from bulk fetch requests, reducing API response size by up to 70% for faster mobile rendering.
*   **SEO-Friendly Architecture:** Engineered a **Native JS Slugify** utility to generate human-readable URLs (Slugs) while maintaining a zero-dependency footprint for the utility.

### 3. Data Integrity & Validation
To prevent "Mass Assignment" and "Injection" vulnerabilities, I've implemented defense-in-depth:
*   **Schema-First Validation ([Zod](https://zod.dev)):** Acts as a strict "Bouncer," rejecting malformed data before it reaches the Service Layer. Implemented **Type Coercion** to safely transform frontend string inputs into numeric database types.
*   **Data Sanitization:** Applied automatic `.trim()` and `.toLowerCase()` filters to ensure data consistency across search, indexing, and filtering operations.
*   **Mass Assignment Protection:** Used **Rest Destructuring** in the Service Layer to explicitly whitelist fields, preventing users from modifying protected attributes (e.g., `isAdmin` status or `reviews`).

### 4. Modular Database Architecture
*   **Native [MongoDB](https://www.mongodb.com) Driver:** Performed CRUD operations directly with the Native Driver for maximum control over **ObjectIDs** and query execution plans.
*   **Agnostic Utility Layer:** Refactored database methods into a reusable framework supporting dynamic **Sorting**, **Projections**, and **Pagination**, ensuring the system is ready for future modules (Orders/Payments).

---

## 🗺️ Future Roadmap & Upcoming Features

### 1. Phase 4: Transactional Logic (Current Focus)
*   **Inventory Locking:** Implementing a temporary "lock" mechanism to reserve items during the checkout process to prevent overselling.
*   **Financial Orchestration:** Integrating **Stripe** or **PayPal** using Webhooks for real-time payment status synchronization.

### 2. Infrastructure & UX
*   **[Cloudinary](https://cloudinary.com) Media Pipeline:** Integration for robust image uploads, including server-side resizing and automatic WebP optimization.
*   **Strict CORS Policy:** Restricting API access to authorized frontend domains to prevent unauthorized cross-origin requests.

---

## 🛠️ Tech Stack
*   **Runtime:** Node.js / Express
*   **Database:** MongoDB (Native Driver)
*   **Validation:** [Zod](https://zod.dev)
*   **Security:** Helmet, Bcryptjs, JWT, Express-Rate-Limit

## 🔧 Installation & Setup
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file (refer to `.env.example`).
4. Start the server with `npm run dev`.
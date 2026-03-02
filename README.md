# 🛒 E-Commerce API Backend

A scalable, secure, and production-ready E-commerce backend built with a focus on data integrity, layered architecture, and modern security standards.

## 🚀 Project Progress & Architecture

### 1. Security & Identity Architecture
I have implemented a robust security layer to ensure user data protection and granular access control:
*   **One-Way Hashing ([Bcryptjs](https://www.npmjs.com)):** Implemented industry-standard Salting and Hashing. Raw passwords are never stored; only cryptographic "fingerprints" exist in the database, protecting users even in the event of a data leak.
*   **Stateless Authentication ([JWT](https://jwt.io)):** Utilized JSON Web Tokens for session management. This stateless approach allows the server to remain lightweight and scalable, as it doesn't need to store session data in memory.
*   **Role-Based Access Control (RBAC):** Built a tiered permissions system based on [Cerbos Best Practices](https://www.cerbos.dev). By adding `isAdmin` logic to the JWT payload and creating dedicated middleware, I ensured that only authorized staff can access sensitive administrative routes.

### 2. Modern Backend Design Patterns
The project follows a **Layered Architecture** to ensure the codebase remains maintainable and follows [Atlassian’s Product Development Life Cycle](https://www.atlassian.com) standards:
*   **Separation of Concerns:** 
    *   **Routes:** Handled endpoint definitions.
    *   **Controllers:** Orchestrated the request/response flow.
    *   **Services:** Acted as the "Brain" for business logic and database interactions.
*   **Request Hydration:** Implemented `isUserLogged` middleware that "stamps" the `req.user` object with decoded token data, allowing user identity to travel seamlessly through the middleware chain.
*   **DRY Utility Helpers:** Created reusable utilities like `sendResponse` and `authHeader` to ensure consistent API behavior and reduce repetitive code.

### 3. Data Integrity & Validation
To prevent "garbage data" from entering the system, I've implemented multiple layers of defense as outlined by [OWASP’s Mass Assignment prevention](https://cheatsheetseries.owasp.org):
*   **Schema-First Validation ([Zod](https://zod.dev)):** Zod acts as a "Bouncer" at the application gate, rejecting invalid data before it hits the database.
*   **Data Normalization:** Used Zod to automatically **Trim** and **Lowercase** emails and names, preventing duplicate accounts and ensuring consistent search results.
*   **Defense in Depth:** Validation is applied at both the Middleware and Service layers to protect against Mass Assignment, ensuring users cannot modify protected fields.

### 4. Database & Dependency Management
*   **Native [MongoDB](https://www.mongodb.com) Mastery:** Performed CRUD operations directly with the Native Driver, providing complete control over ObjectIDs and query optimization.
*   **Lean Dependency Strategy:** To minimize "node_modules bloat" and supply-chain risks, I opted for custom-written helpers (like a Native JS Slugify) rather than over-relying on third-party packages.

---

## 🗺️ Future Roadmap & Upcoming Features

The next phase focuses on transforming this core engine into a fully-integrated, production-grade platform.

### 1. External Service Orchestration
*   **[Cloudinary](https://cloudinary.com) Media Pipeline:** Integration for robust image uploads, including server-side resizing and automatic WebP optimization.
*   **[Stripe](https://stripe.com) Financial Integration:** Implementing secure checkout flows using Webhooks to handle SCA compliance and real-time payment status.

### 2. Frontend Connectivity & UX
*   **Headless Storefront:** Developing a React/Next.js frontend to consume this API.
*   **CORS & Security Hardening:** Implementation of strict [CORS policies](https://developer.mozilla.org) to protect API endpoints from unauthorized domains.

### 3. Advanced E-Commerce Logic
*   **Elastic Search Implementation:** Moving toward "fuzzy search" and advanced filtering for the product catalog.
*   **Inventory Locking:** Implementing a temporary "lock" mechanism to reserve items in a user's cart during checkout.

---

## 🛠️ Tech Stack
*   **Runtime:** Node.js
*   **Database:** MongoDB (Native Driver)
*   **Validation:** [Zod](https://zod.dev)
*   **Security:** Bcryptjs, JWT

## 🔧 Installation & Setup
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file (see `.env.example`).
4. Start the server with `npm run dev`.
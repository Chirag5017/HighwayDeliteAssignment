# HighwayDeliteAssignment

A modern full-stack web application for user authentication (sign up/sign in with OTP), and a personal notes dashboard. Built with React, TypeScript, Node.js, Express, and MongoDB.

---

## 🚀 Overview

HighwayDeliteAssignment is a secure and interactive platform that allows users to:
- Sign up and sign in using OTP-based authentication.
- Manage personal notes (create, view, delete) in a user-friendly dashboard.
- Experience a responsive and visually appealing UI.

---

## 🛠️ Tech Stack

**Frontend:**
- [React](https://react.dev/) (with Hooks & Context API)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Hot Toast](https://react-hot-toast.com/)

**Backend:**
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/) (with [Mongoose](https://mongoosejs.com/))
- [JWT](https://jwt.io/) for authentication
- [Nodemailer](https://nodemailer.com/) for email/OTP
- [Zod](https://zod.dev/) for validation

---

## 📁 Folder Structure

```
HighwayDeliteAssignment/
│
├── client/                # Frontend (React)
│   ├── public/            # Static assets
│   └── src/               # Source code
│       ├── components/    # React components
│       ├── context/       # React context providers
│       └── assets/        # Images, icons, etc.
│
├── server/                # Backend (Node.js/Express)
│   ├── src/
│   │   ├── config/        # Environment config
│   │   ├── controllers/   # Express route controllers
│   │   ├── db/            # Database connection
│   │   ├── middleware/    # Express middlewares
│   │   ├── models/        # Mongoose models
│   │   ├── repositories/  # Data access layer
│   │   ├── routes/        # Express routes
│   │   ├── services/      # Business logic
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   └── .env               # Backend environment variables
│
├── README.md              # Project documentation
└── .gitignore             # Git ignore rules
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)

---

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/HighwayDeliteAssignment.git
cd HighwayDeliteAssignment
```

---

### 2. Setup Environment Variables

- Copy `.env.example` to `.env` in both `client/` and `server/` folders and fill in the required values.

---

### 3. Install Dependencies

#### Frontend

```sh
cd client
npm install
```

#### Backend

```sh
cd ../server
npm install
```

---

### 4. Run the Application

#### Start Backend

```sh
cd server
npm run dev
```

#### Start Frontend

```sh
cd ../client
npm run dev
```

- The frontend will be available at [http://localhost:5173](http://localhost:5173) (default).
- The backend will run at [http://localhost:5000](http://localhost:5000) (default).

---

## 🔑 Environment Variables

See `.env.example` files in both `client/` and `server/` for required variables.

---

## 📝 Features

- **OTP-based Authentication:** Secure sign up and sign in with email OTP.
- **Notes Dashboard:** Create, view, and delete personal notes.
- **Responsive UI:** Works seamlessly on desktop and mobile.
- **Session Management:** JWT-based authentication with cookies.
- **Email Validation:** Checks for valid and existing email domains.

---

## 🧩 Project Structure Details

- **Frontend:** All React code is in [`client/src`](client/src/). Main entry: [`App.tsx`](client/src/App.tsx).
- **Backend:** Express app entry is [`server/src/index.ts`](server/src/index.ts). All business logic is modularized.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 🙋‍♂️ Contact

For questions, contact [chirag.bhatia.14567@gmail.com].

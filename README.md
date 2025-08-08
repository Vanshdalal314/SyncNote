# SyncNote

SyncNote is a full-stack notes management application that allows users to create, edit, and delete personal notes securely.  
It is built with a **React.js frontend** and a **Node.js/Express backend**, with **MongoDB** as the database.

## Features

- **User Authentication** – Secure login and signup with JWT-based authentication.
- **CRUD Notes** – Create, read, update, and delete your personal notes.
- **Responsive UI** – Built with Bootstrap for mobile-friendly design.
- **Password Validation** – Minimum length & confirm password check.
- **Concurrent Development** – Run frontend and backend together using a single command.

## Technology Stack

**Frontend**:
- React.js
- Bootstrap 5
- Context API

**Backend**:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt.js for password hashing

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/Vanshdalal314/SyncNote
````

### 2. Navigate to the project folder

```bash
cd SyncNote
```

### 3. Install dependencies

```bash
npm install            # Install frontend dependencies
cd backend && npm install  # Install backend dependencies
cd ..
```

### 4. Configure environment variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 5. Run the application

To start both the frontend and backend together:

```bash
npm run both
```

### 6. Available Scripts

* `npm start` – Runs the frontend React app only
* `npm run backend` – Runs the backend server only
* `npm run both` – Runs both frontend & backend concurrently

## Folder Structure

```
SyncNote/
│
├── backend/         # Backend API (routes, models, middleware, database connection)
├── src/             # React frontend components & context
├── public/          # Static files for React
├── package.json     # Project metadata & scripts
├── .gitignore       # Ignored files for Git
└── README.md        # Project documentation
```

## License

This project is open-source and available under the [MIT License](LICENSE).

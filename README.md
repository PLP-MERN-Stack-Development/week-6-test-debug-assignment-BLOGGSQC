 # MERN Bug Tracker

A simple Bug Tracking application built with the MERN stack (MongoDB, Express, React, Node.js). Users can report bugs, update their status, and delete resolved issues. This project is part of the **Week 6 assignment** in the PLP MERN Stack Development Program.


# Features

- Report new bugs via a form
- View a list of all bugs
- Update bug status (`open`, `in-progress`, `resolved`)
- Delete resolved or invalid bugs
- Error boundary handling on the frontend
- Express error handling on the backend
- Frontend built using **React + Vite**
- RESTful API with MongoDB integration



##  Project Structure

mern-bug-tracker/
├── client/ # React frontend (Vite)
├── server/ # Express backend
└── README.md

yaml
Copy
Edit

---

##  Technologies Used

### Frontend
- React
- Axios
- Vite
- Error Boundaries

### Backend
- Express.js
- MongoDB + Mongoose
- dotenv
- CORS
- Error Middleware

---

##  How to Run the Project

### Prerequisites
- Node.js and npm
- MongoDB Atlas account (or local MongoDB)

---

### 1. Clone the Repository


git clone https://github.com/your-username/mern-bug-tracker.git
cd mern-bug-tracker
2. Setup the Backend

Copy
Edit
cd server
npm install
cp .env.example .env
Fill in your MongoDB connection string in .env


Copy
Edit
npm run dev

3. Setup the Frontend
cd ../client
npm install
npm run dev
The app will open on: http://localhost:5173

## Testing (Optional)
If needed, backend integration tests can be found at:

server/tests/integrations/bugs.test.js
To run tests:

cd server
npm install --save-dev jest supertest mongodb-memory-server
npx jest

 ## Debugging Techniques Used
Chrome DevTools for inspecting API calls and React component states

Console logs in both backend and frontend

Node.js inspector for step-through backend debugging

Error Boundaries to catch frontend crashes

Custom Express middleware to handle API errors
# Charging Station Finder

A full-stack application to find and manage electric vehicle charging stations, built with Node.js/Express (backend) and Vue.js (frontend).

## Features

- User Authentication (Register, Login with JWT)
- CRUD operations for Charging Stations
- List of Charging Stations with filters
- Map View of Charging Stations using Leaflet
- Modern and responsive UI with dynamic backgrounds and transitions

## Technologies Used

**Backend:**
- Node.js
- Express
- MongoDB (using Mongoose ORM)
- JWT for Authentication
- bcryptjs for password hashing
- cors
- dotenv

**Frontend:**
- Vue.js 3
- Vue Router 4
- Axios for API calls
- Leaflet for maps

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your_repo_url>
    cd <your_repo_directory>
    ```

2.  **Backend Setup:**
    - Navigate to the `backend` directory:
      ```bash
      cd backend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Create a `.env` file in the `backend` directory with your MongoDB Atlas connection string and a JWT secret:
      ```env
      MONGO_URI=your_mongodb_atlas_connection_string
      PORT=5000
      JWT_SECRET=your_jwt_secret
      ```
      Replace `your_mongodb_atlas_connection_string` with your actual connection string from MongoDB Atlas and `your_jwt_secret` with a strong, random string.

3.  **Frontend Setup:**
    - Navigate to the `frontend` directory:
      ```bash
      cd ../frontend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```

## Running the Application

1.  **Start the Backend:**
    - Navigate to the `backend` directory:
      ```bash
      cd backend
      ```
    - Run the server:
      ```bash
      node index.js
      ```
    The backend should start on the port specified in your `.env` file (default: 5000).

2.  **Start the Frontend:**
    - Navigate to the `frontend` directory:
      ```bash
      cd ../frontend
      ```
    - Run the development server:
      ```bash
      npm run serve
      ```
    The frontend should start on http://localhost:8080 (or another port if 8080 is in use).

## Usage

- Open your browser to the frontend address (e.g., http://localhost:8080).
- Use the navigation bar to go to the Register page and create a new account.
- Log in with your new account.
- Once logged in, you can view, add, edit, and delete charging stations from the List page or see them on the Map View.

## Deployment

(Instructions for deployment on platforms like Render, Heroku, Vercel, Netlify, etc., would go here.)

## Future Improvements

- Add more advanced filtering and sorting options.
- Implement real-time updates for the map and list.
- Improve UI/UX based on user feedback.
- Add unit and integration tests.
- Enhance security features. 
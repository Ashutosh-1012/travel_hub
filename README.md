# Booking App

This is a web-based booking application that allows users to browse packages, make bookings, and view invoices. The application includes features such as user authentication, booking confirmation, and the ability to download invoices.

## Features

- **Home Page**: Browse available packages.
- **Package Details**: View detailed information about each package.
- **Booking Form**: Fill in personal details and make a booking.
- **Booking Confirmation**: View confirmation details after a successful booking.
- **Invoice**: Generate and download the invoice for the booking.

## Tech Stack

- **Frontend**:
  - React.js
  - React Router for navigation
  - Tailwind CSS for styling

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB for storing booking details
  - Axios for API calls

## Setup

### Prerequisites

Before you begin, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB (or a cloud database like MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/booking-app.git
   cd booking-app

2. Install dependencies for the frontend and backend:
```bash
# For frontend (React app)
cd frontend
npm install
```

```bash
#For backend (Node.js app)
cd ../backend
npm install
```


3. Start the backend server:
```bash
# In the backend directory
npm start
```
4. Start the frontend server:
```bash
# In the frontend directory
npm run dev
```
Open your browser and navigate to http://localhost:3000 to view the app.

# API Endpoints
1. GET /bookings/{id}: Retrieve booking details by booking ID.
2. POST /bookings: Create a new booking.
`For more understanding view routes file in the server folder`


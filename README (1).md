
# Air Traffic Control System

## Project Overview

This project is a fully functional Air Traffic Control (ATC) system that allows administrators to manage flight schedules. The application provides features for viewing, creating, and modifying flights using mock data. When a flight is modified, all passengers of that flight receive an email with the updated details. The system includes an in-house algorithm to prevent two flights from arriving or departing on the same runway within a two-minute interval.

## Features

### Frontend (Vite + React)
- **Flight Table**: View, sort, and filter all flights.
- **24-Hour Timeline**: Visual representation of all flights at a selected airport, categorized by runway.
- **Flight Management**: Create and modify flight schedules.

### Backend (Express)
- **Flight Management API**: Endpoints for creating, viewing, and modifying flights.
- **Passenger Notification**: Email service to notify passengers of flight changes.
- **Conflict Detection**: Algorithm to prevent scheduling conflicts on runways.

## Getting Started

### Prerequisites
- Node.js and npm installed
- Git installed

### Installation

1. **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd air-traffic-control
    ```

2. **Backend Setup**:
    ```bash
    cd server
    npm install
    ```

3. **Frontend Setup**:
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1. **Start the backend server**:
    ```bash
    cd server
    npm start
    ```

2. **Start the frontend server**:
    ```bash
    cd ../client
    npm run dev
    ```

3. Open the application in your browser at `http://localhost:3000`.

### Environment Variables

To enable the email service, create an `.env` file in the `server` directory with the following attributes:

```plaintext
EMAIL_SERVICE=gmail
EMAIL_USER=<email address of sender>
EMAIL_PASS=<app password>
JWT_PRIVATE_KEY=secret
```

## Project Structure

```plaintext
air-traffic-control/
├── client/               # Frontend (Vite + React)
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── App.jsx       # Main App component
│   │   ├── index.jsx     # Entry point
│   ├── public/           # Public assets
│   ├── vite.config.js    # Vite configuration
│   └── package.json      # Frontend dependencies
├── server/               # Backend (Express)
│   ├── controllers/      # Controllers for handling requests
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── app.js            # Express app setup
│   ├── config.js         # Configuration file
│   └── package.json      # Backend dependencies
├── README.md             # Project documentation
└── .gitignore            # Ignored files
```

## Usage

### Admin Functionalities
- **View Flights**: Access a comprehensive table of all flights.
- **Sort and Filter**: Apply sorting and filtering to the flight table.
- **Create Flights**: Add new flights to the schedule.
- **Modify Flights**: Edit existing flights. Passengers will be notified via email of any changes.

### Flight Conflict Detection
The system includes an algorithm to ensure that no two flights are scheduled to use the same runway within two minutes of each other for arrivals and departures. This prevents potential conflicts and ensures smoother airport operations.

## Contributing

We welcome contributions to improve the Air Traffic Control System. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any questions or inquiries, please contact [Your Name] at [your.email@example.com].

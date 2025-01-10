# WorkDay-Attendance-API (FOR BARCODE SCANNERS)

## Overview
This project is a simple Node.js-based API for managing worker registration and daily check-ins. It uses **Express.js** for handling HTTP requests and **MongoDB** as the database, with **Mongoose** as the ODM (Object Data Modeling) library. The API provides endpoints for registering workers and recording their check-in times.

---

## Features
1. **Register a Worker**: Create a new worker profile in the database.
2. **Daily Check-In**: Record a worker's daily check-in while preventing duplicate check-ins for the same day.

---

## Prerequisites
Before running the project, ensure you have the following installed:

- **Node.js** (v14 or higher recommended)
- **MongoDB** (local or remote instance)

---

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database connection:
   - Configure your MongoDB connection string in a `.env` file (or directly in the `dbmodel/schema.js` file if applicable).

---

## Usage
### Start the Server
Run the following command to start the server:
```bash
npm start
```

By default, the server will be running on `http://localhost:3000`.

---

## API Endpoints

### **1. Register Worker**
- **Endpoint**: `/registerWorker`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "fullname": "John Doe",
    "position": "Developer"
  }
  ```
- **Response**:
  - **200 OK**: Worker registered successfully.
    ```json
    {
      "worker": "<worker-id>"
    }
    ```
  - **500 Internal Server Error**: An error occurred while saving the worker.

---

### **2. Check-In Worker**
- **Endpoint**: `/checkin/:_id`
- **Method**: POST
- **Path Parameter**:
  - `_id`: The unique ID of the worker.
- **Response**:
  - **200 OK**: Check-in recorded for the day.
    ```json
    {
      "message": "checkIn recorded for the day"
    }
    ```
  - **400 Bad Request**: Check-in already exists for the day.
    ```json
    {
      "error": "Checkin already exists"
    }
    ```
  - **404 Not Found**: Worker does not exist.
    ```json
    {
      "error": "worker does not exist"
    }
    ```
  - **500 Internal Server Error**: An error occurred during the check-in process.

---

## Project Structure
```
project-folder/
├── dbmodel/
│   └── schema.js       # Mongoose schema for worker data
├── routes/
│   └── workerRoutes.js # API routes
├── server.js           # Main server file
└── package.json        # Project metadata and dependencies
```

---

## Schema Definition
The MongoDB schema for workers includes the following fields:
```javascript
{
  fullname: { type: String, required: true },
  position: { type: String, required: true },
  checkInTimes: { type: [String], default: [] } // Array of ISO date strings
}
```

---

## Known Issues
- Ensure the `checkInTimes` array is properly initialized in the database if missing.

---

## Future Improvements
- Check for double Check-In by filtering the Date method

---

## License
This project is open-source and available under the [MIT License](LICENSE).

---

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests to improve this project.


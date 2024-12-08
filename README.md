# API Routes Documentation

This documentation provides an overview of the backend API routes for the EventBrite application. The routes are categorized into different sections for better understanding.

---

## **Event Routes**

### 1. **Get Latest Events**
- **Route**: `GET /latest-events`
- **Description**: Fetches the latest events available. This is a public route.
- **Controller**: `getLatestEvents`

### 2. **Get All Events (Admin Only)**
- **Route**: `GET /events`
- **Description**: Fetches all events. This route is accessible to authenticated users only (admin).
- **Controller**: `getAllEvents`

### 3. **Get Event by ID (Authenticated)**
- **Route**: `GET /event/:id`
- **Description**: Fetches a specific event by its ID. This route is accessible to authenticated users only.
- **Controller**: `getEventById`

### 4. **Create Event (Admin)**
- **Route**: `POST /create-event`
- **Description**: Allows an admin to create a new event.
- **Controller**: `createEvent`

### 5. **Update Event (Authenticated)**
- **Route**: `PUT /update-event/:id`
- **Description**: Updates an existing event by its ID. This route is accessible to authenticated users only.
- **Controller**: `updateEvent`

### 6. **Delete Event (Authenticated)**
- **Route**: `DELETE /delete-event/:id`
- **Description**: Deletes an event by its ID. This route is accessible to authenticated users only.
- **Controller**: `deleteEvent`

### 7. **Change Event Status (Authenticated)**
- **Route**: `PUT /change-event-status/:id`
- **Description**: Changes the status of an event. This route is accessible to authenticated users only.
- **Controller**: `changeEventStatus`

---

## **Report Routes**

### 1. **Sales Report**
- **Route**: `GET /sales-report`
- **Description**: Fetches the sales report.
- **Controller**: `getSalesReport`

### 2. **Revenue Report**
- **Route**: `GET /revenue-report`
- **Description**: Fetches the revenue report.
- **Controller**: `getRevenueReport`

### 3. **Attendance Report (Specific Event)**
- **Route**: `GET /attendance-report/:eventId`
- **Description**: Fetches the attendance report for a specific event.
- **Controller**: `getAttendanceReport`

---

## **Ticket Routes**

### 1. **Create Ticket**
- **Route**: `POST /create`
- **Description**: Creates a new ticket.
- **Controller**: `createTicket`

### 2. **Get Tickets by Event**
- **Route**: `GET /event/:eventId`
- **Description**: Fetches all tickets for a specific event.
- **Controller**: `getTicketsByEvent`

### 3. **Get Tickets by User**
- **Route**: `GET /user/:userId`
- **Description**: Fetches all tickets for a specific user.
- **Controller**: `getTicketsByUser`

### 4. **Process Ticket Sale**
- **Route**: `POST /process-sale`
- **Description**: Processes a ticket sale.
- **Controller**: `processTicketSale`

---

## **Transaction Routes**

### 1. **Create Transaction**
- **Route**: `POST /create`
- **Description**: Creates a new transaction.
- **Controller**: `createTransaction`

### 2. **Process Refund**
- **Route**: `GET /refund/:transactionID`
- **Description**: Processes a refund for a specific transaction by ID.
- **Controller**: `processRefund`

### 3. **Get All Transactions**
- **Route**: `GET /transactions`
- **Description**: Fetches all transactions.
- **Controller**: `getAllTransactions`

---

## **User Routes**

### 1. **Login**
- **Route**: `POST /login`
- **Description**: Logs in a user and returns an authentication token.
- **Controller**: `login`

### 2. **Register**
- **Route**: `POST /register`
- **Description**: Registers a new user.
- **Controller**: `register`

### 3. **Reset Password**
- **Route**: `POST /reset-password`
- **Description**: Sends a password reset email to the user.
- **Controller**: `resetPassword`

### 4. **Get All Users (Admin Only)**
- **Route**: `GET /users`
- **Description**: Fetches all users. This route is only accessible to admins.
- **Controller**: `getAllUsers`

### 5. **Assign Role (Admin Only)**
- **Route**: `PUT /assign-role/:id`
- **Description**: Assigns a role to a user. This route is only accessible to admins.
- **Controller**: `assignRole`

### 6. **Delete User (Admin Only)**
- **Route**: `DELETE /delete-user/:id`
- **Description**: Deletes a user by their ID. This route is only accessible to admins.
- **Controller**: `deleteUser`

### 7. **Get All User Emails**
- **Route**: `GET /emails`
- **Description**: Fetches all user emails. This route is accessible only to admins.
- **Controller**: `getAllUserEmails`

---

## **Utility Routes**

### 1. **Send Password Reset Email**
- **Route**: `POST /send-reset-email`
- **Description**: Sends a password reset email to a user.
- **Controller**: `sendPasswordResetEmail`

### 2. **Send Bulk Email**
- **Route**: `POST /send-bulk-email`
- **Description**: Sends a bulk email to all users. This route is only accessible to admins.
- **Controller**: `sendBulkEmail`

---

## **Middleware Used**

- **authenticate**: Middleware to verify that the user is authenticated.
- **isAdmin**: Middleware to verify that the user has admin privileges.

---


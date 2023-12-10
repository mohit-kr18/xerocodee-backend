# xerocodee - Full Stack Authentication Service

## Project Overview

The xerocodee project is a full-stack application designed to provide secure authentication functionalities. The frontend is built to offer an interactive user experience, while the backend serves as a token-based authentication service using JSON Web Tokens (JWT) and google OAuth and github OAuth authenctication.
## Frontend

### Tech Stack Used

- **Framework/Library:** React
- **Design:** CSS
- **State Management:** Redux Toolkit
- **UI Libraries:** MUI, Mantine
- **HTTP Requests:** Axios
- **Charting:** Recharts
- **Development Tools:** Vite

## Backend

### Tech Stack Used

- **Runtime:** Node.js
- **Framework:** Express
- **Authentication:** Google OAuth,Github OAuth, JWT
- **Database:** MongoDB with Mongoose
- **HTTP Requests:** Axios
- **Security:** Bcrypt for password hashing
- **Middleware:** CORS, Morgan

## Features
### 1. Secure Authentication System

- Implements a robust and secure Sign Up/Sign In system using JSON Web Tokens (JWT) for authentication.
- Utilizes MongoDB as the primary database for storing user information securely.

### 2. Social Authentication

- Supports authentication through popular social platforms, such as Github and Google, using OAuth.
- Integrates Github OAuth and Google OAuth for seamless and secure social login.

### 3. Single Sign-On (SSO) Bonus

- Bonus opportunity: The project provides the potential to implement a Single Sign-On (SSO) system, offering an internship with an increased stipend and the possibility of a PPO offer.

### 4. Various Pages Implementation

#### Signup Page

- A dedicated page for users to create an account securely.
- Implements validation and error handling for a smooth user experience.

#### Signin Page

- A user-friendly login page for existing users to sign in securely.
- Utilizes JWT for secure authentication and authorization.

#### Development Option Page

- An interactive page where users can choose a cloud provider, such as AWS or GCP, for their development environment.
- Implements a slide-in effect for displaying cloud provider options.
- Updates the progress bar to 40% once a cloud provider option is selected.

#### Dashboard with Progress Bar

- Presents a comprehensive dashboard with various features and information.
- Implements a progress bar that dynamically updates as users make choices throughout the application.

### 5. Responsive Design

- The codebase is optimized for performance, ensuring a seamless user experience across various screen sizes.
- Utilizes responsive design techniques to adapt the UI to different devices.
## How to Run
### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd folder_name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000` to explore the frontend application.

### Backend

1. Navigate to the backend directory:
   ```bash
   cd folder_name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

4. The backend server will be running at `http://localhost:3001`.


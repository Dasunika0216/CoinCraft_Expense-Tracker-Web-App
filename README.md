# CoinCraft 💰

A modern web application for tracking expenses, managing budgets, and monitoring income. CoinCraft helps users take control of their finances with intuitive dashboards, charts, and analytics.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [License](#license)

---

## 🌟 Overview

CoinCraft is designed to simplify personal finance management. Users can add income sources, set budgets, track expenses, and visualize their financial health with interactive charts and dashboards.

### Key Benefits

- **Expense Tracking:** Log and categorize expenses for better insights.
- **Budget Management:** Create, edit, and monitor budgets for different categories.
- **Income Overview:** Track multiple income sources and view trends.
- **Visual Analytics:** Interactive charts for income, expenses, and balance.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.

---

## ✨ Features

### Core Features
- 🔍 **Expense Tracking** – Add, edit, and delete expenses with categories and dates.
- 📊 **Budget Management** – Set budgets, monitor spending, and receive warnings when limits are reached.
- 💰 **Income Management** – Add income sources and view recent entries.
- 📈 **Financial Dashboard** – Visualize total income, expenses, and balance.
- 🗂️ **Recent Activity** – View latest income and expense entries.
- 🔒 **Authentication** – Secure login and registration for users.
- 📱 **Responsive UI** – Optimized for all devices.

### Advanced Features
- 📊 **Interactive Charts** – Visual representation of financial data using Chart.js
- ⚠️ **Budget Warnings** – Real-time notifications when budget limits are exceeded
- 🎯 **Category Management** – Organize expenses and income by categories
- 📅 **Date-based Filtering** – Filter transactions by date ranges
- 🔄 **Real-time Updates** – Instant updates across all components

---

## 🛠️ Tech Stack

### Frontend
- **React** – UI library for building user interfaces
- **Vite** – Fast build tool and development server
- **Tailwind CSS** – Utility-first CSS framework
- **React Router** – Client-side routing
- **Axios** – HTTP client for API requests
- **React Toastify** – Toast notifications
- **Chart.js & react-chartjs-2** – Data visualization
- **React Icons** – Icon library

### Backend
- **Node.js** – JavaScript runtime environment
- **Express.js** – Web application framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling
- **JWT** – JSON Web Tokens for authentication
- **bcryptjs** – Password hashing
- **dotenv** – Environment variables
- **CORS** – Cross-origin resource sharing

---

## 📁 Project Structure

```
CoinCraft_Expense-Tracker-Web-App/
├── backend/
│   ├── config/
│   │   └── mongodb.js              # Database connection
│   ├── controllers/
│   │   ├── userController.js       # User authentication logic
│   │   └── dashboardController.js  # Dashboard and data operations
│   ├── middleware/
│   │   └── auth.middleware.js      # User authentication
│   ├── models/
│   │   ├── userModel.js            # User data model
│   │   ├── expenseModel.js         # Expense data model
│   │   ├── incomeModel.js          # Income data model
│   │   └── budgetModel.js          # Budget data model
│   ├── routes/
│   │   ├── userRoute.js            # Authentication routes
│   │   └── dashboardRoute.js       # Dashboard and data routes
│   ├── package.json
│   └── server.js                   # Application entry point
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navigation component
│   │   │   ├── Footer.jsx          # Footer component
│   │   │   ├── HomeC.jsx           # Home component
│   │   │   ├── About.jsx           # About page component
│   │   │   └── AddExpense.jsx      # Expense form component
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx       # Main dashboard
│   │   │   ├── Expense.jsx         # Expense management
│   │   │   ├── Income.jsx          # Income management
│   │   │   ├── Budget.jsx          # Budget management
│   │   │   ├── Login.jsx           # Authentication
│   │   │   └── Home.jsx            # Landing page
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # Application entry point
│   │   └── index.css               # Global styles
│   ├── package.json
│   └── vite.config.js              # Vite configuration
├── screenshots/
└── README.md
```

---

## 📸 Screenshots

### User Authentication

#### Sign In
![Sign In Page](screenshots/login.png)
*User login interface with email and password fields*

#### Sign Up
![Sign Up Page](screenshots/signup.png)
*User registration form for new accounts*

### Dashboard

#### Main Dashboard
![Dashboard Overview](screenshots/dashboard-without%20warning.png)
![Dashboard Overview](screenshots/dashboard-income.png)
![Dashboard Overview](screenshots/dashboard-expenses.png)
*Overview of total income, expenses, and balance with charts*

#### Dashboard with Warnings
![Dashboard with Warnings](screenshots/dashboard-warning.png)
*Dashboard showing budget warnings and alerts*

### Expense Management

#### Expense Overview
![Expense Overview](screenshots/expense%20overview.png)
*Complete expense tracking interface with categories and amounts*

#### Expense Details
![Expense Details](screenshots/expense%20details.png)
*Detailed expense view with editing capabilities*

### Income Management

#### Income Overview
![Income Overview](screenshots/income%20overview.png)
*Income tracking and management interface*

#### Add Income
![Add Income](screenshots/add%20income.png)
*Form for adding new income sources*

#### Income Details
![Income Details](screenshots/income%20details.png)
*Detailed income view with management options*

### Budget Management

#### Budget Cards
![Budget Cards](screenshots/budget%20cards.png)
*Budget overview with category-based cards*

#### Budget Details
![Budget Details](screenshots/budget%20details%20with%20expenses%202.png)
![Budget Details](screenshots/budget%20details%20with%20expenses.png)
*Detailed budget view with associated expenses*

#### Edit Budget
![Edit Budget](screenshots/edit%20budget.png)
*Budget editing interface with category management*

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Clone Repository
```bash
git clone https://github.com/yourusername/CoinCraft_Expense-Tracker-Web-App.git
cd CoinCraft_Expense-Tracker-Web-App
```

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd frontend
npm install
```

---

## 🔧 Environment Setup

### Backend Environment (.env)
Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ExpenseTracker
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expensetracker

# JWT Secret
JWT_SECRET=your_super_secure_jwt_secret_key_here

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### Frontend Environment (.env)
Create a `.env` file in the frontend directory:

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:4000/api/v1

# Application Configuration
VITE_APP_NAME=CoinCraft
VITE_APP_VERSION=1.0.0
```

---

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start MongoDB** (if running locally):
```bash
mongod
```

2. **Start Backend Server**:
```bash
cd backend
npm run dev
# Server will run on http://localhost:4000
```

3. **Start Frontend Development Server**:
```bash
cd frontend
npm run dev
# Application will run on http://localhost:5173
```

### Production Mode

1. **Build Frontend**:
```bash
cd frontend
npm run build
```

2. **Start Backend**:
```bash
cd backend
npm start
```

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint                    | Description        |
|--------|----------------------------|--------------------|
| POST   | `/api/user/register`       | User registration  |
| POST   | `/api/user/login`          | User login         |

### Dashboard Endpoints

#### Income Management
| Method | Endpoint                           | Description              |
|--------|------------------------------------|--------------------------|
| POST   | `/api/dashboard/add-income`        | Create new income        |
| POST   | `/api/dashboard/list-income`       | Get all income entries   |
| POST   | `/api/dashboard/delete-income`     | Delete income entry      |
| POST   | `/api/dashboard/total-income`      | Get total income amount  |

#### Expense Management
| Method | Endpoint                           | Description              |
|--------|------------------------------------|--------------------------|
| POST   | `/api/dashboard/add-expense`       | Create new expense       |
| POST   | `/api/dashboard/list-expense`      | Get all expense entries  |
| POST   | `/api/dashboard/list-all-expense`  | Get all expenses (detailed) |
| POST   | `/api/dashboard/delete-expense`    | Delete expense entry     |
| POST   | `/api/dashboard/total-expense`     | Get total expense amount |

#### Budget Management
| Method | Endpoint                           | Description              |
|--------|------------------------------------|--------------------------|
| POST   | `/api/dashboard/add-budget`        | Create new budget        |
| POST   | `/api/dashboard/list-budget`       | Get all budget entries   |
| POST   | `/api/dashboard/update-budget`     | Update budget entry      |
| POST   | `/api/dashboard/delete-budget`     | Delete budget entry      |

### API Base URL
```
http://localhost:4000/api
```

### Authentication
All dashboard endpoints require authentication. Include the JWT token in the request headers:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String,
  password: String,
}
```

### Expense Model
```javascript
{
  userId: ObjectId,
  budgetId: String,
  amount: Number,
  name: String,
  date: Date,
}
```

### Income Model
```javascript
{
  userId: ObjectId,
  source: String,
  amount: Number,
  icon: String,
  date: Date,
}
```

### Budget Model
```javascript
{
  userId: ObjectId,
  icon: String,
  name: String,
  allocatedAmount: Number,
  date: Date,
}
```

---

## 🔐 Security Features

- **JWT Authentication** – Secure token-based authentication
- **Password Hashing** – bcryptjs for secure password storage
- **Input Validation** – Comprehensive form validation
- **CORS Configuration** – Controlled cross-origin requests
- **Environment Variables** – Secure configuration management
- **Data Sanitization** – Protection against injection attacks

---

## 🚀 Deployment

### Vercel Deployment

The application is configured for deployment on Vercel:

1. **Backend Deployment**:
   - Configure environment variables in Vercel dashboard
   - Deploy using `vercel.json` configuration

2. **Frontend Deployment**:
   - Build the application using `npm run build`
   - Deploy the `dist` folder to Vercel

### Environment Variables for Production

Ensure all environment variables are properly configured in your deployment platform:

- `MONGODB_URI` – Production database connection string
- `JWT_SECRET` – Secure JWT secret for production
- `CORS_ORIGIN` – Frontend URL for CORS configuration

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for better financial management**
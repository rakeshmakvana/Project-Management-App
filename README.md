# Freelance Project Management App

An Freelance Project Management Application built with React, Node.js, Express, and MongoDB. This application allows users to add,update or delete this projects, show your project payment, and a responsive UI.

## Features

- Create, Update, Delete projects
- Show your Payments Data
- Dashboard show chart in datails
- Responsive and user-friendly interface
- JWT to secuire user authentication
- Data stored in MongoDB Atlas

## Technologies Used

- **Frontend:** React, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authenticatin:** JWT Auth
- **CSS Framework:** Tailwind CSS

## Environment Variables

Before running the application, set up the following environment variables :-

  MONGO_URI  = your db link

  JWT_SECRET = your jwt secret

  PORT = 5000


## Getting Started

### Clone the Repository

```bash
git clone https://github.com/rakeshmakvana/Project-Management-App
```

## Frontend Setup

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

## Backend Setup

```bash
cd backend
```

```bash
npm install
```

```bash
npm start
```

## URLs

Frontend URL: http://localhost:5173

Backend URL: http://localhost:5000

## Usage

my application is a freelancing project management tool that allows users to efficiently manage their projects. 
Users can create, update, and delete their projects while also setting their payment options to reflect the payment status,
such as "paid" or "unpaid." The app features a user dashboard that provides a comprehensive overview of the user's total projects and total payments.
Additionally, it includes a visually engaging bar chart to help users easily track their payment statuses and project counts,
enhancing their overall experience and project management capabilities.

## Troubleshooting

If you encounter any issues while running the application, please ensure :-

You have set the correct environment variables.
The MongoDB Atlas connection string is correct and your IP is whitelisted.
Both frontend and backend servers are running without errors.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

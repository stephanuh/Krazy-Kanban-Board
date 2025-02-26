# Krazy-Kanban-Board
A full-stack Kanban Board application where users can create, update, and track tickets for various tasks in different projects statuses such as *Todo*, *In Progress*, and *done*. This app provides user authentication via JWT and allows users to manage their tasks efficiently.

clone the repo to your local machine with git clone, Dp install Dependencies on both client-side and server-side. Create a .env file in the server directory and add the following:Sure! Here’s a sample README.md template for your project. You can customize it further based on your app’s unique features, but this will give you a good starting point:

Krazy Kanban Board
A full-stack Kanban board application where users can create, update, and track tickets for various tasks in different project statuses such as Todo, In Progress, and Done. This app provides user authentication via JWT and allows users to manage their tasks efficiently.

Features
User authentication (Login/Logout) using JWT
CRUD functionality for tickets (Create, Read, Update, Delete)
Ticket statuses: Todo, In Progress, and Done
Responsive UI built with React
RESTful API for backend operations using Express and Sequelize ORM
Technologies Used
Frontend: React, Vite, TypeScript, CSS
Backend: Express, TypeScript, Sequelize, PostgreSQL
Authentication: JWT (JSON Web Tokens)
Database: PostgreSQL
Getting Started
Prerequisites
Node.js (v14 or higher)
PostgreSQL
Yarn or npm (for managing packages)
1. Clone the Repository
Clone this repository to your local machine:

bash
Copy
Edit
git clone https://github.com/yourusername/krazy-kanban-board.git
cd krazy-kanban-board
2. Install Dependencies
For the client-side:

bash
Copy
Edit
cd client
npm install
For the server-side:

bash
Copy
Edit
cd server
npm install
3. Set Up Environment Variables
You need to set up your environment variables in both the client and server folders.

Server Environment Variables:
Create a .env file in the server directory and add the following:

JWT_SECRET_KEY=your_jwt_secret_key
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

make sure to Create your PostgresSQL database psql -U your_db_user -c "CREATE DATABASE your_db_name;"
start your server npm run start run your client npm run dev
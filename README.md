YourBlog MERN Stack Project

This is a full-stack web application built using the **MERN stack** (MongoDB, Express, React, Node.js), **Redux**, and styled with **Tailwind CSS**. The application provides a modern and responsive user interface along with a robust backend.

## Features

- **MERN Stack**: Seamless integration between MongoDB, Express, React, and Node.js.
- **Redux**: Centralized state management for efficient and scalable data handling.
- **Tailwind CSS**: A utility-first CSS framework for fast and customizable UI design.
- **User Authentication**: Secure authentication and authorization features (if applicable).
- **CRUD Operations**: Basic functionality for creating, reading, updating, and deleting data.

## Technologies Used

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: Redux
- **Authentication**: JWT (JSON Web Tokens) for secure login and sessions (if applicable)

## Installation
Follow these steps to set up the project locally:

### Prerequisites

Make sure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use a cloud MongoDB instance like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 1. Clone the repository

git clone https://github.com/HongNT03/your-blog.git

cd your-blog

### 2. Install dependencies

First, navigate to the **backend** folder and install the server-side dependencies:

npm install


Next, navigate to the **frontend** folder and install the client-side dependencies:

cd ../client

npm install


### 3. Set up environment variables

Create a `.env` file in the **backend** folder and add the following environment variables (replace values as necessary):

PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

For the frontend, if you're using environment variables (e.g., for API URLs), create a `.env` file in the **frontend** folder:


VITE_FIREBASE_API_KEY = "your_fire_base_key"

VITE_CLOUDINARY_CLOUD_NAME = "your-cloudinary_clound_name"

VITE_CLOUDINARY_UPLOAD_PRESET = "your_upload_preset"


### 4. Run the application

To start both the backend and frontend concurrently:

1. Open a terminal and navigate to the **backend** folder. Run the backend server:

  npm run dev

2. In another terminal, navigate to the **frontend** folder and run the React app:

   npm run dev


The app should now be running on [http://localhost:5173](http://localhost:5173) for the frontend, and the backend will be running on [http://localhost:3000](http://localhost:3000).

## Folder Structure

/backend
  /models        # MongoDB models
  /routes        # Express routes
  /controllers   # Route handlers
  /utils         # Middleware functions
  .env           # Environment variables

/frontend
  /src
    /components  # React components
    /pages       # Page of website
    /utils       # Cloudinary middleware
    /redux       # Redux store and slices
    /styles      # TailwindCSS customizations (if any)
    App.jsx      # Main React app
    main.jsx     # React entry point
  .env           # Frontend environment variables

## Usage

- Use **Redux** for managing global state across your React components.
- Use **Tailwind CSS** for styling. If you need to customize Tailwind, you can modify the `tailwind.config.js` file in the frontend folder.
- Backend API routes are located in the **/server/routes** folder.
- You can extend the backend to include authentication, CRUD functionality, or other features based on your needs.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request with your changes. Please ensure that your code is well-documented and follows the project's coding conventions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Feel free to reach out if you have any questions or suggestions!

- **Nguyen Tien Hong**
- **nguyentienhong220903Gmail.com**
- **Your LinkedIn/GitHub**: [LinkedIn](https://www.linkedin.com/in/hongnt) | [GitHub](https://github.com/HongNT03)


### Notes:
- **JWT Authentication**: If your project uses JWT for user authentication, I included an example `.env` entry for `JWT_SECRET`. If not, you can omit or modify that section.
- **Environment Setup**: The `.env` files for both the backend and frontend are mentioned so that you can configure your application’s settings for different environments (development, production).
- **Folder Structure**: The folder structure assumes a basic MERN stack setup, with separate directories for the backend (`/backend`) and frontend (`/frontend`).
- **Tailwind CSS Customization**: If you're customizing Tailwind CSS, you may want to include a brief note on how to extend or modify the `tailwind.config.js` file.

Let me know if you need further adjustments or additions!

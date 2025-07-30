# Node Kindergarten App

A comprehensive kindergarten management system built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Secure login/signup system with role-based access
- **Child Management**: Register, view, update, and delete child records
- **Admin Dashboard**: Director dashboard with overview statistics
- **Responsive Design**: Modern UI with mobile-friendly interface

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js with local strategy
- **Template Engine**: Pug
- **Styling**: CSS3 with responsive design

## Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd Node-Kindergatten-App
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```
   DATABASE=mongodb://localhost:27017/kindergarten
   SESSION_SECRET=your-super-secret-session-key-here
   PORT=3333
   NODE_ENV=development
   ```

   **⚠️ Security Note**: Never commit your `.env` file to version control. Make sure it's listed in your `.gitignore` file.

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3333`

## Deployment on Render

### Prerequisites

- A GitHub account with your code pushed
- A MongoDB database (MongoDB Atlas recommended)

### Step 1: Set up MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string (it looks like: `mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database`)

### Step 2: Deploy on Render

1. **Sign up/Login to Render**

   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create a new Web Service**

   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing this project

3. **Configure the service**

   - **Name**: `kindergarten-app` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Set Environment Variables**
   In the Render dashboard, go to your service → Environment → Add the following:

   - `DATABASE`: Your MongoDB connection string
   - `SESSION_SECRET`: A random string for session security
   - `NODE_ENV`: `production`

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - Wait for the build to complete (usually 2-5 minutes)

### Step 3: Access Your Deployed App

- Once deployed, Render will provide you with a URL like: `https://your-app-name.onrender.com`
- Your app is now live and accessible worldwide!

## Project Structure

```
Node Kindergatten App/
├── models/          # Database models
├── routes/          # Express routes
├── views/           # Pug templates
├── public/          # Static files (CSS, JS, images)
├── server.js        # Main application file
└── package.json     # Dependencies and scripts
```

## Team Members

- Kabwaga Veronica Amooti
- Martha Nakintu
- Phoebe Muwebya
- Felicity Akol
- Samia Nalugo

## License

ISC License

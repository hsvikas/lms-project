# SkillForge Learning - LMS Platform

A modern Learning Management System (LMS) built with **Next.js 14**, **React 18**, **TailwindCSS**, **Express.js**, **Prisma**, and **MySQL**.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Running Servers](#running-servers)
- [Database Management](#database-management)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)

---

## ✨ Features

- ✅ **User Authentication** - Register, login, logout with JWT
- ✅ **Course Management** - Browse courses with nested sections and videos
- ✅ **Video Streaming** - YouTube embedded videos
- ✅ **Progress Tracking** - Mark videos as watched
- ✅ **Responsive Design** - Works on desktop, tablet, mobile
- ✅ **Role-Based Access** - Guest access to landing page, authenticated access to courses

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14.2.35** - React framework with server-side rendering
- **React 18.3.1** - UI library
- **TypeScript 5.9.3** - Type safety
- **TailwindCSS 4.2.1** - Utility-first CSS
- **Axios 1.13.6** - HTTP client

### Backend
- **Express.js 4.18.2** - Web framework
- **Node.js 24.12.0+** - JavaScript runtime
- **Prisma 5.22.0** - ORM for database management
- **MySQL** - Relational database
- **JWT (jsonwebtoken 9.0.0)** - Authentication
- **Bcrypt 5.1.0** - Password hashing

### Database
- **MySQL** - Hosted on Aiven
- **Prisma Client** - Database access layer

---

## 📁 Project Structure

```
lms-project/
├── backend/                      # Express server
│   ├── src/
│   │   ├── app.js               # Express app setup
│   │   ├── server.js            # Server entry point
│   │   ├── controllers/         # Route handlers
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Auth, error handling
│   │   ├── services/            # Prisma client
│   │   └── utils/               # Helpers (JWT, hashing)
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   └── seed.js              # Database seeding
│   ├── package.json
│   └── .env
│
├── frontend/                     # Next.js app
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Dashboard/landing
│   │   ├── login/page.tsx       # Login page
│   │   ├── register/page.tsx    # Register page
│   │   └── subjects/            # Course pages
│   ├── components/              # Reusable components
│   ├── lib/                     # Utilities
│   ├── public/                  # Static assets
│   ├── package.json
│   └── next.config.js
│
└── README.md                    # This file
```

---

## 📋 Prerequisites

Before running the project, ensure you have:

- **Node.js** 20.0.0 or higher
- **npm** or **yarn** package manager
- **MySQL** database (local or cloud)
- **Git** for version control
- A modern web browser

### Check Versions

```bash
node --version    # Should be v20.0.0 or higher
npm --version     # Should be 10.0.0 or higher
```

---

## 🚀 Local Setup

### 1. Clone the Repository

```bash
cd c:\Users\admin\Desktop\lms-project
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
# Add your MySQL connection details
```

**Backend `.env` file:**
```env
DATABASE_URL="mysql://username:password@host:3306/lms_db"
JWT_SECRET="your-secret-key-here"
NODE_ENV="development"
PORT=5000
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
```

**Frontend `.env.local` file:**
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

### 4. Database Setup

```bash
cd ../backend

# Generate Prisma client
npx prisma generate

# Run migrations (if any)
npx prisma migrate dev

# Seed initial data
npm run seed
```

---

## ▶️ Running Servers

### Option 1: Run Both Servers in Separate Terminals

**Terminal 1 - Backend:**
```bash
cd c:\Users\admin\Desktop\lms-project\backend
npm run dev
```

Expected output:
```
✅ Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd c:\Users\admin\Desktop\lms-project\frontend
npm run dev
```

Expected output:
```
▲ Next.js 14.2.35
- Local: http://localhost:3002
```

### Option 2: Run with npm scripts (Windows)

**One-line startup in PowerShell:**
```powershell
# Start backend
cd 'c:\Users\admin\Desktop\lms-project\backend'; npm run dev

# Open new terminal and start frontend
cd 'c:\Users\admin\Desktop\lms-project\frontend'; npm run dev
```

### Option 3: Using node directly

**Backend:**
```bash
cd backend
node src/server.js
```

**Frontend:**
```bash
cd frontend
npx next dev -H localhost -p 3002
```

---

## 📊 Database Management

### Seed Database with Course Data

```bash
cd backend
npm run seed
```

This creates:
- **3 Subjects**: Python Programming, Data Structures, Web Development
- **7 Sections**: Introduction, Variables, Loops, Arrays, Linked Lists, HTML & CSS, JavaScript
- **7 Videos**: With YouTube embed links

### View Database

```bash
# Open Prisma Studio
cd backend
npx prisma studio
```

### Reset Database (⚠️ Deletes all data)

```bash
cd backend
npx prisma migrate reset
npm run seed
```

### Check Database Connection

```bash
cd backend
npx prisma db push
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

**Register User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Course Endpoints

**Get All Subjects with Sections and Videos**
```http
GET /api/subjects
```

Response:
```json
[
  {
    "id": 29,
    "title": "Python Programming",
    "sections": [
      {
        "id": 67,
        "title": "Introduction",
        "videos": [
          {
            "id": 1,
            "title": "Python Full Course",
            "youtubeId": "rfscVS0vtbw"
          }
        ]
      }
    ]
  }
]
```

**Get Single Subject**
```http
GET /api/subjects/:id
```

### Video Endpoints

**Get Video Details**
```http
GET /api/videos/:id
```

Response includes full hierarchy (video → section → subject → all sections & videos)

**Mark Video as Watched**
```http
POST /api/progress/:videoId
Authorization: Bearer {token}
```

**Get User Progress**
```http
GET /api/progress/:userId
Authorization: Bearer {token}
```

### Health Check

```http
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

## 🌍 Deployment

### Deploy Backend

#### Option 1: Heroku (Recommended for Node.js)

1. **Install Heroku CLI**
   ```bash
   choco install heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

4. **Add MySQL Database**
   ```bash
   heroku addons:create cleardb:ignite
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set JWT_SECRET="your-secret-key"
   heroku config:set NODE_ENV="production"
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

#### Option 2: Railway

1. **Sign up at railway.app**

2. **Connect GitHub repository**

3. **Add MySQL service**

4. **Set environment variables**

5. **Deploy automatically**

#### Option 3: DigitalOcean / AWS

1. **Create a Droplet/EC2 Instance** (Ubuntu)

2. **SSH into server**
   ```bash
   ssh root@your_server_ip
   ```

3. **Install Node.js and npm**
   ```bash
   curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Install PM2** (Process Manager)
   ```bash
   sudo npm install -g pm2
   ```

5. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/lms-project.git
   cd lms-project/backend
   ```

6. **Install dependencies**
   ```bash
   npm install
   ```

7. **Create .env file**
   ```bash
   nano .env
   ```

8. **Run with PM2**
   ```bash
   pm2 start src/server.js --name "lms-backend"
   pm2 startup
   pm2 save
   ```

9. **Setup Nginx** (Reverse Proxy)
   ```bash
   sudo apt-get install nginx
   sudo nano /etc/nginx/sites-available/default
   ```

   Add:
   ```nginx
   server {
       listen 80;
       server_name your_domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
       }
   }
   ```

   ```bash
   sudo systemctl restart nginx
   ```

### Deploy Frontend

#### Option 1: Vercel (Recommended for Next.js)

1. **Push code to GitHub**

2. **Go to vercel.com and login**

3. **Import project from GitHub**

4. **Set environment variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   ```

5. **Deploy** (Automatic on push)

#### Option 2: Netlify

1. **Build the project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

#### Option 3: Self-hosted (DigitalOcean/AWS)

1. **SSH into server**

2. **Build frontend**
   ```bash
   cd lms-project/frontend
   npm install
   npm run build
   ```

3. **Run with PM2**
   ```bash
   pm2 start npm --name "lms-frontend" -- start
   ```

4. **Setup Nginx**
   ```nginx
   server {
       listen 80;
       server_name app.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
       }
   }
   ```

---

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL connection string | `mysql://user:pass@host:3306/lms` |
| `JWT_SECRET` | Secret key for JWT tokens | `super-secret-key-123` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `PORT` | Server port | `5000` |

### Frontend (.env.local)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000/api` |

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000 (Backend)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 3002 (Frontend)
netstat -ano | findstr :3002
taskkill /PID <PID> /F
```

Or use PowerShell:
```powershell
Stop-Process -Name node -Force
```

### Database Connection Error

- Check `DATABASE_URL` in `.env`
- Ensure MySQL is running
- Verify credentials and host

### Build Errors

```bash
# Clear Next.js cache
rm -r frontend/.next

# Reinstall dependencies
cd frontend
rm -r node_modules package-lock.json
npm install
```

### Videos Not Loading

- Verify YouTube IDs in database
- Check `youtubeId` field in `prisma/schema.prisma`
- Run `npm run seed` to refresh data

---

## 📝 Available Scripts

### Backend

```bash
npm run dev      # Start with nodemon (development)
npm start        # Start production server
npm run seed     # Seed database with courses
```

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## 📈 Performance Tips

1. **Enable Caching** - Add Redis for session management
2. **Database Indexing** - Index frequently queried fields
3. **Image Optimization** - Use Next.js Image component
4. **API Rate Limiting** - Prevent abuse with express-rate-limit
5. **GZIP Compression** - Enable in Nginx/Express

---

## 📞 Support & Contributing

For issues, questions, or contributions:
1. Open an issue on GitHub
2. Submit a pull request
3. Contact the development team

---

## 📄 License

This project is licensed under the MIT License.

---

## 🚀 Quick Start Summary

```bash
# 1. Backend setup
cd backend
npm install
npm run seed

# 2. Frontend setup (new terminal)
cd frontend
npm install

# 3. Run servers (separate terminals)
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm run dev

# 4. Access
# Frontend: http://localhost:3002
# Backend: http://localhost:5000/api
```

---

**Last Updated:** March 18, 2026  
**Version:** 1.0.0

# Running the LMS Servers - Quick Reference

Complete guide to start and manage both backend and frontend servers.

## 📌 Quick Start

### Start Both Servers (Easiest Way)

**Open PowerShell and run:**

```powershell
# Terminal 1: Backend
cd 'c:\Users\admin\Desktop\lms-project\backend'; npm run dev

# Open new terminal (Terminal 2): Frontend
cd 'c:\Users\admin\Desktop\lms-project\frontend'; npm run dev
```

**Then access:**
- 🌐 Frontend: http://localhost:3002
- 🔗 Backend API: http://localhost:5000/api

---

## 🔧 Detailed Instructions

### Step 1: Start Backend Server

```bash
cd c:\Users\admin\Desktop\lms-project\backend
npm run dev
```

**Expected Output:**
```
✅ Server running on port 5000
✅ Database connected
```

**What it does:**
- Runs Express.js server on PORT 5000
- Connects to MySQL database
- Loads all API routes
- Watches for file changes (auto-restart)

### Step 2: Open New Terminal Window

Press `Ctrl + Shift + Tab` in PowerShell (or manually open a new terminal)

### Step 3: Start Frontend Server

```bash
cd c:\Users\admin\Desktop\lms-project\frontend
npm run dev
```

**Expected Output:**
```
▲ Next.js 14.2.35
  - Local: http://localhost:3002
  - Ready in 5.2s
```

---

## ✅ Verify Servers Are Running

### Check Backend

```bash
# In PowerShell
Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing

# Should show: StatusCode = 200
```

### Check Frontend

```bash
# In PowerShell
Invoke-WebRequest -Uri "http://localhost:3002" -UseBasicParsing

# Should show: StatusCode = 200
```

---

## 🌐 Access the Application

### Frontend (User Interface)
```
URL: http://localhost:3002
```

**Features:**
- Landing page (for guests)
- Register page
- Login page
- Dashboard with courses
- Video player

### Backend API
```
Base URL: http://localhost:5000/api
```

**Endpoints:**
- `GET /api/health` - Health check
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/subjects` - All courses with videos
- `GET /api/videos/:id` - Video details
- `POST /api/progress/:videoId` - Mark watched

---

## 🛑 Stop Servers

### Method 1: Keyboard Shortcut
```
Press Ctrl + C in each terminal
```

### Method 2: PowerShell (Kill All Node Processes)
```powershell
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
```

### Method 3: Kill Specific Port

**Backend (Port 5000):**
```powershell
# Find process
netstat -ano | findstr :5000

# Kill it (replace PID)
taskkill /PID 1234 /F
```

**Frontend (Port 3002):**
```powershell
# Find process
netstat -ano | findstr :3002

# Kill it
taskkill /PID 5678 /F
```

---

## 🔄 Restart Servers

### Quick Restart
```powershell
# Kill all node processes
Stop-Process -Name node -Force

# Start backend again
cd 'c:\Users\admin\Desktop\lms-project\backend'; npm run dev

# In new terminal, start frontend
cd 'c:\Users\admin\Desktop\lms-project\frontend'; npm run dev
```

### Or Simply Press Ctrl+C and Re-run npm run dev

---

## 🐛 Troubleshooting

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```powershell
# Kill node processes
Stop-Process -Name node -Force -ErrorAction SilentlyContinue

# Wait 2 seconds
Start-Sleep -Seconds 2

# Try again
npm run dev
```

### Backend Won't Start

**Check if it's a Node.js issue:**
```bash
node --version    # Should be v20+
npm --version     # Should be v10+
```

**Check dependencies:**
```bash
cd backend
npm install
npm run build    # If available
```

**Check environment:**
```bash
# Make sure .env file exists
type .env

# Should show DATABASE_URL and JWT_SECRET
```

### Frontend Won't Start

**Clear Next.js cache:**
```bash
cd frontend
rm -r .next node_modules
npm install
npm run dev
```

**Check for build errors:**
```bash
npm run build
```

### Can't Access Frontend

**Check if port 3002 is blocked:**
```powershell
netstat -ano | findstr :3002
```

**Use different port:**
```bash
cd frontend
npm run dev -- -p 3003
# Now access at http://localhost:3003
```

### Database Connection Error

**Error:** `Error: connect ECONNREFUSED`

**Solution:**
1. Check `.env` file has correct `DATABASE_URL`
2. Verify MySQL is running
3. Test connection:
   ```bash
   cd backend
   npx prisma studio
   ```

---

## 📊 Server Logs

### View Backend Logs
```
# Logs appear in Terminal 1
Look for messages like:
- ✅ Server running on port 5000
- 📡 API route initialized
- ❌ Database error (if any)
```

### View Frontend Logs
```
# Logs appear in Terminal 2
Look for messages like:
- ▲ Next.js started
- ○ Compiled page successfully
- ⚠️ Build warnings (if any)
```

### View Errors
If something fails, check for error messages starting with:
- `Error:`
- `Cannot find module`
- `ECONNREFUSED`
- `EADDRINUSE`

---

## 🔐 API Testing

### Test Health Endpoint
```bash
curl http://localhost:5000/api/health
```

### Get All Courses
```bash
curl http://localhost:5000/api/subjects
```

### Or Use PowerShell
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/subjects" -UseBasicParsing | ConvertFrom-Json | ConvertTo-Json
```

---

## 🚀 Advanced: Run in Single Terminal

### Create Batch File (Windows)

Create `start-servers.bat`:
```batch
@echo off
start "LMS Backend" cmd /k "cd c:\Users\admin\Desktop\lms-project\backend && npm run dev"
start "LMS Frontend" cmd /k "cd c:\Users\admin\Desktop\lms-project\frontend && npm run dev"
```

Run it:
```batch
./start-servers.bat
```

### Or PowerShell Script

Create `start-servers.ps1`:
```powershell
$backend = Start-Process -NoNewWindow -PassThru -FilePath "cmd" -ArgumentList "/k", "cd c:\Users\admin\Desktop\lms-project\backend && npm run dev"
$frontend = Start-Process -NoNewWindow -PassThru -FilePath "cmd" -ArgumentList "/k", "cd c:\Users\admin\Desktop\lms-project\frontend && npm run dev"

Write-Host "✅ Both servers started"
Write-Host "Frontend: http://localhost:3002"
Write-Host "Backend: http://localhost:5000/api"
```

Run it:
```powershell
./start-servers.ps1
```

---

## 📋 Development Workflow

### Daily Startup
1. Open 2 terminal windows
2. Terminal 1: `cd backend && npm run dev`
3. Terminal 2: `cd frontend && npm run dev`
4. Wait for both to show ready message
5. Open http://localhost:3002 in browser

### After Code Changes
- **Backend changes:** Auto-restarts (nodemon)
- **Frontend changes:** Auto-reloads (Next.js hot reload)
- No manual restart needed!

### Testing API Changes
1. Make changes in `backend/src/controllers` or `backend/src/routes`
2. Server auto-restarts
3. Test with curl or Postman
4. Frontend auto-reloads when it detects API changes

---

## 📦 npm Scripts Reference

### Backend Scripts
```bash
npm run dev       # Start with nodemon (auto-restart)
npm start         # Start production server
npm run seed      # Populate database with courses
```

### Frontend Scripts
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production build
npm run lint      # Check code quality
```

---

## 🌍 Environment Variables

### Backend (.env)
```env
DATABASE_URL=mysql://user:password@host:3306/lms_db
JWT_SECRET=your-secret-key
NODE_ENV=development
PORT=5000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## ✨ Tips & Best Practices

1. **Always run in separate terminals** - Don't run both in same terminal
2. **Keep terminals open** - So you can see logs and errors
3. **Check console for errors** - Look at terminal output first
4. **Restart if weird behavior** - `Ctrl+C` and run again
5. **Clear cache if styles fail** - `rm -r .next` then restart
6. **Use `npm install`** - If getting module not found errors

---

## 📞 Quick Checklist

- [ ] Node.js 20+ installed
- [ ] In `/backend`: `npm install` completed
- [ ] In `/backend`: `.env` file created with DATABASE_URL
- [ ] In `/frontend`: `npm install` completed
- [ ] Backend started and shows "port 5000"
- [ ] Frontend started and shows "localhost:3002"
- [ ] Can access http://localhost:3002
- [ ] Can access http://localhost:5000/api/health

---

**Last Updated:** March 18, 2026  
**Version:** 1.0.0

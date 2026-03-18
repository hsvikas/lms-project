# Quick Setup Guide

Get the LMS up and running in 5 minutes.

## 📦 One-Time Setup

### 1. Install Dependencies

**Backend:**
```bash
cd c:\Users\admin\Desktop\lms-project\backend
npm install
```

**Frontend:**
```bash
cd c:\Users\admin\Desktop\lms-project\frontend
npm install
```

### 2. Configure Database (First Time Only)

**Backend:**
```bash
cd backend

# View .env file
type .env

# Should show:
# DATABASE_URL=mysql://...
# JWT_SECRET=...
```

**Seed database with courses:**
```bash
npm run seed
```

✅ Done! Database now has 3 courses with 7 videos.

---

## 🚀 Start Servers (Every Time)

### Terminal 1: Backend

```bash
cd c:\Users\admin\Desktop\lms-project\backend
npm run dev
```

Wait for:
```
✅ Server running on port 5000
```

### Terminal 2: Frontend (New Window)

```bash
cd c:\Users\admin\Desktop\lms-project\frontend
npm run dev
```

Wait for:
```
▲ Next.js ready at http://localhost:3002
```

---

## 🌐 Access Application

| Component | URL | Notes |
|-----------|-----|-------|
| Frontend | http://localhost:3002 | User interface |
| Backend API | http://localhost:5000/api | API endpoints |
| Health Check | http://localhost:5000/api/health | Server status |

---

## 📚 Available Courses

After seeding, you'll have:

1. **Python Programming**
   - Introduction → Python Full Course (video)
   - Variables → Python Variables (video)
   - Loops → Python Loops (video)

2. **Data Structures**
   - Arrays → Arrays Introduction (video)
   - Linked Lists → Linked List Explanation (video)

3. **Web Development**
   - HTML & CSS Basics → Web Development Essentials (video)
   - JavaScript for Web → JavaScript in the Browser (video)

---

## 🔧 Common Commands

| Task | Command |
|------|---------|
| Start backend | `cd backend && npm run dev` |
| Start frontend | `cd frontend && npm run dev` |
| Seed database | `cd backend && npm run seed` |
| View database | `cd backend && npx prisma studio` |
| Stop servers | `Ctrl + C` in each terminal |
| Kill all node | `Stop-Process -Name node -Force` |

---

## 🧪 Quick Tests

### Test Backend
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing
# Shows: StatusCode = 200
```

### Test Frontend
```powershell
Invoke-WebRequest -Uri "http://localhost:3002" -UseBasicParsing
# Shows: StatusCode = 200
```

### View Courses
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/subjects" -UseBasicParsing | ConvertFrom-Json | ConvertTo-Json
```

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port in use | `Stop-Process -Name node -Force` |
| npm error | `cd folder && npm install` |
| Database error | Check `.env` DATABASE_URL |
| Slow startup | Wait 10-15 seconds, check console |
| Videos not loading | Run `npm run seed` in backend |

---

## 📁 Project Structure

```
lms-project/
├── backend/         ← API server (port 5000)
├── frontend/        ← Web app (port 3002)
│
├── README.md            ← Full documentation
├── RUNNING_SERVERS.md   ← Server management guide
├── DEPLOYMENT.md        ← Production deployment
├── API_REFERENCE.md     ← API endpoints
└── QUICK_SETUP.md       ← This file
```

---

## 🎯 Workflow

1. **Start servers** (once per day)
   ```bash
   # Terminal 1
   cd backend && npm run dev
   
   # Terminal 2
   cd frontend && npm run dev
   ```

2. **Open in browser**
   ```
   http://localhost:3002
   ```

3. **Register or Login**
   - Create account with email/password
   - Or login with existing account

4. **Browse courses**
   - Click course to see videos
   - Videos are YouTube embeds
   - Click to watch

5. **Track progress**
   - Watch videos
   - Progress auto-saves

---

## 🚀 Next Steps

- **Read [README.md](README.md)** for full documentation
- **Read [RUNNING_SERVERS.md](RUNNING_SERVERS.md)** for detailed server guide
- **Read [API_REFERENCE.md](API_REFERENCE.md)** for API details
- **Read [DEPLOYMENT.md](DEPLOYMENT.md)** to deploy online

---

## 💡 Tips

- Keep both terminal windows open so you see server logs
- Servers auto-reload on code changes (no restart needed)
- Each course has multiple sections and videos
- Login required to access courses
- Progress is saved to database automatically

---

**That's it!** Your LMS is running. 🎉

Open http://localhost:3002 and start exploring!

---

**Last Updated:** March 18, 2026

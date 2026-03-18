# Troubleshooting & FAQ

Common issues and solutions for the LMS platform.

## ❓ Frequently Asked Questions

### 1. How do I start the LMS?

**Answer:** Open two terminal windows and run:
- Terminal 1: `cd backend && npm run dev`
- Terminal 2: `cd frontend && npm run dev`

Then open http://localhost:3002

### 2. How long does it take to start?

**Answer:**
- Backend: 5-10 seconds
- Frontend: 5-20 seconds (first time is slower)
- Total: Usually ready in 15-30 seconds

### 3. Do I need to seed the database every time?

**Answer:** No! Only once:
```bash
cd backend
npm run seed
```

This populates database with 3 courses and 7 videos. You don't need to run it again unless you want to reset.

### 4. How do I create a user account?

**Answer:** 
1. Open http://localhost:3002/register
2. Enter name, email, password
3. Click "Register"
4. Go to login page
5. Login with your credentials

### 5. What are the default test accounts?

**Answer:** There are none by default. Create your own account through the register page.

### 6. Can I access the database directly?

**Answer:** Yes, with Prisma Studio:
```bash
cd backend
npx prisma studio
```

Opens at http://localhost:5555

### 7. How do I reset the database?

**Answer:** ⚠️ Warning: This deletes everything!
```bash
cd backend
npx prisma migrate reset
npm run seed
```

### 8. Can I add more courses?

**Answer:** Yes! Edit `backend/prisma/seed.js` and add more:
```javascript
await prisma.section.create({
  data: { 
    title: "Your New Section", 
    subjectId: subject.id 
  },
});

await prisma.video.create({
  data: {
    title: "Your Video",
    youtubeId: "YOUR_YOUTUBE_ID",
    sectionId: section.id,
  },
});
```

Then run `npm run seed` again.

### 9. How do I get YouTube video IDs?

**Answer:** 
YouTube URL: `https://www.youtube.com/watch?v=rfscVS0vtbw`
Video ID: `rfscVS0vtbw`

For embedding: `https://www.youtube.com/embed/rfscVS0vtbw`

### 10. Is authentication working?

**Answer:** Yes! Check:
1. Token stored in localStorage after login
2. Token sent in `Authorization: Bearer {token}` header
3. Middleware checks token on protected routes

---

## 🔴 Common Problems & Solutions

### Problem 1: "Port already in use" Error

**Error Message:**
```
EADDRINUSE: address already in use :::5000
```

**Cause:** Another process is using port 5000 or 3002.

**Solution:**

Option A (Recommended):
```powershell
Stop-Process -Name node -Force
```

Option B (Specific Port):
```powershell
# Find process on port 5000
netstat -ano | findstr :5000

# Kill it (replace 12345 with actual PID)
taskkill /PID 12345 /F
```

Option C (Different Port):
```bash
# Run backend on different port
$env:PORT=5001
npm run dev
```

---

### Problem 2: "Cannot find module" Error

**Error Message:**
```
Error: Cannot find module '@prisma/client'
```

**Cause:** Dependencies not installed.

**Solution:**
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

---

### Problem 3: "Database connection refused" Error

**Error Message:**
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Cause:** 
- MySQL not running
- Incorrect DATABASE_URL

**Solution:**

Check `.env` file exists:
```bash
cd backend
type .env
```

Should show:
```
DATABASE_URL=mysql://user:password@host:3306/lms_db
```

If using Aiven or cloud MySQL:
- Verify host/port/credentials
- Check network connectivity
- Whitelist your IP in cloud provider

---

### Problem 4: "Frontend won't load" Error

**Symptoms:**
- http://localhost:3002 times out
- "Cannot connect" in browser

**Cause:**
- Frontend server didn't start
- Port 3002 blocked
- Long build time

**Solution:**

Check frontend terminal:
- Should show: `▲ Next.js ready`
- If building: Wait 15-30 seconds
- Check for build errors in console

Try:
```bash
# Clear Next.js cache
cd frontend
rm -r .next

# Reinstall
rm -r node_modules
npm install

# Try again
npm run dev
```

---

### Problem 5: "Videos not loading" - Video Unavailable

**Symptoms:**
- Video player shows "Video unavailable"

**Cause:**
- Invalid YouTube ID
- Video deleted or made private
- Not embeddable

**Solution:**

Check YouTube ID is valid:
```powershell
curl "https://www.youtube.com/embed/YOUR_ID"
```

If IDs are bad, reseed:
```bash
cd backend
npm run seed
```

Update seed.js with valid IDs first!

Valid test IDs:
```javascript
'rfscVS0vtbw'  // Python Course
'ohCDWZgNIU0'  // Variables
'6iF8Xb7Z3wQ'  // Loops
'8hly31xKli0'  // Arrays
'WwfhLC16bis'  // Linked Lists
```

---

### Problem 6: "Login not working" - Invalid Credentials

**Symptoms:**
- "Invalid email or password" message
- Can't login even with correct password

**Cause:**
- Typo in email/password
- User doesn't exist
- Database issue

**Solution:**

1. Double-check email and password
2. Register a new account
3. Try that account to login
4. Check Prisma Studio for users:
   ```bash
   cd backend
   npx prisma studio
   # View User table
   ```

---

### Problem 7: "Cannot POST to API" - 401 Unauthorized

**Symptoms:**
- Progress tracking failing
- "Unauthorized" error

**Cause:**
- Token not sent
- Token expired
- Invalid token

**Solution:**

Frontend should send token:
```javascript
const token = localStorage.getItem('token');

fetch('/api/progress/1', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

Check localStorage has token:
1. Open DevTools (F12)
2. Go to Application tab
3. Check localStorage
4. Should have `token` key

If missing, login again.

---

### Problem 8: "Slow Startup" - Taking Too Long

**Symptoms:**
- Servers take 30+ seconds to start
- Frontend stuck "building"

**Cause:**
- First-time build
- Large node_modules
- Slow system

**Solution:**

Wait patiently first time (30-60 seconds).

After first time, startup should be 10-15 seconds.

To speed up:
```bash
# Delete cache
rm -r .next
rm -r node_modules/.cache

# Use npm ci for faster install
npm ci
```

---

### Problem 9: "CORS Error" - Cross-Origin Request

**Symptoms:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Cause:**
- Backend not allowing frontend origin
- API URL wrong

**Solution:**

Check `.env.local` in frontend:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Check backend `src/app.js` has CORS:
```javascript
const cors = require('cors');
app.use(cors());
```

---

### Problem 10: "TypeScript Errors" - Build Fails

**Symptoms:**
```
error TS2307: Cannot find module
```

**Cause:**
- Dependencies missing
- TypeScript version mismatch

**Solution:**
```bash
cd frontend
npm install
npm run build
```

If persists:
```bash
# Clear cache and reinstall
rm -r node_modules
npm install
npm run dev
```

---

## 🔍 Debugging Tips

### 1. Check Server Logs

Look at terminal output:
- **Backend:** Should show "✅ Server running on port 5000"
- **Frontend:** Should show "▲ Next.js ready"
- **Errors:** Look for "Error:" or "failed to"

### 2. Check Network Requests

In browser DevTools (F12):
1. Go to Network tab
2. Reload page
3. Watch requests
4. Check response status codes
5. Look for API calls

### 3. Check Browser Console

In DevTools (F12):
1. Go to Console tab
2. Look for red errors
3. Read error message
4. Check it matches problems above

### 4. Test API Directly

```powershell
# Test health
Invoke-WebRequest http://localhost:5000/api/health

# Test courses
Invoke-WebRequest http://localhost:5000/api/subjects
```

### 5. Check Environment Variables

**Backend:**
```bash
cd backend
type .env
```

Should have:
- DATABASE_URL
- JWT_SECRET

**Frontend:**
```bash
cd frontend
type .env.local
```

Should have:
- NEXT_PUBLIC_API_URL

### 6. Use Prisma Studio

```bash
cd backend
npx prisma studio
```

Visually inspect:
- Users
- Subjects
- Sections
- Videos
- VideoProgress

---

## 📋 Checklist for Setup

- [ ] Node.js 20+ installed (`node --version`)
- [ ] Backend npm install completed
- [ ] Frontend npm install completed
- [ ] Backend `.env` created with DATABASE_URL
- [ ] Database can connect (Prisma Studio works)
- [ ] Database seeded (`npm run seed`)
- [ ] Backend starts on port 5000
- [ ] Frontend starts on port 3002
- [ ] Can access http://localhost:3002
- [ ] Can register account
- [ ] Can login
- [ ] Can see courses
- [ ] Can click video
- [ ] Can see YouTube video

---

## 🚀 Performance Optimization

### Slow Frontend Loading?

```bash
cd frontend

# Clear build cache
rm -r .next

# Rebuild
npm run build

# Check if any errors
npm run dev
```

### Slow API Responses?

```bash
cd backend

# Check if database query slow
# View logs for query time
npm run dev
```

### High Memory Usage?

```powershell
# Check memory before start
Get-Process node | Measure-Object WorkingSet -Sum

# Close other apps
Stop-Process -Name "app-name" -Force
```

---

## 🔐 Security Notes

1. **Never commit .env** - Add to .gitignore
2. **Change JWT_SECRET in production** - Don't use default
3. **Use HTTPS in production** - Not HTTP
4. **Hide API keys** - Don't expose in frontend code
5. **Validate all inputs** - Check type and format
6. **Use strong passwords** - Min 8 chars recommended

---

## 📞 Getting Help

### Where to Check First

1. **This troubleshooting guide** - Most answers here
2. **README.md** - Full documentation
3. **Console/terminal output** - See actual error message
4. **Browser DevTools** - Check Network & Console tabs
5. **Prisma Studio** - Check database state

### Ask For Help

When posting issue:
1. Share exact error message
2. Share complete terminal output
3. Describe what you did before error
4. Share your tech stack versions
5. Share your OS (Windows, Mac, Linux)

---

## 📝 Reporting Issues

If you find a bug:

1. **Reproduce** - Do it again to confirm
2. **Note steps** - How to make it happen
3. **Collect info** - Error messages, versions
4. **Check this guide** - See if already known
5. **Document & report** - Share with team

---

**Still stuck?** Read README.md or ask for support.

**Last Updated:** March 18, 2026

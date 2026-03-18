# API Reference

Complete documentation of all LMS API endpoints.

## Base URL

**Development:**
```
http://localhost:5000/api
```

**Production:**
```
https://your-backend-url.com/api
```

---

## 🔐 Authentication Endpoints

### POST `/auth/register`

Create a new user account.

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "password": "string (required, min 6 chars)"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-03-18T10:30:00.000Z"
  }
}
```

**Error (400):**
```json
{
  "error": "Email already exists"
}
```

**Status Codes:**
- `201` - User created
- `400` - Invalid input or email exists
- `500` - Server error

---

### POST `/auth/login`

Authenticate user and get JWT token.

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error (401):**
```json
{
  "error": "Invalid email or password"
}
```

**Status Codes:**
- `200` - Login successful
- `401` - Invalid credentials
- `404` - User not found
- `500` - Server error

**Notes:**
- Token should be stored in localStorage: `localStorage.setItem('token', token)`
- Token expires in 7 days
- Include token in Authorization header for protected routes

---

## 📚 Subject/Course Endpoints

### GET `/subjects`

Get all subjects with sections and videos.

**Request:**
```bash
curl http://localhost:5000/api/subjects
```

**Response (200):**
```json
[
  {
    "id": 29,
    "title": "Python Programming",
    "sections": [
      {
        "id": 67,
        "title": "Introduction",
        "subjectId": 29,
        "videos": [
          {
            "id": 1,
            "title": "Python Full Course",
            "youtubeId": "rfscVS0vtbw",
            "sectionId": 67
          }
        ]
      }
    ]
  }
]
```

**Query Parameters:**
- None (returns all)

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### GET `/subjects/:id`

Get single subject with all nested data.

**Request:**
```bash
curl http://localhost:5000/api/subjects/29
```

**URL Parameters:**
- `id` (number) - Subject ID

**Response (200):**
```json
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
```

**Error (404):**
```json
{
  "error": "Subject not found"
}
```

**Status Codes:**
- `200` - Subject found
- `404` - Subject not found
- `500` - Server error

---

## 🎥 Video Endpoints

### GET `/videos/:id`

Get video details with full hierarchy.

**Request:**
```bash
curl http://localhost:5000/api/videos/1
```

**URL Parameters:**
- `id` (number) - Video ID

**Response (200):**
```json
{
  "id": 1,
  "title": "Python Full Course",
  "youtubeId": "rfscVS0vtbw",
  "sectionId": 67,
  "section": {
    "id": 67,
    "title": "Introduction",
    "subjectId": 29,
    "subject": {
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
  }
}
```

**Error (404):**
```json
{
  "error": "Video not found"
}
```

**Status Codes:**
- `200` - Video found
- `404` - Video not found
- `500` - Server error

---

## 📊 Progress Tracking Endpoints

### POST `/progress/:videoId`

Mark a video as watched.

**Request:**
```bash
curl -X POST http://localhost:5000/api/progress/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**URL Parameters:**
- `videoId` (number) - Video ID

**Headers (Required):**
```
Authorization: Bearer {JWT_TOKEN}
```

**Request Body:**
```json
{
  "userId": 1
}
```

**Response (201):**
```json
{
  "message": "Progress recorded",
  "progress": {
    "id": 1,
    "userId": 1,
    "videoId": 1,
    "watched": true,
    "createdAt": "2026-03-18T10:45:00.000Z"
  }
}
```

**Error (401):**
```json
{
  "error": "Unauthorized"
}
```

**Status Codes:**
- `201` - Progress recorded
- `400` - Invalid data
- `401` - Not authenticated
- `404` - Video not found
- `500` - Server error

---

### GET `/progress/:userId`

Get user's watching progress.

**Request:**
```bash
curl http://localhost:5000/api/progress/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**URL Parameters:**
- `userId` (number) - User ID

**Headers (Required):**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response (200):**
```json
[
  {
    "id": 1,
    "userId": 1,
    "videoId": 1,
    "watched": true,
    "video": {
      "id": 1,
      "title": "Python Full Course",
      "youtubeId": "rfscVS0vtbw"
    }
  }
]
```

**Error (401):**
```json
{
  "error": "Unauthorized"
}
```

**Status Codes:**
- `200` - Success
- `401` - Not authenticated
- `404` - User not found
- `500` - Server error

---

## 🏥 Health Check

### GET `/health`

Check if API is running.

**Request:**
```bash
curl http://localhost:5000/api/health
```

**Response (200):**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

**Status Codes:**
- `200` - Server is healthy
- `503` - Server unavailable

---

## 🔑 Authentication

### JWT Token Format

Tokens are returned on successful login. Use as follows:

```bash
curl http://localhost:5000/api/progress/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Storing Token (Frontend)

```javascript
// After login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});

const { token } = await response.json();
localStorage.setItem('token', token);
```

### Using Token in Requests

```javascript
const token = localStorage.getItem('token');

fetch('/api/progress/1', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Token Expiration

- Tokens expire in **7 days**
- Backend returns 401 when token expired
- User must login again to get new token

---

## 📋 Error Responses

### Common Error Formats

**400 - Bad Request:**
```json
{
  "error": "Invalid request",
  "details": "Email is required"
}
```

**401 - Unauthorized:**
```json
{
  "error": "Unauthorized",
  "message": "Token expired or invalid"
}
```

**404 - Not Found:**
```json
{
  "error": "Not found",
  "message": "Resource does not exist"
}
```

**500 - Server Error:**
```json
{
  "error": "Internal server error",
  "message": "Something went wrong"
}
```

---

## 🧪 Testing Endpoints

### Using cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Get all subjects
curl http://localhost:5000/api/subjects

# Get specific subject
curl http://localhost:5000/api/subjects/29

# Get video
curl http://localhost:5000/api/videos/1

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```

### Using Postman

1. Import collection from `backend/postman-collection.json` (if available)
2. Set base URL: `http://localhost:5000/api`
3. Create requests for each endpoint
4. Store token from login response
5. Use in Authorization tab: Bearer token

### Using PowerShell

```powershell
# GET request
Invoke-WebRequest -Uri "http://localhost:5000/api/subjects" -UseBasicParsing | ConvertFrom-Json

# POST request
$body = @{
  email = "john@example.com"
  password = "pass123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

---

## 📊 Data Models

### User
```json
{
  "id": "number",
  "name": "string",
  "email": "string (unique)",
  "password": "string (hashed)",
  "createdAt": "timestamp"
}
```

### Subject (Course)
```json
{
  "id": "number",
  "title": "string",
  "sections": ["Section[]"]
}
```

### Section
```json
{
  "id": "number",
  "title": "string",
  "subjectId": "number",
  "videos": ["Video[]"],
  "subject": "Subject"
}
```

### Video
```json
{
  "id": "number",
  "title": "string",
  "youtubeId": "string",
  "sectionId": "number",
  "section": "Section"
}
```

### VideoProgress
```json
{
  "id": "number",
  "userId": "number",
  "videoId": "number",
  "watched": "boolean",
  "createdAt": "timestamp"
}
```

---

## 🚀 Rate Limiting

Currently **no rate limiting** on endpoints.

Recommended for production:
```bash
npm install express-rate-limit
```

---

## 📝 API Versioning

Current version: **v1** (part of base URL)

Future: `/api/v2/...`

---

## 🔒 Security Headers

All responses include:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
```

---

## 📞 Support

For API issues:
1. Check error message carefully
2. Verify request format
3. Check authentication token
4. Review console logs
5. Contact development team

---

**Last Updated:** March 18, 2026  
**Version:** 1.0.0

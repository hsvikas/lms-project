# LMS Deployment Guide

Complete step-by-step guide to deploy the SkillForge Learning LMS to production.

## 📋 Deployment Options

- [Local Development](#local-development)
- [Heroku (Easiest)](#heroku-deployment)
- [Railway](#railway-deployment)
- [DigitalOcean](#digitalocean-deployment)
- [AWS](#aws-deployment)
- [Vercel + Custom Backend](#vercel--custom-backend)

---

## 🏠 Local Development

### Prerequisites
- Node.js 20+
- npm/yarn
- MySQL

### Setup Steps

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/lms-project.git
   cd lms-project
   ```

2. **Backend setup**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment**
   ```bash
   # Create .env file
   echo DATABASE_URL="mysql://user:password@localhost:3306/lms" > .env
   echo JWT_SECRET="dev-secret-key" >> .env
   echo PORT=5000 >> .env
   ```

4. **Initialize database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npm run seed
   ```

5. **Start backend**
   ```bash
   npm run dev
   ```

6. **Frontend setup (new terminal)**
   ```bash
   cd frontend
   npm install
   echo NEXT_PUBLIC_API_URL="http://localhost:5000/api" > .env.local
   npm run dev
   ```

7. **Access application**
   - Frontend: http://localhost:3002
   - Backend: http://localhost:5000/api

---

## ☁️ Heroku Deployment

### Best For: Quick cloud deployment, small-medium projects

### Backend on Heroku

#### 1. Prerequisites
```bash
# Install Heroku CLI
choco install heroku-cli

# Login
heroku login
```

#### 2. Create Heroku App
```bash
cd backend
heroku create lms-backend-app
```

#### 3. Add MySQL Database
```bash
# Clear DB is pre-installed on Heroku
heroku addons:create cleardb:ignite
# This creates DATABASE_URL automatically
```

#### 4. Set Environment Variables
```bash
heroku config:set JWT_SECRET="your-super-secret-key-123"
heroku config:set NODE_ENV="production"
```

#### 5. Prepare for Deployment
Create `Procfile` in backend directory:
```
web: node src/server.js
```

Update `package.json` scripts:
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

#### 6. Deploy
```bash
# Initialize git if needed
git init
git add .
git commit -m "Initial commit"

# Add Heroku remote
heroku git:remote -a lms-backend-app

# Deploy
git push heroku main
```

#### 7. Run Migrations
```bash
heroku run npx prisma migrate deploy
heroku run npm run seed
```

#### 8. View Logs
```bash
heroku logs --tail
```

Your backend will be available at: `https://lms-backend-app.herokuapp.com/api`

### Frontend on Vercel

#### 1. Create Account
Go to vercel.com and sign up with GitHub

#### 2. Import Project
- Click "New Project"
- Select your GitHub repository
- Select `frontend` directory

#### 3. Environment Variables
Add in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://lms-backend-app.herokuapp.com/api
```

#### 4. Deploy
- Click "Deploy"
- Auto-deploys on every push to main

Your frontend will be available at the Vercel URL provided

---

## 🚂 Railway Deployment

### Best For: Modern cloud platform, easy database management

### Setup

#### 1. Create Account
- Sign up at railway.app

#### 2. Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"

#### 3. Add Services

**Backend Service:**
```bash
# In Railway dashboard
- Add service → GitHub
- Select lms-project repository
- Set root directory: backend
```

**MySQL Service:**
```bash
- Add service → MySQL
- Railway auto-creates database
```

#### 4. Configure Environment Variables
In Railway dashboard for backend service:
```
DATABASE_URL: ${MYSQL_URL}
JWT_SECRET: your-secret-key
NODE_ENV: production
PORT: $PORT
```

#### 5. Deploy
- Push code to GitHub
- Railway auto-deploys

### Frontend on Railway

```bash
- Add service → GitHub
- Select repository
- Set root directory: frontend
- Add environment variable:
  NEXT_PUBLIC_API_URL: your-backend-url/api
```

---

## 💧 DigitalOcean Deployment

### Best For: Full control, affordable VPS, production-ready

### Setup Backend

#### 1. Create Droplet
- Sign up at digitalocean.com
- Create new Droplet
- Choose: Ubuntu 22.04 LTS, Basic plan ($5-6/month)

#### 2. SSH Access
```bash
ssh root@your_droplet_ip
```

#### 3. Install Node.js & npm
```bash
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y git
```

#### 4. Install MySQL
```bash
sudo apt-get install -y mysql-server

# Secure installation
sudo mysql_secure_installation

# Create database
mysql -u root -p
> CREATE DATABASE lms_db;
> CREATE USER 'lms_user'@'localhost' IDENTIFIED BY 'strong_password';
> GRANT ALL PRIVILEGES ON lms_db.* TO 'lms_user'@'localhost';
> FLUSH PRIVILEGES;
```

#### 5. Setup Project
```bash
git clone https://github.com/yourusername/lms-project.git
cd lms-project/backend
npm install
```

#### 6. Configure Environment
```bash
nano .env
```

Add:
```
DATABASE_URL="mysql://lms_user:strong_password@localhost:3306/lms_db"
JWT_SECRET="production-secret-key"
NODE_ENV="production"
PORT=5000
```

#### 7. Initialize Database
```bash
npx prisma migrate deploy
npm run seed
```

#### 8. Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
pm2 start src/server.js --name "lms-backend"
pm2 startup
pm2 save
```

#### 9. Install Nginx
```bash
sudo apt-get install -y nginx
```

#### 10. Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/default
```

Replace content with:
```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 11. Enable Nginx
```bash
sudo systemctl restart nginx
```

#### 12. SSL Certificate (Free)
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

### Setup Frontend

#### 1. Create Second Droplet (Optional) or Same Droplet

#### 2. Clone and Build
```bash
git clone https://github.com/yourusername/lms-project.git
cd lms-project/frontend
npm install
npm run build
```

#### 3. Configure Environment
```bash
echo NEXT_PUBLIC_API_URL="https://api.yourdomain.com/api" > .env.production
```

#### 4. Start with PM2
```bash
pm2 start npm --name "lms-frontend" -- start
pm2 save
```

#### 5. Configure Nginx for Frontend
```bash
sudo nano /etc/nginx/sites-available/app
```

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

```bash
sudo systemctl restart nginx
sudo certbot --nginx -d app.yourdomain.com
```

---

## 🚀 AWS Deployment

### Best For: Large-scale applications, high availability

### Using AWS EC2 + RDS

#### 1. Create EC2 Instance
- Launch EC2 instance (Ubuntu 22.04)
- t3.micro (eligible for free tier)
- Configure security group: Allow SSH, HTTP, HTTPS

#### 2. Create RDS MySQL Database
- Create MySQL instance
- db.t3.micro (free tier eligible)
- Initial database name: `lms_db`
- Username: `admin`

#### 3. Connect to EC2
```bash
ssh -i your-key.pem ec2-user@instance-public-ip
```

#### 4. Install Dependencies
```bash
sudo yum update -y
sudo yum install -y nodejs npm git
```

#### 5. Clone Repository
```bash
git clone https://github.com/yourusername/lms-project.git
cd lms-project/backend
npm install
```

#### 6. Configure Environment
```bash
nano .env
```

```
DATABASE_URL="mysql://admin:password@your-rds-endpoint:3306/lms_db"
JWT_SECRET="aws-production-secret"
NODE_ENV="production"
PORT=5000
```

#### 7. Initialize Database
```bash
npx prisma migrate deploy
npm run seed
```

#### 8. Start Application
```bash
sudo npm install -g pm2
pm2 start src/server.js
pm2 startup
pm2 save
```

#### 9. Use AWS Elastic Load Balancer (Optional)
- Add load balancer for high availability
- Attach EC2 instances
- Setup SSL with ACM

#### 10. Frontend on CloudFront + S3
```bash
cd frontend
npm run build
```

Upload `out` directory to S3, configure CloudFront distribution

---

## 🌐 Vercel + Railway

### Best For: Modern stack, easy to use, great for Next.js

### Deploy Frontend on Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel deploy --prod
```

### Deploy Backend on Railway
```bash
# Railway auto-deploys from GitHub
# Just push to main branch
git push origin main
```

### Connect Services
In Vercel dashboard, set environment variable:
```
NEXT_PUBLIC_API_URL=https://your-railway-backend-url/api
```

---

## 🔒 Security Checklist

- [ ] Change default passwords
- [ ] Enable HTTPS/SSL certificates
- [ ] Set strong JWT_SECRET
- [ ] Enable database backups
- [ ] Configure firewall rules
- [ ] Enable CORS for frontend domain only
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting on API
- [ ] Validate all user inputs
- [ ] Keep dependencies updated

---

## 📊 Post-Deployment

### Monitor Application
```bash
# Check logs
pm2 logs lms-backend

# Check status
pm2 status
```

### Database Backups
```bash
# Backup MySQL
mysqldump -u user -p database > backup.sql

# Restore
mysql -u user -p database < backup.sql
```

### Update Code
```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Restart
pm2 restart lms-backend
```

---

## 🆘 Troubleshooting

### Database Connection Error
```bash
# Check MySQL is running
sudo systemctl status mysql

# Test connection
mysql -u admin -p -h your-rds-endpoint
```

### Port Already in Use
```bash
# Find process
lsof -i :5000

# Kill process
kill -9 PID
```

### Nginx Not Working
```bash
# Test config
sudo nginx -t

# Restart
sudo systemctl restart nginx
```

### PM2 Process Crashed
```bash
# Check logs
pm2 logs

# Restart
pm2 restart lms-backend
```

---

## 💰 Cost Estimate

| Service | Provider | Cost/Month | Notes |
|---------|----------|-----------|-------|
| Backend | Heroku | Free-$50 | Auto-scaling |
| Database | ClearDB | Free-$9 | On Heroku |
| Frontend | Vercel | Free | Auto-deploy |
| **Total** | | **Free-$59** | Basic setup |
| | | | |
| Backend | DigitalOcean | $5-12 | VPS |
| Database | DigitalOcean | Included | Droplet |
| Frontend | DigitalOcean | $5-12 | Separate or same |
| **Total** | | **$5-24** | Most affordable |

---

## 📞 Support Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Express.js Deployment](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [Heroku Node Docs](https://devcenter.heroku.com/articles/nodejs-support)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)

---

**Last Updated:** March 18, 2026  
**Version:** 1.0.0

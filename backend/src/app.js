const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const subjectRoutes = require('./routes/subject.routes');
const videoRoutes = require('./routes/video.routes');
const progressRoutes = require('./routes/progress.routes');
const healthRoutes = require('./routes/health.routes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/health', healthRoutes);

app.use(errorMiddleware);

module.exports = app;
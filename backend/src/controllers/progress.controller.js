const prisma = require('../services/prisma');

exports.markWatched = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { videoId } = req.params;
    await prisma.videoProgress.upsert({
      where: {
        userId_videoId: {
          userId,
          videoId: parseInt(videoId)
        }
      },
      update: { watched: true },
      create: {
        userId,
        videoId: parseInt(videoId),
        watched: true
      }
    });
    res.json({ message: 'Video marked as watched' });
  } catch (err) {
    next(err);
  }
};

exports.getUserProgress = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const progress = await prisma.videoProgress.findMany({
      where: { userId: parseInt(userId), watched: true },
      include: { video: true }
    });
    res.json(progress);
  } catch (err) {
    next(err);
  }
};
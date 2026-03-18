const prisma = require('../services/prisma');

exports.getVideoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const video = await prisma.video.findUnique({
      where: { id: parseInt(id) },
      include: {
        section: {
          include: {
            subject: {
              include: {
                sections: {
                  include: {
                    videos: true
                  }
                }
              }
            }
          }
        }
      }
    });
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json(video);
  } catch (err) {
    next(err);
  }
};
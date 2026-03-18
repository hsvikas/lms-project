const prisma = require('../services/prisma');

exports.getSubjects = async (req, res, next) => {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        sections: {
          include: {
            videos: true
          }
        }
      }
    });
    res.json(subjects);
  } catch (err) {
    next(err);
  }
};

exports.getSubjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subject = await prisma.subject.findUnique({
      where: { id: parseInt(id) },
      include: {
        sections: {
          include: {
            videos: true
          }
        }
      }
    });
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json(subject);
  } catch (err) {
    next(err);
  }
};
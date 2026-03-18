const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Clearing existing data...');
    
    // Clear existing data
    await prisma.videoProgress.deleteMany({});
    await prisma.video.deleteMany({});
    await prisma.section.deleteMany({});
    await prisma.subject.deleteMany({});

    console.log('Creating subjects and videos...');

    // Create subjects
    const pythonSubject = await prisma.subject.create({
      data: { title: 'Python Programming' },
    });

    const dataStructuresSubject = await prisma.subject.create({
      data: { title: 'Data Structures' },
    });

    const webDevSubject = await prisma.subject.create({
      data: { title: 'Web Development' },
    });

    // Python Programming sections and videos
    const introSection = await prisma.section.create({
      data: { title: 'Introduction', subjectId: pythonSubject.id },
    });

    const variablesSection = await prisma.section.create({
      data: { title: 'Variables', subjectId: pythonSubject.id },
    });

    const loopsSection = await prisma.section.create({
      data: { title: 'Loops', subjectId: pythonSubject.id },
    });

    // Python videos
    await prisma.video.create({
      data: {
        title: 'Python Full Course',
        youtubeId: 'rfscVS0vtbw',
        sectionId: introSection.id,
      },
    });

    await prisma.video.create({
      data: {
        title: 'Python Variables',
        youtubeId: 'ohCDWZgNIU0',
        sectionId: variablesSection.id,
      },
    });

    await prisma.video.create({
      data: {
        title: 'Python Loops',
        youtubeId: '6iF8Xb7Z3wQ',
        sectionId: loopsSection.id,
      },
    });

    // Data Structures sections and videos
    const arraysSection = await prisma.section.create({
      data: { title: 'Arrays', subjectId: dataStructuresSubject.id },
    });

    const linkedListSection = await prisma.section.create({
      data: { title: 'Linked Lists', subjectId: dataStructuresSubject.id },
    });

    // Data Structures videos
    await prisma.video.create({
      data: {
        title: 'Arrays Introduction',
        youtubeId: '8hly31xKli0',
        sectionId: arraysSection.id,
      },
    });

    await prisma.video.create({
      data: {
        title: 'Linked List Explanation',
        youtubeId: 'WwfhLC16bis',
        sectionId: linkedListSection.id,
      },
    });

    // Web Development sections and videos
    const htmlCssSection = await prisma.section.create({
      data: { title: 'HTML & CSS Basics', subjectId: webDevSubject.id },
    });

    const jsWebSection = await prisma.section.create({
      data: { title: 'JavaScript for Web', subjectId: webDevSubject.id },
    });

    await prisma.video.create({
      data: {
        title: 'Web Development Essentials',
        youtubeId: 'BIlUbwOkbXc',
        sectionId: htmlCssSection.id,
      },
    });

    await prisma.video.create({
      data: {
        title: 'JavaScript in the Browser',
        youtubeId: 'jS4aFq5-91M',
        sectionId: jsWebSection.id,
      },
    });

    console.log('✅ Database seeded successfully! Courses ready for learning.');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

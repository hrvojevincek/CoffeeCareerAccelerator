const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create some users
  const john = await prisma.user.create({
    data: {
      username: 'john123',
      email: 'john@example.com',
      password: 'secret123',
      name: 'John Doe',
      city: 'New York',
    },
  });

  const jane = await prisma.user.create({
    data: {
      username: 'jane123',
      email: 'jane@example.com',
      password: 'secret123',
      name: 'Jane Doe',
      city: 'Los Angeles',
    },
  });

  // Add some experience for John
  await prisma.experience.create({
    data: {
      userId: john.id,
      jobtitle: 'Barista',
      jobrole: 'Barista',
      company: 'Starbucks',
      startDate: new Date(2018, 0, 1),
      finishDate: new Date(2022, 0, 1),
      description: 'Worked as a barista, making coffee and serving customers',
      currentJob: false,
    },
  });

  // Add some experience for Jane
  await prisma.experience.create({
    data: {
      userId: jane.id,
      jobtitle: 'Coffee Roaster',
      jobrole: 'Coffee Roaster',
      company: 'Blue Bottle Coffee',
      startDate: new Date(2019, 0, 1),
      finishDate: new Date(2023, 0, 1),
      description:
        'Worked as a coffee roaster, responsible for roasting and quality checking',
      currentJob: true,
    },
  });

  // Create some employers
  const starbucks = await prisma.employer.create({
    data: {
      name: 'Starbucks',
      logoUrl: 'https://starbuckslogo.com/logo.jpg',
      website: 'https://www.starbucks.com',
    },
  });

  const blueBottle = await prisma.employer.create({
    data: {
      name: 'Blue Bottle Coffee',
      logoUrl:
        'https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Blue_Bottle_Coffee_logo.svg/1200px-Blue_Bottle_Coffee_logo.svg.png',
      website: 'https://www.bluebottlecoffee.com',
    },
  });

  // Create a job
  const baristaJob = await prisma.job.create({
    data: {
      title: 'Barista',
      description: 'Looking for a skilled barista to join our team.',
      location: 'San Francisco',
      employerId: blueBottle.id,
      posted: true,
    },
  });

  // Create an application for the job
  await prisma.application.create({
    data: {
      userId: john.id,
      jobId: baristaJob.id,
      hired: false,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create some users
  const john = await prisma.user.create({
    data: {
      username: 'john123',
      email: 'john@example.com',
      password: 'secret123',
    },
  });

  const jane = await prisma.user.create({
    data: {
      username: 'jane123',
      email: 'jane@example.com',
      password: 'secret123',
    },
  });

  // // Add some experience for John
  // await prisma.experience.create({
  //   data: {
  //     userId: john.id,
  //     jobtitle: 'Barista',
  //     jobrole: 'Barista',
  //     company: 'Starbucks',
  //     startDate: new Date(2018, 0, 1),
  //     finishDate: new Date(2022, 0, 1),
  //     description: 'Worked as a barista, making coffee and serving customers',
  //     currentJob: false,
  //   },
  // });

  // // Add some experience for Jane
  // await prisma.experience.create({
  //   data: {
  //     userId: jane.id,
  //     jobtitle: 'Coffee Roaster',
  //     jobrole: 'Coffee Roaster',
  //     company: 'Blue Bottle Coffee',
  //     startDate: new Date(2019, 0, 1),
  //     finishDate: new Date(2023, 0, 1),
  //     description:
  //       'Worked as a coffee roaster, responsible for roasting and quality checking',
  //     currentJob: true,
  //   },
  // });

  // Create some employers
  const starbucks = await prisma.employer.create({
    data: {
      name: 'Starbucks',
      logoUrl: 'https://starbuckslogo.com/logo.jpg',
      website: 'https://www.starbucks.com',
      location: 'Los Angeles, USA',
    },
  });

  const blueBottle = await prisma.employer.create({
    data: {
      name: 'Blue Bottle Coffee',
      logoUrl:
        'https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Blue_Bottle_Coffee_logo.svg/1200px-Blue_Bottle_Coffee_logo.svg.png',
      website: 'https://www.bluebottlecoffee.com',
      location: 'New York, USA',
    },
  });
  const fabricaCoffee = await prisma.employer.create({
    data: {
      name: 'Fabrica Coffee Roasters',
      logoUrl: 'https://example.com/fabrica-coffee.png',
      website: 'https://www.fabricacoffee.com',
      location: 'Lisbon, Portugal',
    },
  });
  const nomadcoffee = await prisma.employer.create({
    data: {
      name: 'Nømad Coffee',
      logoUrl: 'https://example.com/nomad-coffee.png',
      website: 'https://www.nomadcoffee.es',
      location: 'Barcelona, Spain',
    },
  });
  const magnifico = await prisma.employer.create({
    data: {
      name: 'Café El Magnífico',
      logoUrl: 'https://example.com/el-magnifico.png',
      website: 'https://www.cafeelmagnifico.com',
      location: 'Barcelona, Spain',
    },
  });

  // Create more coffee-related jobs
  const jobsData = [
    {
      title: 'Barista',
      category: 'Barista',
      description: 'Join our team of passionate baristas.',
      location: 'Madrid, Spain',
      employerId: blueBottle.id,
      posted: true,
    },
    {
      title: 'Head Barista',
      category: 'Head Barista',
      description: 'Experienced barista with leadership skills needed.',
      location: 'Lisbon, Portugal',
      employerId: starbucks.id,
      posted: true,
    },
    {
      title: 'Assistant Roaster',
      category: 'Assistant Roaster',
      description: 'Assist in coffee roasting operations.',
      location: 'Barcelona, Spain',
      employerId: magnifico.id,
      posted: true,
    },
    {
      title: 'Roaster',
      category: 'Roaster',
      description: 'Experienced roaster for specialty coffee beans.',
      location: 'Porto, Portugal',
      employerId: fabricaCoffee.id,
      posted: true,
    },
    {
      title: 'Head Roaster',
      category: 'Head Roaster',
      description: 'Lead the coffee roasting team.',
      location: 'Barcelona, Spain',
      employerId: nomadcoffee.id,
      posted: true,
    },
  ];

  for (const jobData of jobsData) {
    await prisma.job.create({ data: jobData });
  }

  // // Create an application for the job
  // await prisma.application.create({
  //   data: {
  //     userId: john.id,
  //     jobId: baristaJob.id,
  //     hired: false,
  //   },
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

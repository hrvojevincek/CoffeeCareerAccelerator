const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  //! USERS DATA

  const usersData = [
    {
      username: 'jane123',
      email: 'jane@example.com',
      password: 'secret123',
      category: 'user',
    },
    {
      username: 'maria89',
      email: 'maria89@example.com',
      password: 'maria123',
      category: 'user',
    },
    {
      username: 'pablo77',
      email: 'pablo77@example.com',
      password: 'pablo123',
      category: 'user',
    },
    {
      username: 'lucia22',
      email: 'lucia22@example.com',
      password: 'lucia123',
      category: 'user',
    },
    {
      username: 'carlos99',
      email: 'carlos99@example.com',
      password: 'carlos123',
      category: 'user',
    },
  ];
  for (const userData of usersData) {
    await prisma.user.create({
      data: userData,
    });
  }

  // //! EMPLOYERS
  const employersData = [
    {
      username: 'blueBottle',
      email: 'info@bluebottlecoffee.com',
      password: 'bluebottle123',
      category: 'employer',
    },
    {
      username: 'intelligentsiaCoffee',
      email: 'info@intelligentsiacoffee.com',
      password: 'intelligentsia123',
      category: 'employer',
    },
    {
      username: 'laMarzocco',
      email: 'info@lamarzocco.com',
      password: 'lamarzocco123',
      category: 'employer',
    },
    {
      username: 'theBarn',
      email: 'info@thebarn.de',
      password: 'thebarn123',
      category: 'employer',
    },
    {
      username: 'fiveElephant',
      email: 'info@fiveelephant.com',
      password: 'fiveelephant123',
      category: 'employer',
    },
    {
      username: 'squareMileCoffeeRoasters',
      email: 'info@squaremilecoffee.com',
      password: 'squaremile123',
      category: 'employer',
    },
    {
      username: 'monmouthCoffeeCompany',
      email: 'info@monmouthcoffee.co.uk',
      password: 'monmouth123',
      category: 'employer',
    },
    {
      username: 'workshopCoffee',
      email: 'info@workshopcoffee.com',
      password: 'workshop123',
      category: 'employer',
    },
    {
      username: 'caravanCoffeeRoasters',
      email: 'info@caravancoffeeroasters.co.uk',
      password: 'caravan123',
      category: 'employer',
    },
  ];

  for (const employerData of employersData) {
    await prisma.employer.create({
      data: employerData,
    });
  }

  const blueBottle = await prisma.employer.update({
    where: {
      id: 1,
    },
    data: {
      name: 'Blue Bottle Coffee',
      logoUrl:
        'https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Blue_Bottle_Coffee_logo.svg/1200px-Blue_Bottle_Coffee_logo.svg.png',
      website: 'https://www.bluebottlecoffee.com',
      location: 'New York, USA',
    },
  });
  const intelligentsiaCoffee = await prisma.employer.update({
    where: {
      id: 2,
    },
    data: {
      name: 'Intelligentsia Coffee',
      logoUrl: 'https://example.com/fabrica-coffee.png',
      website: 'https://www.fabricacoffee.com',
      location: 'Lisbon, Portugal',
    },
  });

  const laMarzocco = await prisma.employer.update({
    where: {
      id: 3,
    },
    data: {
      name: 'La Marzocco',
      logoUrl: 'https://example.com/nomad-coffee.png',
      website: 'https://www.nomadcoffee.es',
      location: 'Barcelona, Spain',
    },
  });

  const theBarn = await prisma.employer.update({
    where: {
      id: 4,
    },
    data: {
      name: 'The Barn',
      logoUrl: 'https://example.com/el-magnifico.png',
      website: 'https://www.cafeelmagnifico.com',
      location: 'Barcelona, Spain',
    },
  });

  // const jobsData = [
  // {
  //   title: 'Barista',
  //   category: 'Barista',
  //   description:
  //     'Join our team of passionate baristas. We are looking for skilled individuals who can create exceptional coffee experiences for our customers. As a Barista, you will be responsible for brewing and serving coffee, providing excellent customer service, and maintaining a clean and welcoming environment. Join us and be part of a team that values quality, craftsmanship, and the art of coffee.',
  //   location: 'Madrid, Spain',
  //   employerId: 5,
  //   money: '30.000€',
  //   posted: true,
  // },
  // {
  //   title: 'Head Barista',
  //   category: 'Head Barista',
  //   description:
  //     'We are seeking an experienced and talented Head Barista to lead our coffee team. As a Head Barista, you will be responsible for supervising the baristas, training new staff, creating new coffee recipes, and ensuring the highest quality of coffee preparation. Join us and showcase your expertise in the coffee industry while working in a dynamic and fast-paced environment.',
  //   location: 'Berlin, Germany',
  //   employerId: intelligentsiaCoffee.id,
  //   money: '30.000€',
  //   posted: true,
  // },
  //   {
  //     title: 'Roaster',
  //     category: 'Roaster',
  //     description:
  //       'Become part of our roasting team as a Roaster. In this role, you will work closely with our green coffee sourcing team to select and roast the finest coffee beans. You will be responsible for monitoring and controlling the roasting process, ensuring consistent quality and flavor profiles. Join us and contribute to our commitment to providing exceptional coffee experiences through meticulous roasting techniques.',
  //     location: 'London, United Kingdom',
  //     employerId: laMarzocco.id,
  //     money: '30.000€',
  //     posted: true,
  //   },
  //   {
  //     title: 'Head Roaster',
  //     category: 'Head Roaster',
  //     description:
  //       'We are seeking a skilled and experienced Head Roaster to lead our roasting operations. As a Head Roaster, you will oversee the entire roasting process, manage the roasting team, develop roast profiles, and ensure the highest level of quality and consistency. Join us and be part of a company dedicated to showcasing the artistry and complexity of specialty coffee through expert roasting techniques.',
  //     location: 'Madrid, Spain',
  //     employerId: theBarn.id,
  //     money: '30.000€',
  //     posted: true,
  //   },
  //   {
  //     title: 'Manager',
  //     category: 'Manager',
  //     description:
  //       'Join our team as a Manager and lead our coffee shop to success. As a Manager, you will oversee all aspects of the operations, including staff management, inventory control, customer service, and financial performance. Bring your leadership skills and passion for specialty coffee to create a welcoming and thriving coffee shop environment.',
  //     location: 'Barcelona, Spain',
  //     employerId: intelligentsiaCoffee.id,
  //     money: '30.000€',
  //     posted: true,
  //   },
  //   {
  //     title: 'Assistant Manager',
  //     category: 'Assistant Manager',
  //     description:
  //       'We are looking for an Assistant Manager to support our coffee shop operations. As an Assistant Manager, you will assist the Manager in daily tasks, including staff supervision, inventory management, and customer service. This role provides an excellent opportunity to develop your leadership skills in the specialty coffee industry.',
  //     location: 'New York, USA',
  //     employerId: blueBottle.id,
  //     money: '30.000€',
  //     posted: true,
  //   },
  // ];

  // for (const jobData of jobsData) {
  //   await prisma.job.create({
  //     data: jobData,
  //   });
  // }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

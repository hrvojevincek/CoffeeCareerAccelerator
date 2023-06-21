const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  //! USERS DATA

  const usersData = [
    {
      username: 'jane123',
      email: 'jane@example.com',
      password: 'secret123',
    },
    {
      username: 'maria89',
      email: 'maria89@example.com',
      password: 'maria123',
    },
    {
      username: 'pablo77',
      email: 'pablo77@example.com',
      password: 'pablo123',
    },
    {
      username: 'lucia22',
      email: 'lucia22@example.com',
      password: 'lucia123',
    },
    {
      username: 'carlos99',
      email: 'carlos99@example.com',
      password: 'carlos123',
    },
  ];
  for (const userData of usersData) {
    await prisma.user.create({ data: userData });
  }

  // //! EMPLOYERS
  const employersData = [
    {
      username: 'blueBottle',
      email: 'info@bluebottlecoffee.com',
      password: 'bluebottle123',
    },
    {
      username: 'intelligentsiaCoffee',
      email: 'info@intelligentsiacoffee.com',
      password: 'intelligentsia123',
    },
    {
      username: 'squareMileCoffeeRoasters',
      email: 'info@stumptowncoffee.com',
      password: 'stumptown123',
    },
    {
      username: 'laMarzocco',
      email: 'info@lamarzocco.com',
      password: 'lamarzocco123',
    },
    {
      username: 'theBarn',
      email: 'info@thebarn.de',
      password: 'thebarn123',
    },
    {
      username: 'fiveElephant',
      email: 'info@fiveelephant.com',
      password: 'fiveelephant123',
    },
    {
      username: 'squareMileCoffeeRoasters',
      email: 'info@squaremilecoffee.com',
      password: 'squaremile123',
    },
    {
      username: 'monmouthCoffeeCompany',
      email: 'info@monmouthcoffee.co.uk',
      password: 'monmouth123',
    },
    {
      username: 'workshopCoffee',
      email: 'info@workshopcoffee.com',
      password: 'workshop123',
    },
    {
      username: 'caravanCoffeeRoasters',
      email: 'info@caravancoffeeroasters.co.uk',
      password: 'caravan123',
    },
  ];
  for (const employerData of employersData) {
    await prisma.employer.create({ data: employerData });
  }

  // const blueBottle = await prisma.employer.update({
  //   data: {
  //     name: 'Blue Bottle Coffee',
  //     logoUrl:
  //       'https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Blue_Bottle_Coffee_logo.svg/1200px-Blue_Bottle_Coffee_logo.svg.png',
  //     website: 'https://www.bluebottlecoffee.com',
  //     location: 'New York, USA',
  //   },
  // });
  // const fabricaCoffee = await prisma.employer.update({
  //   data: {
  //     name: 'Fabrica Coffee Roasters',
  //     logoUrl: 'https://example.com/fabrica-coffee.png',
  //     website: 'https://www.fabricacoffee.com',
  //     location: 'Lisbon, Portugal',
  //   },
  // });
  // const nomadcoffee = await prisma.employer.update({
  //   data: {
  //     name: 'Nømad Coffee',
  //     logoUrl: 'https://example.com/nomad-coffee.png',
  //     website: 'https://www.nomadcoffee.es',
  //     location: 'Barcelona, Spain',
  //   },
  // });
  // const magnifico = await prisma.employer.update({
  //   data: {
  //     name: 'Café El Magnífico',
  //     logoUrl: 'https://example.com/el-magnifico.png',
  //     website: 'https://www.cafeelmagnifico.com',
  //     location: 'Barcelona, Spain',
  //   },
  // });

  // Jobs Data
  // const jobsData = [
  //   {
  //     title: 'Barista',
  //     category: 'Barista',
  //     description:
  //       'Join our team of passionate baristas. We are looking for skilled individuals who can create exceptional coffee experiences for our customers. As a Barista, you will be responsible for brewing and serving coffee, providing excellent customer service, and maintaining a clean and welcoming environment. Join us and be part of a team that values quality, craftsmanship, and the art of coffee.',
  //     location: 'Madrid, Spain',
  //     employerId: blueBottle.id,
  //     posted: true,
  //   },
  //   {
  //     title: 'Head Barista',
  //     category: 'Head Barista',
  //     description:
  //       'We are seeking an experienced and talented Head Barista to lead our coffee team. As a Head Barista, you will be responsible for supervising the baristas, training new staff, creating new coffee recipes, and ensuring the highest quality of coffee preparation. Join us and showcase your expertise in the coffee industry while working in a dynamic and fast-paced environment.',
  //     location: 'Berlin, Germany',
  //     employerId: intelligentsiaCoffee.id,
  //     posted: true,
  //   },
  //   {
  //     title: 'Roaster',
  //     category: 'Roaster',
  //     description:
  //       'Become part of our roasting team as a Roaster. In this role, you will work closely with our green coffee sourcing team to select and roast the finest coffee beans. You will be responsible for monitoring and controlling the roasting process, ensuring consistent quality and flavor profiles. Join us and contribute to our commitment to providing exceptional coffee experiences through meticulous roasting techniques.',
  //     location: 'London, United Kingdom',
  //     employerId: squareMileCoffeeRoasters.id,
  //     posted: true,
  //   },
  //   {
  //     title: 'Head Roaster',
  //     category: 'Head Roaster',
  //     description:
  //       'We are seeking a skilled and experienced Head Roaster to lead our roasting operations. As a Head Roaster, you will oversee the entire roasting process, manage the roasting team, develop roast profiles, and ensure the highest level of quality and consistency. Join us and be part of a company dedicated to showcasing the artistry and complexity of specialty coffee through expert roasting techniques.',
  //     location: 'Madrid, Spain',
  //     employerId: theBarn.id,
  //     posted: true,
  //   },
  //   {
  //     title: 'Manager',
  //     category: 'Manager',
  //     description:
  //       'Join our team as a Manager and lead our coffee shop to success. As a Manager, you will oversee all aspects of the operations, including staff management, inventory control, customer service, and financial performance. Bring your leadership skills and passion for specialty coffee to create a welcoming and thriving coffee shop environment.',
  //     location: 'Barcelona, Spain',
  //     employerId: caravanCoffeeRoasters.id,
  //     posted: true,
  //   },
  //   {
  //     title: 'Assistant Manager',
  //     category: 'Assistant Manager',
  //     description:
  //       'We are looking for an Assistant Manager to support our coffee shop operations. As an Assistant Manager, you will assist the Manager in daily tasks, including staff supervision, inventory management, and customer service. This role provides an excellent opportunity to develop your leadership skills in the specialty coffee industry.',
  //     location: 'New York, USA',
  //     employerId: blueBottleCoffee.id,
  //     posted: true,
  //   },
  //   // Add more job objects following the same pattern
  // ];
  // for (const jobData of jobsData) {
  //   await prisma.employer.create({ data: jobData });
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

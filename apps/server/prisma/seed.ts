import { Employer, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');

  // Delete all records from all tables
  await prisma.application.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.job.deleteMany();
  await prisma.user.deleteMany();
  await prisma.employer.deleteMany();

  console.log('Existing data cleared. Starting to seed...');

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

  //! EMPLOYERS
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

  let createdEmployers: Employer[] = [];
  for (const employerData of employersData) {
    const employer = await prisma.employer.create({
      data: employerData,
    });
    createdEmployers.push(employer);
  }

  const [blueBottle, intelligentsiaCoffee, laMarzocco, theBarn] = createdEmployers;

  await prisma.employer.update({
    where: { id: blueBottle.id },
    data: {
      name: 'Blue Bottle Coffee',
      logoUrl:
        'https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Blue_Bottle_Coffee_logo.svg/1200px-Blue_Bottle_Coffee_logo.svg.png',
      website: 'https://www.bluebottlecoffee.com',
      location: 'New York, USA',
    },
  });

  await prisma.employer.update({
    where: { id: intelligentsiaCoffee.id },
    data: {
      name: 'Intelligentsia Coffee',
      logoUrl: 'https://example.com/fabrica-coffee.png',
      website: 'https://www.fabricacoffee.com',
      location: 'Lisbon, Portugal',
    },
  });

  await prisma.employer.update({
    where: { id: laMarzocco.id },
    data: {
      name: 'La Marzocco',
      logoUrl: 'https://example.com/nomad-coffee.png',
      website: 'https://www.nomadcoffee.es',
      location: 'Barcelona, Spain',
    },
  });

  await prisma.employer.update({
    where: { id: theBarn.id },
    data: {
      name: 'The Barn',
      logoUrl: 'https://example.com/el-magnifico.png',
      website: 'https://www.cafeelmagnifico.com',
      location: 'Barcelona, Spain',
    },
  });

  const jobsData = [
    {
      title: 'Barista',
      categories: 'Barista',
      description:
        'Join our team of passionate baristas. We are looking for skilled individuals who can create exceptional coffee experiences for our customers. As a Barista, you will be responsible for brewing and serving coffee, providing excellent customer service, and maintaining a clean and welcoming environment. Join us and be part of a team that values quality, craftsmanship, and the art of coffee.',
      location: 'Madrid, Spain',
      employerId: createdEmployers[4].id,
      money: '30.000€',
      posted: true,
    },
    {
      title: 'Head Barista',
      categories: 'Head Barista',
      description:
        'We are seeking an experienced and talented Head Barista to lead our coffee team. As a Head Barista, you will be responsible for supervising the baristas, training new staff, creating new coffee recipes, and ensuring the highest quality of coffee preparation. Join us and showcase your expertise in the coffee industry while working in a dynamic and fast-paced environment.',
      location: 'Berlin, Germany',
      employerId: intelligentsiaCoffee.id,
      money: '30.000€',
      posted: true,
    },
    {
      title: 'Roaster',
      categories: 'Roaster',
      description:
        'Become part of our roasting team as a Roaster. In this role, you will work closely with our green coffee sourcing team to select and roast the finest coffee beans. You will be responsible for monitoring and controlling the roasting process, ensuring consistent quality and flavor profiles. Join us and contribute to our commitment to providing exceptional coffee experiences through meticulous roasting techniques.',
      location: 'London, United Kingdom',
      employerId: laMarzocco.id,
      money: '30.000€',
      posted: true,
    },
    {
      title: 'Head Roaster',
      categories: 'Head Roaster',
      description:
        'We are seeking a skilled and experienced Head Roaster to lead our roasting operations. As a Head Roaster, you will oversee the entire roasting process, manage the roasting team, develop roast profiles, and ensure the highest level of quality and consistency. Join us and be part of a company dedicated to showcasing the artistry and complexity of specialty coffee through expert roasting techniques.',
      location: 'Madrid, Spain',
      employerId: theBarn.id,
      money: '30.000€',
      posted: true,
    },
    {
      title: 'Manager',
      categories: 'Manager',
      description:
        'Join our team as a Manager and lead our coffee shop to success. As a Manager, you will oversee all aspects of the operations, including staff management, inventory control, customer service, and financial performance. Bring your leadership skills and passion for specialty coffee to create a welcoming and thriving coffee shop environment.',
      location: 'Barcelona, Spain',
      employerId: intelligentsiaCoffee.id,
      money: '30.000€',
      posted: true,
    },
    {
      title: 'Assistant Manager',
      categories: 'Assistant Manager',
      description:
        'We are looking for an Assistant Manager to support our coffee shop operations. As an Assistant Manager, you will assist the Manager in daily tasks, including staff supervision, inventory management, and customer service. This role provides an excellent opportunity to develop your leadership skills in the specialty coffee industry.',
      location: 'New York, USA',
      employerId: blueBottle.id,
      money: '30.000€',
      posted: true,
    },
    {
      title: 'Barista',
      categories: 'Barista',
      description:
        'Join our team of passionate baristas. We are looking for skilled individuals who can create exceptional coffee experiences for our customers. As a Barista, you will be responsible for brewing and serving coffee, providing excellent customer service, and maintaining a clean and welcoming environment. Join us and be part of a team that values quality, craftsmanship, and the art of coffee.',
      location: 'Madrid, Spain',
      employerId: createdEmployers[4].id,
      money: '30.000€',
      posted: true,
    },
    {
      title: 'Shift Supervisor',
      categories: 'Supervisor',
      description:
        'Support daily coffee bar operations, mentor junior baristas, and ensure an excellent guest experience through peak periods and smooth closing routines.',
      location: 'Lisbon, Portugal',
      employerId: createdEmployers[5].id,
      money: '32.000€',
      posted: true,
    },
    {
      title: 'Cafe Manager',
      categories: 'Manager',
      description:
        'Own shop performance, lead hiring and training, manage inventory and suppliers, and uphold brand standards while creating a welcoming community space.',
      location: 'New York, USA',
      employerId: createdEmployers[0].id,
      money: '40.000€',
      posted: true,
    },
    {
      title: 'Coffee Trainer',
      categories: 'Trainer',
      description:
        'Design and deliver training programs covering espresso fundamentals, milk texturing, brew methods, and sensory. Coach teams to elevate coffee quality.',
      location: 'Berlin, Germany',
      employerId: createdEmployers[1].id,
      money: '35.000€',
      posted: true,
    },
    {
      title: 'Latte Artist',
      categories: 'Barista',
      description:
        'Craft beautiful latte art and champion beverage presentation. Share techniques with the team and collaborate on seasonal drink development.',
      location: 'Barcelona, Spain',
      employerId: createdEmployers[6].id,
      money: '31.000€',
      posted: true,
    },
    {
      title: 'Coffee Equipment Technician',
      categories: 'Technician',
      description:
        'Maintain and repair espresso machines, grinders, and brew gear. Perform preventative maintenance schedules and on-site service calls.',
      location: 'London, United Kingdom',
      employerId: createdEmployers[2].id,
      money: '38.000€',
      posted: true,
    },
    {
      title: 'Green Coffee Buyer Assistant',
      categories: 'Supply Chain',
      description:
        'Assist with sourcing programs, cupping sessions, and logistics coordination. Help document quality data and maintain supplier relationships.',
      location: 'Berlin, Germany',
      employerId: createdEmployers[3].id,
      money: '36.000€',
      posted: true,
    },
    {
      title: 'E-commerce Coordinator',
      categories: 'Marketing',
      description:
        'Manage online product listings, coordinate promotions, and work with fulfillment to ensure timely, accurate orders for our subscribers.',
      location: 'Remote',
      employerId: createdEmployers[8].id,
      money: '33.000€',
      posted: true,
    },
    {
      title: 'Roastery Production Assistant',
      categories: 'Production',
      description:
        'Support roasting and packaging operations, manage green inventory rotation, and help maintain a clean and safe production environment.',
      location: 'Madrid, Spain',
      employerId: createdEmployers[4].id,
      money: '30.000€',
      posted: true,
    },
    {
      title: 'Customer Support Specialist',
      categories: 'Support',
      description:
        'Provide timely, friendly support to retail and wholesale customers via email and chat. Troubleshoot orders, subscriptions, and equipment questions.',
      location: 'Remote',
      employerId: createdEmployers[7].id,
      money: '29.000€',
      posted: true,
    },
    {
      title: 'Wholesale Account Manager',
      categories: 'Sales',
      description:
        'Grow and support wholesale partners, coordinate training and launches, and ensure quality at partner cafes through regular visits.',
      location: 'London, United Kingdom',
      employerId: createdEmployers[2].id,
      money: '42.000€',
      posted: true,
    },
  ];

  for (const jobData of jobsData) {
    await prisma.job.create({
      data: jobData,
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const createdEmployers = [
    {
        username: "blueBottle",
        email: "info@bluebottlecoffee.com",
        password: "bluebottle123",
        category: "employer"
    },
    {
        username: "intelligentsiaCoffee",
        email: "info@intelligentsiacoffee.com",
        password: "intelligentsia123",
        category: "employer"
    },
    {
        username: "laMarzocco",
        email: "info@lamarzocco.com",
        password: "lamarzocco123",
        category: "employer"
    },
    {
        username: "theBarn",
        email: "info@thebarn.de",
        password: "thebarn123",
        category: "employer"
    },
    {
        username: "fiveElephant",
        email: "info@fiveelephant.com",
        password: "fiveelephant123",
        category: "employer"
    },
    {
        username: "squareMileCoffeeRoasters",
        email: "info@squaremilecoffee.com",
        password: "squaremile123",
        category: "employer"
    },
    {
        username: "monmouthCoffeeCompany",
        email: "info@monmouthcoffee.co.uk",
        password: "monmouth123",
        category: "employer"
    },
    {
        username: "workshopCoffee",
        email: "info@workshopcoffee.com",
        password: "workshop123",
        category: "employer"
    },
    {
        username: "caravanCoffeeRoasters",
        email: "info@caravancoffeeroasters.co.uk",
        password: "caravan123",
        category: "employer"
    }
]

export const dummyJobs = [
    {
        title: "Barista",
        categories: "Barista",
        description:
            "Join our team of passionate baristas. We are looking for skilled individuals who can create exceptional coffee experiences for our customers. As a Barista, you will be responsible for brewing and serving coffee, providing excellent customer service, and maintaining a clean and welcoming environment. Join us and be part of a team that values quality, craftsmanship, and the art of coffee.",
        location: "Madrid, Spain",
        employerId: createdEmployers[4].id,
        money: "30.000€",
        posted: true
    },
    {
        title: "Head Barista",
        categories: "Head Barista",
        description:
            "We are seeking an experienced and talented Head Barista to lead our coffee team. As a Head Barista, you will be responsible for supervising the baristas, training new staff, creating new coffee recipes, and ensuring the highest quality of coffee preparation. Join us and showcase your expertise in the coffee industry while working in a dynamic and fast-paced environment.",
        location: "Berlin, Germany",
        employerId: createdEmployers[2].id,
        money: "30.000€",
        posted: true
    },
    {
        title: "Roaster",
        categories: "Roaster",
        description:
            "Become part of our roasting team as a Roaster. In this role, you will work closely with our green coffee sourcing team to select and roast the finest coffee beans. You will be responsible for monitoring and controlling the roasting process, ensuring consistent quality and flavor profiles. Join us and contribute to our commitment to providing exceptional coffee experiences through meticulous roasting techniques.",
        location: "London, United Kingdom",
        employerId: createdEmployers[3].id,
        money: "30.000€",
        posted: true
    },
    {
        title: "Head Roaster",
        categories: "Head Roaster",
        description:
            "We are seeking a skilled and experienced Head Roaster to lead our roasting operations. As a Head Roaster, you will oversee the entire roasting process, manage the roasting team, develop roast profiles, and ensure the highest level of quality and consistency. Join us and be part of a company dedicated to showcasing the artistry and complexity of specialty coffee through expert roasting techniques.",
        location: "Madrid, Spain",
        employerId: createdEmployers[4].id,
        money: "30.000€",
        posted: true
    },
    {
        title: "Manager",
        categories: "Manager",
        description:
            "Join our team as a Manager and lead our coffee shop to success. As a Manager, you will oversee all aspects of the operations, including staff management, inventory control, customer service, and financial performance. Bring your leadership skills and passion for specialty coffee to create a welcoming and thriving coffee shop environment.",
        location: "Barcelona, Spain",
        employerId: createdEmployers[3].id,
        money: "30.000€",
        posted: true
    },
    {
        title: "Assistant Manager",
        categories: "Assistant Manager",
        description:
            "We are looking for an Assistant Manager to support our coffee shop operations. As an Assistant Manager, you will assist the Manager in daily tasks, including staff supervision, inventory management, and customer service. This role provides an excellent opportunity to develop your leadership skills in the specialty coffee industry.",
        location: "New York, USA",
        employerId: createdEmployers[5].id,
        money: "30.000€",
        posted: true
    },
    {
        title: "Barista",
        categories: "Barista",
        description:
            "Join our team of passionate baristas. We are looking for skilled individuals who can create exceptional coffee experiences for our customers. As a Barista, you will be responsible for brewing and serving coffee, providing excellent customer service, and maintaining a clean and welcoming environment. Join us and be part of a team that values quality, craftsmanship, and the art of coffee.",
        location: "Madrid, Spain",
        employerId: createdEmployers[4].id,
        money: "30.000€",
        posted: true
    }
]

export default dummyJobs

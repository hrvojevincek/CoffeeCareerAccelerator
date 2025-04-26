import moment from "moment"

const createdEmployers = [
  {
    id: 1,
    name: "Blue Bottle Coffee"
  },
  {
    id: 2,
    name: "Intelligentsia Coffee"
  },
  {
    id: 3,
    name: "La Marzocco"
  },
  {
    id: 4,
    name: "The Barn"
  },
  {
    id: 5,
    name: "Five Elephant"
  },
  {
    id: 6,
    name: "Square Mile Coffee Roasters"
  },
  {
    id: 7,
    name: "Monmouth Coffee Company"
  },
  {
    id: 8,
    name: "Workshop Coffee"
  },
  {
    id: 9,
    name: "Caravan Coffee Roasters"
  }
]

const dummyJobs = [
  {
    id: 1,
    title: "Barista",
    description: "Join our team of passionate baristas...",
    location: "Madrid, Spain",
    employer: {
      id: 5,
      name: "Five Elephant"
    },
    createdAt: moment().subtract(10, "days").format(),
    updatedAt: moment().subtract(2, "days").format(),
    posted: true
  },
  {
    id: 2,
    title: "Head Barista",
    description: "We are seeking an experienced and talented Head Barista...",
    location: "Berlin, Germany",
    employer: {
      id: 2,
      name: "Intelligentsia Coffee"
    },
    createdAt: moment().subtract(15, "days").format(),
    updatedAt: moment().subtract(5, "days").format(),
    posted: true
  },
  {
    id: 3,
    title: "Roaster",
    description: "Become part of our roasting team as a Roaster...",
    location: "London, United Kingdom",
    employer: {
      id: 3,
      name: "La Marzocco"
    },
    createdAt: moment().subtract(20, "days").format(),
    updatedAt: moment().subtract(7, "days").format(),
    posted: true
  },
  {
    id: 4,
    title: "Head Roaster",
    description: "We are seeking a skilled and experienced Head Roaster...",
    location: "Madrid, Spain",
    employer: {
      id: 4,
      name: "The Barn"
    },
    createdAt: moment().subtract(25, "days").format(),
    updatedAt: moment().subtract(10, "days").format(),
    posted: true
  },
  {
    id: 5,
    title: "Manager",
    description: "Join our team as a Manager and lead our coffee shop...",
    location: "Barcelona, Spain",
    employer: {
      id: 6,
      name: "Square Mile Coffee Roasters"
    },
    createdAt: moment().subtract(30, "days").format(),
    updatedAt: moment().subtract(15, "days").format(),
    posted: true
  },
  {
    id: 6,
    title: "Assistant Manager",
    description: "We are looking for an Assistant Manager to support our coffee shop operations...",
    location: "New York, USA",
    employer: {
      id: 7,
      name: "Monmouth Coffee Company"
    },
    createdAt: moment().subtract(35, "days").format(),
    updatedAt: moment().subtract(20, "days").format(),
    posted: true
  },
  {
    id: 7,
    title: "Barista",
    description: "Join our team of passionate baristas...",
    location: "Madrid, Spain",
    employer: {
      id: 9,
      name: "Caravan Coffee Roasters"
    },
    createdAt: moment().subtract(40, "days").format(),
    updatedAt: moment().subtract(25, "days").format(),
    posted: true
  }
]

export default dummyJobs

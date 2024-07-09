const dummyJob = {
    id: 1,
    title: "Barista",
    description:
        "Join our team of passionate baristas. We are looking for skilled individuals who can create exceptional coffee experiences for our customers. As a Barista, you will be responsible for brewing and serving coffee, providing excellent customer service, and maintaining a clean and welcoming environment. Join us and be part of a team that values quality, craftsmanship, and the art of coffee.",
    location: "Berlin, Germany",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    employerId: 1,
    posted: true,
    employer: {
        name: "La Marzocco"
    }
}

export default dummyJob

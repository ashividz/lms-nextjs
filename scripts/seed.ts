const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

const seed = async () => {
  try {
    await database.categories.createMany({
      data: [
        { name: "Vedique Courses" },
        { name: "SVT Courses" },
        { name: "Online Courses" },
        { name: "Ayurvedic Courses" },
        { name: "Other Courses" },
      ],
    });
    console.log("successfully seeded categories");
  } catch (error) {
    console.log("Error while seeding categories: ", error);
  } finally {
    await database.$disconnect();
  }
};

seed();

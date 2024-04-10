const { PrismaClient } = require("@prisma/client");
const fs = require("fs/promises");

const countrySeedData = require("../seedData/countrySeedData.json");
const stateSeedData = require("../seedData/stateSeedData.json");
const citySeedData = require("../seedData/citySeedData.json");

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

const faqSeed = async () => {
  try {
    await database.faqs.createMany({
      data: [
        {
          title:
            "Will I be able to manage nutrition for my family post doing this course?",
          description:
            "Yes you will be able to plan meals for your family as per the body type and manage complete nutrition for the family. It also covers nutrition for a few lifestyle related issues.",
          position: 1,
          isPublished: true,
          courseId: "7e597f2a-6bda-4e21-a0fc-6820ebe6acb2",
        },
        {
          title: "How will it help in my weight loss and various diseases?",
          description:
            "Yes it will surely help to manage and maintain normal BMI as you will be learning about the reason for your over/under weight and diseases. Prakriti plays an informative role in understanding the characteristics of a person or family, it also plays an important role in preventive, diagnosis and treatment of a disease. Getting to know about the Prakriti of one's family can help get rid of the aggravated Dosha which could be in long run prove to be the root cause of health issues.",
          position: 2,
          isPublished: true,
          courseId: "7e597f2a-6bda-4e21-a0fc-6820ebe6acb2",
        },
        {
          title: "Will I be able to analyze my prakriti and eat accordingly ?",
          description:
            "Yes you will know about different traits of tridoshas and questions to analyse the prakriti of a person.",
          position: 3,
          isPublished: true,
          courseId: "7e597f2a-6bda-4e21-a0fc-6820ebe6acb2",
        },
      ],
    });
    console.log("successfully seeded faqs");
  } catch (error) {
    console.log("Error while seeding faqs: ", error);
  } finally {
    await database.$disconnect();
  }
};

//seed();
//faqSeed();

async function generateCountrySeedData() {
  try {
    // Fetch countries data from your database using Prisma
    const countries = await database.country.findMany();

    // Format the data as per your requirement
    const countrySeedData = countries.map((country) => ({
      name: country.name,
      countryCode: country.countryCode,
      capital: country.capital || null,
      region: country.region || null,
      flag: country.flag || null,
      currency: country.currency || null,
      phoneCode: country.phoneCode || null,
    }));

    // Write the seed data to a JSON file
    await fs.writeFile(
      "seedData/countrySeedData.json",
      JSON.stringify(countrySeedData, null, 2)
    );
    console.log("Country seed data generated successfully.");
  } catch (error) {
    console.error("Error generating country seed data:", error);
  } finally {
    await database.$disconnect();
  }
}

async function generateStateSeedData() {
  try {
    // Fetch states data from your database using Prisma
    const states = await database.state.findMany();

    // Format the data as per your requirement
    const stateSeedData = states.map((state) => ({
      name: state.name,
      stateCode: state.stateCode,
      countryId: state.countryId,
    }));

    // Write the seed data to a JSON file
    await fs.writeFile(
      "seedData/stateSeedData.json",
      JSON.stringify(stateSeedData, null, 2)
    );
    console.log("State seed data generated successfully.");
  } catch (error) {
    console.error("Error generating state seed data:", error);
  } finally {
    await database.$disconnect();
  }
}

async function generateCitySeedData() {
  try {
    // Fetch cities data from your database using Prisma
    const cities = await database.city.findMany();

    // Format the data as per your requirement
    const citySeedData = cities.map((city) => ({
      name: city.name,
      stateId: city.stateId, // Assuming you have a stateId field in the city table
    }));

    // Write the seed data to a JSON file
    await fs.writeFile(
      "seedData/citySeedData.json",
      JSON.stringify(citySeedData, null, 2)
    );
    console.log("City seed data generated successfully.");
  } catch (error) {
    console.error("Error generating city seed data:", error);
  } finally {
    await database.$disconnect();
  }
}

async function seedDatabase() {
  try {
    await database.Country_Test.createMany({
      data: countrySeedData,
    });

    await database.State_Test.createMany({
      data: stateSeedData,
    });

    await database.City_Test.createMany({
      data: citySeedData,
    });

    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await database.$disconnect();
  }
}

async function main() {
  await generateCountrySeedData();
  await generateStateSeedData();
  await generateCitySeedData();
  await seedDatabase();
}
seedDatabase();
main();

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
faqSeed();
seed();

const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fetchMockData = async () => {
  const response = await axios.get('https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats');
  return response.data;
};

const populateDatabase = async () => {
  const retreats = await fetchMockData();
  for (const retreat of retreats) {
    await prisma.retreat.create({
      data: {
        title: retreat.title,
        description: retreat.description,
        location: retreat.location,
        type: retreat.type,
        condition: retreat.condition,
        image: retreat.image,
        tag: retreat.tag,
        price: retreat.price,
        date: retreat.date,
        duration: retreat.duration
      }
    });
  }
};

populateDatabase()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

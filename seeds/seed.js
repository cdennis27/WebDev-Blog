const sequelize = require('../config/connection');
const { User, Comment, Message } = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');
const messageData = require('./messageData.json');

const seedDatabase = async () => {

  
  await sequelize.sync({ force: true });

  
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log(users);
  for (const comment of commentData) {
    await Comment.create({
      ...comment,

    });
  }

for (const message of messageData) {
    await Message.create({
      ...message,
      
      });
  }

  process.exit(0);
};

seedDatabase();

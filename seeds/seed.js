const sequelize = require('../config/connection');
const { Posts, Comments, Users } = require('../models/index');

const postsData = require('./posts.json');
const commentsData = require('./comments.json');
const usersData = require('./users.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Posts.bulkCreate(postsData);

  await Comments.bulkCreate(commentsData);

  await Users.bulkCreate(usersData, {
    individualHooks: true,
    returning: true
  });

  console.log("Database Seeded");

  process.exit(0);
};

seedDatabase();
const sequelize = require('../config/connection');
const { Posts, Comments } = require('../models/index');

const postsData = require('./posts.json');
const commentsData = require('./comments.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Posts.bulkCreate(postsData);

  await Comments.bulkCreate(commentsData);

  console.log("Database Seeded");

  process.exit(0);
};

seedDatabase();
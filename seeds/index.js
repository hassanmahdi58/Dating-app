require("dotenv").config();

// Import seed data from match and user files
const seedMatches = require("./seedMatches");
const seedUsers = require("./seedUserData");

const sequelize = require("../config/connection");

// Will seed data about user and their matches to the database
const seedAll = async () => {
  await sequelize.sync({ force: true });

  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  await seedMatches();
  console.log("\n----- MATCHES SEEDED -----\n");
  
  process.exit(0);
};

seedAll();

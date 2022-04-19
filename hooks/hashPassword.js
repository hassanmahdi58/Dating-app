// Use bcrypt
const bcrypt = require("bcrypt");

//Will take the password and encrypt its contents
const hashPassword = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;
  return data;
};

module.exports = hashPassword;

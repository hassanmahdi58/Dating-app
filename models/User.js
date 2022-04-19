const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");

// Hash password
const bcrypt = require("bcrypt");
const hashPassword = require("../hooks/hashPassword");

// Information about the user and their preferences
const SQLSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { isNumeric: true },
  },

  img: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: { isURL: true },
  },

  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  gender: {
    type: DataTypes.ENUM({
      values: ["Male", "Female", "Non-Binary"],
    }),
    allowNull: false,
    defaultValue: "Male",
  },

  sexuality: {
    type: DataTypes.ENUM({
      values: ["Straight", "Bisexual", "Gay", "Non-Binary"],
    }),
    allowNull: false,
    defaultValue: "Straight",
  },

  // About

  about: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  interests: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Appearance

  height: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
    },
  },

  build: {
    type: DataTypes.ENUM({
      values: ["Slim", "Athletic", "Medium", "Curvy", "Large"],
    }),
    allowNull: false,
    defaultValue: "Slim",
  },

  seriousness: {
    type: DataTypes.ENUM({
      values: ["Casual", "Dating", "Relationship", "Friendship"],
    }),
    allowNull: false,
    defaultValue: "Casual",
  },
};

const options = {
  sequelize: connection,
  modelName: "user",
  freezeTableName: true,
  timestamps: true,
  underscored: false,
  hooks: {
    beforeCreate: hashPassword,
  },
};

class User extends Model {
  async checkPassword(userPassword) {
    const isValid = await bcrypt.compare(userPassword, this.password);
    return isValid;
  }
}

User.init(SQLSchema, options);

module.exports = User;

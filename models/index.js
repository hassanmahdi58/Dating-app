const Match = require("./Match");
const User = require("./User");

// Users receive and send match requests
Match.belongsTo(User, {
  foreignKey: "match_request_from",
  as: "fromUser",
});

Match.belongsTo(User, {
  foreignKey: "match_request_to",
  as: "toUser",
});

// Each user will have a list of matches 
User.hasMany(Match, {
  foreignKey: "match_request_from",
});

User.hasMany(Match, {
  foreignKey: "match_request_to",
});

module.exports = {
  Match,
  User,
};

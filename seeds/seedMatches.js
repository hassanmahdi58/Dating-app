const Match = require("../models/Match");

// If the 
const matchData = [
  {
    match_request_from: 2,
    match_request_to: 1,
  },

  {
    match_request_from: 1,
    match_request_to: 2,
  },
];

const seedMatches = () => Match.bulkCreate(matchData);

module.exports = seedMatches;

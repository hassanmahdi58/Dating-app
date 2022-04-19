// Use moment to determine the time of match success
const moment = require("moment");

// Import Match Model
const { Match } = require("../../models");

// Function to verify whether the user has any matches
const CheckandMakeAMatch = async (req, res) => {
  try {
    const { selectedUserId } = req.body;
    const { id: loggedInUser } = req.session.user;
    const match = await Match.findOne({
      where: {
        match_request_to: loggedInUser,
        match_request_from: selectedUserId,
      },
    });

    if (!match) {
      await Match.create({
        match_request_from: loggedInUser,
        match_request_to: selectedUserId,
      });

      return res.json({ success: true, data: { status: "MATCH CREATED" } });

    } else {
      await Match.update(
        { matched: true, accepted_date: moment() },
        {where: { id: match.get("id"),},
        }
      );

      return res.json({ success: true, data: { status: "PROFILE MATCHED" } });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "ERROR" });
  }
};

// Function to delete a match
const removeMatch = async (req, res) => {
  try {
    // Deletes the match data from id
    const matchData = await Match.destroy({ where: { id: req.params.id } });
    if (!matchData) {
      res.status(404).json({ message: "ERROR" });
      return;
    }
    res.json({ success: true, message: "Deleted Match" });
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { CheckandMakeAMatch, removeMatch };

const { User } = require("../../models");

// Should the user want to change their profile, update the data entered
const changeProfile = async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return res.json({
      success: true,
      userData,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update user" });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    const user = userData.get({ plain: true });
    if (user) {
      return res.json({
        success: true,
        user,
      });
    } else {
      return res.status(401).json({
        success: false,
        error: "This user does not exist",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to get user's data" });
  }
};

module.exports = { changeProfile, getUserProfile };

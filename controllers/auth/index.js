// This will validate whether the user has entered correct information and all the fields
const {
    getValidPayload,
    FieldsFilled,
  } = require("../../helpers");
  const User = require("../../models/User");
  
// LOGIN
// When a user enters their login details, they will be compared with the saved data on the system
  const login = async (req, res) => {
    try {
      const payload = getValidPayload(
        ["email", "password"],
        req.body
      );
  
      if (Object.keys(payload).length !== 2) {
        console.log("[ERROR]: Failed to login | Invalid fields");
        return res.status(400).json({
          success: false,
          error: "Login failed",
        });
      }
  
    //If the email is on the system, the login should be successful (providing the password is correct)
      const user = await User.findOne({ where: { email: payload.email } });
  
    // If the data does not exist on the system, then login will be denied
      if (!user) {
        console.log("[ERROR]: Failed to login | User does not exist");
        return res.status(404).json({
          success: false,
          error: "Failed to login",
        });
      }
      
    // This will validate whether the password is the same as saved on the system
      const validPassword = await user.checkPassword(payload.password);
  
    //If the password is invalid, throw an error
      if (!validPassword) {
        console.log("[ERROR]: Failed to login | Invalid password");
        return res.status(401).json({
          success: false,
          error: "Failed to login",
        });
      }
  
    // Providing the user has passed the previous pw and email tests, they will be given a login session
      const userInSession = {
        id: user.get("id"),
        email: user.get("email"),
        name: user.get("name"),
       
      };
  
        req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user = userInSession;
  
        return res.json({ success: true, data: "Login successful" });
      });

    } catch (error) {
      console.log(`[ERROR]: Failed to login | ${error.message}`);
      return res.status(500).json({ success: false, error: "Failed to login" });
    }
  };


//SIGN UP
// When a user signs up, the fields must be all filled out and meet the criteria

const signup = async (req, res) => {
  try {
    const payload = getValidPayload(
      [
        "name",
        "email",
        "password",
        "confirmPassword",
        "age",
        "location",
        "gender",
        "sexuality",
        "about",
        "interests",
        "height",
        "build",
        "seriousness",
        "img",
      ],
      req.body
    );

    if (
      !FieldsFilled(
        [
          "name",
          "email",
          "password",
          "age",
          "location",
          "gender",
          "sexuality",
          "about",
          "interests",
          "height",
          "build",
          "seriousness",
          "img",
        ],
        payload
      )
    ) {
      console.log("[ERROR]: Failed to sign up | Invalid fields");
      return res.status(400).json({
        success: false,
        error: "Failed to sign up",
      });
    }

    await User.create(payload);

    return res.json({ success: true, data: "Successfully Created a user" });
  } catch (error) {
    console.log(`[ERROR]: Failed to sign up | ${error.message}`);
    return res.status(500).json({ success: false, error: "Failed to sign up" });
  }
};
      
    
// If the user wishes to logout, the session will be destroyed
  const logout = (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        return res.json({ success: true, data: "Successfully logged out" });
      });

    } else {
      return res.status(404).json({
        success: false,
        error: "You are not logged in",
      });
    }
  };
  
  module.exports = { login, signup, logout };
  
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const User = require("../schemas/userSchema");

const registrationService = async ({ email, password, name }) => {
  const user = await User.findOne({ email });

  if (user) {
    return;
  }

  const newUser = new User({ email, password, name });
  await newUser.save();

  return await User.findOne({ email }, { password: 0, __v: 0 });
};

const loginService = async (email, password) => {
  const resUser = await User.findOne({ email });
  if (resUser && (await bcrypt.compare(password, resUser.password))) {
    const token = jwt.sign(
      {
        _id: resUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "14d" }
    );
    await User.findByIdAndUpdate(
      { _id: resUser._id },
      { loggedIn: true },
      { new: true }
    );
    const user = await User.findOne(
      { _id: resUser._id },
      { password: 0, __v: 0 }
    );
    return { user, token };
  }
};

const logoutService = async (_id) => {
  return await User.findOneAndUpdate(
    { _id, loggedIn: true },
    { loggedIn: false },
    { new: true }
  );
};

module.exports = {
  registrationService,
  loginService,
  logoutService,
};

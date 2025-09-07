const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//User Register
async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  // Check if the user already exists
  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: 'User Already Exists',
    });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user
  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // optional: set expiration
  );

  // Set token in cookie
  res.cookie('token', token, { httpOnly: true });

  // Respond with success
  res.status(201).json({
    message: 'User Registered Successfully',
    user: {
      fullName: user.fullName,
      _id: user._id,
      email: user.email,
    },
  });
}

// User Login
async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    res.status(400).json({
      message: 'Invalid email or password',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: 'Invalid email or password',
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie('token', token);

  res.status(200).json({
    message: 'User Registered Successfully',
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

// User Logout

function logoutUser(req, res) {
  res.clearCookie('token');
  res.status(200).json({
    message: 'User Logged out successfully',
  });
}

// Food Partner Register

async function registerFoodPartner(req, res) {
  const { name, email, password } = req.body;
  const isAccountAlreadyExist = await foodPartnerModel.findOne({
    email,
  });

  if (isAccountAlreadyExist) {
    return res.status(400).json({
      message: 'Food Partner Account Already Exists',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie('token', token);

  res.status(201).json({
    message: ' Food Partner Registered Successfully',
    foodPartner: {
      _is: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
}

// Food Partner Login

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({
    email,
  });

  if (!foodPartner) {
    return res.status(400).json({
      message: 'Invalid email or password',
    });
  }
  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: 'Invalid email or Password',
    });
  }

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie('token', token);

  res.status(200).json({
    message: 'Food Partner Logged in Successfully',
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
}

// Food Partner Logout
function logoutFoodPartner(req, res) {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Food partner logged out Successfully',
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};

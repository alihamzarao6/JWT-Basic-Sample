// check user data e.g. username, password in post(login) request (req.body)
// if data exist then create new JWT otherwise send an error response to frontend.
// after creating jwt send it back to front-end because frontend needed it to make other requests or to make request to secret or authorized resources.
// Then we'll setup authentication so only the request with JWT can access the dasboard

const jwt = require("jsonwebtoken");
const BadRequestError = require("../errors/bad-request");

const login = async (req, res) => {
  const { username, password } = req.body;
  // 1- mongoose validation in case of DB
  // 2- Joi(a 3rd party module which provide an extra layer of validation)
  // 3- check in the controller(now doing here)

  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  //just for demo, normally provided by DB!!!!
  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value(secret Key)!!!!!!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  // console.log(req.headers);
  const luckyNumber = Math.floor(Math.random() * 100);
  
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};

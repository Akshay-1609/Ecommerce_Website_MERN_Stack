const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendtoken = require("../utils/jwttoken");


//Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profilepicUrl",
    },
  });

  sendtoken(user,201,res);
});

//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // Checking if user had password and body both have
  if (!email || !password) {
    return next(new errorHandler("Please Enter Email & Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new errorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new errorHandler("Invalid email or password", 401));
  }

sendtoken(user,200,res);
});

// Logout User 
exports.logout = catchAsyncError(async(req,res,next)=>{
   
res.cookie("token",null,{
  expires:new Date(Date.now()),
   httpOnly:true
})
  res.status(200).json({
    success:true,
    message:"Logged Out"
  })

});

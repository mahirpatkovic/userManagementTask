const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const catchAsync = require('../../utils/catchAsync');
const validator = require('validator');

module.exports = catchAsync(async (req, res, next) => {
    let { firstName, lastName, email, password, username } = req.body;

    if (!firstName || !lastName || !email || !password || !username)
        return res.status(400).json({ message: 'Please enter all the fields' });
    else if (password.length < 6)
        return res.status(400).json({
            message: 'Password must contain at least 6 characters',
        });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
        return res.status(400).json({
            status: 'error',
            message: 'Account with this email already exists',
        });
    else if (!validator.isEmail(email)) {
        return res.status(400).json({
            message: 'Please enter a valid email',
        });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        username,
    });

    await newUser.save({ validateBeforeSave: false });

    return res.status(200).json({
        status: 'success',
        message: 'User created successfully',
        newUser,
    });
});

const User = require('../../models/userModel');
const catchAsync = require('../../utils/catchAsync');

module.exports = catchAsync(async (req, res, next) => {
    const { id, firstName, lastName, email, username, status } = req.body;
    const user = await User.findById(id);
    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: 'User edit problem',
        });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.username = username;
    user.status = status;

    await user.save();

    return res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        user,
    });
});

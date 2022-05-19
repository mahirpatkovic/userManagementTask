const User = require('../../models/userModel');
const Permission = require('../../models/permissionModel');
const catchAsync = require('../../utils/catchAsync');

module.exports = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    await Permission.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
        status: 'success',
        message: 'User removed successfully',
    });
});

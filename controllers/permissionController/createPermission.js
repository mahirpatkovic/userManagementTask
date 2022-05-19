const Permission = require('../../models/permissionModel');
const catchAsync = require('../../utils/catchAsync');

module.exports = catchAsync(async (req, res, next) => {
    let { code, description, user } = req.body;

    if (!code || !description)
        return res.status(400).json({ message: 'Please enter all the fields' });

    const newPermission = new Permission({
        code,
        description,
        user,
    });

    await newPermission.save({ validateBeforeSave: false });

    return res.status(200).json({
        status: 'success',
        message: 'Permission created successfully',
        newPermission,
    });
});

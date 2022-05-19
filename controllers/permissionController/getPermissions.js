const Permission = require('../../models/permissionModel');
const catchAsync = require('../../utils/catchAsync');

exports.getAllPermissions = catchAsync(async (req, res, next) => {
    const { page, perPage } = req.query;
    const allPermissions = await Permission.find()
        .populate('user')
        .limit(perPage)
        .skip(page > 0 ? (page - 1) * perPage : 0);

    if (!allPermissions) {
        return res.status(400).json({
            status: 'error',
            message: 'Cannot display permissions list',
        });
    }

    const totalPermissions = await Permission.count();

    return res.status(200).json({
        status: 'success',
        allPermissions,
        totalPermissions,
    });
});

exports.getUsersPermissions = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const permissions = await Permission.find({ user: userId });

    if (!permissions) {
        return res.status(400).json({
            status: 'error',
            message: 'Problem getting permissions',
        });
    }

    return res.status(200).json({
        status: 'success',
        permissions,
    });
});

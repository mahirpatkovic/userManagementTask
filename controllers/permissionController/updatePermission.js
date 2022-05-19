const Permission = require('../../models/permissionModel');
const catchAsync = require('../../utils/catchAsync');

module.exports = catchAsync(async (req, res, next) => {
    const { id, code, description } = req.body;
    const permission = await Permission.findById(id);
    if (!permission) {
        return res.status(400).json({
            status: 'error',
            message: 'Permission edit problem',
        });
    }

    permission.code = code;
    permission.description = description;

    await permission.save();

    return res.status(200).json({
        status: 'success',
        message: 'Permission updated successfully',
        permission,
    });
});

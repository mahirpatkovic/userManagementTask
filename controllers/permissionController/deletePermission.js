const Permission = require('../../models/permissionModel');
const catchAsync = require('../../utils/catchAsync');

module.exports = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    await Permission.findByIdAndDelete(id);

    return res.status(200).json({
        status: 'success',
        message: 'Permission deleted successfully',
    });
});

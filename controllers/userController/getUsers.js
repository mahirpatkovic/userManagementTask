const User = require('../../models/userModel');
const catchAsync = require('../../utils/catchAsync');

exports.getUsers = catchAsync(async (req, res, next) => {
    const { page, perPage, sortValue, sortOrder, status } = req.query;
    const sortQuery = {};
    sortQuery[sortValue ? sortValue : 'createdAt'] = sortOrder
        ? sortOrder
        : 'asc';

    const statusQuery = status
        ? { status: status === 'active' ? true : false }
        : null;

    const users = await User.find(statusQuery)
        .limit(Number(perPage))
        .skip(Number(page * perPage))
        .sort(sortQuery);

    if (!users) {
        return res.status(400).json({
            status: 'error',
            message: 'Cannot display users list',
        });
    }
    const totalUsers = await User.count(statusQuery);

    return res.status(200).json({
        status: 'success',
        users,
        totalUsers,
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: 'Problem with loading user data or user does not exist',
        });
    }

    return res.status(200).json({
        status: 'success',
        user,
    });
});

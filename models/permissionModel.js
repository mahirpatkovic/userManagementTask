const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;

const { Schema, model } = require('mongoose');
const mongoosePaginateV2 = require('mongoose-paginate-v2');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        hide: true
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, 'rol is required'],
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }
});

userSchema.methods.toJSON = function() {
    const { __v, password, ...rest } = this.toObject(); // Conver model to Object
    return rest;
}

// Pagination configuration
userSchema.plugin(mongoosePaginateV2);

module.exports = model('User', userSchema);

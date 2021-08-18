const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const getUsers = async (req = request, res = response) => {
    // const {limit = 5, from = 1} = req.query;

    /* MONGOOSE PAGINATOR */

    const {limit = 15, page = 1} = req.query;
    const customLabels = {
        totalDocs: "totalUsers",
        docs: "Users"
    }

    const options = {page, limit, customLabels};

    await User.paginate({status: true}, options, (error, result) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.status(200).json({
            ok: true,
            result
        })
    });

    // const query = {status: true};
    //
    // const [total, users] = await Promise.all([
    //     User.count(query),
    //     User.find(query)
    //         .skip(Number(from))
    //         .limit(Number(limit))
    // ]);
    //
    // res.status(200).json({
    //     total, users
    // });

};

const updateUser = async (req, res) => {
    const {id} = req.params;
    const {_id, password, google, email, ...rest} = req.body;

    if (password) {
        // Encrypt the password
        const salt = bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    console.log('->', user);

    res.json(user);
};

const postUser = async (req = request, res = response) => {
    const {name, email, password, rol} = req.body;

    const user = new User({
        name,
        email,
        password,
        rol,
    });

    // Encrypt the password
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    // Save in database
    await user.save();

    delete user.password;

    res.status(201).json({
        user,
    });
};

const deleteUser = async (req, res) => {

    const { id } = req.params;

    // TODO: Physically delete user
    // const user = await User.findByIdAndDelete(id);

    // TODO: To maintain integrity we only deactivate the user
    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json(user);
};

const patchUser = (req, res) => {
    res.json({
        msg: 'patch API - controller',
    });
};

module.exports = {
    getUsers,
    updateUser,
    postUser,
    deleteUser,
    patchUser,
};

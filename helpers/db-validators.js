const Role = require('../models/role.model');
const User = require('../models/user.model');

const validateRole = async (rol = '') => {
  const existRol = await Role.findOne({ rol });
  if (!existRol) {
    throw new Error(`The role ${rol} is not registered in the DB`);
  }
};

const validateEmail = async (email = '') => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`The email ${email} already registered`);
  }
};

const existUserById = async (id = '') => {
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new Error(`There is no user with that id`);
  }
};

module.exports = {
  validateRole,
  validateEmail,
  existUserById
};

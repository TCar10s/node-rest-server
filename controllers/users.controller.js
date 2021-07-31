const { response } = require('express');

const getUsers = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'get API - controller',
  });
};

const updateUser = (req, res) => {
  res.json({
    ok: true,
    msg: 'put API - controller',
  });
};

const postUser = (req, res) => {
  res.status(201).json({
    ok: true,
    msg: 'post API - controller',
  });
};

const deletUser = (req, res) => {
  res.json({
    ok: true,
    msg: 'delete API - controller',
  });
};

const patchUser = (req, res) => {
  res.json({
    ok: true,
    msg: 'patch API - controller',
  });
};

module.exports = {
  getUsers,
  updateUser,
  postUser,
  deletUser,
  patchUser,
};

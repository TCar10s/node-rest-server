const { response, request } = require('express');

const getUsers = (req = request, res = response) => {
  const { q, name, apikey, page, limit } = req.query;

  res.json({
    msg: 'get API - controller',
    q,
    name,
    apikey,
    page,
    limit,
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;

  console.log(id);

  res.json({
    msg: 'put API - controller',
    id,
  });
};

const postUser = (req, res) => {
  const { name, lastname } = req.body;

  res.status(201).json({
    msg: 'post API - controller',
    name,
    lastname,
  });
};

const deletUser = (req, res) => {
  res.json({
    msg: 'delete API - controller',
  });
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
  deletUser,
  patchUser,
};

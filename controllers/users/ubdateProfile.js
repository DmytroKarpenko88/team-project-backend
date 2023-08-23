const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');
const path = require('path');

const updateProfile = async (req, res) => {
  const { _id } = req.user;
  const body = req.body;

  if (!body) {
    throw HttpError(400, 'missing field favorite');
  }

  const result = await User.findByIdAndUpdate(
    _id,
    { ...body, avatarURL: req.file.path },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  const { name, email, birthday, phone, city } = result;
  res.status(200).json({
    code: 200,
    data: {
      name,
      email,
      birthday,
      phone,
      city,
    },
  });
};

module.exports = updateProfile;
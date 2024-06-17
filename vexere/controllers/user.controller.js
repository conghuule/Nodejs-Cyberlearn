const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { name, email, password, numberPhone } = req.body;
  try {
    const avatarURL = gravatar.url(email, { protocol: "https", s: "100" });
    console.log(avatarURL);
    //tao ra mot chuoi ngau nhien
    const salt = bcrypt.genSaltSync(10);
    // ma hoa salt + password
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      numberPhone,
      avatar: avatarURL,
    });
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    const isAuth = bcrypt.compareSync(password, user.password);
    if (isAuth) {
      const token = jwt.sign(
        { email: user.email, type: user.type },
        "cong-huu-1709",
        { expiresIn: 60 * 60 }
      );
      res.status(200).send({ message: "Đăng nhập thành công!", token });
    } else {
      res.status(500).send({ message: "Mật khẩu sai!" });
    }
  } else {
    res.status(404).send({ message: "Không tìm thấy email!" });
  }
};

const uploadAvatar = async (req, res) => {
  const { file } = req;
  const urlImage = `http://localhost:3000/${file.path}`;
  const { user } = req;
  const userFound = await User.findOne({
    email: user.email,
  });
  userFound.avatar = urlImage;
  await userFound.save();
  res.send(userFound);
};

module.exports = {
  register,
  login,
  uploadAvatar,
};

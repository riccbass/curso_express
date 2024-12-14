//é o padrão de nomenclatura para helpers

import jwt from "jsonwebtoken";

const createUserToken = async (user, req, res) => {
  //create token
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    "juventue1913secret"
  );

  //return token
  res.status(200).json({
    message: "você está autenticado",
    token, //o token é o que garante a persistência
    userId: user._id,
  });
};

export default createUserToken;

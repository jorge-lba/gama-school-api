const authConfig = {
  privateKey: process.env.JWT_PRIVATE_KEY,
  publicKey: process.env.JWT_PUBLIC_KEY,
  expiresIn: process.env.JWT_EXPIRES_IN,
  algorithm: process.env.JWT_ALGORITHM,
};

export { authConfig };

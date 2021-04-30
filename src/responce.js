module.exports = response = (res, code, message, token) => {
    return res.send({
      code,
      message,
      token,
    });
  };

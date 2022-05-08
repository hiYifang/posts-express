const successHandle = (res, msg, data) => {
  res.status(200).json({
    "status": "success",
    "msg": msg,
    "data": data
  })
}

const errorHandle = (res, msg) => {
  res.status(400).json({
    "status": "fail",
    "msg": msg
  })
}

module.exports = { successHandle, errorHandle };

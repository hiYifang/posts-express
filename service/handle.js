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

const getHttpResponse = ({ success = true, data } = {}) => {
  const result = { status: success ? 'success' : 'fail' };
  if (data) result[success ? 'data' : 'msg'] = data;
  return result;
};

const getErrorMessage = ({ field, msg }) => {
  const result = { errors: {} };
  if (field) result.errors[field] = { msg };
  return result;
};

module.exports = { successHandle, errorHandle, getHttpResponse, getErrorMessage };

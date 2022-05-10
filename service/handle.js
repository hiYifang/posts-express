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

module.exports = { getHttpResponse, getErrorMessage };

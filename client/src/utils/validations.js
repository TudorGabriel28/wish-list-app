function nameValidation(value) {
  const regex = /^\s/;
  if (!value || regex.test(value)) {
    return 'This is required';
  }
  return true;
}

function emailValidation(value) {
  if (!value) {
    return 'This is required';
  }

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regex.test(String(value).toLowerCase())) {
    return 'Please enter a valid email address';
  }
  return true;
}

function passwordValidation(value) {
  if (!value) {
    return 'This is required';
  }

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;

  if (!regex.test(value)) {
    return 'Minimum 8 characters, one uppercase, one lowercase letter and one number';
  }

  return true;
}

function titleValidation(value) {
  const regex = /^\s/;
  if (!value || regex.test(value)) {
    return 'This is required';
  }
  return true;
}

function notEmptyValidation(value) {
  if (!value || value == '') {
    return 'This is required';
  }
  return true;
}

export {
  nameValidation,
  emailValidation,
  passwordValidation,
  titleValidation,
  notEmptyValidation
};

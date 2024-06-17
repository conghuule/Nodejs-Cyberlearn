function callBackFunction(errors, value) {
  if (errors) {
    console.log(errors);
    return new Error(errors);
  }

  console.log(value);
  return value;
}

callBackFunction({ message: "thieu tu khoa" }, "./public");

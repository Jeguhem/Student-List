const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/StudentDB", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connection succeeded");
  })
  .catch((err) => {
    console.error("connection failed", err);
  });

require("./student.model");

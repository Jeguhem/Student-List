const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Student = mongoose.model("student");

router.get("/", (req, res) => {
  res.render("student/addOrEdit", {
    viewTitle: "Insert student",
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});

function insertRecord(req, res) {
  var student = new Student();
  student.fullname = req.body.fullname;
  student.email = req.body.email;
  student.mobile = req.body.mobile;
  student.city = req.body.city;
  student
    .save()
    .then((doc) => {
      res.redirect("student/list");
    })
    .catch((err) => {
      console.log("Error during insert: " + err);
      // Handle the error, such as sending an error response
      res.status(500).send("Error during insert");
    });
}

// student.save((err, doc) => {
//   if (!err) {
//     res.redirect("student/list");
//   } else {
//     console.log("error during insert:" + err);
//   }
// })

// function updateRecord(req, res) {
//   Student.findOneAndUpdate(
//     { _id: req.body._id },
//     req.body,
//     { new: true },
//     (err, doc) => {
//       if (!err) {
//         res.redirect("student/list");
//       } else {
//         console.log("Error in updating user: " + err);
//       }
//     }
//   );
// }

// //using async await try
// router.post("/", async (req, res) => {
//   try {
//     let updatedStudent = await Student.findOneAndUpdate(
//       { _id: req.body._id },
//       req.body,
//       { new: true }
//     );
//     res.redirect("student/list");
//   } catch (err) {
//     console.log("Error in updating user: " + err);
//     // Handle the error, such as sending an error response
//     res.status(500).send("Error updating user");
//   }
// });

function updateRecord(req, res) {
  Student.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    .then((docs) => {
      res.redirect("student/list");
    })
    .catch((err) => {
      console.log("error during update" + err);
    });
}

// router.get("/list", (req, res) => {
//   Student.find((err, docs) => {
//     if (!err) {
//       res.render("student/list", {
//         list: docs,
//       });
//     } else {
//       console.log("ERROR!" + err);
//     }
//   });
// });

router.get("/list", (req, res) => {
  Student.find()
    .then((docs) => {
      res.render("Student/list", {
        list: docs,
      });
    })
    .catch((err) => {
      console.log("Error" + err);
    });
});

router.get("/:id", (req, res) => {
  Student.findById(req.params.id)
    .then((doc) => {
      res.render("student/addOrEdit", {
        viewTitle: "Update Student",
        student: doc,
      });
    })
    .catch((err) => {
      console.log("error updating student" + err);
    });
});

// router.get("/:id", (req, res) => {
//   Student.findById(req.params.id, (err, doc) => {
//     if (!err) {
//       res.render("student/addOrEdit", {
//         viewTitle: "Update Student",
//         student: doc,
//       });
//       console.log(doc);
//     }
//   });
// });

router.get("/delete/:id", (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then((doc) => {
      if (doc) {
        return Student.find({ _id: { $ne: doc._id } });
      } else {
        console.log("student not found");
        res.status(404).send("student not found");
      }
    })
    .then((data) => {
      res.render("student/list", { list: data });
    })
    .catch((err) => {
      console.log("error deleting student" + err);
      res.status(500).send("Error deleting student");
    });
});

// router.get("delete/:id", (req, res) => {
//   Student.findByIdAndRemove(req.params.id, (err, doc) => {
//     if (!err) {
//       res.redirect("student/list");
//     } else {
//       console.log("error in deletion" + err);
//     }
//   });
// });

module.exports = router;

// //after deleting the student you want to show the remaining students
// router.get("/delete/:id", (req, res) => {
//   Student.findByIdAndDelete(req.params.id)
//     .then((deletedStudent) => {
//       if (deletedStudent) {
//         // If a student was successfully deleted, fetch the updated list of students excluding the deleted one
//         return Student.find({ _id: { $ne: deletedStudent._id } }); // Fetch all students except the deleted one
//       } else {
//         console.log("Student not found");
//         res.status(404).send("Student not found");
//       }
//     })
//     .then((remainingStudents) => {
//       // Render the page with the updated list of students
//       res.render("student/list", { list: remainingStudents });
//     })
//     .catch((err) => {
//       console.log("Error deleting student: " + err);
//       res.status(500).send("Error deleting student");
//     });
// });

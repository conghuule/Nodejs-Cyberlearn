const express = require("express");
const router = express.Router();
const {
  getStudentList,
  getStudentById,
  createStudent,
  updatedStudent,
  deleteStudent,
} = require("../controllers/student.controller");
const { logFeature } = require("../middlewares/logger/log-feature");
const { checkEmpty } = require("../middlewares/validations/student.validation");
//read all students
router.get("/", logFeature, getStudentList);

//read a student by id
router.get("/:id", getStudentById);

//create a student
router.post("/", checkEmpty, createStudent);

//update a student
router.put("/:id", updatedStudent);

//delete a student
router.delete("/:id", deleteStudent);

module.exports = router;

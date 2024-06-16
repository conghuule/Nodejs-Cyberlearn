const {
  getStudents,
  getByIdS,
  createS,
  updateS,
  deleteS,
} = require("../services/student.services");

const getStudentList = async (req, res) => {
  const studentList = await getStudents();
  res.status(200).send(studentList);
};

const getStudentById = async (req, res) => {
  const { id } = req.params;
  const student = await getByIdS(id);
  if (student) {
    res.status(200).send(student);
  } else {
    res.status(404).send("Student not found");
  }
};

const createStudent = async (req, res) => {
  let student = req.body;
  student = {
    id: Math.random(),
    ...student,
  };
  await createS(student);
  res.status(201).send(student);
};

const updatedStudent = async (req, res) => {
  const { id } = req.params;
  const { fullName, age, numberClass } = req.body;
  const updatedStudent = await updateS(id, { fullName, age, numberClass });
  res.status(200).send(updatedStudent);
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const student = await deleteS(id);
  if (student) {
    res.status(200).send(student);
  } else {
    res.status(404).send("Student not found");
  }
};
module.exports = {
  getStudentList,
  getStudentById,
  createStudent,
  updatedStudent,
  deleteStudent,
};

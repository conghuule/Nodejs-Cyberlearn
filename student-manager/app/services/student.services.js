const { Student } = require("../models/index");

const getStudents = async () => {
  const allStudents = await Student.findAll();
  return allStudents;
};

const getByIdS = async (id) => {
  const student = await Student.findOne({
    where: {
      id,
    },
  });
  return student;
};

const createS = async (student) => {
  const newStudent = await Student.create(student);
  return newStudent;
};

const updateS = async (id, data) => {
  // const index = studentList.findIndex((student) => student.id === parseInt(id));
  // const oldStudent = studentList[index];
  // const updatedStudent = {
  //   ...oldStudent,
  //   fullName,
  //   age,
  //   numberClass,
  // };
  // studentList[index] = updatedStudent;
  // return updatedStudent;
  const updatedStudent = await Student.update(data, {
    where: {
      id,
    },
  });
  return updatedStudent;
};

const deleteS = async (id) => {
  // const index = studentList.findIndex((student) => student.id === parseInt(id));
  // if (index !== -1) {
  //   const student = studentList[index];
  //   studentList.splice(index, 1);
  //   return student;
  // }
  // return false;
  const deletedStudent = await Student.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getStudents,
  getByIdS,
  createS,
  updateS,
  deleteS,
};

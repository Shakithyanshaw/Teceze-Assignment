import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    employeeNo: {
      type: Number,
      required: true,
      unique: true,
    },

    employeeName: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    salary: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;

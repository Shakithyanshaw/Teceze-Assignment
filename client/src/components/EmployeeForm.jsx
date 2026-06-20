import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContent } from '../context/appContext';

const EmployeeForm = ({ editEmployee, setEditEmployee, closeForm }) => {
  const { backendUrl, getEmployees } = useContext(AppContent);

  const [employeeName, setEmployeeName] = useState('');
  const [designation, setDesignation] = useState('');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    if (editEmployee) {
      setEmployeeName(editEmployee.employeeName);
      setDesignation(editEmployee.designation);
      setSalary(editEmployee.salary);
    }
  }, [editEmployee]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let data;

      if (editEmployee) {
        const response = await axios.put(
          `${backendUrl}/api/employees/update/${editEmployee._id}`,
          {
            employeeName,
            designation,
            salary,
          },
        );

        data = response.data;
      } else {
        const response = await axios.post(
          backendUrl + '/api/employees/create',
          {
            employeeName,
            designation,
            salary,
          },
        );

        data = response.data;
      }

      if (data.success) {
        toast.success(editEmployee ? 'Employee Updated' : 'Employee Added');

        getEmployees();

        setEmployeeName('');
        setDesignation('');
        setSalary('');
        setEditEmployee(null);
        closeForm();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="bg-white p-5 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {editEmployee ? 'Update Employee' : 'Add Employee'}
      </h2>

      <input
        type="text"
        placeholder="Employee Name"
        value={employeeName}
        onChange={(e) => setEmployeeName(e.target.value)}
        className="border p-2 w-full mb-3"
        required
      />

      <input
        type="text"
        placeholder="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
        className="border p-2 w-full mb-3"
        required
      />

      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        className="border p-2 w-full mb-3"
        required
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {editEmployee ? 'Update' : 'Add Employee'}
      </button>
      <button
        type="button"
        onClick={() => {
          setEditEmployee(null);
          closeForm();
        }}
        className="ml-3 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </form>
  );
};

export default EmployeeForm;

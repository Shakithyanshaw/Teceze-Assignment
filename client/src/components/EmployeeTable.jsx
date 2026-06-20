import { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContent } from '../context/appContext';

const EmployeeTable = ({ setEditEmployee }) => {
  const { employees, backendUrl, getEmployees } = useContext(AppContent);

  const deleteHandler = async (id) => {
    if (!window.confirm('Are you sure you want to delete?')) return;

    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/employees/delete/${id}`,
      );

      if (data.success) {
        toast.success('Employee Deleted');
        getEmployees();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <table className="w-full mt-5 border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Employee No</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Designation</th>
          <th className="border p-2">Salary</th>
          <th className="border p-2">Edit</th>
          <th className="border p-2">Delete</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp._id}>
            <td className="border p-2">{emp.employeeNo}</td>

            <td className="border p-2">{emp.employeeName}</td>

            <td className="border p-2">{emp.designation}</td>

            <td className="border p-2">Rs. {emp.salary}</td>

            <td className="border p-2">
              <button
                onClick={() => setEditEmployee(emp)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            </td>

            <td className="border p-2">
              <button
                onClick={() => deleteHandler(emp._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;

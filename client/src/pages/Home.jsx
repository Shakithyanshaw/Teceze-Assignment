import { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';

const Home = () => {
  const [editEmployee, setEditEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    setEditEmployee(null); // ensure it's Add mode
    setShowForm(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-4xl font-bold text-center mb-6">
        Employee Management System
      </h1>

      {/* ADD BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddClick}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Employee
        </button>
      </div>

      {/* SHOW FORM ONLY WHEN NEEDED */}
      {showForm && (
        <EmployeeForm
          editEmployee={editEmployee}
          setEditEmployee={setEditEmployee}
          closeForm={() => setShowForm(false)}
        />
      )}

      <EmployeeTable
        setEditEmployee={(emp) => {
          setEditEmployee(emp);
          setShowForm(true); // open form on edit click
        }}
      />
    </div>
  );
};

export default Home;

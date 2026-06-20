import { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';

const Home = () => {
  const [editEmployee, setEditEmployee] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-4xl font-bold text-center mb-6">
        Employee Management System
      </h1>

      <EmployeeForm
        editEmployee={editEmployee}
        setEditEmployee={setEditEmployee}
      />

      <EmployeeTable setEditEmployee={setEditEmployee} />
    </div>
  );
};

export default Home;

import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/employees/list-all');

      if (data.success) {
        setEmployees(data.employees);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const value = {
    backendUrl,
    employees,
    setEmployees,
    getEmployees,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};

export default AppContextProvider;

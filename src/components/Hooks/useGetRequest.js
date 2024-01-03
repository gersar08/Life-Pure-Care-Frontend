import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGetRequest (tabla){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); // Reemplaza 'tu_token' con la clave que usaste para guardar el token en localStorage

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://rocky-dawn-84773-5951dec09d0b.herokuapp.com/api/${tabla}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tabla, token]);
  return { data, loading, error };
};

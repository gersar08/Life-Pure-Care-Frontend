import { useEffect, useState } from 'react';

const UseCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('http://localhost:8000/sanctum/csrf-cookie', {
          credentials: 'include', // Necesario para incluir las cookies en la solicitud
        });

        if (!response.ok) {
          throw new Error('Error al obtener la cookie CSRF');
        }

        setCsrfToken(response.headers.get('X-CSRF-Token'));
      } catch (error) {
        console.error(error);
      }
    };

    fetchCsrfToken();
  }, []);

  return csrfToken;
};

export default UseCsrfToken;
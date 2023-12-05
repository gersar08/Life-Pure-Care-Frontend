import { useState, useEffect } from 'react';
import axios from 'axios';

const UsePutRequest = (tabla, postData) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.put(`http://127.0.0.1:8000/api/${tabla}`, postData, {
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
    }, [tabla, token, postData]);

    return { data, loading, error };
};
export default UsePutRequest;
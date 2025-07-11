import React from 'react';
import { useEffect, useState } from 'react';

export default function Users() {
    const [users, setUsers] = useState([])
    const API_URL  = import.meta.env.VITE_API_URL;
    const fetchUsers = async() => {
        const fetchUsers = () => {
            try{
                setError("Loading...");
                const url = `${API_URL}/api/users`;
                
            }
        }
    }
  return (
    // <div>Users</div>

  )
}

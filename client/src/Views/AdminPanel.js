import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../features/appSlice';

const AdminPanel = () => {
  const [cabinets, setCabinets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cabinetName, setCabinetName] = useState('');

  const token = useSelector(selectUserToken);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cabinets').then((response) => setCabinets(response.data.cabinets));
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading((prevState) => !prevState);
    axios
      .post('http://127.0.0.1:8000/api/cabinet', { name: cabinetName }, config)
      .then((response) => {
        setIsLoading((prevState) => !prevState);
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {cabinets.map((cabinet) => (
        <p key={cabinet.id}>{cabinet.numberOfRoom}</p>
      ))}
      <form onSubmit={handleSubmit}>
        <input type="text" value={cabinetName} onChange={(e) => setCabinetName(e.target.value)} />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AdminPanel;

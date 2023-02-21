import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  // go back to the previous path after 1 second
  useEffect(() => {
    setTimeout(() => {
      navigate(-1);
    }, 1500);
  }, []);
  return (
    <h1 style={{margin: '10%'}}>404 Page Not Found</h1>
  );
};

export default NotFound;

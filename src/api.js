import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Data = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState('http://api.aladhan.com/v1/timingsByCity?city=Stockholm&country=Sweden&method=8');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios({
          method: 'get',
          url,
          headers: {},
        });
        setData(result.data.data);

      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();

  }, []);
  // const { Fajr } = data.timings
  return (
    <div>
      <ul>
        <li>{Fajr}</li>
      </ul>
    </div>
  );
};

export default Data;
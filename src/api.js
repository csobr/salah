import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Data = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios({
          method: 'get',
          url: 'http://api.aladhan.com/v1/timingsByCity?city=Stockholm&country=Sweden&method=8',
        });
        setData(result.data.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();

  }, [])
  const timings = { ...data.timings }
  return (
    <>
      {isError && <div> Something went wrong</div>}
      {
        isLoading ? (
          <div>Loading...</div>
        ) : (
            < div >
              <ul>
                <li>{timings.Fajr}</li>
                <li>{timings.Dhuhr}</li>
                <li>{timings.Asr}</li>
                <li>{timings.Maghrib}</li>
                <li>{timings.Isha}</li>
              </ul>
            </div >
          )
      }
    </>
  );

};

export default Data;
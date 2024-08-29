import { useEffect, useState } from 'react';
const useOnlineStatus = () => {
  const [onlineStatus, setOnlinestaus] = useState(true);

  useEffect(() => {
    window.addEventListener('online', () => {
      setOnlinestaus(true);
    });
    window.addEventListener('offline', () => {
      setOnlinestaus(false);
    });
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;

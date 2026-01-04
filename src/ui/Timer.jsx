import { useEffect, useState } from "react";

function Timer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>Current time:</p>
      <strong>{time.toLocaleTimeString()}</strong>
    </div>
  );
}

export default Timer;
import React, { useState, useEffect } from "react";

export default function RemainderTime({ end, className }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const remainderTime = end - currentTime;

      if (remainderTime <= 0) {
        clearInterval(interval);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        const seconds_in_minutes = 60 * 1000;
        const seconds_in_hours = seconds_in_minutes * 60;
        const seconds_in_day = seconds_in_hours * 24;

        const days = Math.floor(remainderTime / seconds_in_day);
        const remainDays = remainderTime % seconds_in_day;
        const hours = Math.floor(remainDays / seconds_in_hours);
        const remainHours = remainDays % seconds_in_hours;
        const minutes = Math.floor(remainHours / seconds_in_minutes);
        const seconds = Math.floor((remainHours % seconds_in_minutes) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [end]);

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <span className={className}>
      {days} ngày {hours} giờ {minutes} phút {seconds} giây
    </span>
  );
}

// export default RemainderTime;

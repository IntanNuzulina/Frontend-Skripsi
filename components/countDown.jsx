"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function CountDown({ flashsale }) {
  const [second, setSecond] = useState("");
  const [minute, setMinute] = useState("");
  const [hour, setHour] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    const calculateTimeDifference = () => {
      const now = new Date();
      const times = new Date(flashsale);
      times.setHours(0, 0, 0, 0);
      const diffMilliseconds = times - now;
      const diffSeconds = Math.floor(diffMilliseconds / 1000);
      const s = diffSeconds % 60;
      const m = Math.floor((diffSeconds % 3600) / 60);
      const h = Math.floor((diffSeconds % (3600 * 24)) / 3600);
      const d = Math.floor(diffSeconds / (3600 * 24));
      setSecond(s);
      setMinute(m);
      setHour(h);
      setDay(d);
    };

    const timer = setInterval(calculateTimeDifference, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max ml-10">
      <div className="flex flex-col">
        Hari
        <span className="countdown font-mono font-bold text-3xl">
          <span style={{ "--value": day }}></span>
        </span>
      </div>
      <div className="flex flex-col">
        Jam
        <span className="countdown font-mono font-bold text-3xl">
          <span style={{ "--value": hour }}></span>
        </span>
      </div>
      <div className="flex flex-col">
        Menit
        <span className="countdown font-mono font-bold text-3xl">
          <span style={{ "--value": minute }}></span>
        </span>
      </div>
      <div className="flex flex-col">
        Detik
        <span className="countdown font-mono  font-bold text-3xl">
          <span style={{ "--value": second }}></span>
        </span>
      </div>
    </div>
  );
}

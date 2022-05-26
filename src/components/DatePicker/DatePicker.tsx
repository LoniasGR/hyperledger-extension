import React, { useState, ChangeEvent, useEffect } from 'react';
import './DatePicker.css';

type Props = {
  setStart: (arg1: number) => void,
  setStartBoolean:(arg1: boolean) => void,
  setEnd:(arg1: number) => void,
  setEndBoolean:(arg1: boolean) => void,

};

function DatePicker({
  setStart,
  setStartBoolean,
  setEnd,
  setEndBoolean,
}: Props) {
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const dateChange = (
    e: ChangeEvent,
    setter: (arg0: string) => void,
  ): void => {
    const target = e.target as HTMLInputElement;
    setter(target.value);
  };

  useEffect(() => {
    if (startDate !== '' && startTime !== '') {
      setStart(Date.parse(`${startDate} ${startTime}`));
      setStartBoolean(true);
    }
  }, [startDate, startTime]);

  useEffect(() => {
    if (endDate !== '' && endTime !== '') {
      setEnd(Date.parse(`${endDate} ${endTime}`));
      setEndBoolean(true);
    }
  }, [endDate, endTime]);

  return (
    <div className="centered">
      <label htmlFor="meeting-time">
        Start time:
        <input type="date" required onChange={(e: ChangeEvent) => dateChange(e, setStartDate)} />
        <input type="time" required onChange={(e: ChangeEvent) => dateChange(e, setStartTime)} />
      </label>
      <label htmlFor="meeting-time">
        End time:
        <input type="date" onChange={(e: ChangeEvent) => dateChange(e, setEndDate)} />
        <input type="time" onChange={(e: ChangeEvent) => dateChange(e, setEndTime)} />
      </label>
    </div>
  );
}

export default DatePicker;

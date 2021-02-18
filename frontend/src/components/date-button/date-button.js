import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateButton = ({date, updateDueDate}) => {
    //const [dueDate, setDueDate] = useState(date ? new Date(date) : new Date());     //initial date value
    const [dueDate, setDueDate] = useState(date ? new Date(date) : null);     //initial date value

    useEffect(() => {
        console.log(`updateDueDate at useEffect execute.` );
        updateDueDate(dueDate);
    },[dueDate])


    // const setDate = (date) => {
    //     setDueDate(date);
    //     updateDueDate(date);
    // }
    //
    // const handleCalendarClose = () => {
    //     setDate(date);
    //     console.log("Calendar closed");
    // }
    // const handleCalendarOpen = () => console.log("Calendar opened");

    // if (date) updateDueDate();

    // const handleOnChange = (date) => {
    //     console.log(`Inside handleOnChange ${date}`);
    //
    //     setDueDate(date);
    //     //updateDueDate(date);
    // }

    const ExampleCustomInput = ({value, onClick}) => {
        return (
            <div>
                {value || <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M19,4h-2V2h-2v2H9V2H7v2H5C3.897,4,3,4.897,3,6v2v12c0,1.103,0.897,2,2,2h14c1.103,0,2-0.897,2-2V8V6 C21,4.897,20.103,4,19,4z M19.002,20H5V8h14L19.002,20z"></path><path d="M11 17.414L16.707 11.707 15.293 10.293 11 14.586 8.707 12.293 7.293 13.707z"></path></svg>}
                <input type="hidden" value={value} />
            </div>
        );
    }

    return (
        <DatePicker
            selected={dueDate}
            onChange={date => setDueDate(date)}
            //onChange={handleOnChange(date)}
            //onBlur={date => setDate(date)}
            // onCalendarClose={handleCalendarClose}
            // onCalendarOpen={handleCalendarOpen}
            isClearable
            // showPopperArrow={false}
            placeholderText="Añadir fecha"
            //locale="es-ES"
            dateFormat="dd-MM-yyyy"
            // dateFormat="yyyy-MM-dd"
            //customInput={<ExampleCustomInput/>}
        />
    )
}

export default DateButton

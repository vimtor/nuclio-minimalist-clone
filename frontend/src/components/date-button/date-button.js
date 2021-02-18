import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";

const DateButton = ({date, updateDueDate}) => {
    //const [dueDate, setDueDate] = useState(date ? new Date(date) : new Date());     //initial date value
    const [dueDate, setDueDate] = useState(date ? new Date(date) : null);     //initial date value

    useEffect(() => {
        console.log(`updateDueDate at useEffect execute.` );
        updateDueDate(dueDate);
    },[dueDate])

    registerLocale('es', es);

    return (
        <div>
        <DatePicker
            selected={dueDate}
            onChange={date => setDueDate(date)}         //only when value has changed
            isClearable
            placeholderText="Añadir fecha"
            locale="es"
            dateFormat="dd-MM-yyyy"
        />
            {(dueDate < (new Date()) && dueDate) ? "Expirado" : ""}
        </div>
    )
}

export default DateButton

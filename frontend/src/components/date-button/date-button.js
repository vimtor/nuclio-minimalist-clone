import React from "react";
import {useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import {registerLocale, setDefaultLocale} from "react-datepicker";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import styles from "./date-button.module.css"

const DateButton = ({date, updateDueDate}) => {
    const [dueDate, setDueDate] = useState(date ? new Date(date) : null);

    useEffect(() => {
        updateDueDate(dueDate);
    }, [dueDate])

    registerLocale('es', es);

    return (
        <div>
            <DatePicker className={styles.datepicker}
                        selected={dueDate}
                        onChange={date => setDueDate(date)}
                        isClearable
                        placeholderText="Add due date"
                        locale="es"
                        dateFormat="dd-MM-yyyy"
            />
            <span className={styles.expired}>{(dueDate < (new Date()) && dueDate) ? "Expired" : ""}</span>
        </div>
    )
}

export default DateButton

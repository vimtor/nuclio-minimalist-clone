import React from "react";

const Input = ({label, ...props}) => {
  return (
      <div>
        <label>
          <p>{label}:</p>
          <input {...props}/>
        </label>
      </div>
  )
}

export default Input

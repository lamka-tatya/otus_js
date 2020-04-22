import React, { FC } from "react";

export const Input: FC<{ onChange: (value: string) => void }> = ({
  onChange,
}) => (
  <div style={{ margin: "5px" }}>
    <label>Введите имя:</label>
    <input onChange={(event) => onChange(event.target.value)}></input>
  </div>
);

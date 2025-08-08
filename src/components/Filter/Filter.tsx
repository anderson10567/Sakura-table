import React from "react";
import styles from "./Filter.module.scss"

interface FilterProps {
  departments: string[];
  selected: string;
  onChange: (value: string) => void;
}

export const Filter: React.FC<FilterProps> = ({
  departments,
  selected,
  onChange,
}) => {

  return (
    <select className={styles["department-select"]}
    value={selected}
     onChange={(e) => onChange(e.target.value)}>
      <option value="">Все отделы</option>
      {departments.map((dep) => (
        <option key={dep} value={dep}>
          {dep}
        </option>
      ))}
    </select>
  );
};

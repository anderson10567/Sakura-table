import React, { useEffect, useState } from "react";
import styles from "./SearchInput.module.scss"

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(internalValue);
    }, 300);

    return () => clearTimeout(handler); 
  }, [internalValue, onChange]);

  useEffect(() => {
    setInternalValue(value); 
  }, [value]);

  return (
    <input
      type="text"
      className={styles["search-input"]}
      placeholder="Поиск по имени или должности..."
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
    />
  );
};


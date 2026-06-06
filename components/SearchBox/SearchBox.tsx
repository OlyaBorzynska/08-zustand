"use client";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({
  inputValue,
  handleChange,
}: SearchBoxProps) {
  return (
    <input
      className={css.input}
      defaultValue={inputValue}
      onChange={handleChange}
      type="text"
      placeholder="Search notes"
    />
  );
}

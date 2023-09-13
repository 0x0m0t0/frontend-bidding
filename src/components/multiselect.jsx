import TomSelect from "tom-select";
import "tom-select/dist/css/tom-select.css";
import React, { useEffect, useRef, useState } from "react";

export const Multiselect = ({ updateForm }) => {
  const selectRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const select = new TomSelect(selectRef.current, {
      persist: false,
      createOnBlur: true,
      create: true,
      onItemAdd: (value) => {
        setSelectedTags((prevTags) => [...prevTags, value]);
        updateForm("tags", [...selectedTags, value]); // Update the form
      },
      onItemRemove: (value) => {
        setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== value));
        updateForm(
          "tags",
          selectedTags.filter((tag) => tag !== value)
        ); // Update the form
      },
    });

    return () => {
      select.destroy();
    };
  }, [updateForm]);

  return <input ref={selectRef} />;
};

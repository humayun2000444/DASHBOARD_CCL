import React from "react";

const ContactsCategory = ({
  category,
  selectedCategory,
  handleChangeCategory
}) => {
  const isSelected = selectedCategory === category;

  return (
    <li
      onClick={()=> handleChangeCategory(category)}
      style={isSelected ? { backgroundColor: "#164677", color: "#fff" } : null}
    >
      <span>
        {category === "All Contacts" && <i className="fa-solid fa-user"></i>}
        {category === "Favourites" && <i className="fa-solid fa-star"></i>}
      </span>
      <p>{category}</p>
    </li>
  );
};

export default ContactsCategory;

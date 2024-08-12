import React from "react";
import ContactModal from "./ContactModal";

const ContactsUser = ({
  contact,
  contacts,
  setContacts,
  handleFavourite,
  handleEditContact,
  handleDeleteContact,
  bgColor,
}) => {
  const handleMouseHover = (id) => {
    const mappedArray = contacts.map((contact) => {
      if (contact.id === id) {
        return {
          ...contact,
          isHovered: true,
        };
      } else {
        return {
          ...contact,
          isHovered: false,
        };
      }
    });
    setContacts(mappedArray);
  };
  return (
    <li className="contacts__list--users" onMouseOver={() => handleMouseHover(contact.id)}>
      <div>
        <div style={{ backgroundColor: bgColor }}>{contact.name.charAt(0)}</div>
        <div>
          <p>{contact.name}</p>
          <p>{contact.id}</p>
        </div>
      </div>
      <div>
        <button>
          <i className="fas fa-phone"></i>
        </button>
        <ContactModal
          handleEditContact={handleEditContact}
          handleDeleteContact={handleDeleteContact}
          contact={contact}
        />

        {contact.isFavourite && (
          <button onClick={() => handleFavourite(contact.id)}>
            <i className="fa-solid fa-star" style={{ color: "#F4CE14" }}></i>
          </button>
        )}
        {!contact.isFavourite && (
          <button onClick={() => handleFavourite(contact.id)}>
            <i class="fa-regular fa-star"></i>
          </button>
        )}
      </div>
    </li>
  );
};

export default ContactsUser;

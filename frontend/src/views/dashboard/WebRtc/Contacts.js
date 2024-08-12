import React, { useEffect, useState } from "react";
import "../../../assets/scss/pages/Contacts.scss";
import ContactsCategory from "./ContactsCategory";
import ContactsUser from "./ContactsUser";

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Contacts");

  const initialContacts = [
    { id: 1000, name: "1000", isHovered: false, isFavourite: true },
    { id: 5001, name: "5001", isHovered: false, isFavourite: false },
    { id: 5002, name: "5002", isHovered: false, isFavourite: false },
    { id: 5003, name: "5003", isHovered: false, isFavourite: false },
    { id: 5004, name: "5004", isHovered: false, isFavourite: true },
    { id: 5005, name: "5005", isHovered: false, isFavourite: false },
    { id: 5006, name: "5006", isHovered: false, isFavourite: false },
    { id: 5007, name: "5007", isHovered: false, isFavourite: false },
    { id: 4008, name: "4008", isHovered: false, isFavourite: false },
  ];

  const [contacts, setContacts] = useState(initialContacts);
  const [showContacts, setShowContacts] = useState(initialContacts);

  const contactCategories = ["All Contacts", "Favourites"];

  const handleFavourite = (id) => {
    setContacts((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isFavourite: !item.isFavourite,
          };
        }
        return item;
      });
    });
  };

  const handleChangeCategory = (category) => {
    setSelectedCategory(category);
    setSearchTerm(""); // Optionally clear search when changing category
  };

  const handleEditContact = (id, formData) => {
    setContacts((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...formData,
          };
        }
        return item;
      });
    });
  };

  const handleDeleteContact = (id) => {
    setContacts((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleSearch = (searchText) => {
    setSearchTerm(searchText);
    const value = searchText.toLowerCase();

    let filteredContacts = [...contacts];

    // Filter by category
    if (selectedCategory === "Favourites") {
      filteredContacts = filteredContacts.filter(
        (contact) => contact.isFavourite
      );
    }

    // Apply search filter
    const results = filteredContacts.filter((contact) =>
      contact.name.toLowerCase().includes(value)
    );

    setShowContacts(results);
  };

  useEffect(() => {
    if (selectedCategory === "Favourites") {
      setShowContacts(contacts.filter((item) => item.isFavourite));
    } else {
      setShowContacts([...contacts]);
    }
  }, [contacts, selectedCategory]);

  const colors = ["#164677", "#5D0E41", "#070F2B", "#5C469C", "#028391"];

  const handleMouseLeave = () => {
    const mappedArray = contacts.map((contact) => {
      return {
        ...contact,
        isHovered: false,
      };
    });
    setContacts(mappedArray);
  };

  return (
    <div className="contacts">
      <div className="contacts__sidebar">
        <div className="contacts__sidebar--search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <ul className="contacts__sidebar--list">
          {contactCategories.map((category) => (
            <ContactsCategory
              key={category}
              selectedCategory={selectedCategory}
              handleChangeCategory={handleChangeCategory}
              category={category}
            />
          ))}
        </ul>
      </div>
      <div className="contacts__list">
        <div>
          <h3>{selectedCategory}</h3>
          <span>{showContacts.length} Contacts</span>
        </div>
        <ul onMouseLeave={handleMouseLeave}>
          {showContacts.map((contact, i) => (
            <ContactsUser
              key={contact.id}
              contact={contact}
              contacts={contacts}
              setContacts={setContacts}
              handleFavourite={handleFavourite}
              handleEditContact={handleEditContact}
              handleDeleteContact={handleDeleteContact}
              bgColor={colors[i % colors.length]}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Contacts;

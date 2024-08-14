import React, { useEffect, useState } from "react";
import "../../../assets/scss/pages/Contacts.scss";
import ContactModal from "./ContactModal";
import ContactsCategory from "./ContactsCategory";
import ContactsUser from "./ContactsUser";

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Contacts");

  const response = [
    {
      id: 1,
      firstName: "Rizwan",
      lastName: "Uddin",
      phone: "01521408552",
      email: "rizwanshuvo@gmail.com",
    },
    {
      id: 2,
      firstName: "Yasin",
      lastName: "Islam",
      phone: "01521408553",
      email: "rizwansuvocu@gmail.com",
    },
    {
      id: 3,
      firstName: "Emon",
      lastName: "Chowdhury",
      phone: "01521408554",
      email: "",
    },
    {
      id: 4,
      firstName: "Yasin",
      lastName: "",
      phone: "01521408555",
      email: "humayun@gmail.com",
    },
    {
      id: 5,
      firstName: "Humayun",
      lastName: "Ahmed",
      phone: "01521408555",
      email: "",
    },
  ];

  const initialContacts = response.map((contact) => {
    return {
      ...contact,
      isHovered: false,
      isFavourite: false,
    };
  });

  const [contacts, setContacts] = useState(initialContacts);
  const [showContacts, setShowContacts] = useState(initialContacts);

  const contactCategories = ["All Contacts", "Favourites"];

  const handleFavourite = (id) => {
    setContacts((prev) => {
      return prev.map((contact) => {
        if (contact.id === id) {
          return {
            ...contact,
            isFavourite: !contact.isFavourite,
          };
        }
        return contact;
      });
    });
  };

  const handleChangeCategory = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  const handleAddContact = (formData) => {
    setContacts([
      ...contacts,
      {
        ...formData,
        isHovered: false,
        isFavourite: false,
        id: contacts.length + 1,
      },
    ]);
  };

  const handleEditContact = (id, formData) => {
    setContacts((prev) => {
      return prev.map((contact) => {
        if (contact.id === id) {
          return {
            ...formData,
          };
        }
        return contact;
      });
    });
  };

  const handleDeleteContact = (id) => {
    setContacts((prev) => {
      return prev.filter((contact) => contact.id !== id);
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
      (contact.firstName + contact.lastName).toLowerCase().includes(value)
    );

    setShowContacts(results);
  };

  useEffect(() => {
    if (selectedCategory === "Favourites") {
      setShowContacts(contacts.filter((contact) => contact.isFavourite));
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
      <div className="contacts__add">
        <ContactModal type="Add" handleAddContact={handleAddContact} />
      </div>
    </div>
  );
};

export default Contacts;

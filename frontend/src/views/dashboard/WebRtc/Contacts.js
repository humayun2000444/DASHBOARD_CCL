import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import getWebRtcServices from "../../../apiServices/WebRtcServices/getWebRtcServices";
import "../../../assets/scss/pages/Contacts.scss";
import ContactModal from "./ContactModal";
import ContactsCategory from "./ContactsCategory";
import ContactsUser from "./ContactsUser";

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Contacts");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showContacts, setShowContacts] = useState(
    JSON.parse(localStorage.getItem("contacts"))
  );
  const username = localStorage.getItem("username");

  const loadContactsFromLocalStorage = () => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(storedContacts);
    setShowContacts(storedContacts);
  };

  const saveContactsToLocalStorage = (contacts) => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getWebRtcServices.fetchAllContacts(username);
      const initialContacts = data.map((contact) => ({
        ...contact,
        isHovered: false,
        isFavourite: false,
      }));
      setShowContacts(initialContacts);
      setContacts(initialContacts);
      saveContactsToLocalStorage(initialContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (!storedContacts || storedContacts.length === 0) {
      fetchContacts();
    } else {
      loadContactsFromLocalStorage();
    }
  }, []);

  const handleAddContact = async (formData) => {
    setLoading(true);
    try {
      const newContact = await getWebRtcServices.createContact({...formData,username});
      setContacts((prev) => {
        const updatedContacts = [
          ...prev,
          { ...newContact, isFavourite: false },
        ];
        saveContactsToLocalStorage(updatedContacts);
        return updatedContacts;
      });
      setShowContacts((prev) => {
        const updatedContacts = [
          ...prev,
          { ...newContact, isFavourite: false },
        ];
        return updatedContacts;
      });
    } catch (error) {
      console.error("Error adding contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (id) => {
    setLoading(true);
    try {
      await getWebRtcServices.deleteContact(id);
      setContacts((prev) => {
        const updatedContacts = prev.filter((contact) => contact.id !== id);
        saveContactsToLocalStorage(updatedContacts);
        return updatedContacts;
      });
      setShowContacts((prev) => {
        const updatedContacts = prev.filter((contact) => contact.id !== id);
        return updatedContacts;
      });
    } catch (error) {
      console.error("Error deleting contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavourite = (id) => {
    setContacts((prev) => {
      const updatedContacts = prev.map((contact) =>
        contact.id === id
          ? { ...contact, isFavourite: !contact.isFavourite }
          : contact
      );
      const favouriteContacts = updatedContacts.filter(
        (contact) => contact.isFavourite
      );
      localStorage.setItem(
        "favouriteContacts",
        JSON.stringify(favouriteContacts)
      );
      if (selectedCategory === "Favourites") {
        setShowContacts(favouriteContacts);
      } else {
        setShowContacts(updatedContacts);
      }
      saveContactsToLocalStorage(updatedContacts);
      return updatedContacts;
    });
  };

  const handleChangeCategory = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");

    if (category === "Favourites") {
      const favouriteContacts = JSON.parse(
        localStorage.getItem("favouriteContacts")
      );
      setShowContacts(favouriteContacts);
    } else {
      setShowContacts(contacts);
    }
  };

  const handleEditContact = async (id, formData) => {
    setLoading(true);
    try {
      await getWebRtcServices.updateContact({ id: id, ...formData });
      setContacts((prev) => {
        const updatedContacts = prev.map((contact) =>
          contact.id === id ? { ...contact, ...formData } : contact
        );
        saveContactsToLocalStorage(updatedContacts);
        return updatedContacts;
      });
      setShowContacts((prev) => {
        const updatedContacts = prev.map((contact) =>
          contact.id === id ? { ...contact, ...formData } : contact
        );
        return updatedContacts;
      });
    } catch (error) {
      console.error("Error Updating contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchText) => {
    setSearchTerm(searchText);
    const value = searchText.toLowerCase();

    let filteredContacts = [...contacts];

    if (selectedCategory === "Favourites") {
      filteredContacts = filteredContacts.filter(
        (contact) => contact.isFavourite
      );
    }

    const results = filteredContacts.filter((contact) =>
      (contact.firstName + contact.lastName).toLowerCase().includes(value)
    );

    setShowContacts(results);
  };

  const handleMouseLeave = () => {
    setShowContacts((prev) =>
      prev.map((contact) => ({ ...contact, isHovered: false }))
    );
  };

  const colors = ["#164677", "#5D0E41", "#070F2B", "#5C469C", "#028391"];

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
          {["All Contacts", "Favourites"].map((category) => (
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
          <span>{showContacts?.length} Contacts</span>
        </div>
        {loading ? (
          <div className="contacts__loading">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <ul onMouseLeave={handleMouseLeave}>
            {showContacts?.map((contact, i) => (
              <ContactsUser
                key={contact.id}
                contact={contact}
                contacts={showContacts}
                setContacts={setShowContacts}
                handleFavourite={handleFavourite}
                handleEditContact={handleEditContact}
                handleDeleteContact={handleDeleteContact}
                bgColor={colors[i % colors.length]}
              />
            ))}
          </ul>
        )}
      </div>
      <div className="contacts__add">
        <ContactModal type="Add" handleAddContact={handleAddContact} />
      </div>
    </div>
  );
};

export default Contacts;

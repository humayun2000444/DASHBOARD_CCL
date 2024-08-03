import React, { useState } from "react";
import "./Contacts.css"; 

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const contacts = [
    {
      id: 1000,
      name: "1000",
      category: "Enterprise Contacts",
      status: "online",
    },
    {
      id: 5001,
      name: "5001",
      category: "Enterprise Contacts",
      status: "online",
    },
    {
      id: 5002,
      name: "5002",
      category: "Enterprise Contacts",
      status: "online",
    },
    {
      id: 5003,
      name: "5003",
      category: "Enterprise Contacts",
      status: "online",
    },
    {
      id: 5004,
      name: "5004",
      category: "Enterprise Contacts",
      status: "online",
    },
    {
      id: 5005,
      name: "5005",
      category: "Enterprise Contacts",
      status: "online",
    },
    {
      id: 5006,
      name: "5006",
      category: "Enterprise Contacts",
      status: "online",
    },
    {
      id: 5007,
      name: "5007",
      category: "Enterprise Contacts",
      status: "online",
    },
    {
      id: 4008,
      name: "4008",
      category: "Enterprise Contacts",
      status: "online",
    },
  ];

  const categories = ["All", "Favorites", "Enterprise Contacts"];

  const filteredContacts = contacts.filter((contact) => {
    return (
      (selectedCategory === "All" || contact.category === selectedCategory) &&
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="contacts-container">
      <div className="sidebar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <ul className="category-list">
          {categories.map((category) => (
            <li
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="contact-list">
        <div className="contact-list-header">
          <h3>{selectedCategory}</h3>
          <span>{filteredContacts.length} Contacts</span>
        </div>
        <ul>
          {filteredContacts.map((contact) => (
            <li key={contact.id} className="contact-item">
              <div className="contact-avatar">{contact.name.charAt(0)}</div>
              <div className="contact-info">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-category">{contact.category}</div>
              </div>
              <div className={`contact-status ${contact.status}`}></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Contacts;

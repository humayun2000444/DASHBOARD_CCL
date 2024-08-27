import React, { createContext, useState, useContext, useEffect } from 'react';

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const username = localStorage.getItem("username");
    if (!username) {
      console.error('Username not found in localStorage');
      return;
    }

    try {
      const response = await fetch('https://iptsp.cosmocom.net:8001/FREESWITCH/contact/get-contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      setContacts(data); // Store the list of contacts
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactContext.Provider value={{ contacts }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  return useContext(ContactContext);
};

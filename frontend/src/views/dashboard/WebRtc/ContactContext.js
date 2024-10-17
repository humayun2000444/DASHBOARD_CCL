// import React, { createContext, useState, useContext, useEffect } from 'react';
// import {root} from "../../../constants/constants";
//
// const ContactContext = createContext();
//
// export const ContactProvider = ({ children }) => {
//   const [contacts, setContacts] = useState([]);
//
//   const fetchContacts = async () => {
//     const username = localStorage.getItem("username");
//     if (!username) {
//       console.error('Username not found in localStorage');
//       return;
//     }
//
//     try {
//       const response = await fetch(root + '8001/FREESWITCH/contact/get-contacts', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username }),
//       });
//       const data = await response.json();
//       setContacts(data); // Store the list of contacts
//     } catch (error) {
//       console.error('Error fetching contacts:', error);
//     }
//   };
//
//   useEffect(() => {
//     fetchContacts();
//   }, []);
//
//   return (
//     <ContactContext.Provider value={{ contacts }}>
//       {children}
//     </ContactContext.Provider>
//   );
// };
//
// export const useContact = () => {
//   return useContext(ContactContext);
// };

// ContactContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import config from "../../../configs/config.json";

const { root } = config;

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const username = localStorage.getItem("username");
    if (!username) {
      console.error("Username not found in localStorage");
      return;
    }

    try {
      const response = await fetch(
        root + "8001/FREESWITCH/contact/get-contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );
      const data = await response.json();
      setContacts(data); // Store the list of contacts
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Function to get display name by phone number
  const getDisplayName = (callerNumber) => {
    const contact = contacts.find((contact) => contact.phone === callerNumber);
    if (contact) {
      return `${contact.firstName} ${contact.lastName || ""}`.trim();
    }
    return callerNumber; // Return the caller number if no match found
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactContext.Provider value={{ contacts, getDisplayName }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  return useContext(ContactContext);
};

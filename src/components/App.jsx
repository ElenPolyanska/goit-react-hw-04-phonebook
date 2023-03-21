import { useEffect, useState } from 'react';
import { GlobalStyles } from './GlobalStyles';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const LS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved && JSON.parse(saved)) {
      return JSON.parse(saved);
    } else {
      return [];
    }
  });
  const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   const saved = localStorage.getItem(LS_KEY);
  //   if (saved && JSON.parse(saved).length) {
  //     setContacts(JSON.parse(saved));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert(`${newContact.name} is already in contacts`)
      : setContacts(prevState => [newContact, ...prevState]);
  };

  const deleteContact = contactId => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== contactId);
    });
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <GlobalStyles />
      <h1>Phonebook</h1>
      <ContactForm onSave={addContact} />
      <h2>Contacts</h2>
      <Filter stateFilter={filter} onChange={changeFilter} />
      <ContactList items={getVisibleContacts()} onDelete={deleteContact} />
    </div>
  );
};

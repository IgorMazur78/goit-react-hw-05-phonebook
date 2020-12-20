import React, { Component } from "react";
import uuid from "react-uuid";

import Form from "../Form/Form";

import Filter from "../Filter/Filter";
import ListContact from "../Contact/ListContact";
import style from "./App.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ErrorContact from "../ErrorNotification/ErrorContact";
import "./animationError.css";

export default class App extends Component {
  // создаем состояние класс АРР
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    errorInput: false,
  };

  // метод класса позволяющий при изменении значения записывать его в состояние state
  handelInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  // метод позволяющий вносить изменения в state.contacts испльзуя state из другого класса
  // в данном случае из Form
  handleAddContact = (name, number) => {
    const { contacts } = this.state;
    // name,number передаваемые состояния state из Form

    const newContact = {
      id: uuid(),
      name,
      number,
    };
    const prevContactName = contacts.some((e) => e.name === newContact.name);
    const prevContactNumber = contacts.some(
      (e) => e.number === newContact.number
    );
    if (prevContactName || prevContactNumber) {
      this.setState({ errorInput: true });
      setTimeout(() => {
        this.setState({ errorInput: false });
      }, 1500);
      return;
    }

    if (!newContact.name || !newContact.number) {
      alert("enter data");

      return;
    }

    this.setState((prevState) => {
      if (newContact.name && newContact.number && prevContactNumber === false) {
        return {
          contacts: [...prevState.contacts, newContact],
        };
      }
    });
  };
  deleteContact = (contactsId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(
          (contact) => contact.id !== contactsId
        ),
      };
    });
  };

  showFilteredValue = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) => {
      const str = contact.name.toLowerCase();
      return str.includes(filter.toLowerCase());
    });
  };

  render() {
    const { contacts, filter, errorInput } = this.state;
    const showFilteredContacts = this.showFilteredValue();

    return (
      <div>
        <div className={style.wrapperForm}>
          <Form onhandleAddContact={this.handleAddContact} />
          {errorInput && (
            
              <CSSTransition
                in={true}
                appear={true}
                key={uuid()}
                timeout={3000}
                classNames="AnimationError"
                unmountOnExit
              >
                <ErrorContact />
              </CSSTransition>
            
           )} 
        </div>

        <Filter value={filter} onChange={this.handelInputChange} />
        <div className={style.wrapperListContact}>
          <h2 className={style.listContactTitle}>Contacts</h2>
          {contacts.length > 0 && showFilteredContacts.length > 0 && (
            <>
              <ListContact
                contact={this.showFilteredValue()}
                onDeleteContact={this.deleteContact}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}

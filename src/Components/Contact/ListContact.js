import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import uuid from "react-uuid";

import style from "./Listcontact.module.css";
import "../Contact/ListContactAnimation.css";

export default function ListContact({ contact, onDeleteContact }) {
  return (
    <TransitionGroup component="ul" className="ListContact">
     
      {contact.map(({ id, name, number }) => (
        <CSSTransition
                 
          key={id}
          appear={true}
          timeout={250}
          classNames="ListContactAnimation"
          unmountOnExit
        >
          <li key={id} className={style.ListContactItem}>
            <span>{name}:</span>
            <span>{number}</span>

            <button
              className={style.buttonDeleteContact}
              onClick={() => onDeleteContact(id)}
            >
            
            </button>
          </li>
        </CSSTransition>
      ))}
      </TransitionGroup>
  );
}

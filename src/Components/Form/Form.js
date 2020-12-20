import React, { Component } from "react";
import style from "./Form.module.css";
import "../Form/animationForm.css";
import { CSSTransition } from "react-transition-group";

export default class Form extends Component {
  state = {
    name: "",
    number: "",
  };

  handelInputChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  handelSubmit = (evt) => {
    evt.preventDefault();

    this.props.onhandleAddContact(this.state.name, this.state.number);

    this.setState({ name: "", number: "" });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div className={style.formStyle}>
       
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames="phonebook"
          unmountOnExit
        >
          <h2 className={style.formStyleTitle}>Phonebook</h2>
        </CSSTransition>

        <form className={style.formStyleFormInput} onSubmit={this.handelSubmit}>
          <label>
            Name
            <br />
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handelInputChange}
              placeholder="Add name"
              autoFocus
            ></input>
            <br />
          </label>
          <label>
            Number
            <br />
            <input
              type="text"
              name="number"
              value={number}
              onChange={this.handelInputChange}
              placeholder="Add number"
              autoFocus
            ></input>
          </label>
          <br />
          <button className={style.formStyleFormButton} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

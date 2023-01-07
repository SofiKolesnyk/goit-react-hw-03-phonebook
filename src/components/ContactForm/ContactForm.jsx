import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import InputField from '../InputField';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = (e) => this.setState({[e.target.name]: e.target.value});

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state)
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={s.container} onSubmit={this.handleFormSubmit}>
        <InputField
          label='Name'
          value={name}
          onChange={this.handleInputChange}
          type='text'
          name='name'
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <InputField
          label='Number'
          value={number}
          onChange={this.handleInputChange}
          type='tel'
          name='number'
          pattern='\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}'
          title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
          required
        />
        <button className={s.btn} type='submit'>Add contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;

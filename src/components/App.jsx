import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import Section from './Section';
import ContactForm from './ContactForm';
import Contacts from './Contacts';

const LOCAL_KEY = 'phonebookContacts';

export default class App extends Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    let contacts = localStorage.getItem(LOCAL_KEY);
    contacts = contacts ? JSON.parse(contacts) : [];
    this.setState({contacts});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.contacts === this.state.contacts) return;
    localStorage.setItem(LOCAL_KEY, JSON.stringify(this.state.contacts));
  }

  onGetDataForm = (data) => {
    const hasName = this.state.contacts.some(it => it.name === data.name);
    if (hasName) {
      Notify.warning(`Contact "${data.name}" is already exist.`);
      return;
    }

    this.setState(p => ({
      contacts: [...p.contacts, { ...data, id: nanoid() }]
    }))
  }

  deleteItem = (deletedId) => {
    this.setState(p => ({
      contacts: p.contacts.filter(({id}) => id !== deletedId)
    }))
  }

  render() {
    const {contacts} = this.state;
    return (
      <div>
        <Section title='Phonebook'>
          <ContactForm
            onSubmit={this.onGetDataForm}
          />
        </Section>
        <Section title='Contacts'>
          <Contacts
            contacts={contacts}
            onClickDelete={this.deleteItem}
          />
        </Section>
      </div>
    );
  }
}

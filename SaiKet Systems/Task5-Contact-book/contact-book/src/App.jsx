
import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [search, setSearch] = useState('')

  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) || []
  })

  const addContact = () => {
    if (name.trim() === '' || phone.trim() === '' || email.trim() === '') {
      alert('Please enter all details')
      return
    }

    const newContact = {
      id: Date.now(),
      name: name,
      phone: phone,
      email: email
    }

    const updatedContacts = [...contacts, newContact]

    setContacts(updatedContacts)
    localStorage.setItem('contacts', JSON.stringify(updatedContacts))

    setName('')
    setPhone('')
    setEmail('')
  }

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter(
      contact => contact.id !== id
    )

    setContacts(updatedContacts)
    localStorage.setItem('contacts', JSON.stringify(updatedContacts))
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container">
      <div className="book">

        <h1>My Contact Book</h1>
        <p>Save and manage your contacts</p>

        <div className="form">
          <h2>Add New Contact</h2>

          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={addContact}>Add Contact</button>
        </div>

        <div className="contacts">
          <h2>Saved Contacts</h2>

          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filteredContacts.length === 0 ? (
            <p>No contacts found</p>
          ) : (
            filteredContacts.map((contact) => (
              <div className="contact" key={contact.id}>
                <h3>{contact.name}</h3>
                <p>Phone: {contact.phone}</p>
                <p>Email: {contact.email}</p>

                <button
                  className="delete"
                  onClick={() => deleteContact(contact.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default App

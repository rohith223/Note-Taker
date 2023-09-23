import React, { useState } from 'react';
import './Popup.css';
import { env } from '../env';
import axios from 'axios';

const Popup = ({noteId,fetchData, cardData, onSave, onClose }) => {
  const [editedCard, setEditedCard] = useState(cardData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCard({
      ...editedCard,
      [name]: value,
    });
  };

  const handleSave = async () => {
    // onSave(editedCard);
    let editNote = await axios.put(`${env.REACT_APP_API}/notes/updateNote`,{
        note:editedCard.note,
        title:editedCard.title,
        category:editedCard.category,
        note_id:noteId
    })
    fetchData()
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Edit Card</h2>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={editedCard.title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="Note"
          name="note"
          value={editedCard.note}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="text"
          placeholder="Category"
          name="category"
          value={editedCard.category}
          onChange={handleInputChange}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Popup;

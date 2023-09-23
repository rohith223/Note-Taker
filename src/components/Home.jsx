import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notemaker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CheckLoginComponent } from '../Service/SecurityService';
import Popup from './Popup'; // Import the Popup component
import { env } from '../env';
// ... (existing imports)

const NoteMaker = () => {
  const [dataFromBackend, setDataFromBackend] = useState([]);
  const [newCard, setNewCard] = useState({ title: '', note: '', data: '' });
  const [categoryFilter, setCategoryFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [noteId, setNoteId] = useState(0);
  const [editedIndex, setEditedIndex] = useState(null);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let email =sessionStorage.getItem("email")
      const response = await axios.get(`http://localhost:5000/notes/getNoteByEmail/${email}`);
     
      if(response.status === 400)
      {
        setDataFromBackend([])
      }
      else{
        setDataFromBackend(response.data)
      }
      // const { data } = response;
      // setDataFromBackend(data);
    } catch (error) {
      console.error("Error fetching data from the backend:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCard({
      ...newCard,
      [name]: value,
    });
  };

  const handleAddCard =async () => {
    let createNote = await axios.post(`${env.REACT_APP_API}/notes/createNote`,{
      note:newCard.note,
      title:newCard.title,
      category:newCard.data,
      userEmail:sessionStorage.getItem("email")
  })
  fetchData()
    // const newData = [...dataFromBackend, newCard];
    // setDataFromBackend(newData);
    setNewCard({ title: '', note: '', data: '' });
  };

  const handleEditCard = (note_id,index) => {
    setNoteId(note_id);
    setEditedIndex(index);
    setShowPopup(true);
  };

  const handleSaveCard = (editedCard) => {
    const newData = [...dataFromBackend];
    newData[editedIndex] = editedCard;
    setDataFromBackend(newData);
    setShowPopup(false);
  };

  const handleDeleteCard = async(id,index) => {
    let deleteCard = await axios.post(`${env.REACT_APP_API}/notes/deleteNote`,{id})
    fetchData()
    const newData = [...dataFromBackend];
    newData.splice(index, 1);
    setDataFromBackend(newData);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleTitleFilterChange = (event) => {
    setTitleFilter(event.target.value);
  };

  return (
    <div>
<CheckLoginComponent/>
      <h1>Note Maker</h1>
      {/* Title Filter Input */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Filter by Title"
          value={titleFilter}
          onChange={handleTitleFilterChange}
        />
      </div>

      {/* Category Filter Input */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Filter by Category"
          value={categoryFilter}
          onChange={handleCategoryFilterChange}
        />
      </div>

      <div className="card-form">
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={newCard.title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="Note"
          name="note"
          value={newCard.note}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="text"
          placeholder="Category"
          name="data"
          value={newCard.data}
          onChange={handleInputChange}
        />
        <button onClick={handleAddCard}>Add Card</button>
      </div>

      <div className="card-list">
        {dataFromBackend.length !== 0? dataFromBackend
          .filter((item) =>
            (categoryFilter ? item.category.toLowerCase().includes(categoryFilter.toLowerCase()) : true) &&
            (titleFilter ? item.title.toLowerCase().includes(titleFilter.toLowerCase()) : true)
          )
          .map((item, index) => (
            <div key={index} className="card">
              <h2>{item.title}</h2>
              <p>Note: {item.note}</p>
              <p>Category: {item.category}</p>
              <div className="card-icons">
                <span>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => handleEditCard(item.id,index)}
                    className="edit-icon"
                  />
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDeleteCard(item.id,index)}
                    className="delete-icon"
                  />
                </span>
              </div>
            </div>
          )):""}
      </div>

      {showPopup && (
        <Popup
          noteId={noteId}
          fetchData={fetchData}
          cardData={dataFromBackend[editedIndex]}
          onSave={handleSaveCard}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default NoteMaker;

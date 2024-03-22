import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./Home.css"
import NoteCard from '../../components/NoteCard/NoteCard';
import { Link } from 'react-router-dom';

function Home() {
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);
    
    setNotes(response.data.data);
  }

  useEffect(()=>{
    loadNotes();
  }, [])

  return (
    <div>
      <h1 className='app-header'>All Notes</h1>

      <Link to={'/new'} className='add-note-link'>Add Note</Link>

      {
        notes.map((note, index)=>{
          const {_id, title, content, category} = note;
          return ( <NoteCard key={_id} _id={_id} title={title} content={content} category={category} loadNotes={loadNotes}/> )
        })
      }
    </div>
  )
}

export default Home
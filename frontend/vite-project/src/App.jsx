import { useEffect, useState } from 'react'
import './App.css';
import CreateNoteForm from './Components/CreateNoteForm';
import Note from './Components/Note';
import Fiter from './Components/Filter';
import { fetchNotes } from '../Services/note';
import { createNote } from '../Services/note';

function App() {
  const [notes,setNotes] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    sortItem: "date",
    sortOrder: "desc",
  });
  useEffect(()=> {
    const fetchData = async () =>{
      let notes = await fetchNotes(filter);
      setNotes(notes);
    }
    fetchData();
  },[filter]);
  const onCreate = async (note) =>{
    await createNote(note);
    let notes = await fetchNotes(filter);
    setNotes(notes);
  }
  return (<section className='p-8 flex flex-wrap'>
    <div className='flex flex-col w-1/2 gap-10'> 
      <CreateNoteForm onCreate = {onCreate}/>
      <Fiter filter={filter} setFilter = {setFilter}/>
      <ul className='flex flex-col  gap-5 flex-1'>
      {notes.map(n => (
        <li key = {n.id}>
          <Note title={n.title} description={n.description} createdAt={n.createdAt} />
        </li>
      ))}   
      </ul>
    </div>
  </section>
  );
}

export default App

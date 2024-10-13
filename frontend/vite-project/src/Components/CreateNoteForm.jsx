
import {Button, Input, Textarea} from "@chakra-ui/react";
import { useState } from "react";
export default function CreateNoteForm({onCreate}){
  const[note,setNote] = useState({});
  
  const onSubmit = (e) => {
    e.preventDefault();
    setNote(null);
    onCreate(note);
  }

    return(<form onSubmit={onSubmit} className='w-full flex flex-col gap-3'>
        <h3>Create Note</h3>
        <Input placeholder="Title of the note" 
        value={note?.title ?? ""} 
        onChange={(e) => setNote({...note, title: e.target.value})}
        />
        <Textarea 
        placeholder= "Desctiption" 
        value={note?.description ?? ""} 
        onChange={(e) => setNote({...note, description: e.target.value})}
        />
        <Button colorScheme='teal' type="submit">Create</Button>
      </form>);
}

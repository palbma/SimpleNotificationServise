import axios from "axios"



export const fetchNotes = async (filter) =>{
    try{
    var response = await axios.get("https://localhost:7297/Note",{
        params:{
            search: filter?.search,
            sortItem: filter?.sortItem,
            sortOrder:filter?.sortOrder,
        },
    });
    return response.data.noteDtos;
   // return notes.data;
    }
    catch(e){
        console.error(e);
    }
    console.log(response);

}
export const createNote = async (note) =>{
    try{
    var response = await axios.post("https://localhost:7297/Note",note);
    return response.status;
   // return notes.data;
    }
    catch(e){
        console.error(e);
    }
    console.log(response);

}
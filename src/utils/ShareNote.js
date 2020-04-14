import React, {useState} from "react";

export const ShareNoteContext = React.createContext(null);

export const ShareNoteProvider =  ({children}) => {
  const [note, setNote] = useState({id:"", title:"", content:"", isOpen:false});
  const [edit, setEdit] = useState(false);
  return <ShareNoteContext.Provider value={{note, setNote, edit, setEdit}}>
    {children}
  </ShareNoteContext.Provider>
};
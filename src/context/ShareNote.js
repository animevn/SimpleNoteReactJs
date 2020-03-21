import React, {useState} from "react";

export const ShareNoteContext = React.createContext(null);

export const ShareNoteProvider =  ({children}) => {
  const [note, setNote] = useState({id:"", title:"", content:"", isOpen:false});
  return <ShareNoteContext.Provider value={{note, setNote}}>
    {children}
  </ShareNoteContext.Provider>
};
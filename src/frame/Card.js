import React, {useContext} from "react";
import {ShareNoteContext} from "../context/ShareNote";
import firebase from "firebase";

function Card(props) {
  const {title, content, id} = props;
  const {setNote} = useContext(ShareNoteContext);

  function editNote(e) {
    e.preventDefault();
    setNote({title:title, content:content, id:id, isOpen:true});
  }

  function deleteNote(e) {
    e.preventDefault();
    firebase.firestore().collection("notes").doc(id).delete();
  }

  return (
    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 p-2">
      <div className="card shadow-sm flex-column h-100">
        <div className="card-header bg-warning">{title}</div>
        <div className="card-body d-flex flex-column justify-content-between pb-0 pr-0">
          <p className="mr-2">{content}</p>

         <div className="pr-0">
           <div className="mr-auto">

             <button className="btn float-right text-danger" data-toggle="modal"
                     data-target={"#i" + id}>
               Delete
             </button>

             <div className="modal fade" id={"i" + id}>
               <div className="modal-dialog modal-dialog-centered">
                 <div className="modal-content">
                   <div className="modal-header">
                     <h5 className="modal-title">Hello</h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                       <span aria-hidden="true">&times;</span>
                     </button>
                   </div>
                   <div className="modal-body">
                     <p>Delete this note?</p>
                   </div>
                   <div className="modal-footer">
                     <button type="button" className="btn btn-primary" data-dismiss="modal">
                       Cancel
                     </button>
                     <button type="button" className="btn btn-primary" data-dismiss="modal"
                             onClick={deleteNote}>
                       OK
                     </button>
                   </div>
                 </div>
               </div>
             </div>
           </div>

           <button className="btn float-right text-success" onClick={editNote}>
             Edit
           </button>
         </div>

        </div>
      </div>
    </div>
  );
}

export default Card;

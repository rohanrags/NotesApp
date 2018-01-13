const fs = require('fs');

fetchNotes = () => {
  try {
    var notes = fs.readFileSync('notes_data.json');
    return JSON.parse(notes);
  } catch(e) {
    return [];
  }
};

saveNotes = (notes) => {
  fs.writeFileSync('notes_data.json',JSON.stringify(notes));
};

//Function to add a new Note
addNote = (title,body) => {
  //All notes will be stored in an array
  var notes=fetchNotes();
  //A single Note structure
  var note = {
    title,
    body
  };

  //Check for duplicate notes
  var duplicateNotes = notes.filter((note) => {
    return note.title===title;
  });

  //If there are no duplicates then we can add note successfully
  if(duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

listAll = () => {
  return fetchNotes();
};

readNote = (title) => {
  var notes = fetchNotes();
  var newNotes = notes.filter((note) => {
    return note.title===title;
  });

  return newNotes[0];
};

removeNote = (title) => {
  var notes = fetchNotes();
  var newNotes = notes.filter((note) => {
      return note.title!==title;
  });
  saveNotes(newNotes);
  if(notes.length===newNotes.length) {
    return false;
  } else {
    return true;
  }
};

logNote = (note) => {
  debugger;
  console.log('--Note--');
  console.log('Title - ' + note.title);
  console.log('Body - ' + note.body);
};

module.exports = {
  addNote,
  listAll,
  readNote,
  removeNote,
  logNote
};

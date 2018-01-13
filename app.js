const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of the note',
  demand: true,
  alias: 't'
};

var command = process.argv[2];
var argv = yargs
.command('add','Adding a new Note', {
  title : titleOptions,
  body : {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
  }
})
.command('list','Lists all existing notes')
.command('read','Read a note',{
  title : titleOptions
})
.command('remove','Removing a note', {
  title : titleOptions
})
.help()
.argv;

if(command==='list') {
  var returnedNotesList = notes.listAll();
  returnedNotesList.forEach((note)=> {
    notes.logNote(note);
  });
  // for (var note in returnedNotesList) {
  //   notes.logNote(returnedNotesList[note]);
  // };
} else if (command==='add') {
  var note = notes.addNote(argv.title,argv.body);
  if(note) {
    console.log('Note Added');
    notes.logNote(note);
  } else {
    console.log("Note couldn't be added, it already exits.");
  }
} else if (command==='read') {
  var returnedNote = notes.readNote(argv.title);
  if(returnedNote) {
    notes.logNote(returnedNote);
  } else {
    console.log("Note couldn't be read.");
  }
} else if (command==='remove') {
  var result = notes.removeNote(argv.title);
  console.log(result?'Note Removed' : "Note Couldn't be Removed");
} else {
  console.log('Invalid Command, Please enter a valid command');
}

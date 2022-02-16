const fs = require('fs');
const yargs = require('yargs');
const argv = yargs.argv;

var title = yargs.argv.title;
var body = yargs.argv.body;
var command = yargs.argv._[0];

if (command === "add") {
  addNote(title, body);
}
else if (command === "remove"){
  removeNote(title);
}
else if (command === "list"){
    listNotes();
}
else if (command === "read"){
   readNote(title);
}
else {
    console.log("Please enter a valid Command.");
}



function fetchNotes() {
  try {
    return JSON.parse(fs.readFileSync('notes.json'));
  } catch (err) {
    return [];
  }
}

function addNote(title, body) {
  var notes = fetchNotes();

  var note = {
    title,
    body
  };

  var double = notes.filter((note) => note.title === title);

  if(double.length === 0){
    notes.push(note);

    fs.writeFileSync("notes.json", JSON.stringify(notes));

    console.log("New note created!")
  } else {
    console.log("Title already exists. Try again with another title.");
  }
}

function removeNote(title) {
  var notes = fetchNotes();

  var filteredNotes = notes.filter((note) => note.title !== title);

  fs.writeFileSync("notes.json", JSON.stringify(filteredNotes));
  console.log("Note removed");
}

function readNote(title) {
  var notes = fetchNotes();

  var filteredNotes = notes.filter((note) => note.title === title);

  logNote(filteredNotes[0]);
}

function listNotes() {
  var notes = fetchNotes();
  console.log("Your notes:");
  notes.forEach((note) => noteList(note));
}

function noteList(note) {
  
  console.log(note.title);
}

function logNote(note) {
  
  console.log(note.title);
  console.log(note.body);
}
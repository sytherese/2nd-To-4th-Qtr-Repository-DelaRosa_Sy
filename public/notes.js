// Grab elements
const notesList = document.getElementById("notesList");
const noteEditor = document.getElementById("noteEditor");
const newNoteBtn = document.getElementById("newNoteBtn");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const deleteNoteBtn = document.getElementById("deleteNoteBtn");
const showSolutionBtn = document.getElementById("showSolutionBtn");

const journalNameInput = document.getElementById("journalName");
const noteTitleInput = document.getElementById("noteTitle");
const noteContentInput = document.getElementById("noteContent");
const userInfoDiv = document.getElementById("userInfo");

let currentNoteId = null;

// Load username from localStorage (from signup page)
const username = localStorage.getItem("username") || "Detective";
userInfoDiv.innerText = `User: ${username}`;

// Load existing notes from localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Function to render notes in sidebar
function renderNotes() {
  notesList.innerHTML = "";
  notes.forEach(note => {
    const noteItem = document.createElement("div");
    noteItem.classList.add("note-item");
    if (note.id === currentNoteId) noteItem.classList.add("active");
    
    noteItem.innerHTML = `
      <div class="note-journal">${note.journal}</div>
      <div class="note-title">${note.title}</div>
      <div class="note-date">${note.date}</div>
    `;
    
    noteItem.onclick = () => {
      openNote(note.id);
    };
    notesList.appendChild(noteItem);
  });
}

// Create a new note
function createNote() {
  const id = Date.now();
  const date = new Date().toLocaleString();
  currentNoteId = id;
  const newNote = { id, journal: "", title: "", content: "", date };
  notes.push(newNote);
  saveNotes();
  renderNotes();
  openNote(id);
}

// Open a note in editor
function openNote(id) {
  currentNoteId = id;
  const note = notes.find(n => n.id === id);
  journalNameInput.value = note.journal;
  noteTitleInput.value = note.title;
  noteContentInput.value = note.content;
  noteEditor.style.display = "flex";
  renderNotes();
}

// Save current note
function saveNote() {
  if (!currentNoteId) return;
  const note = notes.find(n => n.id === currentNoteId);
  note.journal = journalNameInput.value || "Untitled Journal";
  note.title = noteTitleInput.value || "Untitled Note";
  note.content = noteContentInput.value || "";
  saveNotes();
  renderNotes();
  alert("Note saved!");
}

// Delete current note
function deleteNote() {
  if (!currentNoteId) return;
  const confirmed = confirm("Are you sure you want to delete this note?");
  if (!confirmed) return;
  notes = notes.filter(n => n.id !== currentNoteId);
  currentNoteId = null;
  noteEditor.style.display = "none";
  saveNotes();
  renderNotes();
}

// Show solution
function showSolution() {
  if (!currentNoteId) return;
  const confirmed = confirm("Are you sure you want to view the solution?");
  if (!confirmed) return;
  const note = notes.find(n => n.id === currentNoteId);
  noteContentInput.value = "🔹 SOLUTION TO CASE 🔹\n\nThe culprit was Officer X who accessed the locker at 02:17 AM. Check episode S02E14 for full case details.";
  saveNote();
}

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Event listeners
newNoteBtn.addEventListener("click", createNote);
saveNoteBtn.addEventListener("click", saveNote);
deleteNoteBtn.addEventListener("click", deleteNote);
showSolutionBtn.addEventListener("click", showSolution);

// Initial render
renderNotes();
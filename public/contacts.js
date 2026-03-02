const contacts = [
  {
    id: 1,
    fullName: "Frank Reynolds",
    personalTitle: "Precinct Commander",
    nickname: "Frank",
    rank: "Captain",
    badgeId: "C-1001",
    email: "frank.reynolds@b99precinct.gov",
    caseInvolvement: "Authorized security override codes recently.\nSuspicious communication logs detected.\nUnder review for possible internal involvement.\nNext meeting scheduled: 2026-03-05 09:00.",
    suspicionLevel: 75,
    confidentialNote: "CONFIDENTIAL: Security override code used matches captain-level clearance.",
    profilePic: "images/frank_reynolds.jpg",
    contactLabel: "work"
  },
  {
    id: 2,
    fullName: "Rosa Diaz",
    personalTitle: "Detective",
    nickname: "Rosa",
    rank: "Detective",
    badgeId: "D-2307",
    email: "rosa.diaz@b99precinct.gov",
    caseInvolvement: "Strongly suspected in the recent undercover operation.\nNo direct evidence found yet.\nKeep under observation.",
    suspicionLevel: 45,
    confidentialNote: "CONFIDENTIAL: Undercover contacts pending clearance approval.",
    profilePic: "images/rosa_diaz.jpg",
    contactLabel: "work"
  },
  {
    id: 3,
    fullName: "Terry Jeffords",
    personalTitle: "Sergeant",
    nickname: "Terry",
    rank: "Sergeant",
    badgeId: "S-1234",
    email: "terry.jeffords@b99precinct.gov",
    caseInvolvement: "Handling all lab results.\nConfirmed no involvement in current case.\nReliable and trustworthy.",
    suspicionLevel: 10,
    confidentialNote: "CONFIDENTIAL: Positive performance record.",
    profilePic: "images/terry_jeffords.jpg",
    contactLabel: "work"
  }
];

const contactsList = document.getElementById("contactsList");
const profileWindow = document.getElementById("officerProfileWindow");

const profileFields = {
  fullName: document.getElementById("fullName"),
  personalTitle: document.getElementById("personalTitle"),
  nickname: document.getElementById("nickname"),
  rank: document.getElementById("rank"),
  badgeId: document.getElementById("badgeId"),
  email: document.getElementById("email"),
  caseInvolvement: document.getElementById("caseInvolvement"),
  suspicionFill: document.getElementById("suspicionFill"),
  confidentialBox: document.getElementById("confidentialBox"),
  profileImg: document.getElementById("profileImg"),
  personalNotes: document.getElementById("personalNotes"),
  saveNotesBtn: document.getElementById("saveNotesBtn")
};

function createContactElement(contact) {
  const container = document.createElement("div");
  container.className = "contact-item";

  // Contact info area (avatar + name + label)
  const contactInfo = document.createElement("div");
  contactInfo.className = "contact-info";
  contactInfo.onclick = () => showProfile(contact.id);

  const avatar = document.createElement("div");
  avatar.className = "contact-avatar";
  const img = document.createElement("img");
  img.src = contact.profilePic;
  img.alt = contact.fullName + " profile";
  avatar.appendChild(img);

  const names = document.createElement("div");
  names.className = "contact-names";

  const nameEl = document.createElement("div");
  nameEl.className = "contact-name";
  nameEl.textContent = contact.fullName;

  const labelEl = document.createElement("div");
  labelEl.className = "contact-label";
  labelEl.textContent = contact.contactLabel || "work";

  names.appendChild(nameEl);
  names.appendChild(labelEl);

  contactInfo.appendChild(avatar);
  contactInfo.appendChild(names);

  // Info button on the right side
  const infoBtn = document.createElement("button");
  infoBtn.className = "info-button";
  infoBtn.textContent = "i";
  infoBtn.title = "View details";
  infoBtn.onclick = e => {
    e.stopPropagation();
    showProfile(contact.id);
  };

  container.appendChild(contactInfo);
  container.appendChild(infoBtn);

  return container;
}

// Populate the contacts list
contacts.forEach(contact => {
  const contactEl = createContactElement(contact);
  contactsList.appendChild(contactEl);
});

// Show profile of selected contact
function showProfile(contactId) {
  const contact = contacts.find(c => c.id === contactId);
  if (!contact) return;

  profileFields.fullName.textContent = contact.fullName;
  profileFields.personalTitle.textContent = contact.personalTitle;
  profileFields.nickname.textContent = contact.nickname;
  profileFields.rank.textContent = contact.rank;
  profileFields.badgeId.textContent = contact.badgeId;
  profileFields.email.textContent = contact.email;
  profileFields.caseInvolvement.textContent = contact.caseInvolvement;
  profileFields.confidentialBox.textContent = contact.confidentialNote;
  profileFields.profileImg.src = contact.profilePic;

  profileFields.suspicionFill.style.width = contact.suspicionLevel + "%";

  // Load saved notes from localStorage
  const savedNotes = localStorage.getItem("notes_" + contact.id);
  profileFields.personalNotes.value = savedNotes || "";

  profileWindow.style.display = "flex";
}

// Save notes to localStorage
profileFields.saveNotesBtn.onclick = () => {
  if (!profileWindow.style.display || profileWindow.style.display === "none") return;

  const currentContact = contacts.find(c => c.fullName === profileFields.fullName.textContent);
  if (!currentContact) return;

  localStorage.setItem("notes_" + currentContact.id, profileFields.personalNotes.value);
  alert("Notes saved.");
};

// Close profile panel
function closeProfile() {
  profileWindow.style.display = "none";
}
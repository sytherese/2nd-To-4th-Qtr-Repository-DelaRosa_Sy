const folders = {
    "Documents": ["Report1.txt", "Plan.docx", "Notes.pdf"],
    "Cases": {
        "Case 001": ["Evidence1.jpg", "Evidence2.txt"],
        "Case 002": ["Photo.png", "Notes.txt"]
    },
    "Archived": ["Old1.zip", "Old2.zip"],
    "Misc": ["Random.png", "Misc.txt"]
};

let folderStack = [];

function openFolder(folderName) {
    const main = document.getElementById("filesMain");
    const backBtn = document.getElementById("backButton");
    const folderList = document.getElementById("folderList");
    const sidebarTitle = document.getElementById("sidebarTitle");
    const previewTitle = document.getElementById("previewTitle");
    const previewContent = document.getElementById("previewContent");

    if (folderStack.length === 0 || folderStack[folderStack.length-1] !== folderName) {
        folderStack.push(folderName);
    }

    main.innerHTML = "";
    previewTitle.innerText = "File Info";
    previewContent.innerHTML = "<p>Select a file to see details here.</p>";

    backBtn.style.display = "block";
    folderList.style.display = "none";
    sidebarTitle.innerText = folderName.toUpperCase();

    let items = folders[folderName];

    if (typeof items === "object" && !Array.isArray(items)) {
        for (let subFolder in items) {
            const div = document.createElement("div");
            div.className = "file-item";
            div.onclick = () => openSubFolder(folderName, subFolder);

            const img = document.createElement("img");
            img.src = "images/folder_icon.png";

            const span = document.createElement("span");
            span.innerText = subFolder;

            div.appendChild(img);
            div.appendChild(span);
            main.appendChild(div);
        }
    } else {
        items.forEach(file => {
            const div = document.createElement("div");
            div.className = "file-item";
            div.onclick = () => showPreview(file);

            const img = document.createElement("img");
            img.src = file.endsWith(".jpg") || file.endsWith(".png") ? "images/file_icon.png" : "images/file_icon.png";

            const span = document.createElement("span");
            span.innerText = file;

            div.appendChild(img);
            div.appendChild(span);
            main.appendChild(div);
        });
    }
}

function openSubFolder(parent, subFolder) {
    folderStack.push(subFolder);
    const main = document.getElementById("filesMain");
    const previewTitle = document.getElementById("previewTitle");
    const previewContent = document.getElementById("previewContent");

    main.innerHTML = "";
    previewTitle.innerText = "File Info";
    previewContent.innerHTML = "<p>Select a file to see details here.</p>";

    let items = folders[parent][subFolder];

    items.forEach(file => {
        const div = document.createElement("div");
        div.className = "file-item";
        div.onclick = () => showPreview(file);

        const img = document.createElement("img");
        img.src = file.endsWith(".jpg") || file.endsWith(".png") ? "images/file_icon.png" : "images/file_icon.png";

        const span = document.createElement("span");
        span.innerText = file;

        div.appendChild(img);
        div.appendChild(span);
        main.appendChild(div);
    });
}

function goBack() {
    folderStack.pop();
    if (folderStack.length === 0) {
        document.getElementById("folderList").style.display = "block";
        document.getElementById("backButton").style.display = "none";
        document.getElementById("sidebarTitle").innerText = "Folders";
        document.getElementById("filesMain").innerHTML = "";
    } else {
        const prev = folderStack[folderStack.length-1];
        openFolder(prev);
    }
}

function showPreview(file) {
    const previewContent = document.getElementById("previewContent");
    const previewTitle = document.getElementById("previewTitle");

    previewTitle.innerText = file;
    previewContent.innerHTML = `
        <p>Description: This is ${file}</p>
        <p>Size: 1.2MB</p>
        <p>Created: 02/22/2026</p>
    `;
}

function closePreview() {
    const previewContent = document.getElementById("previewContent");
    const previewTitle = document.getElementById("previewTitle");

    previewTitle.innerText = "File Info";
    previewContent.innerHTML = "<p>Select a file to see details here.</p>";
}

function toggleSidebar() {
    const sidebar = document.getElementById("filesSidebar");
    sidebar.classList.toggle("collapsed");
}
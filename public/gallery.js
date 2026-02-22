const descriptions = {
    1: "Photo 1: Evidence locker exterior at 02:14 AM.",
    2: "Photo 2: Hallway security camera footage.",
    3: "Photo 3: Fingerprint results from locker handle.",
    4: "Photo 4: Badge fragment found near storage.",
    5: "Photo 5: Officer Daniels' notes scanned.",
    6: "Photo 6: Suspect sketch from witness statements.",
    7: "Photo 7: Lab report with chemical analysis."
};

function openImage(id) {
    document.getElementById("galleryGrid").style.display = "none";
    document.getElementById("imageView").style.display = "flex";

    document.getElementById("fullImage").src = "images/photo" + id + ".jpg";
    document.getElementById("imageText").innerText = descriptions[id];
}

function closeImage() {
    document.getElementById("galleryGrid").style.display = "grid";
    document.getElementById("imageView").style.display = "none";
}

function loadSection(section) {
    const grid = document.getElementById("galleryGrid");
    grid.innerHTML = "";

    let images = [];
    if(section === 'favorites') images = [1, 3, 5];
    else if(section === 'recent') images = [2, 4, 6];
    else images = [1,2,3,4,5,6,7];

    images.forEach(id => {
        const div = document.createElement("div");
        div.className = "thumb";
        div.onclick = () => openImage(id);
        const img = document.createElement("img");
        img.src = "images/photo" + id + ".jpg";
        div.appendChild(img);
        grid.appendChild(div);
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById("gallerySidebar");
    sidebar.classList.toggle("collapsed");
}
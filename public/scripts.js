// Example JavaScript for interactivity (e.g., opening a specific page)
document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('click', (event) => {
        const section = event.target.closest('.icon').innerText.trim().toLowerCase();
        window.location.href = `${section}.html`;
    });
});

function closeInstructions() {
    document.querySelector(".how-it-works").style.display = "none";
    document.querySelector(".instruction-overlay").style.display = "none";
    document.querySelector(".desktop").style.opacity = "1";
}

function clearDesktopSelection() {
    document.querySelectorAll(".icon").forEach(icon => {
        icon.classList.remove("selected");
    });
}

document.querySelectorAll(".icon").forEach(icon => {
    icon.addEventListener("click", function () {
        clearDesktopSelection();
        this.classList.add("selected");
    });
});
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

const toggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");
const backdrop = document.getElementById("sidebarBackdrop");

if (toggle && sidebar && backdrop) {
  // toggle open/close
  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    backdrop.classList.toggle('show');
  });

  // click outside to close
  backdrop.addEventListener('click', () => {
    sidebar.classList.remove('open');
    backdrop.classList.remove('show');
  });

  // close when a sidebar link is clicked
  sidebar.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('show');
    });
  });

  // close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      sidebar.classList.remove('open');
      backdrop.classList.remove('show');
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".episode-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const link = card.dataset.link; 
      if (link) {
        window.location.href = link;
      }
    });
  });
});

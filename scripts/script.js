// Fonction pour activer/désactiver le mode sombre
function toggleDarkMode() {
  // Ajoute ou enlève la classe 'dark' sur le body
  document.body.classList.toggle('dark');
  
  // Change l'icône en fonction du mode
  const lightIcon = document.getElementById('light-icon');
  if (document.body.classList.contains('dark')) {
    lightIcon.textContent = 'light_mode'; // Icône pour le mode clair
  } else {
    lightIcon.textContent = 'dark_mode'; // Icône pour le mode sombre
  }
}
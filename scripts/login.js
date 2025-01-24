document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const emailError = document.querySelectorAll(".erreur")[0];
    const passwordError = document.querySelectorAll(".erreur")[1];
    const loginError = document.getElementById("error");
  
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      // Récupération des valeurs saisies
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
  
      // Validation de base des champs
      let isValid = true;
      if (!email) {
        emailError.textContent = "Veuillez entrer un email valide.";
        emailError.classList.remove("hidden");
        isValid = false;
      } else {
        emailError.classList.add("hidden");
      }
  
      if (!password) {
        passwordError.textContent = "Veuillez entrer un mot de passe valide.";
        passwordError.classList.remove("hidden");
        isValid = false;
      } else {
        passwordError.classList.add("hidden");
      }
  
      if (!isValid) return;
  
      try {
        // Requête au serveur JSON ou API
        const response = await fetch("http://localhost:3000/users");
        const users = await response.json();
  
        // Vérification des informations
        const user = users.find((u) => u.email === email && u.password === password);
  
        if (user) {
          loginError.classList.add("hidden");
  
          // Redirection après succès
          window.location.href = `listeTache.html?userId=${user.id}`;
        } else {
          loginError.textContent = "Email ou mot de passe incorrect.";
          loginError.classList.remove("hidden");
        }
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        loginError.textContent = "Une erreur s'est produite. Veuillez réessayer.";
        loginError.classList.remove("hidden");
      }
    });
  });
  
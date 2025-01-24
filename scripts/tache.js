const tbodyTache = document.getElementById("tbodyTache");
const addTacheForm = document.getElementById("addTacheForm"); 
const tacheInput = document.getElementById("tacheInput"); 
const filterInput = document.getElementById("filterInput"); 
const inputTacheError =document.getElementById("inputTacheError");

let allTache = [];
// Récupère l'ID de l'utilisateur depuis l'URL
const userId = new URLSearchParams(window.location.search).get('userId'); 

// Fonction pour récupérer les tâches
async function fetchTache() {
    try {
        const response = await fetch('http://localhost:3000/taches');
        const data = await response.json();
        allTache = data;
        const userTaches = allTache.filter(tache => tache.userId == userId);
        const filterTaches = filterTache(userTaches);
        displayTaches(filterTaches);
    } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
    }
}

// Fonction pour appliquer le filtre
function filterTache(taches) {
    const filterText = filterInput.value.trim().toLowerCase(); 

    if (!filterText) {
        return taches; 
    }
    return taches.filter(tache => tache.nom_tache.toLowerCase().includes(filterText));
}

// Fonction pour afficher les tâches dans le tableau
function displayTaches(taches) {
    tbodyTache.innerHTML = "";
    taches.forEach((tache) => {
        const row = document.createElement("tr");
        row.innerHTML = `
               <td class="p-2">
                    <input type="checkbox" class="w-4 h-4">
                  </td>
                <td class="py-2 px-4">${tache.nom_tache}</td>
                <td class="py-2 px-4 flex items-center cursor-pointer">
                  <i class="material-icons text-green-500" data-modal-target="static_edit-modal" data-modal-toggle="static_edit-modal">edit</i>
                  <i class="material-icons text-red-500 mr-2" data-modal-target="static-modal" data-modal-toggle="static-modal">delete</i>
                </td>
        `;
        tbodyTache.appendChild(row); 
    });
}

// Fonction pour ajouter une nouvelle tâche
async function addTache(event) {
    event.preventDefault(); // Empêche l'envoi par défaut du formulaire
    const nomTache = tacheInput.value.trim();
    if (!nomTache) {
        inputTacheError.textContent = "Veuillez entrer le nom de la tâche.";
        inputTacheError.classList.remove("hidden");
        return;

      } else {
        inputTacheError.classList.add("hidden");
      }
    try {
        const newTache = {
            nom_tache: nomTache,
            userId: userId // Lier la tâche à l'utilisateur connecté
        };

        // Envoi de la nouvelle tâche au serveur
        const response = await fetch('http://localhost:3000/taches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTache),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout de la tâche.");
        }

        // Réinitialiser le champ de saisie
        tacheInput.value = '';

        // Rafraîchir la liste des tâches après ajout
        fetchTache();
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la tâche:', error);
        alert("Impossible d'ajouter la tâche. Veuillez réessayer.");
    }
}

// Ajouter un écouteur d'événement au formulaire pour l'ajout de tâche
addTacheForm.addEventListener('submit', addTache);

// Ajouter un écouteur d'événement pour le champ de filtre
filterInput.addEventListener('input', () => {
    // Appeler fetchTache pour appliquer le filtre à chaque saisie
    fetchTache();
});

// Appeler la fonction fetchTache pour récupérer et afficher les données
fetchTache();

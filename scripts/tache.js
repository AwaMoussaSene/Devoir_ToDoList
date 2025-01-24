const tbodyTache = document.getElementById("tbodyTache");
const addTacheForm = document.getElementById("addTacheForm"); // Le formulaire pour ajouter une tâche
const tacheInput = document.getElementById("tacheInput"); // L'input où l'utilisateur écrit la tâche

let allTache = [];
const userId = new URLSearchParams(window.location.search).get('userId'); // Récupère l'ID de l'utilisateur depuis l'URL

// Fonction pour récupérer les tâches
async function fetchTache() {
    try {
        const response = await fetch('http://localhost:3000/taches');
        const data = await response.json();
        allTache = data;

        // Filtrer les tâches pour l'utilisateur connecté
        const userTaches = allTache.filter(tache => tache.userId == userId);

        // Appeler la fonction pour afficher les tâches après récupération des données
        displayTaches(userTaches);
    } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
        alert("Impossible de charger les tâches. Veuillez réessayer plus tard.");
    }
}

// Fonction pour afficher les tâches dans le tableau
function displayTaches(taches) {
    // Réinitialiser le contenu du tableau
    tbodyTache.innerHTML = "";

    // Parcourir toutes les tâches et les ajouter au tableau
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
        tbodyTache.appendChild(row); // Ajouter la ligne au tableau
    });
}

// Fonction pour ajouter une nouvelle tâche
async function addTache(event) {
    event.preventDefault(); // Empêche l'envoi par défaut du formulaire

    const nomTache = tacheInput.value.trim();

    if (!nomTache) {
        alert("Veuillez entrer le nom de la tâche.");
        return;
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

// Ajouter un écouteur d'événement au formulaire
addTacheForm.addEventListener('submit', addTache);

// Appeler la fonction fetchTache pour récupérer et afficher les données
fetchTache();

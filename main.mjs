function calculerQuantite(somme, valeur) {
  const quantite = Math.floor(somme / valeur); // Calculate the quantity for the value
  const reste = somme % valeur; // Calculate the remainder after using this value
  return { quantite, reste }; // Return the results as an object
}

function rendreLaMonnaieWhile(sommeARendre) {
  const valeurs = [200, 100, 50, 20, 10, 5, 2, 1]; // Array of available values
  const resultat = {}; // Object to store the results
  let reste = sommeARendre; // Amount remaining to be returned
  let i = 0; // Index of the values array

  while (i < valeurs.length && reste > 0) {
    const valeur = valeurs[i]; // Get the current value
    const { quantite, reste: nouveauReste } = calculerQuantite(reste, valeur); // Calculate quantities and remainder
    resultat[valeur] = quantite; // Add the corresponding quantity to the result
    reste = nouveauReste; // Update the remaining amount
    i++; // Move to the next value
  }

  // Merge and return as an array of structured objects
  return Object.values(
    Object.assign(
      {
        200: { valeur: 200, quantite: 0 },
        100: { valeur: 100, quantite: 0 },
        50: { valeur: 50, quantite: 0 },
        20: { valeur: 20, quantite: 0 },
        10: { valeur: 10, quantite: 0 },
        5: { valeur: 5, quantite: 0 },
        2: { valeur: 2, quantite: 0 },
        1: { valeur: 1, quantite: 0 },
      },
      Object.fromEntries(
        Object.entries(resultat).map(([key, quantite]) => [
          key,
          { valeur: parseInt(key), quantite },
        ])
      )
    )
  );
}

document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault();
  console.log("click");
  let amount = document.getElementById("amount").valueAsNumber || 0;

  let change = rendreLaMonnaieWhile(amount);

  console.log(change);

  document.getElementById("result").innerHTML = change
    .map((item) => `${item.valeur}€: ${item.quantite}`)
    .join("</br>");
});

document.getElementById("amount").addEventListener("input", function () {
  let amount = document.getElementById("amount").valueAsNumber;
  document.getElementById("submit").disabled = isNaN(amount) || amount <= 0;
});

// Initialize the button state on page load
document.getElementById("submit").disabled = true;

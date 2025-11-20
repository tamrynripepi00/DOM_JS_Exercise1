      const generateButton = document.getElementById("generateButton");
      const resetButton = document.getElementById("resetButton");
      const spellArea = document.getElementById("spellArea");
      const ingredients = document.querySelectorAll("#ingredientsList li");

      let sparkleInterval; // for sparkles

      // Generate a random color
      function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      // Generate random integer
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

      // Create sparkle effect
      function createSparkle() {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");

        const rect = spellArea.getBoundingClientRect();
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;

        sparkle.style.left = x + "px";
        sparkle.style.top = y + "px";

        sparkle.style.backgroundColor = getRandomColor();

        spellArea.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 900);
      }

      // Generate a spell with 3-second countdown
      function generateSpell() {
        clearInterval(sparkleInterval); // Stop previous sparkles
        document.querySelectorAll(".sparkle").forEach((s) => s.remove()); // Remove old sparkles

        let count = 3; // countdown
        spellArea.style.backgroundColor = "#fff";
        spellArea.style.boxShadow = "none";

        const countdownInterval = setInterval(() => {
          if (count > 0) {
            spellArea.textContent = `✨ ${count} ✨`; // show countdown
            count--;
          } else {
            clearInterval(countdownInterval);

            // Pick a random ingredient
            const randomIndex = getRandomInt(ingredients.length);
            const randomIngredient = ingredients[randomIndex].textContent;

            // Show spell
            spellArea.textContent = `✨ Your spell includes: ${randomIngredient}! ✨`;

            // Change background color and glow
            const newColor = getRandomColor();
            spellArea.style.backgroundColor = newColor;
            spellArea.style.boxShadow = `0 0 20px ${newColor}`;

            // Start sparkles
            sparkleInterval = setInterval(createSparkle, 120);
          }
        }, 1000);
      }

      // Reset spell area
      function resetSpell() {
        spellArea.textContent = "Magical spell...";
        spellArea.style.backgroundColor = "red";
        spellArea.style.boxShadow = "none";

        clearInterval(sparkleInterval);
        document.querySelectorAll(".sparkle").forEach((s) => s.remove());
      }

      // Event listeners
      generateButton.addEventListener("click", generateSpell);
      resetButton.addEventListener("click", resetSpell);
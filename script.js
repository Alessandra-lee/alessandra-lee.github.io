let playerName = "YOU"; // Default name

// Get references to the DOM elements
const titleScreen = document.getElementById("title-screen");
const playerNameInput = document.getElementById("player-name");
const startGameButton = document.getElementById("start-game-button");
const gameContainer = document.getElementById("game-container");
const characterName = document.getElementById("character-name");
const dialogueBox = document.getElementById("dialogue-box");
const sprite = document.getElementById("sprite");

const dialogues = [
    { name: "", text: "FRIDAY, 5:50PM, INTDES CORPORATIONS" },
    { name: playerName, text: "It's 10 minutes before work ends... surely I can leave early right...?" },
    { name: "", text: "ding!" },
    { name: playerName, text: "An email just before I clock off? Seriously?" },
    { name: playerName, text: "...and it's an important one too..." },
    { name: playerName, text: "* sigh * I'm too tired to respond to this..." },
    { name: "???", text: "Hey there!" },
    { name: "K8", text: "I'm K8! Your trusty *AI assistant!*" },
    { name: "K8", text: "Yup, an AI assistant. Specially sent from the AI realm to show you the wonders of *generative AI*!" },
    { name: "K8", text: "*Generative AI* is AI that specialises in *creating new content*" },
    { name: "K8", text: "you can use it to generate *text, images, music, videos, and so much more!*" },
    { name: "K8", text: "Let's start with *ChatGPT!*" },
    { name: "K8", text: "You HAVE to know it...*ChatGPT* can do almost anything! It can generate text, images, and even code!" },
    { name: "K8", text: "It can help you *plan itineraries, fix your grammar, write resumes...*" },
    { name: "K8", text: "And in your case, *draft an email*... Which can all be done in 10 minutes tops!" },
    { name: "K8", text: "What are you waiting for? Open ChatGPT!" },
];

let dialogueIndex = 0;

// Start the game when the "Start Game" button is clicked
startGameButton.addEventListener("click", () => {
  const inputName = playerNameInput.value.trim();
  if (inputName) {
    playerName = inputName; // Set the player's name
    dialogues.forEach(dialogue => {
      if (dialogue.name === "YOU") dialogue.name = playerName;
    });
  }

  titleScreen.style.display = "none";
  gameContainer.style.display = "block";

  startGame();
});

function startGame() {
  characterName.textContent = dialogues[dialogueIndex].name;
  addDialogueText(dialogues[dialogueIndex].text);
  updateSpriteVisibility(dialogues[dialogueIndex].name);

  // Hide the character name box if the name is empty
  checkCharacterNameVisibility(dialogues[dialogueIndex].name);

  // Handle dialogue clicks
  dialogueBox.addEventListener("click", () => {
    if (dialogueIndex === 6) {  // After K8 introduction
      if (!document.getElementById('choice-container')) {
        createChoices();
      }
    } else if (dialogueIndex === 7) {  // After K8 talks about generative AI
      if (!document.getElementById('second-choice-container')) {
        createSecondChoices(); // Create second set of choices
      }
    } else if (dialogueIndex === 8) {  // After second choices
      if (!document.getElementById('third-choice-container')) {
        createThirdChoices(); // Create third set of choices
      }
    } else if (dialogueIndex === 11) {  
      if (!document.getElementById('fourth-choice-container')) {
        createFourthChoices(); // Create fourth set of choices
      }
    } else if (dialogueIndex === 15) {  // After the "Let's go!" dialogue
      // Save the player name and current dialogueIndex in localStorage
      localStorage.setItem("playerName", playerName);
      localStorage.setItem("dialogueIndex", dialogueIndex);
    
      // Redirect to secondsegment.html
      window.location.href = "secondsegment.html";
    } else if (dialogueIndex < dialogues.length - 1) {
      dialogueIndex++;
      characterName.textContent = dialogues[dialogueIndex].name;

      // Hide the character name box if the name is empty
      checkCharacterNameVisibility(dialogues[dialogueIndex].name);

      addDialogueText(dialogues[dialogueIndex].text);
      updateSpriteVisibility(dialogues[dialogueIndex].name);
    } else {
      addDialogueText("Let's go!");
    }
  });
}

  

// Function to check if character name should be hidden
function checkCharacterNameVisibility(name) {
  if (name === "") {
    characterName.style.display = "none"; // Hide the character name box
    sprite.style.display = "none"; // Hide the sprite as well
  } else {
    characterName.style.display = "block"; // Show the character name box
    sprite.style.display = "block"; // Show the sprite
  }
}

// Function to add dialogue text with animation
function addDialogueText(text) {
  dialogueBox.innerHTML = ''; // Clear the dialogue box

  // Replace markers with styled spans
  const styledText = text
      .replace(/\*([^\*]+)\*/g, '<span class="jersey10">$1</span>'); // For *word*

  const newLine = document.createElement('p');
  newLine.innerHTML = styledText; // Use innerHTML to render styled text
  newLine.classList.add('dialogue-line'); // This will trigger the animation
  dialogueBox.appendChild(newLine);

  // Check if the dialogue text is "ding!" to show the image
if (text === "ding!") {
  const popupImage = document.createElement('img');
  popupImage.src = "Assets/Images/email2.png"; // Replace with your image path
  popupImage.alt = "Popup Image";
  popupImage.style.position = "absolute";
  popupImage.style.top = "calc(50% - 150px)"; // Adjust top to position above the dialogue box (150px can be adjusted)
  popupImage.style.left = "50%";
  popupImage.style.transform = "translateX(-50%)"; // Center horizontally
  popupImage.style.zIndex = "1000";
  popupImage.style.width = "200px"; // Set the image width (adjust size here)
  popupImage.style.height = "auto"; // Maintain aspect ratio
  popupImage.style.animation = "fadeIn 1s ease-out forwards"; // Optional fade-in animation

  // Add the image to the DOM
  gameContainer.appendChild(popupImage);

  // Play the ding sound
  const dingSound = new Audio('Assets/sounds/notification.mp3'); // Replace with your actual sound file path
  dingSound.play();

  // Set up a listener to remove the image once the specific dialogue is reached
  const checkDialogue = setInterval(() => {
      if (dialogueIndex >= 4 && dialogueIndex < dialogues.length) {  // When the dialogue reaches "An email just before I clock off? Seriously?"
          clearInterval(checkDialogue); // Stop checking once we reach the correct dialogue
          popupImage.remove(); // Remove the image from the DOM
      }
  }, 100); // Check every 100 milliseconds (you can adjust the frequency as needed) 
  }
if (text === "...and it's an important one too...") {
  console.log("Adding second image...");
  const popupImage2 = document.createElement('img');
  popupImage2.src = "Assets/Images/fullemail.png"; // Replace with your second image path
  popupImage2.alt = "Popup Image 2";
  popupImage2.style.position = "absolute";
  popupImage2.style.top = "calc(50% - 318px)"; // 150px + 168px = 318px (adjust accordingly)
  popupImage2.style.left = "50%";
  popupImage2.style.transform = "translateX(-50%)"; // Center horizontally
  popupImage2.style.zIndex = "3";
  popupImage2.style.width = "960px"; // Set the image width
  popupImage2.style.height = "auto"; // Maintain aspect ratio
  popupImage2.style.animation = "fadeIn 1s ease-out forwards"; // Optional fade-in animation

  // Add the image to the DOM
  gameContainer.appendChild(popupImage2);

  // Set up a listener to remove the image once the specific dialogue is reached
  const checkDialogue2 = setInterval(() => {
      if (dialogueIndex >= 6) {  // When the dialogue reaches "sigh..."
          clearInterval(checkDialogue2); // Stop checking once we reach the correct dialogue
          popupImage2.remove(); // Remove the image from the DOM
      }
  }, 100); // Check every 100 milliseconds
}

}



// Function to update sprite visibility
function updateSpriteVisibility(name) {
  if (name === "K8" || name === "???") {
    sprite.style.animation = 'fadeIn 2s ease-out forwards';
    sprite.style.opacity = 1;
  } else {
    sprite.style.opacity = 0;
  }
}

// Function to create first set of choice buttons
function createChoices() {
  const choiceContainer = document.createElement('div');
  choiceContainer.id = 'choice-container';

  const choice1 = document.createElement('button');
  choice1.textContent = "Hello...?";
  choice1.classList.add('choice-button');
  choice1.addEventListener('click', handleChoice);

  const choice2 = document.createElement('button');
  choice2.textContent = "WHO ARE YOU?";
  choice2.classList.add('choice-button');
  choice2.addEventListener('click', handleChoice);

  choiceContainer.appendChild(choice1);
  choiceContainer.appendChild(choice2);

  gameContainer.appendChild(choiceContainer);
}

// Function to create second set of choice buttons
function createSecondChoices() {
  const secondChoiceContainer = document.createElement('div');
  secondChoiceContainer.id = 'second-choice-container';

  const choice1 = document.createElement('button');
  choice1.textContent = "AI...?";
  choice1.classList.add('choice-button');
  choice1.addEventListener('click', handleChoice);

  const choice2 = document.createElement('button');
  choice2.textContent = "Assistant...?";
  choice2.classList.add('choice-button');
  choice2.addEventListener('click', handleChoice);

  secondChoiceContainer.appendChild(choice1);
  secondChoiceContainer.appendChild(choice2);

  gameContainer.appendChild(secondChoiceContainer);
}

function createThirdChoices() {
  const thirdChoiceContainer = document.createElement('div');
  thirdChoiceContainer.id = 'third-choice-container';

  const choice1 = document.createElement('button');
  choice1.textContent = "girl what.";
  choice1.classList.add('choice-button');
  choice1.addEventListener('click', handleChoice);

  const choice2 = document.createElement('button');
  choice2.textContent = "Generative AI...?";
  choice2.classList.add('choice-button');
  choice2.addEventListener('click', handleChoice);

  thirdChoiceContainer.appendChild(choice1);
  thirdChoiceContainer.appendChild(choice2);

  gameContainer.appendChild(thirdChoiceContainer);
}

function createFourthChoices() {
  const fourthChoiceContainer = document.createElement('div');
  fourthChoiceContainer.id = 'fourth-choice-container';

  const choice1 = document.createElement('button');
  choice1.textContent = "What's ChatGPT?";
  choice1.classList.add('choice-button');
  choice1.addEventListener('click', handleChoice);

  const choice2 = document.createElement('button');
  choice2.textContent = "Why do I have to learn this now?";
  choice2.classList.add('choice-button');
  choice2.addEventListener('click', handleChoice);

  fourthChoiceContainer.appendChild(choice1);
  fourthChoiceContainer.appendChild(choice2);

  gameContainer.appendChild(fourthChoiceContainer);
}


// Function to handle choice selection
function handleChoice() {
  // Remove the choice containers if they exist
  const choiceContainer = document.getElementById('choice-container');
  const secondChoiceContainer = document.getElementById('second-choice-container');
  const thirdChoiceContainer = document.getElementById('third-choice-container');
  const fourthChoiceContainer = document.getElementById('fourth-choice-container');

  if (choiceContainer) choiceContainer.remove();
  if (secondChoiceContainer) secondChoiceContainer.remove();
  if (thirdChoiceContainer) thirdChoiceContainer.remove();
  if (fourthChoiceContainer) fourthChoiceContainer.remove();

  // Increment the dialogue index and move to the next dialogue
  dialogueIndex++;
  if (dialogueIndex < dialogues.length) {
    characterName.textContent = dialogues[dialogueIndex].name;

    // Hide the character name box if the name is empty
    checkCharacterNameVisibility(dialogues[dialogueIndex].name);

    addDialogueText(dialogues[dialogueIndex].text);
    updateSpriteVisibility(dialogues[dialogueIndex].name);
  } else {
    // Redirect to the next segment
    window.location.assign("Visual novel test/Secondsegment.html");
  }
}

// Save player data before navigating
localStorage.setItem('playerName', playerName);

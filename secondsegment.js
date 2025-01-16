// Retrieve the game state from localStorage
const playerName = localStorage.getItem("playerName") || "Player"; 
let dialogueIndex = parseInt(localStorage.getItem("dialogueIndex"), 10) || 15; 
let currentGroup = localStorage.getItem("currentGroup") || ""; // Tracks the current choice group

// Set up references to the DOM elements
const characterName = document.getElementById("character-name");
const dialogueTextContainer = document.getElementById("dialogue-text-container");
const dialogueBox = document.getElementById("dialogue-box-top");
const gameContainer = document.getElementById("game-container");

// Dialogue data
const dialogues = [
    { name: "K8", text: "Alright, let's get to work NOWWW!" },
    { name: "K8", text: "Try typing a prompt..." },
    { name: "K8", text: "Hmmm, it seems this prompt is too vague... but don't worry!", group: "choice1" },
    { name: "K8", text: "I'll teach you some good tips on how to prompt better!", group: "choice1" },
    { name: "K8", text: "Not too shabby! but...", group: "choice2" },
    { name: "K8", text: "I'll teach you some other tips to prompt better!", group: "choice2" },
    { name: "K8", text: "Firstly, let's start with you! Your PERSONA!" },
    { name: "K8", text: "Tell ChatGPT more about who you are, your role, the type of business you work for..." },
    { name: "K8", text: "Anything about yourself that is relevant to the task." },
    { name: "K8", text: "Try it!" },
    { name: "K8", text: "Write in full sentences! You can be more specific than that...let's try again", group: "choice3" },
    { name: "K8", text: "Let it know what you work as, and explain more about the company!", group: "choice3" },
    { name: "K8", text: "Great!"} ,
    { name: "K8", text: "Now, let's get to the TASK" },
    { name: "K8", text: "Let ChatGPT know what you want it to do!" },
    { name: "K8", text: "You can tell it to write an email, plan a routine...anything you want!" },
    { name: "K8", text: "Try it!"},
    { name: "K8", text: "Use more natural language, and be more specific! Who exactly is it addressed to?" , group: "choice5"},
    { name: "K8", text: "You're on fire!"},
    { name: "K8", text: "Now let's focus on adding some CONTEXT"},
    { name: "K8", text: "What other details should ChatGPT know? Are there any restrictions? The more detailed the better!"},
    { name: "K8", text: "Explain your situation clearly! Try it out for yourself." },
    { name: "K8", text: "What is the event about? What else do you want them to know?" , group: "choice 7" },
    { name: "K8", text: "Remember: The more detailed, the better!" ,group: "choice 7" },
    { name: "K8", text: "You're a fast learner!" },
    { name: "K8", text: "Last but not least, specify what FORMAT you want the response in!" },
    { name: "K8", text: "It can be in a numbered list, in bullet point form, a short paragraph... anything under the sun" },
    { name: "K8", text: "Finish your email off with this!" },
    { name: "K8", text: "Be more direct with your prompt! What exactly do you mean by neat and tidy?" , group: "choice9"},
    { name: "K8", text: "Hooray!"},
    { name: "K8", text: "Looks like ChatGPT has generated a pretty good email! Fill in the information and you can call it a day.\!" },
    { name: "K8", text: "Always remember to prompt, you need..." },
    { name: "K8", text: "your PERSONA, TASK, CONTEXT, and FORMAT " },
    { name: "K8", text: "Now you can use ChatGPT or any other AI tool to your liking!" },
];

// Start game
function startGame() {
    updateDialogue();
}

// Define backgrounds for specific dialogues (add more as needed)
const backgrounds = {
    15: "Assets/Images/Frame 5.png", // Default background
    27: "Assets/Images/Frame 12.png", // Change at this dialogue index
    33: "Assets/Images/taskaudience.png",
    39: "Assets/Images/context.png",
    44: "Assets/Images/format.png",
    45: "Assets/Images/chatgptresponse.png",
    // Add more backgrounds here
};

// Update dialogue function
function updateDialogue() {
    const currentDialogue = dialogues[dialogueIndex - 15];

    if (currentDialogue) {
        // Set background dynamically based on dialogue index
        if (backgrounds[dialogueIndex]) {
            const background = document.getElementById("background");
            background.src = backgrounds[dialogueIndex]; // Change the background image
        }

        // Show dialogues matching the current group or shared ones
        if (!currentDialogue.group || currentDialogue.group === currentGroup) {
            characterName.textContent = currentDialogue.name;
            addDialogueText(currentDialogue.text);

            // If the dialogue index is at the last dialogue, redirect
            if (dialogueIndex >= dialogues.length + 14) {
                setTimeout(() => {
                    window.location.href = 'third-segment.html'; // Redirect after the last dialogue
                }, 700); // Optional delay before redirection (in ms)
            }

            dialogueIndex++;
            localStorage.setItem("dialogueIndex", dialogueIndex);
        } else {
            // Skip dialogues outside the current group
            dialogueIndex++;
            updateDialogue();
        }
    } else {
        addDialogueText("The end of this segment.");
    }
}


/// Add dialogue text
function addDialogueText(text) {
    dialogueTextContainer.innerHTML = '';

    // Check if the dialogue should have the "jersey10" class
    const styledText = text.includes("*jersey10*") ? 
        text.replace("*jersey10*", '<span class="jersey10">jersey10</span>') : 
        text;

    const newLine = document.createElement('p');
    newLine.textContent = styledText;
    newLine.classList.add('dialogue-line');
    dialogueTextContainer.appendChild(newLine);
}


// Handle choice click
function handleChoice(outcomeIndex, group) {
    // Remove choice containers
    const choiceContainers = document.querySelectorAll('.choice-container-bottom');
    choiceContainers.forEach(container => container.remove());

    // Set dialogue index and group based on the choice
    dialogueIndex = outcomeIndex;
    currentGroup = group;

    localStorage.setItem("dialogueIndex", dialogueIndex);
    localStorage.setItem("currentGroup", currentGroup);

    updateDialogue();
}

// Create choices
function createChoices(choices) {
    // Remove existing choices first
    const existingChoices = document.querySelectorAll('.choice-container-bottom');
    existingChoices.forEach(container => container.remove());

    const choiceContainer = document.createElement('div');
    choiceContainer.className = 'choice-container-bottom';

    choices.forEach(({ text, nextIndex, group }) => {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add('choice-button-bottom');
        button.addEventListener('click', () => handleChoice(nextIndex, group));
        choiceContainer.appendChild(button);
    });

    gameContainer.appendChild(choiceContainer);
}
 dialogueBox.addEventListener("click", () => {
        // This will show the choices right after the line "Hmm...you could specify who the email is for"
        if (dialogueIndex === 17) {
            createChoices([
                { text: "Write a formal email for me", nextIndex: 17, group: "choice1" },
                { text: "Draft a formal response email to DIGJRN Services", nextIndex: 19, group: "choice2" },
            ]);
        } else if (dialogueIndex === 25) {
            createChoices([
                { text: "I work @ INTDES Corporations", nextIndex: 25, group: "choice3" },
                { text: "I'm a manager at INTDES Corporations, a company that plans events", nextIndex: 27, group: "choice3" },
            ]);
        } else if (dialogueIndex === 27) { // After selecting Choice 3
            createChoices([
                { text: "I'm a manager at INTDES Corporations, a company that plans events", nextIndex: 27, group: "choice3" },
            ]);
        } else if (dialogueIndex === 32) {
            createChoices([
                { text: "Draft email 2 DIGJRN Services", nextIndex: 32, group: "choice5" },
                { text: "Draft a formal response email to the manager of DIGJRN Services with details of the planned event", nextIndex: 33, group: "choice5" },
            ]);
        } else if (dialogueIndex === 33) {
            createChoices([
                { text: "Draft a formal response email to the manager of DIGJRN Services with details of the planned event", nextIndex: 33, group: "choice5" },
            ]);
        } else if (dialogueIndex === 36) {
            createChoices([
                { text: "We plan for the event to be at MBS from 6PM to 9PM", nextIndex: 36, group: "choice7" },
                { text: "We are planning a dinner at MBS from 6PM to 9PM. However, we can only send the full proposal at a later date.", nextIndex: 38, group: "choice7" },
            ]);
        } else if (dialogueIndex === 37) {
            createChoices([
                { text: "We are planning a dinner at MBS from 6PM to 9PM. However, we can only send the full proposal at a later date.", nextIndex: 37, group: "choice7" },
            ]);
        } else if (dialogueIndex === 43) {
            createChoices([
                { text: "Write the email neatly and tidily", nextIndex: 43, group: "choice9" },
                { text: "Write this email in short, concise, paragraphs.", nextIndex: 44, group: "choice9" },
            ]);     
        } else if (dialogueIndex === 44) {
            createChoices([
                { text: "Write this email in short, concise, paragraphs.", nextIndex: 44, group: "choice9" },
            ]);       
        
        } else {
            updateDialogue();
        }
    });
    
    
    // Start game on page load
    document.addEventListener("DOMContentLoaded", startGame);
    


// Start game on page load
document.addEventListener("DOMContentLoaded", startGame);


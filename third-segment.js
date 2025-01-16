document.addEventListener("DOMContentLoaded", () => {
    const playerName = localStorage.getItem("playerName") || "Player";
    const dialogueBox = document.getElementById("dialogue-box");
    const sprite = document.getElementById("sprite");

    const dialogues = [
        { name: "K8", text: "Now that we've gone over *ChatGPT*, how do you feel about it?" },
        { name: "K8", text: "Well, *ChatGPT* is far from the only AI tool out there!" },
        { name: "K8", text: "If you want AI tools that can help you *generate text*, you can look to *Microsoft CoPilot and Google Gemini*" },
        { name: "K8", text: "As for AI tools that help with *image generation*, *DALL E, Leonardo.AI and Adobe Firefely* are fine choices" },
        { name: "K8", text: "However, even if they're useful, some of them can be used for *harmful purposes*" },
        { name: "K8", text: "Have you ever heard of *'AI-generated misinformation...?*" },
        { name: "K8", text: "With AI getting increasingly seamless, it's hard to tell what's real or fake anymore" },
        { name: "K8", text: "AI can now *imitate writing styles, voices...*" },
        { name: "K8", text: "It can even swap the faces of people! They're called *deepfakes*" },
        { name: "K8", text: "Some people use deepfakes to scam others by using the faces and voices of popular figures" },
        { name: "K8", text: "So be sure to follow the *SURE* framework okay?" },
        { name: "K8", text: "You don't know the *SURE* framework? My Goodness... no wonder I was sent here" },
        { name: "K8", text: "in SURE, the *S* stands for *Source*" },
        { name: "K8", text: "If you're uncertain about information, check if there's any *legitimate references and see if they were written by real people*" },
        { name: "K8", text: "*U* stands for *Understand* the information you read online" },
        { name: "K8", text: "Look for facts and not opinions. *Understand the intention* behind some AI generated content to differentiate it from misinformation" },
        { name: "K8", text: "*R* stands for *Research*" },
        { name: "K8", text: "If you're suspicious of content, *do a short online search* to see if its been mentioned on credible sites" },
        { name: "K8", text: "Lastly, *E* stands for *Evaluate*" },
        { name: "K8", text: "*Understand both sides of a story*, and look for inconsistencies in confliction information" },
        { name: "K8", text: "Phew, now with that out of the way... I think it's time for a little quiz don't you think?" },
        { name: "K8", text: "If you pass this test, you and I can finally go home!" },
    ];

    let currentLine = 0;
    let waitingForChoice = false; // This flag ensures we wait for the player to make a choice

    function showNextLine() {
        if (currentLine < dialogues.length) {
            const { name, text } = dialogues[currentLine];
            addDialogueText(text);  // Add the styled text
            currentLine++;

            // Show choices after the first dialogue line
            if (currentLine === 1 && !waitingForChoice) {
                createChoices();
                waitingForChoice = true; // Set flag to wait for the choice
            }

            // Show the second set of choices after the line "So be sure to follow the SURE framework okay?"
            if (currentLine === 5 && !waitingForChoice) {
                createSecondChoices();
                waitingForChoice = true;
            }

            // Show the third set of choices
            if (currentLine === 11 && !waitingForChoice) {
                createThirdChoices();
                waitingForChoice = true;
            }

        } else {
            dialogueBox.innerHTML = `<p class="dialogue-line">Let's go!</p>`;
        
            // Redirect immediately when the player clicks on the last dialogue line
            dialogueBox.addEventListener("click", () => {
                window.location.href = "mcq.html"; // Redirect immediately
            });
        }        
    }

    showNextLine();

    dialogueBox.addEventListener("click", () => {
        if (!waitingForChoice) {
            showNextLine();
        }
    });

    sprite.style.opacity = "1";
    sprite.style.animation = "fadeIn 1s ease-out forwards";

    function handleChoiceClick(event) {
        const choiceContainers = document.querySelectorAll('.choice-container');
        choiceContainers.forEach(container => {
            container.remove();  // Remove the choice container after a choice is clicked
        });

        // Reset waitingForChoice flag and continue to the next line
        waitingForChoice = false;
        showNextLine();
    }

    // Function to create the first set of choices
    function createChoices() {
        const choiceContainer = document.createElement('div');
        choiceContainer.id = 'choice-container';
        choiceContainer.classList.add('choice-container');  // Add class for easier targeting

        const choice1 = document.createElement('button');
        choice1.textContent = "It was so cool!";
        choice1.classList.add('choice-button');
        choice1.addEventListener('click', handleChoiceClick);

        const choice2 = document.createElement('button');
        choice2.textContent = "It was okay...";
        choice2.classList.add('choice-button');
        choice2.addEventListener('click', handleChoiceClick);

        choiceContainer.appendChild(choice1);
        choiceContainer.appendChild(choice2);

        document.body.appendChild(choiceContainer); // Append to the body or game container
    }

    // Function to create the second set of choices
    function createSecondChoices() {
        const choiceContainer = document.createElement('div');
        choiceContainer.id = 'choice-container';
        choiceContainer.classList.add('choice-container');  // Add class for easier targeting

        const choice1 = document.createElement('button');
        choice1.textContent = "Harmful...?";
        choice1.classList.add('choice-button');
        choice1.addEventListener('click', handleChoiceClick);

        const choice2 = document.createElement('button');
        choice2.textContent = "What are they gonna do? Kill me?";
        choice2.classList.add('choice-button');
        choice2.addEventListener('click', handleChoiceClick);

        choiceContainer.appendChild(choice1);
        choiceContainer.appendChild(choice2);

        document.body.appendChild(choiceContainer); // Append to the body or game container
    }

    // Function to create the third set of choices
    function createThirdChoices() {
        const choiceContainer = document.createElement('div');
        choiceContainer.id = 'choice-container';
        choiceContainer.classList.add('choice-container');  // Add class for easier targeting

        const choice1 = document.createElement('button');
        choice1.textContent = "what is SURE...?";
        choice1.classList.add('choice-button');
        choice1.addEventListener('click', handleChoiceClick);

        const choice2 = document.createElement('button');
        choice2.textContent = "I SURE don't know what that means...";
        choice2.classList.add('choice-button');
        choice2.addEventListener('click', handleChoiceClick);

        choiceContainer.appendChild(choice1);
        choiceContainer.appendChild(choice2);

        document.body.appendChild(choiceContainer); // Append to the body or game container
    }

    // Function to add styled text with jersey10 and pink
    function addDialogueText(text) {
        dialogueBox.innerHTML = ''; // Clear the dialogue box

        // Replace markers with styled spans
        const styledText = text
            .replace(/\*([^\*]+)\*/g, '<span class="jersey10">$1</span>') // For *word*

        const newLine = document.createElement('p');
        newLine.innerHTML = styledText; // Use innerHTML to render styled text
        newLine.classList.add('dialogue-line'); // This will trigger the animation
        dialogueBox.appendChild(newLine);
    }
});

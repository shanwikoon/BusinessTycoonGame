// ... (previous code remains the same)

// Current question index
let currentQuestionIndex = 0;

// Function to display a question and its choices
function displayQuestion(questionIndex) {
  const question = questions[questionIndex];
  console.log(`\nQuestion ${questionIndex + 1}: ${question.question}`);
  question.choices.forEach((choice, index) => {
    console.log(`${index + 1}. ${choice.text}`);
  });
}

// Function to handle user input
function handleUserInput(input) {
  const question = questions[currentQuestionIndex];
  const choiceIndex = parseInt(input) - 1;

  if (choiceIndex >= 0 && choiceIndex < question.choices.length) {
    question.choices[choiceIndex].action();
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      displayQuestion(currentQuestionIndex);
    } else {
      endGame();
    }
  } else {
    console.log("Invalid choice. Please try again.");
    displayQuestion(currentQuestionIndex);
  }
}

// Function to end the game
function endGame() {
  console.log("\nGame Over!");
  console.log(`Final Score: ${gameState.score}`);
  console.log(`Final Funds: £${gameState.funds}`);
  console.log(`Final Employee Morale: ${gameState.morale}`);
  console.log(`Final Customer Satisfaction: ${gameState.satisfaction}`);

  // Provide final feedback based on score
  if (gameState.score >= 25) {
    console.log("Congratulations! You successfully managed your business, balancing customer satisfaction, employee morale, and funds effectively. Keep up the great leadership!");
  } else if (gameState.score >= 15) {
    console.log("Good job! You made some strong decisions, but there's still room to improve your management of funds, customer satisfaction, or morale. Review your strategies for better results next time.");
  } else {
    console.log("Your business faced challenges. You struggled to balance funds, morale, and satisfaction, leading to tough consequences. Consider focusing more on balancing decisions for better outcomes.");
  }
}

// Update the provideFeedback function
function provideFeedback(fundChange, moraleChange, satisfactionChange) {
  console.log("\nDecision Outcome:");
  if (fundChange !== 0) console.log(`Funds ${fundChange > 0 ? 'increased' : 'decreased'} by £${Math.abs(fundChange)}`);
  if (moraleChange !== 0) console.log(`Employee Morale ${moraleChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(moraleChange)}`);
  if (satisfactionChange !== 0) console.log(`Customer Satisfaction ${satisfactionChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(satisfactionChange)}`);
}

// Update the startGame function
function startGame() {
  console.log("Welcome to the Business Tycoon Game!");
  console.log("Make strategic decisions to manage your business effectively.");
  console.log("Your starting funds are £100,000. Good luck!");
  
  displayQuestion(currentQuestionIndex);
  
  // In a browser environment, you'd set up event listeners here
  // For this example, we'll use a simple prompt in a loop
  while (currentQuestionIndex < questions.length) {
    const userInput = prompt("Enter your choice (1 or 2):");
    handleUserInput(userInput);
  }
}

// Start the game
startGame();

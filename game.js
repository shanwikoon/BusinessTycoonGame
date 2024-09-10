let funds = 100000;
let morale = 50;
let satisfaction = 50;

const scenarioText = document.getElementById('scenario-text');
const fundsText = document.getElementById('funds');
const moraleText = document.getElementById('morale');
const satisfactionText = document.getElementById('satisfaction');
const feedbackText = document.getElementById('feedback');
const choicesDiv = document.getElementById('choices');
const nextButton = document.createElement('button');  // Create a 'Next' button

nextButton.innerHTML = 'Next';
nextButton.style.display = 'none'; // Initially hide the 'Next' button
nextButton.onclick = () => moveToNextScenario();  // On click, move to next scenario

choicesDiv.appendChild(nextButton);

const scenarios = [
  {
    text: "You need to decide whether to invest in marketing or hire new staff. What do you do?",
    image: "images/marketing_or_staff.jpg",  // Correct path to the image
    choices: [
      { text: "Invest in marketing", impact: { funds: -20000, satisfaction: 10, morale: -5 }, feedback: "Marketing boosted customer satisfaction but put pressure on the team!" },
      { text: "Hire new staff", impact: { funds: -30000, morale: 10, satisfaction: -5 }, feedback: "Hiring new staff improved team morale but costs increased." }
    ]
  },
  {
    text: "A customer complains about the quality of your product. Do you offer a refund or improve quality control?",
    image: "images/customer_complaint.jpg",  // Correct path to the image
    choices: [
      { text: "Offer a refund", impact: { funds: -10000, satisfaction: 5, morale: 0 }, feedback: "Refunding the customer improved satisfaction, but cost you some money." },
      { text: "Improve quality control", impact: { funds: -15000, morale: 5, satisfaction: 10 }, feedback: "Improving quality control boosted satisfaction, but it was costly." }
    ]
  },
  {
    text: "You are offered a deal with a risky new supplier. Do you take the risk for potential savings or stick with your current supplier?",
    image: "images/risky_supplier.jpg",  // Correct path to the image
    choices: [
      { text: "Take the risk", impact: { funds: 20000, morale: -5, satisfaction: -10 }, feedback: "You saved money, but the risky supplier upset your team and customers." },
      { text: "Stick with current supplier", impact: { funds: -5000, morale: 5, satisfaction: 5 }, feedback: "It cost more, but your team and customers are happy with the quality." }
    ]
  },
  {
    text: "Your team suggests introducing remote work. Do you agree?",
    image: "images/remote_work.jpg",  // Correct path to the image
    choices: [
      { text: "Allow remote work", impact: { funds: 0, morale: 15, satisfaction: 5 }, feedback: "Employee morale increased, and customers appreciated the flexibility!" },
      { text: "Stick to office work", impact: { funds: 0, morale: -10, satisfaction: 0 }, feedback: "Employees are unhappy with your decision to keep them in the office." }
    ]
  },
  {
    text: "Your competitor just released a new product. Do you respond with a big marketing campaign or wait it out?",
    image: "images/international_expansion.jpg",  // Correct path to the image
    choices: [
      { text: "Launch a marketing campaign", impact: { funds: -25000, morale: 0, satisfaction: 15 }, feedback: "Your marketing paid off! Customers are excited about your brand." },
      { text: "Wait it out", impact: { funds: 0, morale: 0, satisfaction: -5 }, feedback: "Without any action, you lost a bit of customer loyalty." }
    ]
  },
  {
    text: "An investor offers to buy a 20% share in your company for £50,000. Do you accept the offer?",
    image: "images/investor_offer.jpg",  // Correct path to the image
    choices: [
      { text: "Accept the offer", impact: { funds: 50000, morale: -5, satisfaction: 0 }, feedback: "You got the cash infusion, but your team is concerned about outside influence." },
      { text: "Reject the offer", impact: { funds: 0, morale: 5, satisfaction: 0 }, feedback: "Your team is happy you kept full control of the business." }
    ]
  }
];


let currentScenario = 0;

function updateStats(impact) {
  funds += impact.funds;
  morale += impact.morale;
  satisfaction += impact.satisfaction;

  updateDisplay(fundsText, 'Funds: £' + funds, impact.funds);
  updateDisplay(moraleText, 'Employee Morale: ' + morale + '%', impact.morale);
  updateDisplay(satisfactionText, 'Customer Satisfaction: ' + satisfaction + '%', impact.satisfaction);
}

function updateDisplay(element, text, change) {
  element.innerHTML = text;
  if (change > 0) {
    element.classList.add('positive');
    element.classList.remove('negative');
  } else if (change < 0) {
    element.classList.add('negative');
    element.classList.remove('positive');
  } else {
    element.classList.remove('positive');
    element.classList.remove('negative');
  }
}

function displayScenario() {
  const scenario = scenarios[currentScenario];
  scenarioText.innerHTML = scenario.text;
  document.getElementById('choice1').innerHTML = scenario.choices[0].text;
  document.getElementById('choice2').innerHTML = scenario.choices[1].text;
}

function makeChoice(choiceIndex) {
  const impact = scenarios[currentScenario].choices[choiceIndex - 1].impact;
  const feedback = scenarios[currentScenario].choices[choiceIndex - 1].feedback;

  updateStats(impact);
  feedbackText.innerHTML = feedback;
  feedbackText.style.color = impact.funds < 0 ? 'red' : 'green'; // Colour feedback based on the outcome

  // Hide choices and show the 'Next' button
  document.getElementById('choice1').style.display = 'none';
  document.getElementById('choice2').style.display = 'none';
  nextButton.style.display = 'inline-block';  // Show the 'Next' button
}

function moveToNextScenario() {
  currentScenario++;
  if (currentScenario < scenarios.length) {
    nextButton.style.display = 'none';  // Hide 'Next' button
    displayScenario();
    
    // Show choices again
    document.getElementById('choice1').style.display = 'inline-block';
    document.getElementById('choice2').style.display = 'inline-block';
    
    feedbackText.innerHTML = "";  // Clear the feedback
  } else {
    scenarioText.innerHTML = "Game Over! Thanks for playing.";
    nextButton.style.display = 'none';  // Hide 'Next' button
    document.getElementById('choices').style.display = 'none';  // Hide choices
  }
}

displayScenario();
updateStats({ funds: 0, morale: 0, satisfaction: 0 });  // Initial display without any changes

let funds = 100000;
let morale = 50;
let satisfaction = 50;

const scenarioText = document.getElementById('scenario-text');
const fundsText = document.getElementById('funds');
const moraleText = document.getElementById('morale');
const satisfactionText = document.getElementById('satisfaction');

const scenarios = [
  {
    text: "You need to decide whether to invest in marketing or hire new staff. What do you do?",
    choices: [
      { text: "Invest in marketing", impact: { funds: -20000, satisfaction: 10, morale: -5 } },
      { text: "Hire new staff", impact: { funds: -30000, morale: 10, satisfaction: -5 } }
    ]
  },
  {
    text: "A customer complains about the quality of your product. Do you offer a refund or improve quality control?",
    choices: [
      { text: "Offer a refund", impact: { funds: -10000, satisfaction: 5, morale: 0 } },
      { text: "Improve quality control", impact: { funds: -15000, morale: 5, satisfaction: 10 } }
    ]
  }
];

let currentScenario = 0;

function updateStats() {
  fundsText.innerHTML = `Funds: $${funds}`;
  moraleText.innerHTML = `Employee Morale: ${morale}%`;
  satisfactionText.innerHTML = `Customer Satisfaction: ${satisfaction}%`;
}

function displayScenario() {
  const scenario = scenarios[currentScenario];
  scenarioText.innerHTML = scenario.text;
  document.getElementById('choice1').innerHTML = scenario.choices[0].text;
  document.getElementById('choice2').innerHTML = scenario.choices[1].text;
}

function makeChoice(choiceIndex) {
  const impact = scenarios[currentScenario].choices[choiceIndex - 1].impact;
  funds += impact.funds;
  morale += impact.morale;
  satisfaction += impact.satisfaction;

  updateStats();

  currentScenario++;
  if (currentScenario < scenarios.length) {
    displayScenario();
  } else {
    scenarioText.innerHTML = "Game Over! Thanks for playing.";
    document.getElementById('choices').style.display = 'none';
  }
}

displayScenario();
updateStats();

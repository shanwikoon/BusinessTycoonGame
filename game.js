let funds = 100000;
let morale = 50;
let satisfaction = 50;

const scenarioText = document.getElementById('scenario-text');
const fundsText = document.getElementById('funds');
const moraleText = document.getElementById('morale');
const satisfactionText = document.getElementById('satisfaction');
const feedbackText = document.getElementById('feedback');

const scenarios = [
  {
    text: "You need to decide whether to invest in marketing or hire new staff. What do you do?",
    choices: [
      { text: "Invest in marketing", impact: { funds: -20000, satisfaction: 10, morale: -5 }, feedback: "Marketing boosted customer satisfaction but put pressure on the team!" },
      { text: "Hire new staff", impact: { funds: -30000, morale: 10, satisfaction: -5 }, feedback: "Hiring new staff improved team morale but costs increased." }
    ]
  },
  {
    text: "A customer complains about the quality of your product. Do you offer a refund or improve quality control?",
    choices: [
      { text: "Offer a refund", impact: { funds: -10000, satisfaction: 5, morale: 0 }, feedback: "Refunding the customer improved satisfaction, but cost you some money." },
      { text: "Improve quality control", impact: { funds: -15000, morale: 5, satisfaction: 10 }, feedback: "Improving quality control boosted satisfaction, but it was costly." }
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
  const impact = scenarios[currentScenario].choices[choiceIndex

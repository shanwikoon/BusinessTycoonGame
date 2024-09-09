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
  },
  {
    text: "You are offered a deal with a risky new supplier. Do you take the risk for potential savings or stick with your current supplier?",
    choices: [
      { text: "Take the risk", impact: { funds: 20000, morale: -5, satisfaction: -10 }, feedback: "You saved money, but the risky supplier upset your team and customers." },
      { text: "Stick with current supplier", impact: { funds: -5000, morale: 5, satisfaction: 5 }, feedback: "It cost more, but your team and customers are happy with the quality." }
    ]
  },
  {
    text: "Your team suggests introducing remote work. Do you agree?",
    choices: [
      { text: "Allow remote work", impact: { funds: 0, morale: 15, satisfaction: 5 }, feedback: "Employee morale increased, and customers appreciated the flexibility!" },
      { text: "Stick to office work", impact: { funds: 0, morale: -10, satisfaction: 0 }, feedback: "Employees are unhappy with your decision to keep them in the office." }
    ]
  },
  {
    text: "Your competitor just released a new product. Do you respond with a big marketing campaign or wait it out?",
    choices: [
      { text: "Launch a marketing campaign", impact: { funds: -25000, morale: 0, satisfaction: 15 }, feedback: "Your marketing paid off! Customers are excited about your brand." },
      { text: "Wait it out", impact: { funds: 0, morale: 0, satisfaction: -5 }, feedback: "Without any action, you lost a bit of customer loyalty." }
    ]
  },
  {
    text: "An investor offers to buy a 20% share in your company for £50,000. Do you accept the offer?",
    choices: [
      { text: "Accept the offer", impact: { funds: 50000, morale: -5, satisfaction: 0 }, feedback: "You got the cash infusion, but your team is concerned about outside influence." },
      { text: "Reject the offer", impact: { funds: 0, morale: 5, satisfaction: 0 }, feedback: "Your team is happy you kept full control of the business." }
    ]
  },
  {
    text: "You have the opportunity to expand your business internationally. It’s expensive, but could grow your market. Do you expand?",
    choices: [
      { text: "Expand internationally", impact: { funds: -40000, morale: 0, satisfaction: 20 }, feedback: "The expansion cost a lot, but customer satisfaction skyrocketed globally!" },
      { text: "Stay local", impact: { funds: 0, morale: 0, satisfaction: -5 }, feedback: "You stayed local, but some customers are disappointed in the lack of growth." }
    ]
  },
  {
    text: "Your best employee requests a raise. Do you approve it or deny the request?",
    choices: [
      { text: "Approve the raise", impact: { funds: -10000, morale: 10, satisfaction: 0 }, feedback: "Your employee is happy with the raise, and morale is up." },
      { text: "Deny the raise", impact: { funds: 0, morale: -15, satisfaction: 0 }, feedback: "Your employee is unhappy, and it’s affecting morale." }
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
  if (

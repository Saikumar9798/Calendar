let Months;
(function (Months) {
  Months[(Months["January"] = 0)] = "January";
  Months[(Months["February"] = 1)] = "February";
  Months[(Months["March"] = 2)] = "March";
  Months[(Months["April"] = 3)] = "April";
  Months[(Months["May"] = 4)] = "May";
  Months[(Months["June"] = 5)] = "June";
  Months[(Months["July"] = 6)] = "July";
  Months[(Months["August"] = 7)] = "August";
  Months[(Months["September"] = 8)] = "September";
  Months[(Months["October"] = 9)] = "October";
  Months[(Months["November"] = 10)] = "November";
  Months[(Months["December"] = 11)] = "December";
})(Months || (Months = {}));

let daysBody = document.querySelector("#days-body");
const year = document.querySelector("#select--year");
const month = document.querySelector("#select--month");
const yearMonth = document.querySelector("#year--month");

const today = new Date();
let thisMonth = today.getMonth();
let thisYear = today.getFullYear();

function generateMonths() {
  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  monthsArray.forEach((monthFromArray) => {
    const option = document.createElement("option");
    option.value = monthFromArray;
    option.innerText = monthFromArray;
    month.appendChild(option);
  });
}

function generateYears() {
  for (let i = 2000; i <= 2050; ++i) {
    const option = document.createElement("option");
    option.value = i;
    option.innerText = i;
    year.appendChild(option);
  }
}

function handleChange(e) {
  if (e.target.id === "select--month") thisMonth = Months[e.target.value];
  else if (e.target.id === "select--year") thisYear = e.target.value;
  console.log();
  generateCalendar(thisYear, thisMonth);
}

function generateCalendar(year, month) {
  document.querySelectorAll("tbody>tr").forEach((tr) => tr.remove());
  const firstDay = new Date(year, month).getDay();
  const totalDays = 32 - new Date(year, month, 32).getDate();
  let k = 0,
    l = 0;
  for (let i = 0; i < 6; ++i) {
    if (k >= firstDay + totalDays) break;
    const tr = document.createElement("tr");
    for (let j = 0; j < 7; ++j) {
      const td = document.createElement("td");
      if (k >= firstDay && k < firstDay + totalDays) td.innerText = ++l;
      else td.innerHTML = "&nbsp;";
      td.classList.add("cell");
      tr.appendChild(td);
      ++k;
    }
    daysBody.appendChild(tr);
  }
}

function init() {
  generateCalendar(thisYear, thisMonth);
  generateMonths();
  generateYears();
  year.value = thisYear;
  month.value = Months[thisMonth];
}

document.addEventListener("DOMContentLoaded", init);
yearMonth.addEventListener("change", handleChange);

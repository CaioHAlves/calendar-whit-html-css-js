const calendarContainer = document.getElementById("calendar");
const btnNextMonth = document.getElementById("next");
const btnPreviousMonth = document.getElementById("previous");
const yearSelector = document.getElementById("year");
const monthSelector = document.getElementById("month");
const dateFull = document.getElementById("date-full");

let currentYear, currentMonth;

function generateCalendar(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  let html = "<table>";
  html +=
    "<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>";

  let dayCounter = 0;

  for (let i = 0; i < 6; i++) {
    html += "<tr>";

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay.getDay()) {
        html += "<td></td>";
      } else if (dayCounter < daysInMonth) {
        dayCounter++;
        html += `<td>${dayCounter}</td>`;
      } else {
        html += "";
      }
    }

    html += "</tr>";
  }

  html += "</table>";
  calendarContainer.innerHTML = html;
  dateFull.textContent = `${getMonthName(month)} of ${currentYear}`;
  updateYearSelector(year);
  updateMonthSelector(month);

  // Add click event to each day
  const days = document.querySelectorAll("td");
  days.forEach((day) => {
    if (day.innerHTML) {
      day.addEventListener("click", function () {
        alert(`Clicked on ${day.innerHTML}/${currentMonth + 1}/${currentYear}`);
      });
    }
  });
}

function updateMonthSelector(month) {
  const months = [
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

  if (monthSelector.childElementCount === 0) {
    months.forEach((item, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.text = item;

      if (month === index) {
        option.selected = true;
      }
      monthSelector.add(option);
    });
  }
}

function updateYearSelector(selectedYear) {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100;
  const endYear = currentYear + 100;

  yearSelector.innerHTML = "";

  for (let year = startYear; year <= endYear; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    if (year === selectedYear) {
      option.selected = true;
    }
    yearSelector.add(option);
  }
}

function getMonthName(month) {
  const months = [
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
  return months[month];
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  monthSelector.value = currentMonth;
  generateCalendar(currentYear, currentMonth);
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }

  monthSelector.value = currentMonth;
  generateCalendar(currentYear, currentMonth);
}

window.changeYear = function () {
  currentYear = parseInt(yearSelector.value);
  generateCalendar(currentYear, currentMonth);
};
window.changeMonth = () => {
  currentMonth = parseInt(monthSelector.value);

  generateCalendar(currentYear, currentMonth);
};

window.nextMonth = nextMonth;
window.prevMonth = prevMonth;

const currentDate = new Date();
currentYear = currentDate.getFullYear();
currentMonth = currentDate.getMonth();
generateCalendar(currentYear, currentMonth);

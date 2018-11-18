const DOW = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const MOY = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const NORMAL = 0;
const OFF = 2;

const DS = [
  {
    state: 0,
    display: "",
    off: false
  },
  {
    state: 1,
    display: "WFH",
    off: false
  },
  {
    state: 2,
    display: "OFF",
    colour: "grey",
    off: true
  },
  {
    state: 3,
    display: "SICK",
    colour: "grey",
    off: true
  }
];

const defaultHours = (name, off) => {
  const dayHours = [
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12am",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm"
  ];
  const nightHours = [
    "8pm",
    "9pm",
    "10pm",
    "11pm",
    "12pm",
    "1am",
    "2am",
    "3am",
    "4am",
    "5am",
    "6am"
  ];

  let on = false;
  const day = dayHours.map(h => {
    if (off) {
      return {
        name: h,
        on
      };
    }
    if (h === "9am" || h === "1pm") {
      on = true;
    }
    if (h === "12am" || h === "6pm") {
      on = false;
    }
    const result = {
      name: h,
      on
    };
    return result;
  });
  on = false;
  const night = nightHours.map(h => {
    return {
      name: h,
      on
    };
  });
  return {
    name,
    day,
    night
  };
};

const defaultDays = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const results = days.map(name => {
    const off = name === "Saturday" || name === "Sunday";
    return defaultHours(name, off);
  });
  return results;
};

const DAYS = defaultDays();

export { DOW, MOY, NORMAL, OFF, DS, DAYS };

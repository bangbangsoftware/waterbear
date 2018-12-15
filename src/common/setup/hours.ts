import {Day, Hour} from '../../user/member';

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

const days = (off:boolean) => {
  let on = false;
  return dayHours.map((h:string):Hour => {
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
    const state = on ? "on" : "off";
    const result = {
      name: h,
      on,
      state
    };
    return result;
  });
};

const nights = () => {
  const on = false;
  return nightHours.map(h => {
    return {
      name: h,
      on,
      state: "off"
    };
  });
};

const defaultHours = (name:string, off:boolean) => {
  const day = days(off);
  const night = nights();
  return {
    name,
    day,
    night
  };
};

export default () => {
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

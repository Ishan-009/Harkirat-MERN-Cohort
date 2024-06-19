// Making JS Clock

function getCurrentTime() {
  const now = new Date();

  // GET HOURS, MIN and Seconds
  const [hours, minutes, seconds] = [
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
  ];

  return [hours, minutes, seconds];
}

setInterval(() => {
  let [hours, minutes, seconds] = getCurrentTime();

  // Update Seconds
  seconds += 1;

  // Update Minutes and seconds when count reaches 60

  if (seconds === 60) {
    minutes += 1;
    seconds = 0;
  }

  // Update when min reaches to 60, update hour and min

  if (minutes === 60) {
    minutes = 0;
    hours += 1;
  }

  // Update when hour reaches 12

  if (hours === 24) {
    hours = 1;
  }

  const string = `Current Time is ${hours} Hours, ${minutes} minutes and ${seconds} seconds`;
  console.log(string);
}, 1000);

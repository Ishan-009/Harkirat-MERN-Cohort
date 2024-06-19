const calculateTimewithPromiseAll = require("./promise-all");

function wait(t) {
  return new Promise((resolve) => {
    setTimeout(resolve, t * 1000);
  });
}

function calculateTimeSequentially(t1, t2, t3) {
  const start = Date.now();
  return wait(t1)
    .then(() => wait(t2))
    .then(() => wait(t3))
    .then(() => Date.now() - start);
}

function calculateTimeWithPromiseAll(t1, t2, t3) {
  const start = Date.now();
  return Promise.all([wait(t1), wait(t2), wait(t3)]).then(
    () => Date.now() - start
  );
}

function timeDifference() {
  const start = Date.now();

  return Promise.all([
    calculateTimeSequentially(1, 2, 3),
    calculateTimewithPromiseAll(1, 2, 3),
  ]).then(([sequentialTime, promiseAllTime]) => {
    console.log("Sequential Time:", sequentialTime);
    console.log("Promise.all Time:", promiseAllTime);

    const result = sequentialTime === promiseAllTime;
    console.log("Time difference comparison:", result);

    return result;
  });
}

timeDifference()
  .then((result) => {
    console.log("Overall result:", result);
  })
  .catch((err) => {
    console.error("Error:", err);
  });

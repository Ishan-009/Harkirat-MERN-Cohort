// Basically, in callback what we do is we can pass function as a argument into a function and then callback the function when required , ex:- when calling multiple api calls and then based on that calling other apis

// function cube(n) {
//   return n * n * n;
// }

// function sumOfTwoCubes(num1, num2, cube) {
//   const a = cube(num1);
//   const b = cube(num2);

//   return a + b;
// }

// console.log(sumOfTwoCubes(2, 3, cube));
function getUserInfo(callback) {
  setTimeout(() => {
    callback({
      firstName: "Ishan",
      githubRepo: "Ishan009",
      age: 23,
      contact: 6351414926,
    });
  }, 2000);
}

function findGitHubRepo(userRepo, callback) {
  setTimeout(() => {
    callback({
      gitHubAccountName: "Ishan-009",
      status: "active",
      noOfRepos: 21,
    });
  }, 3000);
}

function isActive(userId, callback) {
  setTimeout(() => {
    callback(true); // Replace with actual API response
  }, 1000);
}

getUserInfo(function (user) {
  findGitHubRepo(user.gitHubAccountName, function (repo) {
    isActive(user.id, function (isActive) {
      if (repo.status === "active") {
        console.log(
          `User: ${user.firstName}, active with ${repo.noOfRepos} repos`
        );
      } else {
        console.log(
          `User: ${user.firstName} is either inactive or has an inactive repo`
        );
      }
    });
  });
});

console.log("User Data Displaying Successfully");

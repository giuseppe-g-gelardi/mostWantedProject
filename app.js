'use strict';

let descendants = [];
let people = data;
let person = [];
let personInfo = '';

//Menu functions.
//Used for the overall flow of the application.
//#region

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  switch (searchType) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert('Could not find that individual.');
    return app(people); // restart
  }

  let displayOption = promptFor(
    `"Found ${person.firstName} ${person.lastName}. 
    \nDo you want to know their 'info', 'family', or 'descendants'? 
    \nType the option you want or 'restart' or 'quit'"`,
    // adjusted the above line
    //'Found ' + person.firstName + ' ' + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'",
    autoValid
  );

  switch (displayOption) {
    case 'info':
      // TODO: get person's info
      break;
    case 'family':
      // TODO: get person's family
      break;
    case 'descendants':
      // TODO: get person's descendants
      break;
    case 'restart':
      app(people); // restart
      break;
    case 'quit':
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
//#region

function searchByName(people) {
  let firstName = prompt("What is the person's first name?", autoValid);
  let lastName = prompt("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.firstName === firstName &&
      potentialMatch.lastName === lastName
    ) {
      return true;
    } else {
      return false;
    }
  });
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}
// searchByName(data)

function searchByID(people) {
  let id = prompt("What is the person's ID#?", autoValid);
  return people.filter(function (potentialMatch) {
    return potentialMatch.id === parseInt(id);
  });
}
//searchByID(data) // 982411429

function searchByFirstName(people) {
  let firstName = prompt("What is the person's First Name", autoValid);

  return people.filter(function (potentialMatch) {
    return potentialMatch.firstName === firstName;
  });
}
//searchByFirstName(data)

function searchByLastName(people) {
  let lastName = prompt("What is the person's Last Name", autoValid);

  return people.filter(function (potentialMatch) {
    return potentialMatch.lastName === lastName;
  });
}
//searchByLastName(data)

function searchByGender(people) {
  let gender = prompt("What is the person's Gender", autoValid);

  return people.filter(function (potentialMatch) {
    return potentialMatch.gender === gender;
  });
}
//searchByGender(data)

function searchByDob(people) {
  let dob = prompt("What is the person's Date-of-Birth", autoValid);

  return people.filter(function (potentialMatch) {
    return potentialMatch.dob === dob;
  });
}
//searchByDob(data) // 12/23/1969

function searchByHeight(people) {
  let height = prompt("What is the person's Height?", autoValid);

  return people.filter(function (potentialMatch) {
    return potentialMatch.height === parseInt(height);
  });
}
//searchByHeight(data) // 66

function searchByWeight(people) {
  let weight = prompt("What is the person's Weight?", autoValid);

  return people.filter(function (potentialMatch) {
    return potentialMatch.weight === parseInt(weight);
  });
}
//searchByWeight(data) // 170

function searchByEyeColor(people) {
  let eyeColor = prompt("What is the person's Eye color", autoValid);

  return people.filter(function (potentialMatch) {
    return potentialMatch.eyeColor === eyeColor;
  });
}
//searchByEyeColor(data)

function searchByOccupation(people) {
  let occupation = prompt("What is the person's Occupation", autoValid);

  return people.filter(function (potentialMatch) {
    return potentialMatch.occupation === occupation;
  });
}
//searchByOccupation(data)
//TODO: add other trait filter functions here.

//#endregion

//Display functions.
//Functions for user interface.
//#region

// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + ' ' + person.lastName;
      })
      .join('\n')
  );
}

displayPerson(person);
function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  person.map(function (person) {
    let personInfo = 'First Name: ' + person.firstName + '\n';
    personInfo += 'Last Name: ' + person.lastName + '\n';
    personInfo += 'id: ' + person.id + '\n';
    personInfo += 'gender: ' + person.gender + '\n';
    personInfo += 'dob: ' + person.dob + '\n';
    personInfo += 'height: ' + person.height + '\n';
    personInfo += 'weight: ' + person.weight + '\n';
    personInfo += 'eyeColor: ' + person.eyeColor + '\n';
    personInfo += 'occupation: ' + person.occupation + '\n';
    personInfo += 'parents: ' + person.parents + '\n';
    personInfo += 'currentSpouse: ' + person.currenSpouse + '\n';
    return personInfo;
  });
}
// TODO: finish getting the rest of the information to display.
alert(personInfo);

//#endregion

//Validation functions.
//Functions to validate user input.
//#region

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).

const promptFor = (question, valid) => {
  do {
    let response = prompt(question).trim();
  } while (response || !valid(response));
  return response;
};

// function promptFor(question, valid){
//   let response;
//   let isValid;
//   do{
//     response = prompt(question).trim();
//     isValid = valid(response);
//   } while(response !== ""  ||  isValid === false)
//   return response
// }

// helper function/callback to pass into promptFor to validate yes/no answers.
// function yesNo(input) {
//   if (input.toLowerCase() == 'yes' || input.toLowerCase() == 'no') {
//     return true;
//   } else {
//     return false;
//   }
// }

// refactored helper function (the one above)
function yesNo(input) {
  return input.toLowerCase() == 'yes' || input.toLowerCase() == 'no';
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
//function customValidation(input) {}

console.log(findingDescendants(person, people));

function findingDescendants(person, people) {
  let descendants = [];
  for (let i = 0; i < person.length; i++) {
    let group = people.filter(function (el) {
      if (el.parents.includes(person[i].id)) {
        return el;
      }
    });
    descendants = descendants.concat(findingDescendants(group, people));
    descendants = descendants.concat(group);
  }
  alert(descendants);
  return descendants;
}

//#endregion

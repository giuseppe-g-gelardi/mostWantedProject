'use strict';

//thomas, can you please explain what this is? :D
let descendant = '';
let people = data;
let person = [];
let personInfo = '';
//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
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
    'Found ' +
      person.firstName +
      ' ' +
      person.lastName +
      " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'",
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
/////////////////////////////////////////////////////////////////
//#region

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

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

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
// THIS IS A TEST FUNCTION COPY OVER

// function findingEyeColor(people) {
//   let input = prompt('what eye color?');
//   person = people.filter(function (el) {
//     if (el.eyeColor === input) {
//       return true;
//     } else {
//       return false;
//     }
//   });
//   console.log(person);
//   return person;
// }

// console.log(findingEyeColor(people));

// refactored above function
function findingEyeColor(people) {
  let input = prompt('what eye color?');
  person = people.filter(function (el) {
    return el.eyeColor === input;
  });
  console.log(person);
  return person;
}

console.log(findingEyeColor(people));

//TODO: add other trait filter functions here.

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
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
    personInfo = 'First Name: ' + person.firstName + '\n';
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
/////////////////////////////////////////////////////////////////
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
function customValidation(input) {}

// finding decdents
findingDescendants(person);
function findingDescendants(person) {
  person.map(function (person) {
    if (person.parents != false) {
      descendant += person.parents;
      findingDescendants(descendant);
      return descendant;
    } else {
      alert(descendant);
      return descendant;
    }
  });
}

//#endregion

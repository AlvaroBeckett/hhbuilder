// creates DOM elements. 
var addButton = document.getElementsByClassName('add')[0],
 	body = document.getElementsByTagName('body')[0],
 	form = document.getElementsByTagName('form')[0];

 	// Align text to center of page
 	body.style.textAlign = 'center';
     
	addButton.type = "button";  // Changes form attribute to 'button' from 'submit'. This stops it from submitting each time the 'add' button is clicked 

	addButton.style.backgroundColor = "#008CBA";
	addButton.style.color = "#fff";
	addButton.style.fontSize = "1.5em";

// Creates JSON variable. 
var Data = [];
var itemsCreated = 0;

// Creates 'household' and 'warning' elements
var household = document.createElement('div'),
    warning = document.createElement('div');

    // Properties for Household
	household.style.fontSize = '1.5em';
	household.style.fontWeight = 'bold';
	
	// Properties for Warnings
	warning.innerHTML = 'No warnings.';    //Must keep text at all times to keep from changing size when hidden
	warning.style.fontSize = '2em';
	warning.style.color = '#B22222';
	warning.style.visibility = 'hidden';

// Remove family member when user clicks the 'delete' button
var removeFamilyClicked = function() {
 var removeIndex = Data.map(
  function(item) {
   return item.id;
  }
 ).indexOf(parseInt(this.id));
 Data.splice(removeIndex, 1);
 this.previousSibling.previousSibling.remove();
 this.previousSibling.remove();
 this.remove();
};

// Create an onclick function for the 'add' button.
var addFamilyClicked = function() {
 var age = document.querySelectorAll('[name="age"]')[0].value,
  	 relationshipDropdown = document.querySelectorAll('[name="rel"]')[0],
 	 relationship = relationshipDropdown.options[relationshipDropdown.selectedIndex].text,
 	 toSmokeOrNotToSmoke = document.querySelectorAll('[name="smoker"]')[0].checked;
 inputIsValid = validateInput(age, relationship);
 if (inputIsValid) {
  Data.push(
   {
    "age": parseInt(age),
    "id": (++itemsCreated),
    "toSmokeOrNotToSmoke": toSmokeOrNotToSmoke,
    "relationship": relationship
   }
  );
  var householdMember = relationship + ' | ' + age + ' | ' + ((toSmokeOrNotToSmoke) ? ' Yes ' : 'No');
  var removalButton = document.createElement('button');
  removalButton.innerHTML = ' delete ';
  removalButton.id = itemsCreated;
  removalButton.onclick = removeFamilyClicked;
  household.append(householdMember);
  household.append(removalButton);
  household.append(document.createElement('br'));

  // Add styling for 'delete' button
  removalButton.style.backgroundColor = "#f44336";
  removalButton.style.color = "#fff";
  removalButton.style.fontSize = "1em";
 }
};

/* Create onsubmit function. */
var onsubmit = function() {
 postToServer(JSON.stringify(Data));
 return false;
};

/* Validate user input. If input is invalid, display warning message. */
function validateInput(age, relationship) {
 var inputIsValid = false;
 if (age == '') {
  alert("Please enter age, promise we wont judge.");
 }
  else if (isNaN(age)) {
   alert("We didn't know that is was a number...");
  }
   else if (age < 1) {
    alert('Very funny, please round up!');
   } 
    else if (relationship == '---') {
     alert("Remember, you can only add family. (Pets don't count)");
    }
     else {
      inputIsValid = true;
     }
 return inputIsValid;
}

// Make a function to display JSON in the'debug' element.
function postToServer(jsonString) {
 console.log('Posting JSON data to the server...');
 var debugElement = document.getElementsByClassName('debug')[0];
 document.body.appendChild(debugElement);
 debugElement.innerHTML = 'JSON posting to server' + '\n\n';
 var jsonStringSplit = jsonString.split('},');
 for(var i=0; i<jsonStringSplit.length; i++) {
  debugElement.innerHTML += jsonStringSplit[i];
  if (i < jsonStringSplit.length-1) {
   debugElement.innerHTML += '},\n';
  }
 }
 debugElement.style.bottom = '0';
 debugElement.style.display = 'initial';
 debugElement.style.position = 'absolute';
 debugElement.style.backgroundColor = '#4CAF50';
 debugElement.style.left = '0';
}

// Append new elements
body.append(document.createElement('br'));
body.append(warning);
body.append(document.createElement('br'));
body.append(household);
household.append('Person | Age | Smoker');
household.append(document.createElement('br'));


// Assign functions to their elements.
addButton.onclick = addFamilyClicked;
form.onsubmit = 'onsubmit; return false;';

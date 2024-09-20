#!/usr/bin/node

const request = require('request');

// Make sure that a film ID is provided as an argument
if (process.argv.length < 3) {
  console.error('Please provide a Star Wars film ID as an argument.');
  process.exit(1);
}

// Get the film data from the Star Wars API
request('https://swapi-api.hbtn.io/api/films/' + process.argv[2], function (err, res, body) {
  if (err) {
    console.error('Error fetching film data:', err);
    return;
  }

  // Parse the response body
  let parsedBody;
  try {
    parsedBody = JSON.parse(body);
  } catch (parseErr) {
    console.error('Error parsing response:', parseErr);
    return;
  }

  // Extract the list of characters (actors)
  const actors = parsedBody.characters;

  // Check if actors is an array and has elements
  if (!Array.isArray(actors) || actors.length === 0) {
    console.error('No characters found for this film.');
    return;
  }

  // Call the function to print the characters in order
  exactOrder(actors, 0);
});

// Recursive function to request and print each character in order
const exactOrder = (actors, index) => {
  if (index === actors.length) return; // Base case: stop recursion

  // Fetch the data for each actor
  request(actors[index], function (err, res, body) {
    if (err) {
      console.error('Error fetching character data:', err);
      return;
    }

    let character;
    try {
      character = JSON.parse(body);
    } catch (parseErr) {
      console.error('Error parsing character data:', parseErr);
      return;
    }

    console.log(character.name); // Print the character's name

    // Recursively fetch the next actor
    exactOrder(actors, index + 1);
  });
};


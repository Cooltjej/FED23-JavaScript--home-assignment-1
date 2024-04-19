### A simple quiz game using javascript  

This was a game where we were to guess which name belonged to one of our classmates. The code isn't changed, but the images and names are.  

----------------------------------------------------  

You are to create a simple "Quiz game" where players guess the name of a classmate.  

### Hygiene Requirements  

The following hygiene requirements must be met regardless of the grade level.  

Be responsive (mobile-first, with at least 3 different layouts).  
  
Semantically correct HTML.  
  
Use flexbox or CSS grid (using Bootstrap/Tailwind etc. is also acceptable).  
  
Styled adequately (i.e., look decent without spending too much time on it).  
  
All data and game state should reside in JavaScript, i.e., do not use the DOM as the single point of truth.  
  
The game should be hosted on Netlify.  

----------------------------------------------------  

### Version Control  

All source code must be version controlled in a (private) Git repository, where you make regular commits with descriptive commit messages, making it easy to track your development progress.  

----------------------------------------------------  

### Structure  

There should be an array of objects, where each object should have the properties "name" and "image", where "name" is a string with the person's name and "image" is a URL to the person's image.  
  
The array should NOT contain any information such as answer choices or which answer is correct! However, it's okay to add an id to each person if you wish.
  
The array should be able to contain an unlimited number of persons (i.e., you should never assume a specific length for the array!). When the game starts/restarts, the player should be able to choose how many persons they want to guess the names for (e.g., 10, 20, or all).  
  
For each person, their photo should be displayed (the same photo should only appear once per game session), along with four answer options consisting of the person's name (the correct answer) and three randomly selected names of other persons.  
  
The position of the correct answer should be random so that the player cannot "cheat" by learning where the correct answer is placed. Naturally, the same name should not appear twice for the same photo.  

After selecting an answer option for each person, the result should be shown (or if the player presses a button "Show result"), and after each game round, the player should be informed about how many answers were correct vs. incorrect (e.g., 16/20 correct if the player guessed correctly on 16 out of 20 persons).

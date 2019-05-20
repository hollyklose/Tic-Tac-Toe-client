Octopus vs. Chickie: Join The Battle!

Technologies Used: HTML, CSS, Bootstrap, Javascript, JQuery, Curl.

Planning: I got started on the project early by designing the game win and game tie logic, figuring that it would be the easiest piece to code separately before the actual project was officially started. I used the Boggle coding challenge as a model and turned the tic tac toe board into a series of coordinate pairs, which enabled me to write some of the logic mathematically. For instance, the player wins if all the X coordinates or all the Y coordinates are the same. After reading the game API  documents more carefully (and us going over them in class), I discovered that the API would not accept data in this format. Fortunately, all was not lost as I created a cipher file to take the cell array response from the API and turn it into coordinate pairs that my code could use to determine the game win status.

After that, I put together some HTML (and a few lines of CSS) as a skeleton, just enough UI to be able to test my functionality going forward. I used bootstrap to make sure my tic tac toe board held together. I went ahead and built all the authorization code (sign up, sign in, sign out, change password).

From there, I added and removed event listeners to various elements, as well as turning css attributes on and off, to ensure the user could not perform actions which shouldn't be possible at any given game state. I wrote the reset game function, and had some trouble having the UI react appropriately given who the current player was (octopus vs chick). I eventually figured out that I couldn't just readd the event listeners I had removed, I had to first remove ALL the event listeners (ie. of the spaces that had not been clicked during the given game). Happily this solved the issue.

My next step was to tie in the game logic and ui to interact with the game API. I was quickly able to create a new game. It took longer to accurately update the API after each player turn, and even longer to get the API to reflect the current player after this action (specifically upon reset game). The problem is that it was somehow switching to the other player as far as the UI was concerned, even though the update to the API had the correct player. Honestly, I have no idea how I fixed this as it eventually resolved itself!

Then I went back to the UI to hide/show the sign up and sign in (for users who aren't logged in yet) versus the change password, sign out and reset game (for users who have logged in). I then proceeded to clean up the UI, add a background image and color, play with font sizes and positioning. This also caused several ui update functions to break as I shifted around where elements were located relative to various parents and inadvertently changed what styles were affecting them. After fixing this, I moved on to GETing information on how many games a given player has played and displaying this information.

I then looped the game information through the game logic to figure out how many games the player has won and tied.

I wrote arrays of silly messages related to which player won, whose turn it is and whether there was a tie, which I deliver at random according to the game state. I hope this will keep the game a little more interesting.

GAMIFICATION BADGES

WIREFRAMES AND USER STORIES

UNSOLVED PROBLEMS? refactoring loops and functions, multiplayer

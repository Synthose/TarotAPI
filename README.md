# TarotAPI

TarotAPI is a nodeJS and MongoDB based project that allows individuals to make tarot spreads,
track their past readings, and get more info on cards.

## Installation

From the home folder, you need only type "npm start" in the command prompt.


# Paths
/createCard  POST only Method: Allows a user to create a custom card and add it to the deck. Must have a full card of details in JSON format as the call body.

/createDeck  POST only Method: Creates an entire standard deck on the DB. Should not be used if you know what you're doing.

/addUser Post Method: Creates a user with a given username, email, and password. Entries must be provided in body of api call.

/getusers & /users  ADMIN access only. Displays the usernames and histories of all users.

/login Logs a user in with a username and password. Opens login page on HTML. Users can login there, and will get a session cookie to keep them logged in for a day.

/gethistory and /gethistory/:id  will open an page with the history a users Readings. It can take a query value of "count=NUMBER", which will limit how many past drawings we see. By default, we only see the most recent.

/card will display the information about a card. Requires the card _id, so it will not be called by users directly, but rather just by links.

/drawCard  will randomly select a single card from the standard Tarot Deck. It can take a parameter, with a /<username> attached. If there is a username, it will also create an account for that user, if one doesn't alredy exist, and add the card to their history.
APICALL: Text/PLain: Name, orientation, and description of the card drawn
        Text/HTML: Page for the card
        Application/JSON: All data for the card drawn

/drawCards Functions identically to the above call, except it can take query value for number of cards to draw. If no query is provided, it defaults to 3.


## Resources
Card images taken from "https://www.tarot.com"
Card interpretations taken from "https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json"
Session and Password help from "https://www.section.io"


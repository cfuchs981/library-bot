# library-bot

This is a bot made for the campus computer science organization's discord. Allows you to store resources for chosen languages or etc. so that anyone can view the library to see other's recommendations. Currently the bot stores data locally so must stay online (saves all data to an external file in intervals in case of a shutdown). Recommended usage is to link to your own database to prevent that issue. 

To run, download repository and get your own discord token key to authenticate. Place it in the auth.json file. After, navigate to the directory and run node bot.js and the bot will come online. The backup file will save in the directory as text.txt. 

Commands are - &library for overview, then &language_name to get resources for your chosen language. To add a resource, usage is &info language_name hyperlink description(optional). Your username is recorded with the source. 

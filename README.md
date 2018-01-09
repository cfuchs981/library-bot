# library-bot

Discord bot made for campus CS club's discord. Allows users to share resources for languages and/or general CS knowledge and store them in the bot's library, where others can pull up the resources at any time. All discord members have access to add and delete records. The first version of the bot stores data in arrays and saves to an external file on a set interval to prevent data loss in case the bot goes offline. The second version of the bot (database-ver branch) is linked to a database with no risk of data loss. 

# Usage 
You must have your own discord token for the auth.json file. If using the database version, edit the top of the bot.js file with your own db info. After that, navigate to repository and run with command node bot.js. Make sure you have the node js modules within your directory or on your path. 

Commands:
&library for usage
&language_name to get resources for your chosen language. 
To add a resource, usage is &info language_name hyperlink description(optional). Your username is recorded with the source. 
Database version supports deleting rows. Each resource is printed with an ID, to delete command is &delete id_number 

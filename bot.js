
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var mysql = require('mysql'); 

//set up database
const con = mysql.createConnection({
  host: 'your-host', 
  user: 'your-username',
  password: 'your-password',
  database: 'mysql',
  port: your-port-num //done bc running locally 
});
//ensure it can connect 
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//Set up discord bot 
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});


bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '&') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        cmd = cmd.toUpperCase(); 

        switch(cmd) {
            case 'LIBRARY':
                bot.sendMessage({
                    to: channelID,
                    message: 'Opened resource library. Usage is & followed by a command. \n\nTo list resources for a certain language, (example) &Java. Current supported languages: Java, C, C++, Python, Javascript, Perl, PHP, SQL.\n There is an Extra section as well. (&Extra).\n\n To add a resource, usage is &info langauge hyperlink description(optional). Ex: &info Java example.com An example site. Library will list contributors for each resource. \n\n Each row has an ID. To delete an entry, usage is &delete row_id.'
                });
            break;
            case 'JAVA': case 'C': case 'C++': case 'PYTHON': case 'JAVASCRIPT': case 'PERL': case 'SQL': case 'PHP': case 'EXTRA': 
                getQuery(cmd, channelID); 
            break;
            case 'INFO':
                if(args.length >= 3) {
                    var choice = args[1].toUpperCase(); 
                    var sql = "INSERT INTO resourcelibrary (CATEGORY, LINK, DESCRIPTION, USER) VALUES ('" + choice + "', '" + args[2] + "', '" + getDescription(args) + "', '*user: " + user + "');";
                    con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");
                    });
                }
            break;
            case 'DELETE':
                if(args.length == 2) {
                  deleteEntry(args[1]); 
                }
            break; 
         }
     }
});

function sendMessage(channelID, text) {
    bot.sendMessage({
        to: channelID,
        message: text
    });
}

//build the text query to send to chat 
function getQuery(language, channelID) {
    var text = language + " RESOURCES: \n\n"; 
    con.query("SELECT * FROM resourcelibrary WHERE CATEGORY = '" + language + "'", function (err, result) {
        if (err) throw err;
        //build entries from the json 
        for(i =0; i < result.length; i++) {
          text += result[i].ID + "\n" + result[i].LINK + "\n" + result[i].DESCRIPTION + "\n" + result[i].USER + "\n\n"; 
        }
        sendMessage(channelID, text); 
    });
    return text; 
}

//build description string 
function getDescription(args) {
    var description = "*description: "; 
    if(args.length > 3) {
        for(i = 3; i < args.length; i++) {
            description += args[i] + " "; 
        }
    }
    return description;
}

//delete an entry, there is no provided edit function in this bot 
function deleteEntry(idChoice) {
  var sql = "DELETE FROM resourcelibrary WHERE ID = '" + idChoice + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
}


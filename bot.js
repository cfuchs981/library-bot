//TODO: link to database, get rid of arrays. Add remove or edit commands. Delete command messages? 

var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');


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


/* 
Create arrays for each language you want to store sources too. 
Currently this discord bot is meant to stay online, updating the arrays and saving to an external file in case the info is lost. 
A better solution is storing/reading info from a database so you don't have to manually fix the info if the bot goes offline. 
*/ 

var javaArray = ["Java Resources \n"]; 
var cArray = ["C Resources \n"]; 
var ccArray = ["C++ Resources \n"]; 
var pythonArray = ["Python Resources \n"]; 
var javascriptArray =["Javascript Resources \n"]; 
var perlArray = ["Perl Resources \n"]; 
var phpArray = ["PHP Resources \n"]; 
var sqlArray = ["SQL Resources \n"]; 
var extraArray = ["Extra Resources \n"]; 

var allData = [javaArray, cArray, ccArray, pythonArray, javascriptArray, perlArray, phpArray, sqlArray, extraArray]; 


bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '&') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        cmd = cmd.toUpperCase(); 

        switch(cmd) {
            case 'LIBRARY':
                bot.sendMessage({
                    to: channelID,
                    message: 'Opened resource library. Usage is & followed by a command. \n\nTo list resources for a certain language, (example) &Java. Current supported languages: Java, C, C++, Python, Javascript, Perl, PHP, SQL.\n There is an Extra section as well. (&Extra).\n\n To add a resource, usage is &info langauge hyperlink description(optional). Ex: &info Java example.com An example site. Library will list contributors for each resource.'
                });
            break;
            case 'JAVA':
                sendMessage(channelID, readArray(javaArray)); 
            break;
            case 'C':
                sendMessage(channelID, readArray(cArray)); 
            break;
            case 'C++':
                sendMessage(channelID, readArray(ccArray)); 
            break;
            case 'PYTHON':
                sendMessage(channelID, readArray(pythonArray)); 
            break;
            case 'JAVASCRIPT':
                sendMessage(channelID, readArray(javascriptArray)); 
            break;
            case 'PERL':
                sendMessage(channelID, readArray(perlArray)); 
            break;
            case 'PHP':
                sendMessage(channelID, readArray(phpArray)); 
            break;
            case 'SQL':
                sendMessage(channelID, readArray(sqlArray)); 
            break;
            case 'EXTRA':
                sendMessage(channelID, readArray(extraArray)); 
            break;
            case 'INFO':
                if(args.length >= 3) {
                    var choice = args[1].toUpperCase(); 
                        switch(choice) {
                            case 'JAVA':
                                addResource(javaArray, args, user); 
                            break;
                            case 'C':
                                addResource(cArray, args, user); 
                            break;
                            case 'C++':
                                addResource(ccArray, args, user); 
                            break;
                            case 'PYTHON':
                                addResource(pythonArray, args, user); 
                            break;
                            case 'JAVASCRIPT':
                                addResource(javascriptArray, args, user); 
                            break;
                            case 'PERL':
                                addResource(perlArray, args, user); 
                            break;
                            case 'PHP':
                                addResource(phpArray, args, user); 
                            break;
                            case 'SQL':
                                addResource(sqlArray, args, user); 
                            break;
                            case 'EXTRA':
                                addResource(extraArray, args, user); 
                            break;
                        }
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

function readArray(tarray) {
    var text =""; 
    for(i = 0; i < tarray.length; i++) {
        text += tarray[i] + '\n'; 
    }
    return text; 
}

function addResource(tarray, args, user){
    tarray.push(args[2]); //the hyperlink
    if (args.length > 3) { //a description was included 
        var description = ""; 
        for(i = 3; i < args.length; i++) {
            description += args[i] + " " ; 
        }
        tarray.push("*description: " + description); //we want this italicized 
    }
    tarray.push("*contributor: " + user + "\n"); 
}

//Writes to external file every minute. This is to ensure data is not lost if the bot goes offline (since this isn't in a database)
function writeData() {
    fs.writeFile("./test.txt", allData, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved at " + new Date());
    }); 
}

setInterval(writeData, 60000); 
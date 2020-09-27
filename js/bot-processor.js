
var defaultBotReply = "Sorry, I couldn't understand your message. I need more training to understand your message.";

function generateBotMessage(userMessage){
	var botMsg = defaultBotReply;
	var exactMatch = false;

	for(var i in botMemory){
		for(var j in botMemory[i].keys){
			if(userMessage == botMemory[i].keys[j]){
				botMsg = findAnswer(botMemory[i].value);
				exactMatch = true;
			}
		}
	}

	if(!exactMatch){
		for(var i in botMemory){
			for(var j in botMemory[i].keys){
				if(userMessage.includes(botMemory[i].keys[j])){
					botMsg = findAnswer(botMemory[i].value);
				}
			}
		}
	}

	rootVue.comunication.push({from: -1, text: botMsg});
	rootVue.message = '';
}

function findAnswer(value){
	for(var i in botAnswer){
		if(value == botAnswer[i].key){
			if(botAnswer[i].answers.length > 1) {
				return botAnswer[i].answers[generateRandomNumber(1, botAnswer[i].answers.length)-1];
			} else {
				return botAnswer[i].answers[0];
			}
		}
	}
	return defaultBotReply;
}

function generateRandomNumber(min , max)
{
	return Math.floor(Math.random() * max) + min;
}
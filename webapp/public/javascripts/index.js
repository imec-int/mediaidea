var App = function (options){

	/*
	*	Phrases are in the Data.phrases global var
	*/

	var init = function (){
		console.log("init");
		handlers();
	};

	var handlers = function (){
		$("#btn_generate").click(function(){
			animateToThisPhrase(generateRandomPhrase());
		})
	};

	/** Returns a random Phrase object **/
	var generateRandomPhrase = function (){
		var phrases = Data.phrases;
		var phraseObj = {};
		var subject = phrases.subjects[Math.floor(Math.random()*phrases.subjects.length)];
		var verb    = phrases.verb[Math.floor(Math.random()*phrases.verb.length)];
		var object  = phrases.objects[Math.floor(Math.random()*phrases.objects.length)];
		var extra   = phrases.extra[Math.floor(Math.random()*phrases.extra.length)];

		var doExtra = Math.random() < 0.5;

		var phrase = subject.value + ' ' + subject.preposition + ' ' + verb + ' '  + object;
		if(doExtra){
			phrase += ' ' + extra;
		}

	    phraseObj.subject = subject;
	    phraseObj.verb = verb;
	    phraseObj.object = object;
	    phraseObj.extra = extra;
	    phraseObj.phrase = phrase;

		return phraseObj;
	};

	/** animates the html to the given Phrase object **/
	var animateToThisPhrase = function (phraseObj){
		$("#subject").html(phraseObj.subject.value);
		$("#preposition").html(phraseObj.subject.preposition);
		$("#action").html(phraseObj.verb+" "+phraseObj.object);
		$("#goal").html(phraseObj.extra);
	};

	return {
		init: init
	};
};



$(function(){
	var app = new App();
	app.init();
});


var App = function (options){

	/*
	*	Phrases are in the Data.phrases global var
	*/

	var init = function (){
		FastClick.attach(document.body);
		document.location.hash = "generator"
		handlers();
	};

	var handlers = function (){
		$("#btn_generate").click(function(){
			animateToThisPhrase(generateRandomPhrase());
		});
		$("#mediaIdea").click(function(){
			animateToThisPhrase(generateRandomPhrase());
		});
		$("#btn_better").click(function(){
			TweenLite.to(window, 0.8,
				{scrollTo:{y:$("#contact").offset().top},
				ease:Power2.easeOut,
				onComplete:function(){document.location.hash = "contact"}});
		})
		window.onhashchange = function(){
			var hash = ""+document.location.hash;
			TweenLite.to(window, 0.8,
				{scrollTo:{y:$(hash).offset().top},
				ease:Power2.easeOut});
		};
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
		// $("#subject").html(phraseObj.subject.value);
		// $("#preposition").html(phraseObj.subject.preposition);
		// $("#action").html(phraseObj.verb+" "+phraseObj.object);
		// $("#goal").html(phraseObj.extra);

		animateLineByIdAndText("#subject",phraseObj.subject.value,Math.random()*0.35+0.075);
		animateLineByIdAndText("#preposition",phraseObj.subject.preposition,Math.random()*0.35+0.075);
		animateLineByIdAndText("#action",phraseObj.verb+" "+phraseObj.object,Math.random()*0.35+0.075);
		animateLineByIdAndText("#goal",phraseObj.extra,Math.random()*0.35+0.075);

	};

	var animateLineByIdAndText = function (lineId,newText,speed){
		var scrnWidth = $(window).width()+100;
		TweenLite.to($(lineId),speed,{css:{x:-scrnWidth}, ease:Power2.easeOut,
			onComplete:function(){
				TweenLite.to($(lineId),0,{css:{x:scrnWidth}});
				$(lineId).html(newText);
				TweenLite.to($(lineId),speed,{css:{x:0}, ease:Power2.easeOut});
			}});
	};

	return {
		init: init
	};
};



$(function(){
	var app = new App();
	app.init();
});


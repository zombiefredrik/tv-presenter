var media = [];
var currentMedia = 0;
var currentTarget = 'target_1';
var previousTarget = 'target_2';
var mediaTimer;
var fileTimer;

$( document ).ready(function() {
	getFiles();
});

function getFiles() {
		$.getJSON( "/getFiles", function( data ) {
			media = [];
			data.forEach(function(d){
				media.push(d);
			});
		});
		fileTimer = setTimeout(getFiles,30000);
		if(mediaTimer == undefined) handleMedia();
}

function handleMedia() {
	currentMedia++;
	if(media[currentMedia] == undefined) currentMedia = 0;

	if(media[currentMedia] != undefined){
		var image = "<img src='/media/" + media[currentMedia] + "'/>";

		$("div#"+previousTarget).css('z-index', 11);
		$("div#"+currentTarget).css('z-index', 9);
		$("div#"+previousTarget).html(image);
		$("div#"+currentTarget).fadeOut(1000);
		$("div#"+previousTarget).fadeIn(1000);

		var tmp = currentTarget;
		currentTarget = previousTarget;
		previousTarget = tmp;
	}
	mediaTimer = setTimeout(handleMedia, 10000);
}


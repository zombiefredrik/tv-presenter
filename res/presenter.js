var media = [];
var currentMedia = 0;
var currentTarget = 'target_1';
var previousTarget = 'target_2';
var mediaTimer;
var fileTimer;
var speed = 7000;


$( document ).ready(function() {
	$.getJSON( "/getSettings", function( data ) {
		speed = data.speed;
	});
	getFiles();
});

function getFiles() {
		$.getJSON( "/getFiles", function( data ) {
			media = [];
			data.forEach(function(d){
				media.push(d);
			});
			if(mediaTimer == undefined) {
				//hack
				currentMedia = -1;
				handleMedia();

			}
		});
		fileTimer = setTimeout(getFiles,30000);

}

function handleMedia() {
	currentMedia++;
	if(media[currentMedia] == undefined || currentMedia > media.length) {
		currentMedia = 0;
	}

	//console.log(currentMedia,media.length);

	if(media[currentMedia] !== undefined){
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
	mediaTimer = setTimeout(handleMedia, speed);
}


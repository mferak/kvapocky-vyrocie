/* animacia tlacitiek
$("#kronika").on( "click",function() {
	if($("#pozadie").hasClass("kronika")==false){
		$("#pozadie").animate({
			left:"218px"
		},{
		  queue: false,
		  duration: 500,
		  easing: "swing"
		}).animate({
			width:"436px"
			},400,"swing", function() {
				$("#pozadie").animate({
					width:"218px"
				},100,"swing");
		});
		$("#pozadie").addClass("kronika");
		$("#kronika").animate({
			color:"white"
		},500,"swing");
		$("#main_text").animate({
			color:"black"
		},500,"swing");
	}
});
$("#main_text").on( "click",function() {
	if($("#pozadie").hasClass("kronika")){
		$("#pozadie").animate({
			left:"0px"
		},{
		  queue: false,
		  duration: 500,
		  easing: "swing"
		}).animate({
			width:"436px"
			},100,"swing", function() {
				$("#pozadie").animate({
					width:"218px"
				},400,"swing");
		});
		$("#pozadie").removeClass("kronika");
		$("#kronika").animate({
			color:"black"
		},500,"swing");
		$("#main_text").animate({
			color:"white"
		},500,"swing");
	}
});

window.scrollBy({ //smooth scroll
  top: 100, 
  left: 0, 
  behavior: 'smooth' 
});*/
/* kaslat na ajax nejde to
$("#buttons a").click(function(evt) {
	evt.preventDefault();//pouzit return false ked nefunguje
	var adresa = $(this).attr("href");
	
	//document.title = $(this).text();
	//history.pushState("", "", adresa);
	$("#content").fadeOut(300, function() {
		$("#content").load(adresa+"#content",function(){
			$(this).delay(100).fadeIn(function(){
				console.log(adresa+"#content");
			});
		});		
	});
});
$(window).on("popstate", function() {
	var pos = location.pathname.lastIndexOf("/");
	var adresa = location.pathname.substr(pos+1);
	console.log(adresa+"bleeeh");
	//Pace.restart();
	$("#content").fadeOut(300, function() {
		$("#content").load(adresa+"#content").fadeIn(function(){
			
		});
	});
}); */
var lb1 = $('.gallery a').simpleLightbox( {rel: 'kronikaObdobie1'} );
var lb2 = $('.gallery a').simpleLightbox( {rel: 'kronikaObdobie2'});

$("#buttons").stick_in_parent();

/*window.onscroll = function() {stick()};
var tlacitka = $('#buttons');
var sticky = document.getElementById("buttons").offsetTop;
function stick() {
	console.log(sticky+" "+(window.pageYOffset-25));
	if (window.pageYOffset+25 >= sticky) {
		$('#buttonsHidden').show();
		$('#buttons').addClass("sticky");
	}else{
		$('#buttonsHidden').hide();
		$('#buttons').removeClass("sticky");
	}
}*/

$("#kronika").click(function(evt) {
	$("#content").fadeOut(300, function() {
		$("#kronos").fadeIn(300);
	});
});
$("#main_text").click(function(evt) {
	$("#kronos").fadeOut(300, function() {
		$("#content").fadeIn(300);
	});
});

$('a[href*="#"]')
	// Remove links that don't actually link to anything
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function(event) {
	var $linkElem = $(this);
    // On-page links
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname){
		// Figure out element to scroll to
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		// Does a scroll target exist?
		if (target.length) {
			// Only prevent default if animation is actually gonna happen
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 1000, function() {
				// Callback after animation
				// Must change focus!
				//var $target = $(target);
				//$target.focus();
				//if ($target.is(":focus")) { // Checking if the target was focused
				//	return false;
				//} else {
				//	$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
				//	$target.focus(); // Set focus again
				//};
				window.location.hash = $linkElem.attr('href').substring(1);
			});
		}
    }
});
$("#kronika").on( "click",function() {
	if($(this).hasClass("buttonActive")==false){
		$(this).addClass("buttonActive");
		$("#main_text").removeClass("buttonActive");
	}
});
$("#main_text").on( "click",function() {
	if($(this).hasClass("buttonActive")==false){
		$(this).addClass("buttonActive");
		$("#kronika").removeClass("buttonActive");
	}
});
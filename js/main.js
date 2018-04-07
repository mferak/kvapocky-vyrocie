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
$("#buttons a").click(function(evt) {
	evt.preventDefault();//pouzit return false ked nefunguje
	var adresa = $(this).attr("href");
	$("#bs-example-navbar-collapse-1 ul li").each(function() {
		$(this).removeClass("active");
	});
	$(this).parent("li").addClass("active");
	document.title = $(this).text();
	history.pushState("", "", adresa);
	$("#obsah").fadeOut(300, function() {
		$("#obsah").load(adresa+" #obsah",function(){
			$(this).delay(100).fadeIn(function(){
				$('.carousel').carousel();
			});
		});		
	});
});
$(window).on("popstate", function() {
	var pos = location.pathname.lastIndexOf("/");
	var adresa = location.pathname.substr(pos+1);
	Pace.restart();
	$("#obsah").fadeOut(300, function() {
		$("#obsah").load(adresa+" #obsah").fadeIn(function(){
			$('.carousel').carousel();
		});
	});
	$("#bs-example-navbar-collapse-1 ul li").each(function() {
		$(this).removeClass("active");
		$(document.activeElement).blur();
		if ($(this).children("a").attr("href")== adresa){
			$(this).addClass("active");
			document.title = $(this).text();
		}
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
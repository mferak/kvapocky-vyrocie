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
});*/
// jQuery.fn.onPositionChanged = function (trigger, millis) {
// if (millis == null) millis = 100;
// var o = $(this[0]); // our jquery object
// if (o.length < 1) return o;

// var lastPos = null;
// var lastOff = null;
// setInterval(function () {
// if (o == null || o.length < 1) return o; // abort if element is non existend eny more
// if (lastPos == null) lastPos = o.position();
// if (lastOff == null) lastOff = o.offset();
// var newPos = o.position();
// var newOff = o.offset();
// if (lastPos.top != newPos.top || lastPos.left != newPos.left) {
// $(this).trigger('onPositionChanged', { lastPos: lastPos, newPos: newPos });
// if (typeof (trigger) == "function") trigger(lastPos, newPos);
// lastPos = o.position();
// }
// if (lastOff.top != newOff.top || lastOff.left != newOff.left) {
// $(this).trigger('onOffsetChanged', { lastOff: lastOff, newOff: newOff});
// if (typeof (trigger) == "function") trigger(lastOff, newOff);
// lastOff= o.offset();
// }
// }, millis);

// return o;
// };

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
$('.collapser').click(function () {
    $(this).prev().collapse('toggle');

});
$('.identita').on('hidden.bs.collapse', function () {
    prepoc();
});
$('.identita').on('shown.bs.collapse', function () {
    prepoc();
});
// $(".hashtag").css({
// left:(770/1920)*$(window).width()
// });

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function rozhod() {
    var kvapka = $(".kvapla");
    var kvapky = $.makeArray(kvapka);
    shuffle(kvapky);
    var min = $("#oblaky").offset().left;
    var scrWidth = $(document).width();
    var scrHei = $(window).height();
    var docHeight = $(document).height();
    var diff = 1 / kvapky.length;
    for (i = 0; i <= kvapky.length - 1; i++) {
        var ratio = $(kvapky[i]).attr("data-enllax-ratio");
        //var maxPos = ratio*scrHei + (1-ratio)*docHeight
        var maxInitPos = ((ratio * scrHei) + (1 - ratio) * docHeight) - 800;
        $(kvapky[i]).css({
            left: Math.floor(Math.random() * (1200 - min + 1) + min),
            top: 700 + (diff * (i + Math.random()) * maxInitPos)
        });
    }
}


//lazyload();
var lb = $('.alone').simpleLightbox({
    nav: false,
    loop: false,
    enableKeyboard: false,
    showCounter: false,
    captionType: 'attr',
    captionsData: "data-original-title"
});
var lbk1 = $('.gallery a').simpleLightbox({rel: 'kronikaObdobie1'});
var lbf1 = $('.gallery a').simpleLightbox({rel: 'fotkyObdobie1'});
var lbk2 = $('.gallery a').simpleLightbox({rel: 'kronikaObdobie2'});
var lbf2 = $('.gallery a').simpleLightbox({rel: 'fotkyObdobie2'});
var lbk3 = $('.gallery a').simpleLightbox({rel: 'kronikaObdobie3'});
var lbf3 = $('.gallery a').simpleLightbox({rel: 'fotkyObdobie3'});


//$('#os').stick_in_parent();

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
var pred = 1;
var count = 1;
var current = 1;
var obdobia = [];
var autoScrolling = false;
var druhySet = false;
$(document).ready(function () {
    $("#oblaky").css({
        left: ($(window).width() / 2) - ($("#oblaky").width() / 2)
    });
    $('#buttons').stick_in_parent({
        sticky_class: "sticky",
        recalc_every: 0
    }).on("sticky_kit:stick", function (e) {
        console.log("has stuck!", e.target);
    }).on("sticky_kit:recalc", function (e) {
        console.log("has unstuck!", e.target);
    });
    prepocitaj();
    rozhod();
    $(window).enllax();
});

function prepocitaj() {
    for (var i = 1; i <= 9; i++) {
        obdobia[i] = $('#obdobie_' + i).offset().top;
    }
}

function prepoc() {
    if (druhySet) {
        for (var i = 1; i <= 9; i++) {
            obdobia[i] = $('#obdobie' + i).offset().top;
        }
    }
}

$(window).scroll(function () {
    if (!autoScrolling) {
        var stran = $(document).scrollTop();
        while (obdobia[count] <= stran + 150) {
            current = count;
            count++;
        }
        count = 1;
        if (current != pred) {
            pred = current;
            $('.colour').removeClass('colour');
            $("a[href='#obdobie_" + pred + "']").addClass('colour');
        }
    }
    if ($(document).scrollTop() <= obdobia[1]) {
        $("#os").css({
            opacity: (($(document).scrollTop() / obdobia[1]))
        });
    } else {
        $("#os").css({
            opacity: 1
        });
    }
});

var player;
var progressBar;
var btnPlayPause;

$(".playPauseBtn").on("click", function () {
    if (player && !player[0].paused && player[0].src != $(this).parent("#player").find("#music")[0].src) {
        playPauseAudio();
    }
    var parent = $(this).parent("#player");
    btnPlayPause = $(this).find(".controls");
    player = $(parent).find("#music");
    progressBar = $(parent).find("#progress");
    progres = $(parent).find("#progressText");
    playPauseAudio();
    addListener();
    $(progres).off("mousedown");
    $(progres).on("mousedown", function (e) {
        if (!player[0].paused && player[0].src != $(this).find("#music")[0].src) {
        } else {
            player = $(parent).find("#music");
            progressBar = $(parent).find("#progress");
            progres = $(parent).find("#progressText");
            seek(e);
            $(this).on("mousemove", function (e) {
                seek(e);
            });
        }
    });
    $(window).on("mouseup", function () {
        $(progres).off("mousemove");
    });
});

function addListener() {
    if (player != null) {
        player[0].addEventListener('timeupdate', updateProgressBar(), false);
    }
    if (player != null && !player[0].paused) {
        timer = setTimeout("addListener(player,progressBar,btnPlayPause);", 500);
    } else if (player != null && player[0].ended) {
        changeButtonType('play');
    }
}

function seek(e) {
    if (player[0].src) {
        var percent = e.offsetX / progressBar[0].offsetWidth;
        player[0].currentTime = percent * player[0].duration;
        progressBar.val(Math.floor(percent * 1000));
        //progressBar.innerHTML = progressBar.value + '% played';
    }
}

function playPauseAudio() {
    if (player[0].src) {
        if (player[0].paused) {
            // Change the button to a pause button
            changeButtonType('pause');
            player[0].play();
        } else {
            // Change the button to a play button
            changeButtonType('play');
            player[0].pause();
        }
    }
}

function changeButtonType(value) {
    btnPlayPause.attr('src', "Images/Icons/" + value + ".svg");
}

function updateProgressBar() {
    // Work out how much of the media has played via the duration and currentTime parameters
    var percentage = Math.floor((1000 / player[0].duration) * player[0].currentTime);
    // Update the progress bar's value
    progressBar.val(percentage);
    // Update the progress bar's text (for browsers that don't support the progress element)
    //progressBar.innerHTML = progressBar.title = percentage + '% played';
}

$("#kronika").click(function (evt) {
    $("#content").fadeOut(300, function () {
        $("#kronos").fadeIn(300, function () {
            druhySet = true;
            for (var i = 1; i <= 9; i++) {
                obdobia[i] = $('#obdobie' + i).offset().top;
            }
            autoScrolling = true;
            $('html, body').animate({
                scrollTop: $('#obdobie' + current).offset().top - 100
            }, 300, "easeOutSine", function () {
                autoScrolling = false;
            });
        });
    });
});
$("#main_text").click(function (evt) {
    $("#kronos").fadeOut(300, function () {
        $("#content").fadeIn(300, function () {
            druhySet = false;
            for (var i = 1; i <= 9; i++) {
                obdobia[i] = $('#obdobie_' + i).offset().top;
            }
            autoScrolling = true;
            $('html, body').animate({
                scrollTop: $('#obdobie_' + current).offset().top - 100
            }, 300, "easeOutSine", function () {
                autoScrolling = false;
            });
        });
    });
});

$('a[href*="#"]')
// Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
        var $linkElem = $(this);
        // On-page links
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            // Figure out element to scroll to
            var target = $(this.hash);
            if (druhySet) {
                var novy = this.hash.replace("_", "");
                target = $(novy);
            }
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('.colour').removeClass('colour');
                $(this).parent().addClass('colour');
                autoScrolling = true;
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 1000, "easeOutSine", function () {
                    autoScrolling = false;
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
                    //window.location.hash = $linkElem.attr('href').substring(1);
                });
            }
        }
    });
$("#kronika").on("click", function () {
    if ($(this).hasClass("buttonActive") == false) {
        $(this).addClass("buttonActive");
        $("#main_text").removeClass("buttonActive");
    }
});
$("#main_text").on("click", function () {
    if ($(this).hasClass("buttonActive") == false) {
        $(this).addClass("buttonActive");
        $("#kronika").removeClass("buttonActive");
    }
});
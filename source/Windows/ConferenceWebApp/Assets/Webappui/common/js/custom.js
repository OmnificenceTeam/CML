$(window).resize(function () {
    var height = $(window).height();

    if (page == document.getElementById("login")) {
        if ((height - $('.login-cont').height()) / 2 < 0) {
            $('.login-cont').css({ 'top': 20 + 'px' });
        }
        else {
            $('.login-cont').css({ 'top': ((height - $('.login-cont').height()) / 2) - 100 + 'px' });
        }

        if (((height - $('.login-cont').height()) / 2) - 100 < 0)
            $('.login-cont').css({ 'top': 0 + 'px' });

    }
});


function centerLoginContainer() {
    var height = $(window).height();
    if ((height - $('.login-cont').height()) / 2 < 0) {
        $('.login-cont').css({ 'top': 20 + 'px' });
    }
    else {
        $('.login-cont').css({ 'top': ((height - $('.login-cont').height()) / 2) - 100 + 'px' });
    }

    if (((height - $('.login-cont').height()) / 2) - 100 < 0)
        $('.login-cont').css({ 'top': 0 + 'px' });
}

$(document).ready(function () {

    $('.flat-menu').click(function () {

	});
	
    $('.sidebar-header, .page-content').click(function () {

	});

	
    $('.deploy-sidebar, .close-icon, .delete-sidebar').click(function () {

    });

 	
	$('.bxslider').bxSlider({
		pager:false,
		controls:true,
		touchEnabed:false,
		infiniteLoop: true,
		preventDefaultSwipeX:true
	});	
	
	$('.bx-next').click(function(){
		return false;
	});
	
	$('.bx-prev').click(function(){
		return false;
	});	
	
	$('.page-coach').hide();
	
	$('.nav-coach').click(function(){
		$('.page-coach').fadeIn(200);
		document.ontouchmove = function(event){ event.preventDefault();}
		snapper.close();
	});
	
	$('.page-coach').click(function(){
		$('.page-coach').fadeOut(200);
		document.ontouchmove = function(event){ event.allowDefault();}
	});
});

var coreData = null;
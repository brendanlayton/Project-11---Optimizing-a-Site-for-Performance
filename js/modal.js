var modal = $('#modal');
var modalBox = $('.reveal-modal');

//function goUp() {
//	$('html, body').animate({ 
//		"scrollTo": "+=10vh" }, "slow" );
//	return false;
//}


function goToTop() {
	$('html, body').animate({ scrollTop: 200 }, 'slow');
	return false;
	scrollTo
}


$("#gallery a").click(function(event) { 
  event.preventDefault();
	var imageLocation = $(this).data().name;
	var infoHTML = $(this).next().html();

	var modalContent = '<div class="reveal-modal">';
		modalContent += '<h2 class="modalTitle">Photo</h2>';
		modalContent += '<picture>';
		modalContent += '<source srcset="img/photos/desktop/' + imageLocation + '-gallery.jpg" media="(min-width:1200px)">';
		modalContent += '<source srcset="img/photos/tablet/' + imageLocation + '-gallery.jpg" media="(min-width:768px)">';
		modalContent += '<source srcset="img/photos/mobile/' + imageLocation + '-gallery.jpg" media="(min-width:0)">';
		modalContent += '<img srcset="img/photos/desktop/' + imageLocation + '-gallery.jpg" src="img/photos/desktop/' + imageLocation + '-gallery.jpg" alt="Lake">';
		modalContent +=	'</picture>';
		modalContent += '<div class="info">';
		modalContent += infoHTML;
		modalContent += '</div>';
		modalContent += '<a class="close-reveal-modal" onclick="closeModal()" aria-label="Close">&#215;</a>';
		modalContent += '</div>';	
	
		modal.html(modalContent).css('display', 'block');
		$('.reveal-modal').fadeIn('slow');
		//goToTop();
});

function closeModal() {
  modal.hide();
}


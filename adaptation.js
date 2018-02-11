$(function(){

	var winw = $(window).width(),
		winh = $(window).height(),
		originalw = 330,
		originalh = 520,
		scale_screen = winh / winw,
		screen_width=330,
		scale_w = winw / originalw,
		scale_h = winh / originalh,
		_pageshow = $(".flip > section > div.pageshow"),
		_sc = "";

	if(Math.abs(scale_screen - 1.57) > 0.06){
		if(scale_w > scale_h){
			_sc = "scale(" + scale_h +")";
		}else{
			_sc = "scale(" + scale_w +")";
		}
	}else{
			_sc = "scale(" + scale_w + "," + scale_h +")";
	}
	_pageshow.css({
		'width': originalw + 'px',
		'height': originalh + 'px',
		'margin-top': (winh - originalh) / 2,
		'margin-left': (winw - originalw) / 2,
		'transform': _sc,
		'-webkit-transform': _sc,
	});

	// if(scale_w > scale_h){
	// 	document.getElementById('viewport').content="width=330,initial-scale="+scale_h+",maximum-scale="+scale_h+", minimum-scale="+scale_h+", user-scalable=no";
	// 	winw = window.innerWidth;
	// 	_pageshow.css({
	// 		'width': originalw + 'px',
	// 		'height': originalh + 'px',
	// 		'margin-left': (winw - originalw) / 2
	// 	});
	// }else{
	// 	document.getElementById('viewport').content="width=330,initial-scale="+scale_w+",maximum-scale="+scale_w+", minimum-scale="+scale_w+", user-scalable=no";
	// 	winh = window.innerHeight;
	// 	_pageshow.css({
	// 		'width': originalw + 'px',
	// 		'height': originalh + 'px',
	// 		'margin-top': (winh - originalh) / 2
	// 	});
	// }
	
	$("#invitation-container").height(window.innerHeight);

 	if($('.circle').length){
	    $('.circle').each(function(index, el) {
	        var _w = $(el).css('width'),
	      	    circle_width;
	      	if(/%/.test(_w)){
		        circle_width = parseInt(_w , 10)/100 * screen_width;
		    }else{
		    	circle_width = parseInt(_w , 10);
		    }
	      
	        $(el).css({
	            'width':circle_width + 'px',
	           'height':circle_width+'px'
	        });
	    });
	}

})
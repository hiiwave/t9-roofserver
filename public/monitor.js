var socket = io.connect();
var drawer, bindSocketEvents;
var senseSlider;
var threshold = 60;

$(document).ready(function() {
  bindSocketEvents();
  drawer.init("50");
  drawer.update("50");
  senseSlider.init();
});

senseSlider = {
	init: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		$( "#sensitivity" ).slider({
	    value: 60,
	    orientation: "horizontal",
	    range: "min",
	    max: 80,
	    min: 50,
	    value: 65,
	    slide: senseSlider.refresh,
	    animate: true
	  });
	},
	refresh: function() {
		console.log("sensitivity = " + $("#sensitivity").slider('value'));
	}
}


bindSocketEvents = function() {
	socket.on('connect', function () {
	  console.log('User connected!');
	});

	socket.on('date', function(data) {
	  $('#date').text(data.date);
	});

	socket.on('newPkt', function(pkt) {
	  var str = pkt.humi;
	  $('#humidity').html(str);
	  $('#countData').html(1 + parseInt($('#countData').html()));
	  drawer.update(str);

	  if (pkt.humi < threshold) {
	  	$("#state").html("Rain Safety");
	  } else {
	  	$("#state").html("Rain Hazard");
	  }
	});
};

drawer = {
    rp1: undefined,
	init: function(pkt) {
		drawer.rp1 = radialProgress(document.getElementById('div1'))
                .label("HUMIDITY")
                .diameter(150)
                .value(pkt)
                .render();
    },
    update: function(pkt) {
        drawer.rp1
		  .value(pkt)
		  .render();
	},

	onClick1: function() {
	    // deselect();
	    // div1.attr("class","selectedRadial");
	},

    
}

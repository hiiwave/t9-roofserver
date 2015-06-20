var socket = io.connect();
var drawer, bindSocketEvents;


$(document).ready(function() {
  bindSocketEvents();
  drawer.init();
});

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
	});
};

drawer = {
    rp1: undefined,
	init: function(pkt) {
        var div1=d3.select(document.getElementById('div1'));
 
		drawer.rp1 = radialProgress(document.getElementById('div1'))
                .label("HUMIDITY")
                .onClick(onClick1)
                .diameter(150)
                .value(pkt)
                .render();
    },
    update: function(pkt) {


		// radialProgress(document.getElementById('div1'))
                drawer.rp1
		  .diameter(150)
		  .value(pkt)
		  .render();
	},

	onClick1: function() {
	    deselect();
	    div1.attr("class","selectedRadial");
	},

    
}

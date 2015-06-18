var socket = io.connect();

socket.on('connect', function () {
  console.log('User connected!');
});

socket.on('date', function(data) {
  $('#date').text(data.date);
});

socket.on('newPkt', function(pkt) {
  var str = pkt.date + '<br>' + pkt.noise + '<br>' + pkt.temparature + '<br>' + pkt.humidity + '<br>' + pkt.lat + '<br>' + pkt.lng;
  $('#newData').html(str);
  $('#countData').html(1 + parseInt($('#countData').html()));
});
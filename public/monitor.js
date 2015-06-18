var socket = io.connect();

socket.on('connect', function () {
  console.log('User connected!');
});

socket.on('date', function(data) {
  $('#date').text(data.date);
});

socket.on('newPkt', function(pkt) {
  var str = pkt.humi
  $('#humidity').html(str);
  console.log("pkt = " + pkt + ", pkt.humi = " + pkt.humi);
  $('#countData').html(1 + parseInt($('#countData').html()));
});
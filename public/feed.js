function PacketGen(humidity, lat, lng) {
  this.date = date;
  this.noise = noise;
  this.temparature = temparature;
  this.humi = humidity;
  this.lat = lat;
  this.lng = lng;
};
function randU(min, max) {
  return min + (max - min) * Math.random();
};

var feed = {
  init : function() {
    setInterval(function() {
      console.log("feed.ready?" + feed.ready);
      feed.ready? feed.action():0;
    }, 1500);
  },
  ready : true,
  postData : function(data) {
    var sendSuccess = function () {
      console.log('Got response of POST /feedhumi: ' + this.responseText);
      $('#pktCount').html(1 + parseInt($('#pktCount').html()));
      feed.ready = true;
    };
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/feedhumi');
    xhr.onload = sendSuccess;
    xhr.send(data); 
  },
  sim_max: 75,
  action : function() {
    humidity = randU(feed.sim_max - 0.8, feed.sim_max);
    feed.sim_max -= 0.8;
    if (feed.sim_max < 55) {
      feed.sim_max = 75;
    }
    var packet = {
      humi: humidity
    };
    feed.postData(JSON.stringify(packet));
    feed.ready = false;
  }
};
feed.init();
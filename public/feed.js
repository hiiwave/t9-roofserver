function PacketGen(date, noise, temparature, humidity, lat, lng) {
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
  action : function() {
    var packet = new PacketGen(new Date(), randU(0, 0.5), randU(20, 25), randU(50, 70),
                             randU(25.0173, 25.0174), randU(121.5394, 121.5395) );
    feed.postData(JSON.stringify(packet));
    feed.ready = false;
  }
};
feed.init();
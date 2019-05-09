const i2cBus = require("i2c-bus");
const Pca = require("pca9685").Pca9685Driver;
const Lcd = require("lcdi2c");
const io = require("pigpio");
const os = require('os');
const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
try {
  process.stdin.setRawMode(true);

  process.stdin.on('keypress', (str, key) => {
    console.log(key.name);
    if (key.ctrl && key.name == 'c') {
      process.exit();
    } else if(key.name == "up") {
      if(test[1].position < 1) 
        test[1].position += 0.1
    } else if(key.name == "down") {
      if(test[1].position > -1) 
        test[1].position -= 0.1
    } else if(key.name == "right") {
      if(test[0].position < 1) 
        test[0].position += 0.1
    } else if(key.name == "left") {
      if(test[0].position > -1) 
        test[0].position -= 0.1
    }
  });
} catch(e) {
 console.log(e);
}



var arm = {
  basePan: {
    pin: 0,
    position: 0,
    range: {
      min: 1000,
      max: 2000
    }
  },
  baseTilt: {
    pin: 1,
    position: 0,
    range: {
      min: 1000,
      max: 2000
    }
  }
  
}
var test = [{
  pin: 8,
  position: 0
}, {
  pin: 9,
  position: 0
}]
var pca = new Pca({
  i2c: i2cBus.openSync(3),
  address: 0x40,
  frequency: 50,
  debug: false
}, (err) => {
  console.log(err ? `Error initializing PCA9685: ${err}` : "PCA9685 Initialized");
  function setAll(pwm) {
    for(let i = 0; i < 8; i++) {
      pca.setPulseLength(i, pwm)
    }
  }
  function testAll() {
    flag = false;
    setInterval(() => {
      setAll(flag ? 1000 : 2000);
      flag = !flag;
    }, 500);
  }
  function test() {
    setInterval(() => {
      for(let t of test) {
        pca.setPulseLength(t.pin, 1500 + 500 * t.position);
      }
    }, 10);
  }
});
/*
var pca-ac = new Pca({
    i2c: i2cBus.openSync(1),
    address: 0x70,
    frequency: 50,
    debug: false
}, (err) => {
  err && throw err;
  console.log("PCA9685 All-Call Initialized")
}
*/

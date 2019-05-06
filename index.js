const i2cBus = require("i2c-bus");
const Pca = require("pca9685").Pca9685Driver;
const Lcd = require("lcdi2c");
const io = require("pigpio");

var pca = new Pca({
    i2c: i2cBus.openSync(3),
    address: 0x40,
    frequency: 50,
    debug: false
}, (err) {
  err && throw err;
  console.log("PCA9685 Initialized")
}

var pca-ac = new Pca({
    i2c: i2cBus.openSync(1),
    address: 0x70,
    frequency: 50,
    debug: false
}, (err) {
  err && throw err;
  console.log("PCA9685 All-Call Initialized")
}

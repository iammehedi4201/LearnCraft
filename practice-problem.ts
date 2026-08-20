// class Engine {
// start() {
// console.log("Engine started");
// }
// }

// class Car {
// constructor(private engine: Engine) {}

// startCar() {
// this.engine.start();
// console.log("Car started");
// }
// }

// const engine = new Engine();
// const car = new Car(engine);

// car.startCar();

class Engine {
  start() {
    console.log("Engine Started");
  }
}

class Gps {
  navigation(destination: string) {
    console.log(`Navigating to ${destination}`);
  }
}

class Stereo {
  playRadio() {
    console.log("Playing radio");
  }
}

class Car {
  private engine: Engine;
  private gps: Gps;
  private stereo: Stereo;

  constructor(engine: Engine, gps: Gps, stereo: Stereo) {
    this.engine = engine;
    this.gps = gps;
    this.stereo = stereo;
  }

  startCar(destination: string) {
    this.engine.start();
    this.gps.navigation(destination);
    this.stereo.playRadio();
    console.log("Car started");
  }
}

const engine = new Engine();
const gps = new Gps();
const stereo = new Stereo();
const car = new Car(engine, gps, stereo);

car.startCar("Dhaka");

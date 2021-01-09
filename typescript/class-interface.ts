interface HasRadio {
  switchRadio(trigger: boolean): void;
}

interface HasBattery {
  checkBatteryStatus(): void;
}

class Car implements HasRadio {
  switchRadio(trigger: boolean): void {}
}

class CellPhone implements HasBattery, HasRadio {
  switchRadio(trigger: boolean): void {}
  checkBatteryStatus() {}
}

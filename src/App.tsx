import { encode } from "./irEncoder";

export function App() {
  let buf = encode({
    running: true,
    mode: "Cool",
    volume: "Auto",
    temperatureAbsolute: 26,
    temperatureRelative: 0,
    sleep: false,
    powerSave: false,
    hour: 0,
    minute: 44,
    cleaning: true,
    offTimer: false,
    offTimerHour: 0,
    offTimerMinute: 0,
    onTimer: false,
    onTimerHour: 0,
    onTimerMinute: 0,
    directionVertical: "Auto",
    directionHorizontal: "Stop",
    checkCode: 0
  }, "Cool");
  buf.forEach((byte, index) => {
    console.log(`Byte ${index}: ${byte.toString(2).padStart(8, '0')}`);
  });
  return (
    <div>
    </div>
  );
}

export default App;

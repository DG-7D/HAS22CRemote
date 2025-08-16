import React from "react";
import { encode, type Button, type CheckCode, type Hour, type Minute, type Mode, type State, type TemperatureAbsolute, type TemperatureRelative, type Volume } from "./irEncoder";

export function App() {
  const [state, setState] = React.useState<State>({
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
  });
  const [pushedButton, setPushedButton] = React.useState<Button>("Cool");
  const [serverResponse, setServerResponse] = React.useState<string>("");

  return (
    <>
      <div>
        <label>
          運転
          <input type="checkbox" checked={state.running} onChange={(e) => setState({ ...state, running: e.target.checked })} />
        </label>
      </div>
      <div>
        <label>
          モード
          <select value={state.mode} onChange={(e) => setState({ ...state, mode: e.target.value as Mode })}>
            <option value="Auto">自動</option>
            <option value="Cool">冷房</option>
            <option value="Heat">暖房</option>
            <option value="Dry">除湿</option>
            <option value="Fan">送風</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          風量
          <select value={state.volume} onChange={(e) => setState({ ...state, volume: e.target.value as Volume })}>
            <option value="Auto">自動</option>
            <option value="Silent">しずか</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="Powerful">パワフル</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          温度 (冷房/暖房)
          <input type="number" value={state.temperatureAbsolute} onChange={(e) => setState({ ...state, temperatureAbsolute: parseFloat(e.target.value) as TemperatureAbsolute })} min={16} max={30} step={0.5} />
        </label>
      </div>
      <div>
        <label>
          温度 (自動/除湿)
          <input type="number" value={state.temperatureRelative} onChange={(e) => setState({ ...state, temperatureRelative: parseInt(e.target.value) as TemperatureRelative })} min={-2} max={2} />
        </label>
      </div>
      <div>
        <label>
          おやすみ
          <input type="checkbox" checked={state.sleep} onChange={(e) => setState({ ...state, sleep: e.target.checked })} />
        </label>
      </div>
      <div>
        <label>
          パワーセーブ
          <input type="checkbox" checked={state.powerSave} onChange={(e) => setState({ ...state, powerSave: e.target.checked })} />
        </label>
      </div>
      <div>
        <label>
          内部クリーン
          <input type="checkbox" checked={state.cleaning} onChange={(e) => setState({ ...state, cleaning: e.target.checked })} />
        </label>
      </div>
      <div>
        <label>
          時刻
          <input type="number" value={state.hour} onChange={(e) => setState({ ...state, hour: parseInt(e.target.value) as Hour })} min={0} max={23} step={1} />
          :
          <input type="number" value={state.minute} onChange={(e) => setState({ ...state, minute: parseInt(e.target.value) as Minute })} min={0} max={59} step={1} />
        </label>
        <div>
          <label>
            切タイマ
            <input type="checkbox" checked={state.offTimer} onChange={(e) => setState({ ...state, offTimer: e.target.checked })} />
            <input type="number" value={state.offTimerHour} onChange={(e) => setState({ ...state, offTimerHour: parseInt(e.target.value) as Hour })} min={0} max={23} step={1} />
            :
            <input type="number" value={state.offTimerMinute} onChange={(e) => setState({ ...state, offTimerMinute: parseInt(e.target.value) as Minute })} min={0} max={59} step={1} />
          </label>
        </div>
        <div>
          <label>
            入タイマ
            <input type="checkbox" checked={state.onTimer} onChange={(e) => setState({ ...state, onTimer: e.target.checked })} />
            <input type="number" value={state.onTimerHour} onChange={(e) => setState({ ...state, onTimerHour: parseInt(e.target.value) as Hour })} min={0} max={23} step={1} />
            :
            <input type="number" value={state.onTimerMinute} onChange={(e) => setState({ ...state, onTimerMinute: parseInt(e.target.value) as Minute })} min={0} max={59} step={1} />
          </label>
        </div>
        <div>
          <label>
            風向上下
            <input type="checkbox" checked={state.directionVertical === "Auto"} onChange={(e) => setState({ ...state, directionVertical: e.target.checked ? "Auto" : "Stop" })} />
          </label>
        </div>
        <div>
          <label>
            風向左右
            <input type="checkbox" checked={state.directionHorizontal === "Auto"} onChange={(e) => setState({ ...state, directionHorizontal: e.target.checked ? "Auto" : "Stop" })} />
          </label>
        </div>
        <div>
          <label>
            点検コード
            <input type="number" value={state.checkCode} onChange={(e) => setState({ ...state, checkCode: parseInt(e.target.value) as CheckCode })} min={0} max={49} step={1} />
          </label>
        </div>
        <div>
          <label>
            押下ボタン
            <select value={pushedButton} onChange={(e) => setPushedButton(e.target.value as Button)}>
              <option value="Auto">自動</option>
              <option value="Stop">停止</option>
              <option value="Cool">冷房</option>
              <option value="Heat">暖房</option>
              <option value="TempDown">温度-</option>
              <option value="TempUp">温度+</option>
              <option value="Volume">風量</option>
              <option value="DirectionVertical">風向上下</option>
              <option value="DirectionHorizontal">風向左右</option>
              <option value="Sleep">おやすみ</option>
              <option value="Clean">内部クリーン</option>
              <option value="ECO">ECO</option>
              <option value="OnTimer">入タイマ</option>
              <option value="OffTimer">切タイマ</option>
              <option value="Other">その他</option>
            </select>
          </label>
        </div>
      </div>
      <div>{toBinary(encode(state, pushedButton), true)}</div>
      <div>
        <button onClick={() => {
          fetch(
            `send/?data=0b${toBinary(encode(state, pushedButton), true)}`
          ).then(
            response => response.text()
          ).then(
            text => setServerResponse(new Date().toTimeString() + "\n" + text)
          );
        }}>送信</button>
      </div>
      <div>
        <pre>
          {serverResponse}
        </pre>
      </div>
    </>
  );
}

export default App;

function toBinary(value: Uint8Array, lsBitFirst: boolean = false): string {
  return Array.from(value)
    .map((byte) => byte.toString(2).padStart(8, "0"))
    .map((byte) => (lsBitFirst ? byte.split("").reverse().join("") : byte))
    .join("");
}
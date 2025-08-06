type Mode = "Heat" | "Auto" | "Cool" | "Dry" | "Fan";
const modeBits: Record<Mode, number> = {
    Heat: 0b000,
    Auto: 0b001,
    Cool: 0b010,
    Dry: 0b011,
    Fan: 0b100,
};

type Volume = "Silent" | "1" | "2" | "3" | "4" | "Powerful" | "Auto";
const volumeBits: Record<Volume, number> = {
    Silent: 0b0000001,
    "1": 0b0001010,
    "2": 0b0101101,
    "3": 0b1000001,
    "4": 0b1011010,
    Powerful: 0b1100100,
    Auto: 0b1111111,
};

type TemperatureAbsolute = 16 | 16.5 | 17 | 17.5 | 18 | 18.5 | 19 | 19.5
    | 20 | 20.5 | 21 | 21.5 | 22 | 22.5 | 23 | 23.5 | 24 | 24.5
    | 25 | 25.5 | 26 | 26.5 | 27 | 27.5 | 28 | 28.5 | 29 | 29.5
    | 30;
function temperatureAbsoluteToNumber(temp: TemperatureAbsolute): number {
    return (temp - 16) * 10;
}

type TemperatureRelative = -2 | -1 | 0 | 1 | 2;
const temperatureRelativeBits: Record<TemperatureRelative, number> = {
    "-2": 0b110,
    "-1": 0b101,
    "0": 0b000,
    "1": 0b001,
    "2": 0b010,
};

type Hour = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
    | 20 | 21 | 22 | 23;
type Minute = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
    | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29
    | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39
    | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49
    | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59;

type DirectionVertical = "Auto" | "Stop";
const directionVerticalBits: Record<DirectionVertical, number> = {
    Auto: 0b0,
    Stop: 0b1,
};

type DirectionHorizontal = "Auto" | "Stop";
const directionHorizontalBits: Record<DirectionHorizontal, number> = {
    Auto: 0b01,
    Stop: 0b10,
};

type ButtonOthers = "Dry" | "Fan" | "Cancel" | "PowerSave";
type Button = "Auto" | "Stop" | "Cool" | "Heat" | "TempDown" | "TempUp" | "Volume" | "DirectionVertical" | "DirectionHorizontal" | "Sleep" | "Clean" | "ECO" | "OnTimer" | "OffTimer" | "Other";
const buttonBits: Record<Button, number> = {
    Other: 0b00000,
    Stop: 0b00001,
    TempDown: 0b00010,
    TempUp: 0b00010,
    Sleep: 0b00011,
    OnTimer: 0b00101,
    Cool: 0b00110,
    Heat: 0b00110,
    DirectionVertical: 0b00111,
    DirectionHorizontal: 0b01000,
    ECO: 0b01100,
    Volume: 0b10001,
    Auto: 0b10111,
    Clean: 0b11000,
    OffTimer: 0b11101,
};

type CheckCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
    | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29
    | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39
    | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49;


interface State {
    running: boolean;
    mode: Mode;
    volume: Volume;
    temperatureAbsolute: TemperatureAbsolute;
    temperatureRelative: TemperatureRelative;
    sleep: boolean;
    powerSave: boolean;
    hour: Hour;
    minute: Minute;
    cleaning: boolean;
    offTimer: boolean;
    offTimerHour: Hour;
    offTimerMinute: Minute;
    onTimer: boolean;
    onTimerHour: Hour;
    onTimerMinute: Minute;
    directionVertical: DirectionVertical;
    directionHorizontal: DirectionHorizontal;
    checkCode: CheckCode;
}

export function encode(state: State, button: Button): Uint8Array {
    const buf = new Uint8Array(23);
    buf[0] = 0b01100000;
    buf[1] = 0b00111000;
    buf[2] = 0b00010011;
    buf[3] = modeBits[state.mode] << 1 | (state.running ? 1 : 0);
    buf[4] = volumeBits[state.volume];
    buf[5] = 0b00000000;
    buf[6] = temperatureAbsoluteToNumber(state.temperatureAbsolute);
    buf[7] = temperatureRelativeBits[state.temperatureRelative];
    buf[8] = 0b00000000;
    buf[9] = (state.sleep ? 1 : 0) << 1;
    buf[10] = (state.powerSave ? 1 : 0) << 7 | state.hour;
    buf[11] = state.minute;
    buf[12] = (state.cleaning ? 1 : 0) << 6 | (state.offTimer ? 1 : 0) << 5 | state.offTimerHour;
    buf[13] = state.offTimerMinute;
    buf[14] = (state.onTimer ? 1 : 0) << 5 | state.onTimerHour;
    buf[15] = state.onTimerMinute;
    buf[16] = directionVerticalBits[state.directionVertical] << 3;
    buf[17] = directionHorizontalBits[state.directionHorizontal] << 1 | 0b00000001;
    buf[18] = 0b00000000;
    buf[19] = buttonBits[button];
    buf[20] = state.checkCode;
    buf[21] = 0b00000000;
    buf[22] = buf.slice(3, 22).reduce((prev, current) => prev ^ current, 0);
    return buf;
}
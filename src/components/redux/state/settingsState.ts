export interface SettingsState {
  height: number;
  width: number;
  rowCount: number;
  columnCount: number;
  fillingPercent: number;
  frequency: number;
}

export const initSettingsState: SettingsState = {
  height: 350,
  width: 350,
  rowCount: 10,
  columnCount: 10,
  fillingPercent: 30,
  frequency: 1,
};

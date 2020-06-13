import { CellRow } from "@models/CellRow";

export interface FieldState {
  rows: CellRow[];
}
export const initFieldState: FieldState = { rows: [] };

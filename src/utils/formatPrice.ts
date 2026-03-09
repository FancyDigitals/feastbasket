import { formatNaira } from "./currency";

export const formatPrice = (value: number): string => formatNaira(value);
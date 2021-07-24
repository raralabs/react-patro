// inclusive of first and last date;
export function isInBetween(data: any, first: any, last: any): boolean {
  if (data >= first && data <= last && first < last) {
    return true;
  } else return false;
}

export const padDateMonth = (val: string | number) => {
  return `${val}`.padStart(2, "0");
};

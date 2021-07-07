const padDateMonth = (val: string | number) => {
  return `${val}`.padStart(2, "0");
};

export { padDateMonth };

export const formatSalary = (
  minSalary: number | null,
  maxSalary: number | null
) => {
  if (minSalary && maxSalary) {
    return `from $${minSalary.toLocaleString("en-US")} to $${maxSalary.toLocaleString("en-US")} annually`;
  } else {
    return "-";
  }
};

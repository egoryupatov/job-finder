export const formatSalary = (
  minSalary: string | null,
  maxSalary: string | null
) => {
  if (minSalary && maxSalary) {
    return `from $${minSalary.toLocaleString("en-US")} to $${maxSalary.toLocaleString("en-US")} annually`;
  } else {
    return "-";
  }
};

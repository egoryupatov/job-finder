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

export const getRating = () => {
  const score = Math.floor(Math.random() * 5) + 1;
  const percentage = (score / 5) * 100;
  const feedback = Math.floor(Math.random() * 100) + 1;
  return { score, percentage, feedback };
};

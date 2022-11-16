const calculatePositiveToNegativeRatio = (
  positive: number,
  negative: number
): number => {
  if (positive === 0 && negative === 0) {
    return 0;
  }

  return (positive / (negative + positive)) * 100;
};

export default calculatePositiveToNegativeRatio;
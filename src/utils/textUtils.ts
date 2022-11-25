export const shortenTheAddress = (address?: string) =>
  address &&
  `${address.substring(0, 4)}...${address.substring(
    address.length - 4,
    address.length
  )}`;

export const convertTimestampToDateString = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);

  const dateString = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dateString} | ${timeString}`;
};

export const calculatePositiveToNegativeRatio = (
  positive: number,
  negative: number
): number => {
  if (positive === 0 && negative === 0) {
    return 0;
  }

  return (positive / (negative + positive)) * 100;
};
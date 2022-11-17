const shortenTheAddress = (address?: string) =>
  address &&
  `${address.substring(0, 4)}...${address.substring(
    address.length - 4,
    address.length
  )}`;

export default shortenTheAddress;

export default function formatPhoneNumber(value) {
  if (!value) {
    return value;
  }
  let formattedValue = value;

  const onlyNums = value.replace(/[^\d]/g, "");
  if (onlyNums.length <= 8) {
    formattedValue = onlyNums;
  } else {
    const areaCode = onlyNums.slice(0, 2);
    const firstPart = onlyNums.slice(2, 7);
    const secondPart = onlyNums.slice(7, 11);

    formattedValue = `(${areaCode}) ${firstPart}-${secondPart}`;
  }

  return formattedValue;
}

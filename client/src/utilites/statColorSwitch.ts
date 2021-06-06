const statColorSwitch = (width: number, reversed: boolean = false): string => {
  if (reversed) {
    width = 100 - width;
  }

  if (width < 5) {
    return "black";
  } else if (width < 10) {
    return "#801c1c";
  } else if (width < 25) {
    return "#915411";
  } else if (width < 50) {
    return "#f5e042";
  } else if (width < 75) {
    return "#ccb821";
  } else if (width < 100) {
    return "#45700c";
  } else {
    return "green";
  }
};

export default statColorSwitch;

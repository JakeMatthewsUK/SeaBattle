function createInitialArray() {
  let coordinates = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      coordinates.push({
        columnNumber: i,
        rowNumber: j,
        baseClass: "square",
        contents: "calmOcean",
      });
    }
  }

  console.log(coordinates);
  return coordinates;
}

export default createInitialArray;

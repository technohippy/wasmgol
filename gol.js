const width = 18;
const height = 11;
const memory = new Array(width * height * 2 + 1);
for (let i = 0; i < width * height * 2 + 1; i++) {
  memory[i] = 0;
}
[
  [2, 4], [2, 5], [2, 6],
  [4, 3], [5, 3],
  [4, 7], [5, 7],
  [7, 4], [7, 5], [7, 6],
  [10, 4], [10, 5], [10, 6],
  [12, 3], [13, 3],
  [12, 7], [13, 7],
  [15, 4], [15, 5], [15, 6]
].forEach((xy) => {
  const x = xy[0];
  const y = xy[1];
  memory[x + y * width + 1] = 1;
});

function nextStep() {
  let offset = memory[0] === 0 ? 1 : width * height + 1; 
  let nextOffset = memory[0] === 1 ? 1 : width * height + 1; 
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let neighbors = 0;
      for (let dy = 0; dy <= 2; dy++) {
        for (let dx = 0; dx <= 2; dx++) {
          if (memory[offset + x + dx - 1 + (y + dy - 1) * width] === 1) {
            neighbors += 1;
          }
        }
      }
      if (memory[offset + x + y * width] === 0) {
        if (neighbors === 3) {
          memory[nextOffset + x + y * width] = 1;
        }
        else {
          memory[nextOffset + x + y * width] = 0;
        }
      }
      else {
        if (neighbors <= 2 || 5 <= neighbors) {
          memory[nextOffset + x + y * width] = 0;
        }
        else {
          memory[nextOffset + x + y * width] = 1;
        }
      }
    }
  }
  memory[0] = memory[0] === 0 ? 1 : 0;
}

function show() {
  const offset = memory[0] === 0 ? 1 : width * height + 1; 
  let world = '\n';
  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      //line += memory[offset + x + y * width] === 1 ? '*' : ' ';
      line += memory[offset + x + y * width];
    }
    world += line;
    world += '\n';
  }
  console.log(world);
}

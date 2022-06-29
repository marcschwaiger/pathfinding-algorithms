async function generateMaze() {

  clearAll();

  async function recursiveGenerateMaze(x1: number, y1: number, x2: number, y2: number, vertical: boolean, depth = 0) {
    const minX = Math.min(x1, x2);
    const minY = Math.min(y1, y2);
    const maxX = Math.max(x1, x2);
    const maxY = Math.max(y1, y2);
    const width = maxX - minX;
    const height = maxY - minY;

    const min = 2;
    if (width <= min || height <= min)
      return;

    // const rdm = 0.3 + 0.4 * Math.random();
    const rdm = 0.5;
    const split = Math.round(rdm * (vertical ? height : width));
    const gapCount = 5;
    let gapPos;
    if (vertical) {
      for (let i = 0; i < width; i++)
        setField(x1 + i, y1 + split, FIELD_BLOCKED);

      for(let i = 0; i < Math.round(width / gapCount); i++) {
        gapPos = Math.round(0.4 * Math.random() * width);
        setField(x1 + gapPos, y1 + split, FIELD_EMPTY);
      }

    } else {
      for (let i = 0; i < height; i++)
        setField(x1 + split, y1 + i, FIELD_BLOCKED);

      for(let i = 0; i < Math.round(height / gapCount); i++) {
        gapPos = Math.round(0.4 * Math.random() * height);
        setField(x1 + split, y1 + gapPos, FIELD_EMPTY);
      }
    }


    /*for (let i = 0; i < (vertical ? width : height); i++) {
      setField((vertical ? i : y1 + split), (vertical ? x1 + split : i), FIELD_BLOCKED);
    }*/

    if (depth < 10) {
      depth++
      await delay()
      if (vertical) {
        await recursiveGenerateMaze(x1, y1, x2, y1 + split - 1, false, depth);
        await recursiveGenerateMaze(x1, y1 + split + 1, x2, y2, false, depth);
      } else {
        await recursiveGenerateMaze(x1, y1, x1 + split - 1, y2, true, depth);
        await recursiveGenerateMaze(x1 + split + 1, y1, x2, y2, true, depth);
      }
    }
  }

  await recursiveGenerateMaze(0, 0, GRID_WIDTH, GRID_HEIGHT, false);
  setField(0, 0, FIELD_START);
  setField(GRID_WIDTH - 1, GRID_HEIGHT - 1, FIELD_GOAL);
}

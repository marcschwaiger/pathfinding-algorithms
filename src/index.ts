const MOVE_DIAGONALLY = false;
let currentDrawMode: number = FIELD_BLOCKED;
let finished: boolean = false;
let cost: number[][] = [];
let que: Array<[number, number, number]> = [];

function onLoad() {
  initGrid();
  setClickCallback(onGridClick);
}

function onGridClick(x: number, y: number) {
  if (finished) {
    freeAllFieldsOfType(FIELD_VISITED);
    freeAllFieldsOfType(FIELD_PATH);
  }

  if (currentDrawMode === FIELD_START) {
    freeAllFieldsOfType(FIELD_START);
  } else if (currentDrawMode === FIELD_GOAL) {
    freeAllFieldsOfType(FIELD_GOAL);
  }

  setField(x, y, currentDrawMode);

  if (finished)
    run(false);
}

function freeAllFieldsOfType(type: number) {
  for (let x = 0; x < GRID_WIDTH; x++) {
    for (let y = 0; y < GRID_HEIGHT; y++) {
      if (getField(x, y) === type) {
        setField(x, y, FIELD_EMPTY);
      }
    }
  }
}

function getStart() {
  for (let x = 0; x < GRID_WIDTH; x++) {
    for (let y = 0; y < GRID_HEIGHT; y++) {
      if (getField(x, y) === FIELD_START) {
        return [x, y];
      }
    }
  }
}

function getGoal() {
  for (let x = 0; x < GRID_WIDTH; x++) {
    for (let y = 0; y < GRID_HEIGHT; y++) {
      if (getField(x, y) === FIELD_GOAL) {
        return [x, y];
      }
    }
  }
}

function getNearVisitableFields(x: number, y: number): [number, number, number][] {
  return getNearFields(x, y).filter(([x, y, field]) => field === FIELD_EMPTY || field === FIELD_GOAL)
}


function getNearVisitedFields(x: number, y: number): [number, number, number][] {
  return getNearFields(x, y).filter(([x, y, field]) => field === FIELD_VISITED || field === FIELD_START)
}

function getNearFields(x: number, y: number): [number, number, number][] {
  let fields: [number, number, number][] = []
  for (let xo = -1; xo <= 1; xo++) {
    for (let yo = -1; yo <= 1; yo++) {
      // only move in 4 directions
      if (!MOVE_DIAGONALLY && Math.abs(xo) + Math.abs(yo) !== 1)
        continue;
      // move in 8 directions
      if (MOVE_DIAGONALLY && Math.abs(xo) + Math.abs(yo) === 0)
        continue;

      const newX = x + xo;
      const newY = y + yo;
      if (newX < 0 || newX >= GRID_WIDTH || newY < 0 || newY >= GRID_HEIGHT)
        continue;

      const newField = getField(newX, newY);
      fields.push([newX, newY, newField]);
    }
  }
  return fields;
}

function findLowestCostNeighbour(x: number, y: number): [number, number] | undefined {
  let bestX: number = 0, bestY: number = 0, bestCost = Number.POSITIVE_INFINITY;
  getNearFields(x, y).forEach(([newX, newY, _]) => {
    if (cost[newX][newY] < bestCost) {
      bestCost = cost[newX][newY];
      bestX = newX;
      bestY = newY;
    }
  });

  if (bestCost === Number.POSITIVE_INFINITY)
    return undefined;

  return [bestX, bestY];
}

function onChangeAlgorithm() {
  if (finished) {
    freeAllFieldsOfType(FIELD_VISITED);
    freeAllFieldsOfType(FIELD_PATH);
    run(false);
  }
}

function onChangeDrawMode() {
  const sdm = document.getElementById('select-draw-mode');
  if (!sdm) {
    console.error('No element with id select-draw-mode found');
    return;
  }

  const dm = (sdm as HTMLSelectElement).value;
  switch (dm) {
    case 'Block':
      currentDrawMode = FIELD_BLOCKED;
      break;
    case 'Start':
      currentDrawMode = FIELD_START;
      break;
    case 'End':
      currentDrawMode = FIELD_GOAL;
      break
    case 'Empty':
      currentDrawMode = FIELD_EMPTY;
      break;
  }
}

function run(delayed: boolean) {
  if (finished && delayed)
    return;

  const sa = document.getElementById('select-algorithm');
  if (!sa) {
    console.error('No element with id select-algorithm found')
    return;
  }
  const algo = (sa as HTMLSelectElement).value;
  switch (algo) {
    case 'Dijkstra':
      runDijkstra(delayed).then(() => finished = true);
      break;
    case 'A*':
      runAStar(delayed).then(() => finished = true);
      break;
  }
}

function reset() {
  finished = false;
  freeAllFieldsOfType(FIELD_VISITED);
  freeAllFieldsOfType(FIELD_PATH);
}

function clearAll() {
  finished = false;
  for (let x = 0; x < GRID_WIDTH; x++) {
    for (let y = 0; y < GRID_HEIGHT; y++) {
      setField(x, y, FIELD_EMPTY);
    }
  }
}

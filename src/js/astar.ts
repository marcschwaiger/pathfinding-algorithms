const WEIGHT_TO_START = 0.4, WEIGHT_TO_END = 0.8;
let weight: number[][] = [];

async function runAStar(delayed: boolean) {
  initAStar();

  let actionPerformed;
  do actionPerformed = await iterAStar(delayed);
  while (actionPerformed);
}

function initAStar() {
  const sp = getStart();
  if (!sp) {
    console.error('No starting point given');
    return;
  }
  let [startX, startY] = sp;

  const ep = getGoal();
  if (!ep) {
    console.error('No ending point given');
    return;
  }
  let [endX, endY] = ep;

  for (let x = 0; x < GRID_WIDTH; x++) {
    cost[x] = []
    weight[x] = []

    for (let y = 0; y < GRID_HEIGHT; y++) {
      cost[x][y] = Number.POSITIVE_INFINITY;
      weight[x][y] = distanceBetween(startX, startY, x, y) * WEIGHT_TO_START + distanceBetween(endX, endY, x, y) * WEIGHT_TO_END;
    }
  }

  cost[startX][startY] = 0;
  que = getNearVisitableFields(startX, startY);
}

async function iterAStar(delayed: boolean) {
  let actionPerformed = false;
  sortQue();
  let pop = que.pop();
  if (pop === undefined)
    return false;

  let [x, y, _] = pop;
  let minCost = Number.POSITIVE_INFINITY;
  for (let [newX, newY, _] of getNearVisitedFields(x, y)) {
    const nearCost = cost[newX][newY];
    if (nearCost < minCost) {
      minCost = nearCost;
    }
  }

  if (minCost < Number.POSITIVE_INFINITY) {
    cost[x][y] = minCost + 1;

    if (getField(x, y) === FIELD_GOAL) {
      await traceBackDijkstra(x, y, delayed);
      return false;
    }

    setField(x, y, FIELD_VISITED);

    for (let visitableField of getNearVisitableFields(x, y)) {
      if (!isArrayInArray(que, visitableField))
        que.push(visitableField);
    }
    if (delayed)
      await delay();
    actionPerformed = true;
  }
  return actionPerformed
}

async function traceBackAStar(goalX: number, goalY: number, delayed: boolean) {
  let pathBack, pbX = goalX, pbY = goalY;
  while ((pathBack = findLowestCostNeighbour(pbX, pbY)) !== undefined) {
    let [npbX, npbY] = pathBack;
    pbX = npbX;
    pbY = npbY;

    if (getField(pbX, pbY) === FIELD_START)
      break;

    setField(pbX, pbY, FIELD_PATH);
    if (delayed)
      await delay();
  }
}

function sortQue() {
  que.sort(([x1, y1, f1], [x2, y2, f2]) => {
    const w1 = weight[x1][y1];
    const w2 = weight[x2][y2];
    return w2 - w1;
  })
}

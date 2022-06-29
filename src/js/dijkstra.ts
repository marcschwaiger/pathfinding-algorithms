async function runDijkstra(delayed: boolean) {
  initDijkstra();

  let actionPerformed;
  do actionPerformed = await iterDijkstra(delayed);
  while (actionPerformed);
}

function initDijkstra() {
  for (let x = 0; x < GRID_WIDTH; x++) {
    cost[x] = []

    for (let y = 0; y < GRID_HEIGHT; y++) {
      cost[x][y] = Number.POSITIVE_INFINITY;
    }
  }

  const sp = getStart();
  if (!sp) {
    console.error('No starting point given');
    return;
  }
  const [startX, startY] = sp;
  cost[startX][startY] = 0;
  que = getNearVisitableFields(startX, startY);
}

async function iterDijkstra(delayed: boolean) {
  let actionPerformed = false;
  let nextQue: Array<[number, number, number]> = [];

  let pop;
  while ((pop = que.pop()) !== undefined) {
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
        if (!isArrayInArray(nextQue, visitableField))
          nextQue.push(visitableField);
      }
      if (delayed)
        await delay();
      actionPerformed = true;
    }
  }

  que = nextQue;
  return actionPerformed
}

async function traceBackDijkstra(goalX: number, goalY: number, delayed: boolean) {
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

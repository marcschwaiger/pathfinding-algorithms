let cost = [];
let que = [];

async function runDijkstra() {
    console.log('started dijkstra');

    initDijkstra();

    let actionPerformed;
    do {
        actionPerformed = await iterDijkstra();
    }
    while (actionPerformed);
    console.info('dijkstra finished')
}


function getVisitableFields(x, y) {
    return getNearFields(x, y).filter(([x, y, field]) => field === FIELD_EMPTY || field === FIELD_GOAL)
}

function getNearFields(x, y) {
    console.log('xy: ', x, y)
    let fields = []
    for (let xo = -1; xo <= 1; xo++) {
        for (let yo = -1; yo <= 1; yo++) {
            // only move in 4 directions
            if (Math.abs(xo) + Math.abs(yo) !== 1)
                continue;

            const newX = x + xo;
            const newY = y + yo;
            if (newX < 0 || newX > GRID_WIDTH || newY < 0 || newY > GRID_HEIGHT)
                continue;

            console.log('nxy: ', newX, newY)
            const newField = getField(newX, newY);
            fields.push([newX, newY, newField]);
        }
    }
    console.log(fields);
    return fields;
}

function initDijkstra() {
    for (let x = 0; x <= GRID_WIDTH; x++) {
        cost[x] = []

        for (let y = 0; y <= GRID_HEIGHT; y++) {
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
    que = getVisitableFields(startX, startY);
}

async function iterDijkstra() {
    let actionPerformed = false;
    let nextQue = [];
    console.log('que', que)
    for (let [x, y, field] in que) {

        let minCost = Number.POSITIVE_INFINITY;
        for (let [newX, newY, newField] in getNearFields(x, y)) {
            if (newField !== FIELD_VISITED && newField !== FIELD_GOAL)
                continue;

            const nearCost = cost[newX][newY];
            if (nearCost < minCost) {
                minCost = nearCost;
            }
        }

        if (minCost < Number.POSITIVE_INFINITY) {
            cost[x][y] = minCost + 1;
            setField(x, y, FIELD_VISITED);
            nextQue.push(getVisitableFields(x, y));
            await new Promise(resolve => setTimeout(resolve, 5));
            actionPerformed = true;
        }
    }
    que = nextQue;
    return actionPerformed
}

let currentDrawMode = FIELD_BLOCKED;

function onLoad() {
    initGrid();
    setClickCallback(onGridClick);
}

function onGridClick(x, y) {
    if (currentDrawMode === FIELD_START) {
        freeAllFieldsOfType(FIELD_START);
    } else if (currentDrawMode === FIELD_GOAL) {
        freeAllFieldsOfType(FIELD_GOAL);
    }
    setField(x, y, currentDrawMode);
}

function freeAllFieldsOfType(type) {
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

function onChangeDrawMode() {
    const dm = document.getElementById('select-draw-mode').value;
    switch (dm) {
        case 'Block':
            currentDrawMode = FIELD_BLOCKED;
            break;
        case 'Start':
            currentDrawMode = FIELD_START;
            break;
        case 'End':
            currentDrawMode = FIELD_GOAL;
            break;
    }
}

function run() {
    const algo =  document.getElementById('select-algorithm').value;
    switch(algo) {
        case 'Dijkstra':
            runDijkstra();
            break;
        case 'A*':
            break;
    }
}

"use strict";
var MOVE_DIAGONALLY = false;
var currentDrawMode = FIELD_BLOCKED;
var finished = false;
var cost = [];
var que = [];
function onLoad() {
    initGrid();
    setClickCallback(onGridClick);
}
function onGridClick(x, y) {
    if (finished) {
        freeAllFieldsOfType(FIELD_VISITED);
        freeAllFieldsOfType(FIELD_PATH);
    }
    if (currentDrawMode === FIELD_START) {
        freeAllFieldsOfType(FIELD_START);
    }
    else if (currentDrawMode === FIELD_GOAL) {
        freeAllFieldsOfType(FIELD_GOAL);
    }
    setField(x, y, currentDrawMode);
    if (finished)
        run(false);
}
function freeAllFieldsOfType(type) {
    for (var x = 0; x < GRID_WIDTH; x++) {
        for (var y = 0; y < GRID_HEIGHT; y++) {
            if (getField(x, y) === type) {
                setField(x, y, FIELD_EMPTY);
            }
        }
    }
}
function getStart() {
    for (var x = 0; x < GRID_WIDTH; x++) {
        for (var y = 0; y < GRID_HEIGHT; y++) {
            if (getField(x, y) === FIELD_START) {
                return [x, y];
            }
        }
    }
}
function getGoal() {
    for (var x = 0; x < GRID_WIDTH; x++) {
        for (var y = 0; y < GRID_HEIGHT; y++) {
            if (getField(x, y) === FIELD_GOAL) {
                return [x, y];
            }
        }
    }
}
function getNearVisitableFields(x, y) {
    return getNearFields(x, y).filter(function (_a) {
        var x = _a[0], y = _a[1], field = _a[2];
        return field === FIELD_EMPTY || field === FIELD_GOAL;
    });
}
function getNearVisitedFields(x, y) {
    return getNearFields(x, y).filter(function (_a) {
        var x = _a[0], y = _a[1], field = _a[2];
        return field === FIELD_VISITED || field === FIELD_START;
    });
}
function getNearFields(x, y) {
    var fields = [];
    for (var xo = -1; xo <= 1; xo++) {
        for (var yo = -1; yo <= 1; yo++) {
            // only move in 4 directions
            if (!MOVE_DIAGONALLY && Math.abs(xo) + Math.abs(yo) !== 1)
                continue;
            // move in 8 directions
            if (MOVE_DIAGONALLY && Math.abs(xo) + Math.abs(yo) === 0)
                continue;
            var newX = x + xo;
            var newY = y + yo;
            if (newX < 0 || newX >= GRID_WIDTH || newY < 0 || newY >= GRID_HEIGHT)
                continue;
            var newField = getField(newX, newY);
            fields.push([newX, newY, newField]);
        }
    }
    return fields;
}
function findLowestCostNeighbour(x, y) {
    var bestX = 0, bestY = 0, bestCost = Number.POSITIVE_INFINITY;
    getNearFields(x, y).forEach(function (_a) {
        var newX = _a[0], newY = _a[1], _ = _a[2];
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
    var sdm = document.getElementById('select-draw-mode');
    if (!sdm) {
        console.error('No element with id select-draw-mode found');
        return;
    }
    var dm = sdm.value;
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
        case 'Empty':
            currentDrawMode = FIELD_EMPTY;
            break;
    }
}
function run(delayed) {
    if (finished && delayed)
        return;
    var sa = document.getElementById('select-algorithm');
    if (!sa) {
        console.error('No element with id select-algorithm found');
        return;
    }
    var algo = sa.value;
    switch (algo) {
        case 'Dijkstra':
            runDijkstra(delayed).then(function () { return finished = true; });
            break;
        case 'A*':
            runAStar(delayed).then(function () { return finished = true; });
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
    for (var x = 0; x < GRID_WIDTH; x++) {
        for (var y = 0; y < GRID_HEIGHT; y++) {
            setField(x, y, FIELD_EMPTY);
        }
    }
}

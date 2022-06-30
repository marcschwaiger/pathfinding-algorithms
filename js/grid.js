"use strict";
var GRID_WIDTH = 60, GRID_HEIGHT = 40, GRID_SIZE = 10, LINE_WIDTH = 1;
var FIELD_EMPTY = 0, FIELD_VISITED = 1, FIELD_BLOCKED = 2, FIELD_START = 3, FIELD_GOAL = 4, FIELD_PATH = 5;
var LINE_COLOR = "#000000";
var canvas, canvasX, canvasY, ctx, mouseButtonDown;
var grid = [];
var clickCallback;
function initGrid() {
    console.debug('Loading canvas...');
    canvas = document.getElementById('canvas');
    canvas.width = GRID_WIDTH * (GRID_SIZE + LINE_WIDTH) + LINE_WIDTH;
    canvas.height = GRID_HEIGHT * (GRID_SIZE + LINE_WIDTH) + LINE_WIDTH;
    canvasX = canvas.offsetLeft + canvas.clientLeft;
    canvasY = canvas.offsetTop + canvas.clientTop;
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
    drawGridLines();
}
function setField(x, y, state) {
    grid[x][y] = state;
    switch (state) {
        case FIELD_EMPTY:
            colorField(x, y, "#FFFFFF");
            break;
        case FIELD_VISITED:
            colorField(x, y, "#fcba03");
            break;
        case FIELD_BLOCKED:
            colorField(x, y, "#000000");
            break;
        case FIELD_START:
            colorField(x, y, "#00FF00");
            break;
        case FIELD_GOAL:
            colorField(x, y, "#FF0000");
            break;
        case FIELD_PATH:
            colorField(x, y, "#0000D4");
            break;
    }
}
function getField(x, y) {
    return grid[x][y];
}
function setClickCallback(fn) {
    clickCallback = fn;
}
function mouseDown(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    if (x > 0 && y > 0 && x <= canvas.width && y <= canvas.height) {
        mouseButtonDown = true;
        onMouseEvent(x, y);
    }
}
function mouseMove(event) {
    onMouseEvent(event.offsetX, event.offsetY);
}
function onMouseEvent(mouseX, mouseY) {
    if (!mouseButtonDown)
        return;
    var inGrid = mouseX > 0 && mouseY > 0 && mouseX <= canvas.width && mouseY <= canvas.height;
    if (!inGrid)
        return;
    var gridX = Math.round((mouseX - GRID_SIZE / 2) / (GRID_SIZE + LINE_WIDTH));
    var gridY = Math.round((mouseY - GRID_SIZE / 2) / (GRID_SIZE + LINE_WIDTH));
    clickCallback(gridX, gridY);
    if (currentDrawMode === FIELD_START) {
        freeAllFieldsOfType(FIELD_START);
    }
    else if (currentDrawMode === FIELD_GOAL) {
        freeAllFieldsOfType(FIELD_GOAL);
    }
    setField(gridX, gridY, currentDrawMode);
}
function mouseUp(event) {
    mouseButtonDown = false;
}
function drawGridLines() {
    ctx.fillStyle = LINE_COLOR;
    for (var x = 0; x <= GRID_WIDTH; x++) {
        ctx.fillRect(x * (GRID_SIZE + LINE_WIDTH), 0, LINE_WIDTH, canvas.height);
        grid[x] = [];
    }
    for (var y = 0; y <= GRID_HEIGHT; y++) {
        ctx.fillStyle = LINE_COLOR;
        ctx.fillRect(0, y * (GRID_SIZE + LINE_WIDTH), canvas.width, LINE_WIDTH);
        for (var x = 0; x <= GRID_WIDTH; x++) {
            setField(x, y, FIELD_EMPTY);
        }
    }
}
function colorField(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * (GRID_SIZE + LINE_WIDTH) + LINE_WIDTH, y * (GRID_SIZE + LINE_WIDTH) + LINE_WIDTH, GRID_SIZE, GRID_SIZE);
}

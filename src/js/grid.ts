const GRID_WIDTH = 60, GRID_HEIGHT = 40, GRID_SIZE = 10, LINE_WIDTH = 1;
const FIELD_EMPTY = 0, FIELD_VISITED = 1, FIELD_BLOCKED = 2, FIELD_START = 3, FIELD_GOAL = 4, FIELD_PATH = 5;
const LINE_COLOR = "#000000";

let canvas: any, canvasX, canvasY, ctx: any, mouseButtonDown: boolean;
let grid: number[][] = [];
let clickCallback: Function;

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

function setField(x: number, y: number, state: number) {
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

function getField(x: number, y: number) {
  return grid[x][y];
}

function setClickCallback(fn: Function) {
  clickCallback = fn;
}

function mouseDown(event: MouseEvent) {
  let x = event.offsetX;
  let y = event.offsetY;
  if (x > 0 && y > 0 && x <= canvas.width && y <= canvas.height) {
    mouseButtonDown = true
    onMouseEvent(x, y);
  }
}

function mouseMove(event: MouseEvent) {
  onMouseEvent(event.offsetX, event.offsetY);
}

function onMouseEvent(mouseX: number, mouseY: number) {
  if (!mouseButtonDown)
    return;

  const inGrid = mouseX > 0 && mouseY > 0 && mouseX <= canvas.width && mouseY <= canvas.height;

  if (!inGrid)
    return;

  const gridX = Math.round((mouseX - GRID_SIZE / 2) / (GRID_SIZE + LINE_WIDTH));
  const gridY = Math.round((mouseY - GRID_SIZE / 2) / (GRID_SIZE + LINE_WIDTH));

  clickCallback(gridX, gridY);

  if (currentDrawMode === FIELD_START) {
    freeAllFieldsOfType(FIELD_START);
  } else if (currentDrawMode === FIELD_GOAL) {
    freeAllFieldsOfType(FIELD_GOAL);
  }

  setField(gridX, gridY, currentDrawMode);
}

function mouseUp(event: MouseEvent) {
  mouseButtonDown = false;
}


function drawGridLines() {
  ctx.fillStyle = LINE_COLOR;
  for (let x = 0; x <= GRID_WIDTH; x++) {
    ctx.fillRect(x * (GRID_SIZE + LINE_WIDTH), 0, LINE_WIDTH, canvas.height);
    grid[x] = []
  }

  for (let y = 0; y <= GRID_HEIGHT; y++) {
    ctx.fillStyle = LINE_COLOR;
    ctx.fillRect(0, y * (GRID_SIZE + LINE_WIDTH), canvas.width, LINE_WIDTH);
    for (let x = 0; x <= GRID_WIDTH; x++) {
      setField(x, y, FIELD_EMPTY);
    }
  }
}

function colorField(x: number, y: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(x * (GRID_SIZE + LINE_WIDTH) + LINE_WIDTH, y * (GRID_SIZE + LINE_WIDTH) + LINE_WIDTH, GRID_SIZE, GRID_SIZE)
}

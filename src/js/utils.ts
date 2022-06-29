async function delay() {
  await new Promise(resolve => setTimeout(resolve, 5));
}

function isArrayInArray(arr: any[], item: any[]) {
  let item_as_string = JSON.stringify(item);

  return arr.some(function (ele: any[]) {
    return JSON.stringify(ele) === item_as_string;
  });
}

function distanceBetween(x1: number, y1: number, x2: number, y2: number): number {
  const dX = x2 - x1;
  const dY = y2 - y1;

  return Math.sqrt(dX * dX + dY * dY);
}

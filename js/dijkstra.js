"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function runDijkstra(delayed) {
    return __awaiter(this, void 0, void 0, function () {
        var actionPerformed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    initDijkstra();
                    _a.label = 1;
                case 1: return [4 /*yield*/, iterDijkstra(delayed)];
                case 2:
                    actionPerformed = _a.sent();
                    _a.label = 3;
                case 3:
                    if (actionPerformed) return [3 /*break*/, 1];
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function initDijkstra() {
    for (var x = 0; x < GRID_WIDTH; x++) {
        cost[x] = [];
        for (var y = 0; y < GRID_HEIGHT; y++) {
            cost[x][y] = Number.POSITIVE_INFINITY;
        }
    }
    var sp = getStart();
    if (!sp) {
        console.error('No starting point given');
        return;
    }
    var startX = sp[0], startY = sp[1];
    cost[startX][startY] = 0;
    que = getNearVisitableFields(startX, startY);
}
function iterDijkstra(delayed) {
    return __awaiter(this, void 0, void 0, function () {
        var actionPerformed, nextQue, pop, x, y, _, minCost, _i, _a, _b, newX, newY, _1, nearCost, _c, _d, visitableField;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    actionPerformed = false;
                    nextQue = [];
                    _e.label = 1;
                case 1:
                    if (!((pop = que.pop()) !== undefined)) return [3 /*break*/, 7];
                    x = pop[0], y = pop[1], _ = pop[2];
                    minCost = Number.POSITIVE_INFINITY;
                    for (_i = 0, _a = getNearVisitedFields(x, y); _i < _a.length; _i++) {
                        _b = _a[_i], newX = _b[0], newY = _b[1], _1 = _b[2];
                        nearCost = cost[newX][newY];
                        if (nearCost < minCost) {
                            minCost = nearCost;
                        }
                    }
                    if (!(minCost < Number.POSITIVE_INFINITY)) return [3 /*break*/, 6];
                    cost[x][y] = minCost + 1;
                    if (!(getField(x, y) === FIELD_GOAL)) return [3 /*break*/, 3];
                    return [4 /*yield*/, traceBackDijkstra(x, y, delayed)];
                case 2:
                    _e.sent();
                    return [2 /*return*/, false];
                case 3:
                    setField(x, y, FIELD_VISITED);
                    for (_c = 0, _d = getNearVisitableFields(x, y); _c < _d.length; _c++) {
                        visitableField = _d[_c];
                        if (!isArrayInArray(nextQue, visitableField))
                            nextQue.push(visitableField);
                    }
                    if (!delayed) return [3 /*break*/, 5];
                    return [4 /*yield*/, delay()];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5:
                    actionPerformed = true;
                    _e.label = 6;
                case 6: return [3 /*break*/, 1];
                case 7:
                    que = nextQue;
                    return [2 /*return*/, actionPerformed];
            }
        });
    });
}
function traceBackDijkstra(goalX, goalY, delayed) {
    return __awaiter(this, void 0, void 0, function () {
        var pathBack, pbX, pbY, npbX, npbY;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pbX = goalX, pbY = goalY;
                    _a.label = 1;
                case 1:
                    if (!((pathBack = findLowestCostNeighbour(pbX, pbY)) !== undefined)) return [3 /*break*/, 4];
                    npbX = pathBack[0], npbY = pathBack[1];
                    pbX = npbX;
                    pbY = npbY;
                    if (getField(pbX, pbY) === FIELD_START)
                        return [3 /*break*/, 4];
                    setField(pbX, pbY, FIELD_PATH);
                    if (!delayed) return [3 /*break*/, 3];
                    return [4 /*yield*/, delay()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}

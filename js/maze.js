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
function generateMaze() {
    return __awaiter(this, void 0, void 0, function () {
        function recursiveGenerateMaze(x1, y1, x2, y2, vertical, depth) {
            if (depth === void 0) { depth = 0; }
            return __awaiter(this, void 0, void 0, function () {
                var minX, minY, maxX, maxY, width, height, min, rdm, split, gapCount, gapPos, i, i, i, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            minX = Math.min(x1, x2);
                            minY = Math.min(y1, y2);
                            maxX = Math.max(x1, x2);
                            maxY = Math.max(y1, y2);
                            width = maxX - minX;
                            height = maxY - minY;
                            min = 2;
                            if (width <= min || height <= min)
                                return [2 /*return*/];
                            rdm = 0.5;
                            split = Math.round(rdm * (vertical ? height : width));
                            gapCount = 5;
                            if (vertical) {
                                for (i = 0; i < width; i++)
                                    setField(x1 + i, y1 + split, FIELD_BLOCKED);
                                for (i = 0; i < Math.round(width / gapCount); i++) {
                                    gapPos = Math.round(0.4 * Math.random() * width);
                                    setField(x1 + gapPos, y1 + split, FIELD_EMPTY);
                                }
                            }
                            else {
                                for (i = 0; i < height; i++)
                                    setField(x1 + split, y1 + i, FIELD_BLOCKED);
                                for (i = 0; i < Math.round(height / gapCount); i++) {
                                    gapPos = Math.round(0.4 * Math.random() * height);
                                    setField(x1 + split, y1 + gapPos, FIELD_EMPTY);
                                }
                            }
                            if (!(depth < 10)) return [3 /*break*/, 7];
                            depth++;
                            return [4 /*yield*/, delay()];
                        case 1:
                            _a.sent();
                            if (!vertical) return [3 /*break*/, 4];
                            return [4 /*yield*/, recursiveGenerateMaze(x1, y1, x2, y1 + split - 1, false, depth)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, recursiveGenerateMaze(x1, y1 + split + 1, x2, y2, false, depth)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 4: return [4 /*yield*/, recursiveGenerateMaze(x1, y1, x1 + split - 1, y2, true, depth)];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, recursiveGenerateMaze(x1 + split + 1, y1, x2, y2, true, depth)];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clearAll();
                    return [4 /*yield*/, recursiveGenerateMaze(0, 0, GRID_WIDTH, GRID_HEIGHT, false)];
                case 1:
                    _a.sent();
                    setField(0, 0, FIELD_START);
                    setField(GRID_WIDTH - 1, GRID_HEIGHT - 1, FIELD_GOAL);
                    return [2 /*return*/];
            }
        });
    });
}

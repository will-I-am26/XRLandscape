"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolPickerBehavior = void 0;
var __selfType = requireType("./objectSpawner");
function component(target) { target.getTypeName = function () { return __selfType; }; }
let ToolPickerBehavior = class ToolPickerBehavior extends BaseScriptComponent {
    onAwake() {
        this.init();
        this.createEvent("UpdateEvent").bind(this.onUpdate.bind(this));
    }
    init() {
        this.toolSpawnPointsT = [];
        this.latestObj = [];
        this.latestObjT = [];
        this.spanwAllTools();
    }
    spanwAllTools() {
        this.toolSpawnPoints.forEach((value, ind) => {
            let spawnPoint = value;
            this.toolSpawnPointsT[ind] = spawnPoint.getTransform();
            this.spawnAndReplace(ind);
        });
    }
    onUpdate() {
        this.toolSpawnPoints.forEach((value, ind) => {
            let spawnPointT = this.toolSpawnPointsT[ind];
            let objectT = this.latestObjT[ind];
            if (objectT.getWorldPosition().distance(spawnPointT.getWorldPosition())
                > this.distanceOffset) {
                objectT.getSceneObject().setParent(null);
                this.spawnAndReplace(ind);
            }
        });
    }
    spawnAndReplace(ind) {
        let spawnPos = this.toolSpawnPointsT[ind].getWorldPosition();
        spawnPos.y += this.yOffset;
        let nObject = this.toolPrefabs[ind].instantiate(this.containerObj);
        nObject.enabled = true;
        nObject.getTransform().setWorldPosition(spawnPos);
        this.latestObj[ind] = nObject;
        this.latestObjT[ind] = nObject.getTransform();
    }
    __initialize() {
        super.__initialize();
        this.yOffset = 5;
        this.distanceOffset = 15;
    }
};
exports.ToolPickerBehavior = ToolPickerBehavior;
exports.ToolPickerBehavior = ToolPickerBehavior = __decorate([
    component
], ToolPickerBehavior);
//# sourceMappingURL=objectSpawner.js.map
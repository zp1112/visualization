function PlaneText(axis, quadrant) {
    const { group, xAxis, zAxis } = axis;
    drawRect(group, xAxis, zAxis);
    this.group = group;
    drawGrid({
        textz: 'latitude', ...axis, texty: '', textx: 'longitude'
    });
    this.updateText(quadrant);
    this.updateText(quadrant);
}
PlaneText.prototype = {
    updateText
}
function SphereText(axis, quadrant) {
    const { group, xAxis, zAxis } = axis;
    drawRect(group, xAxis, zAxis);
    this.group = group;
    drawGrid({
        textz: 'latitude', ...axis, texty: 'Time', textx: 'longitude'
    });
    this.updateText(quadrant);
    this.updateText(quadrant);
}

SphereText.prototype = {
    updateText
}
function CubeText(axis, quadrant) {
    const { group, xAxis, zAxis } = axis;
    drawRect(group, xAxis, zAxis);
    this.group = group;
    drawGrid({
        textz: 'latitude', ...axis, texty: 'Count', textx: 'longitude'
    });
    this.updateText(quadrant);
    this.updateText(quadrant);
}
CubeText.prototype = {
    updateText
}

function BarText(axis, quadrant) {
    this.group = axis.group;
    drawGrid({
        textz: 'xx', ...axis, texty: 'Count', textx: 'Month', xAxisCenter: true
    });
    this.updateText(quadrant);
    this.updateText(quadrant);
}

BarText.prototype = {
    updateText
}
function updateText(quadrant) {
    this.group.children.forEach(row => {
        typeof row.rotationfunc == 'function' ? row.rotationfunc(quadrant) : null;
        typeof row.visiblefunc == 'function' ? row.visiblefunc(quadrant) : null;
    })
}
function showText(group) {
    scene.add(group);
}
function removeText(group) {
    scene.remove(group);
}

function drawRect(gridGroup, xAxis, zAxis) {
    let geometry = new THREE.PlaneGeometry(xAxis,zAxis);
    let material = new THREE.MeshBasicMaterial( {
        map: texture,
        side: THREE.DoubleSide
    });
    const rect = new THREE.Mesh(geometry, material);
    rect.applyMatrix(new THREE.Matrix4().makeTranslation(xAxis / 2, 0, zAxis / 2));
    rect.position.y =  -4;
    rect.rotation.x =  -Math.PI / 2;
    gridGroup.add(rect);
    material.map.needsUpdate = true;
}
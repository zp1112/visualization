function PlaneText(axis, xztheta, zxtheta) {
    const { group, xAxis, zAxis } = axis;
    drawRect(group, xAxis, zAxis);
    this.group = group;
    drawGrid({
        textz: 'latitude', ...axis, texty: '', textx: 'longitude'
    });
    this.updateText(1, xztheta, zxtheta);
    this.updateText(2, xztheta, zxtheta);
}
PlaneText.prototype = {
    updateText
}
function SphereText(axis, xztheta, zxtheta) {
    const { group, xAxis, zAxis } = axis;
    drawRect(group, xAxis, zAxis);
    this.group = group;
    drawGrid({
        textz: 'latitude', ...axis, texty: 'Time', textx: 'longitude'
    });
    this.updateText(1, xztheta, zxtheta);
    this.updateText(2, xztheta, zxtheta);
}

SphereText.prototype = {
    updateText
}
function CubeText(axis, xztheta, zxtheta) {
    const { group, xAxis, zAxis } = axis;
    drawRect(group, xAxis, zAxis);
    this.group = group;
    drawGrid({
        textz: 'latitude', ...axis, texty: 'Count', textx: 'longitude'
    });
    this.updateText(1, xztheta, zxtheta);
    this.updateText(2, xztheta, zxtheta);
}
CubeText.prototype = {
    updateText
}

function BarText(axis, xztheta, zxtheta) {
    this.group = axis.group;
    drawGrid({
        textz: 'xx', ...axis, texty: 'Count', textx: 'Month'
    });
    this.updateText(1, xztheta, zxtheta);
    this.updateText(2, xztheta, zxtheta);
}

BarText.prototype = {
    updateText
}
function updateText(type, xztheta, zxtheta) {
    if (xztheta > 0) {
        this.group.children.forEach(row => {
            if (row.show === 'right' || row.show === 'all') {
                row.visible = true;
            }
            if (row.show === 'left' || row.show === 'none') {
                row.visible = false;
            }
        })
    } else {
        this.group.children.forEach(row => {
            if (row.show === 'left' || row.show === 'all') {
                row.visible = true;
            } 
            if (row.show === 'right' || row.show === 'none') {
                row.visible = false;
            }
        })
    }
    if (zxtheta > 0) {
        this.group.children.forEach(row => {
            if (row.show === 'front' || row.show === 'all') {
                row.visible = true;
            }
            if (row.show === 'back' || row.show === 'none') {
                row.visible = false;
            }
        })
    } else {
        this.group.children.forEach(row => {
            if (row.show === 'back' || row.show === 'all') {
                row.visible = true;
            } 
            if (row.show === 'front' || row.show === 'none') {
                row.visible = false;
            }
        })
    }
    if (zxtheta > 0) {
        if (xztheta < 0) {
            this.group.children.forEach(row => {
                if (row.show1 === 'front') {
                    row.visible = true;
                } 
                if (row.show1 === 'back') {
                    row.visible = false;
                }
            })
        } else {
            this.group.children.forEach(row => {
                if (row.show1 === 'back') {
                    row.visible = true;
                } 
                if (row.show1 === 'front') {
                    row.visible = false;
                }
            })
        }
    }
    if (zxtheta < 0) {
        if (xztheta < 0) {
            this.group.children.forEach(row => {
                if (row.show1 === 'back') {
                    row.visible = true;
                } 
                if (row.show1 === 'front') {
                    row.visible = false;
                }
            })
        } else {
            this.group.children.forEach(row => {
                if (row.show1 === 'front') {
                    row.visible = true;
                } 
                if (row.show1 === 'back') {
                    row.visible = false;
                }
            })
        }
    }
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
    material.map.needsUpdate	= true;
}
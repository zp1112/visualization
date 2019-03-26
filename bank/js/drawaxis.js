function makeTextSprite(message, fontsize) {
    var ctx, texture, sprite, 
        canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    ctx.font = fontsize + "px Arial";
    
    // setting canvas width/height before ctx draw, else canvas is empty
    canvas.width = ctx.measureText(message).width;
    canvas.height = fontsize * 2; // fontsize * 1.5
    
    // after setting the canvas width/height we have to re-set font to apply!?! looks like ctx reset
    ctx.font = fontsize + "px Arial";        
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillText(message, 0, fontsize);

    texture = new THREE.Texture(canvas);
    texture.minFilter = THREE.LinearFilter; // NearestFilter;
    texture.needsUpdate = true;

    var material=new THREE.MeshBasicMaterial({map:texture, transparent: true, side: THREE.DoubleSide});
    texture.needsUpdate=true;//开启纹理更新
    sprite= new THREE.Mesh(
        new THREE.PlaneGeometry(canvas.width, canvas.height),
        material
    );
    return sprite;   
}
function drawCommonGrids(group, xAxis, yAxis, zAxis, xgrid, ygrid, zgrid) {
    drawGrid({ xAxis, yAxis, zAxis, xgrid, ygrid, zgrid, type: 'bottom', group });
    drawGrid({ xAxis, yAxis, zAxis, xgrid, ygrid, zgrid, type: 'left', group });
    drawGrid({ xAxis, yAxis, zAxis, xgrid, ygrid, zgrid, type: 'back', group });
}
function drawCommonText(group, xAxis, yAxis, zAxis, grid) {
    const zAxisn = zAxis / grid;
    const xAxisn = xAxis / grid;
    for(let i=0;i<=xAxisn;i++){
        var spritey = makeTextSprite(scaleLinearLon.invert(i * grid).toFixed(2), 20);
        var bbox = new THREE.Box3().setFromObject(spritey);
        spritey.position.set(i * grid, yAxis, -(bbox.max.y - bbox.min.y));
        spritey.rotation.z = Math.PI / 2;
        spritey.rotation.x = -Math.PI / 2;
        group.add(spritey);
    }
    
    for(let i=0;i<=xAxisn;i++){
        var spritey = makeTextSprite(scaleLinearLon.invert(i * grid).toFixed(2), 20);
        var bbox = new THREE.Box3().setFromObject(spritey);
        spritey.position.set(i * grid, 0, (zAxis + bbox.max.x - bbox.min.x));
        spritey.rotation.z = Math.PI / 2;
        spritey.rotation.x = -Math.PI / 2;
        group.add(spritey);
    }

    for(let i=0;i<=zAxisn;i++){
        var spritey = makeTextSprite(scaleLinearLat.invert(i * grid).toFixed(2), 20);
        var bbox = new THREE.Box3().setFromObject(spritey);
        spritey.position.set(-(bbox.max.x - bbox.min.x), yAxis, i * grid);
        spritey.rotation.x = -Math.PI / 2;
        group.add(spritey);
    }
}
function initPlaneText({ xAxis, zAxis, xgrid, zgrid, group }) {
    drawRect(group, xAxis, zAxis);
    drawGrid({ xAxis, zAxis, xgrid, zgrid, type: 'bottom', group });
    const zAxisn = zAxis / zgrid;
    const xAxisn = xAxis / xgrid;
    for(let i=0;i<=xAxisn;i++){
        var spritey = makeTextSprite(scaleLinearLon.invert(i * xgrid).toFixed(2), 20);
        var bbox = new THREE.Box3().setFromObject(spritey);
        spritey.position.set(i * xgrid, 0, -(bbox.max.y - bbox.min.y));
        spritey.rotation.z = Math.PI / 2;
        spritey.rotation.x = -Math.PI / 2;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(i * xgrid, 0, zAxis + bbox.max.y - bbox.min.y);
        group.add(spritey);
    }
    
    for(let i=0;i<=zAxisn;i++){
        var spritey = makeTextSprite(scaleLinearLat.invert(i * zgrid).toFixed(2), 20);
        var bbox = new THREE.Box3().setFromObject(spritey);
        spritey.position.set(-(bbox.max.x - bbox.min.x), 0, i * zgrid);
        spritey.rotation.x = -Math.PI / 2;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(xAxis + (bbox.max.x - bbox.min.x), 0, i * zgrid);
        group.add(spritey);
    }

    var spritey1 = makeTextSprite('longitude', 20);
    spritey1.position.set(xAxis / 2, 0, zAxis + 100);
    spritey1.rotation.x = -Math.PI / 3;
    group.add(spritey1);

    var spritey2 = spritey1.clone();
    spritey2.position.set(xAxis / 2, 0, -100);
    group.add(spritey2);

    var spritey3 = makeTextSprite('latitude', 20);
    var bbox = new THREE.Box3().setFromObject(spritey3);
    spritey3.position.set(-(bbox.max.x - bbox.min.x) * 2, 0, zAxis / 2);
    spritey3.rotation.x = -Math.PI / 3;
    group.add(spritey3);

    var spritey4 = spritey3.clone();
    spritey4.position.set(xAxis + (bbox.max.x - bbox.min.x) * 2, 0, zAxis / 2);
    group.add(spritey4);
}
function initSphereText({ xAxis, yAxis, zAxis, xgrid, ygrid, zgrid, group }) {
    drawRect(group, xAxis, zAxis);
    drawCommonText(group, xAxis, yAxis, zAxis, xgrid, ygrid, zgrid);
    drawCommonGrids(group, xAxis, yAxis, zAxis, xgrid, ygrid, zgrid);
    n = 10;
    for(let i=0;i<=n;i++){
        var spritey = makeTextSprite( moment(scaleTime.invert(i * 60)).format('YYYY-MM-DD hh:mm:ss'), 20);
        var bbox = new THREE.Box3().setFromObject(spritey);
        spritey.position.set(-(bbox.max.x - bbox.min.x), i * yAxis / n, zAxis);
        group.add(spritey);
    }
}

function initCubeText({ xAxis, yAxis, zAxis, xgrid, ygrid, zgrid, group }) {
    drawRect(group, xAxis, zAxis);
    drawCommonText(group, xAxis, yAxis, zAxis, xgrid, ygrid, zgrid);
    drawCommonGrids(group, xAxis, yAxis, zAxis, xgrid, ygrid, zgrid);
    var spritey = makeTextSprite('Count', 20);
    var bbox = new THREE.Box3().setFromObject(spritey);
    spritey.position.set(-(bbox.max.x - bbox.min.x), yAxis / 2, zAxis);
    group.add(spritey);
}

function initBarText({ xAxis, yAxis, zAxis, xgrid, zgrid, ygrid, perCount, group }) {
    const xAxisn = ~~(xAxis / xgrid);
    const yAxisn = ~~(yAxis / ygrid);

    drawGrid({ xAxis, yAxis, zAxis, xgrid, ygrid, zgrid, type: 'left', group });
    drawGrid({ xAxis, yAxis, zAxis, xgrid, ygrid, zgrid, type: 'right', group });
    drawGrid({ xAxis, yAxis, zAxis, xgrid, ygrid, zgrid, type: 'top', group });
    drawGrid({ xAxis, yAxis, zAxis, xgrid, ygrid, zgrid, type: 'bottom', group });
    drawGrid({ xAxis, yAxis, zAxis, xgrid, ygrid, zgrid, type: 'back', group });

    for(let i=0;i < xAxisn;i++){
        var spritey = makeTextSprite(i + 1, 20);
        var bbox = new THREE.Box3().setFromObject(spritey);
        spritey.position.set(i * xgrid + xgrid / 2, -(bbox.max.y - bbox.min.y), zAxis);
        group.add(spritey);

        var spritey = makeTextSprite(i + 1, 20);
        var bbox = new THREE.Box3().setFromObject(spritey);
        spritey.position.set(i * xgrid + xgrid / 2, yAxis + (bbox.max.y - bbox.min.y), zAxis);
        group.add(spritey);
    }
    for(let i=0;i<=yAxisn;i++){
        var spritey = makeTextSprite(i * perCount * perCount, 20);
        var bbox = new THREE.Box3().setFromObject(spritey);
        spritey.position.set(-(bbox.max.x - bbox.min.x + 10), i * ygrid, 0);
        group.add(spritey);

        var spritey = makeTextSprite(i * perCount * perCount, 20);
        var bbox = new THREE.Box3().setFromObject(spritey);
        spritey.position.set(xAxis + (bbox.max.x - bbox.min.x + 10), i * ygrid, 0);
        group.add(spritey);
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
    const rect = new THREE.Mesh(geometry,material);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(xAxis / 2, zAxis / 2, 0));
    rect.rotation.x =  Math.PI / 2;
    gridGroup.add(rect);
    texture.needsUpdate	= true;
    console.warn = function(){};
}
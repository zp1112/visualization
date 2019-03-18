function drawCommonGrids(lineGroup, xAxis, yAxis, zAxis, grid) {
    const geometryLeft = new THREE.Geometry();    //创建geometry  
    geometryLeft.vertices.push(new THREE.Vector3(0, 0 ,0));  //添加顶点  
    geometryLeft.vertices.push(new THREE.Vector3(xAxis, 0, 0));  

    const geometryLeft1 = new THREE.Geometry();    //创建geometry  
    geometryLeft1.vertices.push(new THREE.Vector3(0, 0 ,0));  //添加顶点  
    geometryLeft1.vertices.push(new THREE.Vector3(zAxis, 0, 0));
    const zAxisn = zAxis / grid;
    const xAxisn = xAxis / grid;
    const yAxisn = yAxis / grid;
    // 底部面 600 * 1000
    for(let i=0;i<=zAxisn;i++){
        const line1 = new THREE.Line(geometryLeft, new THREE.LineBasicMaterial({color:0xff0000})); 
        line1.position.z = i*grid; 
        lineGroup.add(line1);  
    }
    for(let i=0;i<=xAxisn;i++){
        const line11 = new THREE.Line(geometryLeft1, new THREE.LineBasicMaterial({color:0xff0000}));  
        line11.position.x = i*grid;  
        line11.rotation.y = -Math.PI/2; 
        lineGroup.add(line11);  
    }

    const geometryBack = new THREE.Geometry();    //创建geometry  
    geometryBack.vertices.push(new THREE.Vector3(0, 0 ,0));  //添加顶点  
    geometryBack.vertices.push(new THREE.Vector3(0, 0, zAxis));  
    const geometryBack1 = new THREE.Geometry();    //创建geometry  
    geometryBack1.vertices.push(new THREE.Vector3(0, 0 ,0));  //添加顶点  
    geometryBack1.vertices.push(new THREE.Vector3(0, 0, yAxis)); 
    // 左边面 400 * 600
    for(let i=0;i<=yAxisn;i++){
        const line2 = new THREE.Line(geometryBack, new THREE.LineBasicMaterial({color:0x00ff00})); 
        line2.position.y = i*grid; 
        lineGroup.add(line2);  
    }
    for(let i=0;i<=zAxisn;i++){
        const line22 = new THREE.Line(geometryBack1, new THREE.LineBasicMaterial({color:0x00ff00}));  
        line22.position.z = i*grid;  
        line22.rotation.x = -Math.PI/2;
        lineGroup.add(line22);  
    }

    const geometryBottom = new THREE.Geometry();    //创建geometry  
    geometryBottom.vertices.push(new THREE.Vector3(0, 0 ,0));  //添加顶点  
    geometryBottom.vertices.push(new THREE.Vector3(xAxis, 0, 0)); 
    const geometryBottom1 = new THREE.Geometry();    //创建geometry  
    geometryBottom1.vertices.push(new THREE.Vector3(0, 0 ,0));  //添加顶点  
    geometryBottom1.vertices.push(new THREE.Vector3(yAxis, 0, 0)); 
    // 后边面 400 * 1000
    for(let i=0;i<=yAxisn;i++){
        const line3 = new THREE.Line(geometryBottom, new THREE.LineBasicMaterial({color:0x0000ff})); 
        line3.position.y = i*grid; 
        lineGroup.add(line3);  
    }
    for(let i=0;i<=xAxisn;i++){
        const line33 = new THREE.Line(geometryBottom1, new THREE.LineBasicMaterial({color:0x0000ff}));  
        line33.position.x = i*grid;  
        line33.rotation.z = Math.PI/2; 
        lineGroup.add(line33);  
    }
}
function drawCommonText(textGroup, xAxis, yAxis, zAxis, grid) {
    drawCommonGrids(textGroup, xAxis, yAxis, zAxis, grid);
    const zAxisn = zAxis / grid;
    const xAxisn = xAxis / grid;
    for(let i=0;i<=xAxisn;i++){
            // 使用TextBufferGeometry比TextGeometry快
            const textLeftTop = new THREE.TextBufferGeometry(scaleLinearLon.invert(i * grid).toFixed(2), fontOptions);
            const textMeshLeftTop = new THREE.Mesh(textLeftTop, new THREE.MeshBasicMaterial());
            
            textMeshLeftTop.position.x = i * grid;
            textMeshLeftTop.position.y = yAxis;
            var bbox = new THREE.Box3().setFromObject(textMeshLeftTop);
            textMeshLeftTop.position.z = -(bbox.max.y - bbox.min.y);
            textMeshLeftTop.rotation.z = 45;
            textMeshLeftTop.rotation.x = -45;
            textGroup.add(textMeshLeftTop);
    }
    
    for(let i=0;i<=xAxisn;i++){
            // 使用TextBufferGeometry比TextGeometry快
            const textLeftTop = new THREE.TextBufferGeometry(scaleLinearLon.invert(i * grid).toFixed(2), fontOptions);
            const textMeshLeftTop = new THREE.Mesh(textLeftTop, new THREE.MeshBasicMaterial());
            
            textMeshLeftTop.position.x = i * grid;
            textMeshLeftTop.position.y = 0;
            var bbox = new THREE.Box3().setFromObject(textMeshLeftTop);
            textMeshLeftTop.position.z = (zAxis + bbox.max.x - bbox.min.x);
            // textMeshLeftTop.position.z = zAxis + 100;
            textMeshLeftTop.rotation.z = 45;
            textMeshLeftTop.rotation.x = -45;
            textGroup.add(textMeshLeftTop);
    }

    for(let i=0;i<=zAxisn;i++){
            // 使用TextBufferGeometry比TextGeometry快
            const textLeftTop = new THREE.TextBufferGeometry(scaleLinearLat.invert(i * grid).toFixed(2), fontOptions);
            const textMeshLeftTop = new THREE.Mesh(textLeftTop, new THREE.MeshBasicMaterial());
            
            var bbox = new THREE.Box3().setFromObject(textMeshLeftTop);
            textMeshLeftTop.position.x = -(bbox.max.x - bbox.min.x);
            // textMeshLeftTop.position.x = -70;
            textMeshLeftTop.position.y = yAxis;
            textMeshLeftTop.position.z = i * grid;
            textMeshLeftTop.rotation.x = -45;
            textGroup.add(textMeshLeftTop);
    }
}
function initSphereText({ xAxis, yAxis, zAxis, grid }) {
    drawRect(sphereGridGroup, xAxis, zAxis);
    drawCommonText(sphereGridGroup, xAxis, yAxis, zAxis, grid);
    n = 10;
    for(let i=0;i<=n;i++){
        // 使用TextBufferGeometry比TextGeometry快
        const textLeftTop = new THREE.TextBufferGeometry(moment(scaleTime.invert(i * 60)).format('YYYY-MM-DD hh:mm:ss'), fontOptions);
        const textMeshLeftTop = new THREE.Mesh(textLeftTop, new THREE.MeshBasicMaterial());
        var bbox = new THREE.Box3().setFromObject(textMeshLeftTop);
        
        textMeshLeftTop.position.x = - (bbox.max.x - bbox.min.x);
        textMeshLeftTop.position.y = i * yAxis / n;
        textMeshLeftTop.position.z = zAxis;
        sphereGridGroup.add(textMeshLeftTop);
    }
}

function initCubeText(name, { xAxis, yAxis, zAxis, grid }) {
    drawRect(cubeGridGroup, xAxis, zAxis);
    drawCommonText(cubeGridGroup, xAxis, yAxis, zAxis, grid);
    const zTextMesh = new THREE.Mesh(new THREE.TextBufferGeometry(name, fontOptions), new THREE.MeshBasicMaterial());
    
    var bbox = new THREE.Box3().setFromObject(zTextMesh);
    zTextMesh.position.x = -(bbox.max.x - bbox.min.x);
    zTextMesh.position.y = yAxis / 2;
    zTextMesh.position.z = 600;
    cubeGridGroup.add(zTextMesh);
}

function initBarText({ xAxis, yAxis, zAxis, grid, perCount, ygrid }) {
    const geometryLeft = new THREE.Geometry();    //创建geometry  
    geometryLeft.vertices.push(new THREE.Vector3(0, 0 ,0));  //添加顶点  
    geometryLeft.vertices.push(new THREE.Vector3(xAxis, 0, 0));  

    const geometryLeft1 = new THREE.Geometry();    //创建geometry  
    geometryLeft1.vertices.push(new THREE.Vector3(0, 0 ,0));  //添加顶点  
    geometryLeft1.vertices.push(new THREE.Vector3(zAxis, 0, 0));
    const zAxisn = Math.floor(zAxis / grid);
    const xAxisn = Math.floor(xAxis / grid);
    const yAxisn = Math.floor(yAxis / ygrid);
    // 底部面 600 * 1000
    for(let i=0;i<=zAxisn;i++){
        const line1 = new THREE.Line(geometryLeft, new THREE.LineBasicMaterial({color:0xff0000})); 
        line1.position.z = i*grid; 
        barGridGroup.add(line1);  
    }
    for(let i=0;i<=xAxisn;i++){
        const line11 = new THREE.Line(geometryLeft1, new THREE.LineBasicMaterial({color:0xff0000}));  
        line11.position.x = i*grid;  
        line11.rotation.y = -Math.PI/2; 
        barGridGroup.add(line11);  
    }

    const geometryBack = new THREE.Geometry();    //创建geometry  
    geometryBack.vertices.push(new THREE.Vector3(0, 0 ,0));  //添加顶点  
    geometryBack.vertices.push(new THREE.Vector3(0, 0, zAxis));  
    const geometryBack1 = new THREE.Geometry();    //创建geometry  
    geometryBack1.vertices.push(new THREE.Vector3(0, 0 ,0));  //添加顶点  
    geometryBack1.vertices.push(new THREE.Vector3(0, 0, yAxis)); 
    // 左边面 400 * 600
    for(let i=0;i<=yAxisn;i++){
        const line2 = new THREE.Line(geometryBack, new THREE.LineBasicMaterial({color:0x00ff00})); 
        line2.position.y = i*ygrid; 
        barGridGroup.add(line2);  
    }
    for(let i=0;i<=zAxisn;i++){
        const line22 = new THREE.Line(geometryBack1, new THREE.LineBasicMaterial({color:0x00ff00}));  
        line22.position.z = i*grid;  
        line22.rotation.x = -Math.PI/2;
        barGridGroup.add(line22);  
    }

    const geometryBottom = new THREE.Geometry();    //创建geometry  
    geometryBottom.vertices.push(new THREE.Vector3(0, 0 ,0));  //添加顶点  
    geometryBottom.vertices.push(new THREE.Vector3(xAxis, 0, 0)); 
    const geometryBottom1 = new THREE.Geometry();    //创建geometry  
    geometryBottom1.vertices.push(new THREE.Vector3(0, 0 ,0));  //添加顶点  
    geometryBottom1.vertices.push(new THREE.Vector3(yAxis, 0, 0)); 
    // 后边面 400 * 1000
    for(let i=0;i<=yAxisn;i++){
        const line3 = new THREE.Line(geometryBottom, new THREE.LineBasicMaterial({color:0x0000ff})); 
        line3.position.y = i*ygrid; 
        barGridGroup.add(line3);  
    }
    for(let i=0;i<=xAxisn;i++){
        const line33 = new THREE.Line(geometryBottom1, new THREE.LineBasicMaterial({color:0x0000ff}));  
        line33.position.x = i*grid;  
        line33.rotation.z = Math.PI/2; 
        barGridGroup.add(line33);  
    }
    for(let i=0;i < xAxisn;i++){
            // 使用TextBufferGeometry比TextGeometry快
            const textLeftTop = new THREE.TextBufferGeometry(i + 1 + '', fontOptions);
            const textMeshLeftTop = new THREE.Mesh(textLeftTop, new THREE.MeshBasicMaterial());
            
            textMeshLeftTop.position.x = i * grid + grid / 3;
            textMeshLeftTop.position.y = -20;
            textMeshLeftTop.position.z = zAxis;
            barGridGroup.add(textMeshLeftTop);
    }
    for(let i=0;i<=yAxisn;i++){
            // 使用TextBufferGeometry比TextGeometry快
            const textLeftTop = new THREE.TextBufferGeometry(i * perCount * perCount + '', fontOptions);
            const textMeshLeftTop = new THREE.Mesh(textLeftTop, new THREE.MeshBasicMaterial());
            
            var bbox = new THREE.Box3().setFromObject(textMeshLeftTop);
            textMeshLeftTop.position.x = -(bbox.max.x - bbox.min.x + 10);
            textMeshLeftTop.position.y = i * ygrid;
            textMeshLeftTop.position.z = 0;
            barGridGroup.add(textMeshLeftTop);
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
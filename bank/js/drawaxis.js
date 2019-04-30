function DrawAxis(axis, quadrant, gridOption, isDrawRect = true) {
    const { group, xAxis, zAxis } = axis;
    isDrawRect ? drawRect(group, xAxis, zAxis) : null;
    this.group = group;
    drawGrid({...gridOption, ...axis});
    this.updateText(quadrant);
}
DrawAxis.prototype = {
    updateText: function (quadrant) {
        this.group.children.forEach(row => {
            typeof row.rotationfunc == 'function' ? row.rotationfunc(quadrant) : null;
            typeof row.visiblefunc == 'function' ? row.visiblefunc(quadrant) : null;
            typeof row.colorfunc == 'function' ? row.colorfunc(quadrant) : null;
        })
    }
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
function drawGrid(options) {
    const { zAxis, yAxis, xAxis, xgrid, ygrid, zgrid, group, scaleY, scaleZ, scaleX, texty, textz, textx, xAxisCenter, textxFormat } = options;
    const zAxisn = ~~(zAxis / zgrid);
    const xAxisn = ~~(xAxis / xgrid);
    const yAxisn = ~~(yAxis / ygrid);

    var visiblefunc12 = helperMethods.visiblefunc(1, 2);
    var visiblefunc34 = helperMethods.visiblefunc(3, 4);
    var visiblefunc13 = helperMethods.visiblefunc(1, 3);
    var visiblefunc24 = helperMethods.visiblefunc(2, 4);
    var visiblefunc14 = helperMethods.visiblefunc(1, 4);
    var visiblefunc23 = helperMethods.visiblefunc(2, 3);

    var maxTextWidth = 0;
    var rotationfunc1 = helperMethods.rotationfunc('z', 2, -Math.PI, 0);
    var rotationfunc2 = helperMethods.rotationfunc('z', 3, -Math.PI, 0);
    for (let i = 0; i <= zAxisn; i++) {
        var spritey = helperMethods.makeTextSprite(scaleZ(i));
        var bbox = new THREE.Box3().setFromObject(spritey);
        const textWidth = bbox.max.x - bbox.min.x;
        if (textWidth > maxTextWidth) maxTextWidth = textWidth;
        const band = i * zgrid;
        spritey.rotation.x = -Math.PI / 2;
        spritey.rotation.y = -Math.PI / 4;
        spritey.position.set(-textWidth / 2, -textWidth / 2, band);
        spritey.rotationfunc = rotationfunc1;
        spritey.visiblefunc = visiblefunc12;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(xAxis + textWidth / 2, yAxis + textWidth / 2, band);
        spritey.rotationfunc = rotationfunc1;
        spritey.visiblefunc = visiblefunc12;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(xAxis + textWidth / 2, -textWidth / 2, band);
        spritey.rotation.x = -Math.PI / 2;
        spritey.rotation.y = Math.PI / 4;
        spritey.rotationfunc = rotationfunc2;
        spritey.visiblefunc = visiblefunc34;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(-textWidth / 2, yAxis + textWidth / 2, band);
        spritey.rotationfunc = rotationfunc2;
        spritey.visiblefunc = visiblefunc34;
        group.add(spritey);
    }
    var spritey = helperMethods.makeTextSprite(textz);
    var bbox = new THREE.Box3().setFromObject(spritey);
    var textWidth = (bbox.max.x - bbox.min.x);
    spritey.position.set(-textWidth / 2 - maxTextWidth, yAxis + textWidth, zAxis / 2);
    spritey.rotation.x = -Math.PI / 2;
    spritey.rotation.z = Math.PI / 2;
    spritey.rotation.y = Math.PI / 4;
    spritey.visiblefunc = visiblefunc34;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.position.set(xAxis + textWidth / 2 + maxTextWidth, -textWidth / 2, zAxis / 2);
    spritey.visiblefunc = visiblefunc34;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.position.set(-textWidth / 2 - maxTextWidth, -textWidth / 2, zAxis / 2);
    spritey.rotation.y = -Math.PI / 4;
    spritey.rotation.z = -Math.PI / 2;
    spritey.visiblefunc = visiblefunc12;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.position.set(xAxis + textWidth / 2 + maxTextWidth, yAxis + textWidth, zAxis / 2);
    spritey.visiblefunc = visiblefunc12;
    group.add(spritey);



    var maxTextWidth = 0;
    var rotationfunc1 = helperMethods.rotationfunc('y', 2, -Math.PI * 3 / 4, Math.PI / 4);
    var rotationfunc2 = helperMethods.rotationfunc('y', 1, -Math.PI / 4, Math.PI * 3 / 4);
    for (let i = 0; i <= yAxisn; i++) {
        var spritey = helperMethods.makeTextSprite(scaleY(i));
        var bbox = new THREE.Box3().setFromObject(spritey);
        const textWidth = bbox.max.x - bbox.min.x;
        if (textWidth > maxTextWidth) maxTextWidth = textWidth;
        spritey.position.set(-textWidth / 2, i * ygrid, zAxis + textWidth / 2);
        spritey.rotationfunc = rotationfunc1;
        spritey.visiblefunc = visiblefunc24;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(xAxis + textWidth / 2, i * ygrid, -textWidth / 2);
        spritey.rotationfunc = rotationfunc1;
        spritey.visiblefunc = visiblefunc24;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(xAxis + textWidth / 2, i * ygrid, zAxis + textWidth / 2);
        spritey.rotationfunc = rotationfunc2;
        spritey.visiblefunc = visiblefunc13;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(-textWidth / 2, i * ygrid, -textWidth / 2);
        spritey.rotationfunc = rotationfunc2;
        spritey.visiblefunc = visiblefunc13;
        group.add(spritey);
    }
    var spritey = helperMethods.makeTextSprite(texty);
    var bbox = new THREE.Box3().setFromObject(spritey);
    var textWidth = (bbox.max.x - bbox.min.x);
    var textHeight = (bbox.max.y - bbox.min.y);
    spritey.position.set(-maxTextWidth - textWidth, yAxis / 2, zAxis + maxTextWidth + textHeight / 2);
    spritey.rotationfunc = rotationfunc1;
    spritey.visiblefunc = visiblefunc24;
    spritey.rotation.z = -Math.PI / 2;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.position.set(xAxis + maxTextWidth + textWidth, yAxis / 2, -textHeight / 2 - maxTextWidth);
    spritey.rotationfunc = rotationfunc1;
    spritey.visiblefunc = visiblefunc24;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.position.set(-maxTextWidth - textWidth, yAxis / 2, -textHeight / 2 - maxTextWidth);
    spritey.rotationfunc = rotationfunc2;
    spritey.visiblefunc = visiblefunc13;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.position.set(xAxis + maxTextWidth + textWidth, yAxis / 2, zAxis + maxTextWidth + textHeight / 2);
    spritey.rotationfunc = rotationfunc2;
    spritey.visiblefunc = visiblefunc13;
    group.add(spritey);



    var maxTextWidth = 0;
    var rotationfunc1 = helperMethods.rotationfunc('z', 1, -Math.PI / 2, Math.PI / 2);
    var rotationfunc2 = helperMethods.rotationfunc('z', 2, -Math.PI / 2, Math.PI / 2);
    for (let i = 0; i <= (xAxisCenter ? xAxisn - 1 : xAxisn); i++) {
        if (textxFormat) {
            var spritey = helperMethods.makeTextSprite(textxFormat[0] + i);
        } else {
            var spritey = helperMethods.makeTextSprite(scaleX(i));
        }
        var bbox = new THREE.Box3().setFromObject(spritey);
        const textWidth = bbox.max.x - bbox.min.x;
        if (textWidth > maxTextWidth) maxTextWidth = textWidth;
        const band = xAxisCenter ? i * xgrid + xgrid / 2 : i * xgrid;
        spritey.position.set(band, yAxis + textWidth / 2, -textWidth / 2);
        spritey.rotation.x = -Math.PI / 3;
        spritey.rotationfunc = rotationfunc1;
        spritey.visiblefunc = visiblefunc14;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(band, -textWidth / 2, zAxis + textWidth / 2);
        spritey.rotationfunc = rotationfunc1;
        spritey.visiblefunc = visiblefunc14;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(band, -textWidth / 2, -textWidth / 2);
        spritey.rotation.x = -Math.PI * 3 / 4;
        spritey.rotationfunc = rotationfunc2;
        spritey.visiblefunc = visiblefunc23;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(band, yAxis + textWidth / 2, zAxis + textWidth / 2);
        spritey.rotationfunc = rotationfunc2;
        spritey.visiblefunc = visiblefunc23;
        group.add(spritey);

    }

    var spritey = helperMethods.makeTextSprite(textx);
    var bbox = new THREE.Box3().setFromObject(spritey);
    var textHeight = (bbox.max.y - bbox.min.y);
    var diffy = textHeight + maxTextWidth;
    spritey.position.set(xAxis / 2, yAxis + diffy, -diffy);
    spritey.rotation.x = -Math.PI / 4;
    spritey.visiblefunc = visiblefunc14;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.position.set(xAxis / 2, -diffy, zAxis + diffy);
    spritey.visiblefunc = visiblefunc14;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.position.set(xAxis / 2, -diffy, -diffy);
    spritey.rotation.x = Math.PI / 4;
    spritey.rotation.y = Math.PI;
    spritey.visiblefunc = visiblefunc23;
    group.add(spritey);
 
    var spritey = spritey.clone();
    spritey.position.set(xAxis / 2, yAxis + diffy, zAxis + diffy);
    spritey.visiblefunc = visiblefunc23;
    group.add(spritey);

    var color1 = new THREE.Color( 0xf46b16 ),
        color2 = new THREE.Color(0xede21e);
    
    var resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );
    var material = new MeshLineMaterial({
        useMap: false,
		opacity: 1,
		resolution: resolution,
		sizeAttenuation: !false,
		lineWidth: 4,
		near: bankChart.camera.near,
		far: bankChart.camera.far
    });

    // 左边面
    const meshline1 = helperMethods.createMeshLineGeometry(new THREE.Vector3(0, 0, zAxis), [color1, color1]);
    for (let i = 0; i <= yAxisn; i++) {
        const line = new THREE.Mesh(meshline1.geometry.clone(), material);
        line.position.y = i * ygrid;
        line.visiblefunc = visiblefunc34;
        group.add(line);
    }
    const meshline2 = helperMethods.createMeshLineGeometry(new THREE.Vector3(0, 0, yAxis), [color1, color1]);
    for (let i = 0; i <= zAxisn; i++) {
        const line1 = new THREE.Mesh(meshline2.geometry.clone(), material );
        line1.position.z = i * zgrid;
        line1.rotation.x = -Math.PI / 2;
        line1.visiblefunc = visiblefunc34
        group.add(line1);
    }
    // 右边面
    const meshline3 = helperMethods.createMeshLineGeometry(new THREE.Vector3(0, 0, zAxis), [color2, color2]);
    for (let i = 0; i <= yAxisn; i++) {
        const line = new THREE.Mesh(meshline3.geometry.clone(), material );
        line.position.y = i * ygrid;
        line.position.x = xAxis;
        line.visiblefunc = visiblefunc12;
        group.add(line);
    }
    const meshline4 = helperMethods.createMeshLineGeometry(new THREE.Vector3(0, 0, yAxis), [color2, color2]);
    for (let i = 0; i <= zAxisn; i++) {
        const line1 = new THREE.Mesh(meshline4.geometry.clone(), material );
        line1.position.z = i * zgrid;
        line1.position.x = xAxis;
        line1.rotation.x = -Math.PI / 2;
        line1.visiblefunc = visiblefunc12
        group.add(line1);
    }
    const meshline5 = helperMethods.createMeshLineGeometry(new THREE.Vector3(xAxis, 0, 0), [color1, color2]);
    // 底部面
    for (let i = 0; i <= zAxisn; i++) {
        const line = new THREE.Mesh(meshline5.geometry.clone(), material);
        line.position.z = i * zgrid;
        group.add(line);
    }
    const colorScale = d3.scaleLinear()
    .domain([0, xAxisn])
        .range([color1, color2]);
    for (let i = 0; i <= xAxisn; i++) {
        const meshline6 = helperMethods.createMeshLineGeometry(new THREE.Vector3(zAxis, 0, 0), [new THREE.Color(colorScale(i)), new THREE.Color(colorScale(i))]);
        const line1 = new THREE.Mesh(meshline6.geometry.clone(), material);
        line1.position.x = i * xgrid;
        line1.rotation.y = -Math.PI / 2;
        group.add(line1);
    }
    // 顶部面
    // for(let i=0;i<=zAxisn;i++){
    //     const line = new THREE.Line(geometry2[0], material); 
    //     line.position.z = i*zgrid; 
    //     line.position.y = yAxis; 
    //     group.add(line);  
    // }
    // for(let i=0;i<=xAxisn;i++){
    //     const line1 = new THREE.Line(geometry2[1], material);  
    //     line1.position.x = i*xgrid;  
    //     line1.position.y = yAxis; 
    //     line1.rotation.y = -Math.PI/2;
    //     group.add(line1);  
    // }
    
    const meshline7 = helperMethods.createMeshLineGeometry(new THREE.Vector3(xAxis, 0, 0), [color1, color2]);
    // 后边面
    for (let i = 0; i <= yAxisn; i++) {
        const line = new THREE.Mesh(meshline7.geometry.clone(), material);
        line.position.y = i * ygrid;
        line.visiblefunc = visiblefunc14;
        group.add(line);
    }
    for (let i = 0; i <= xAxisn; i++) {
        const meshline8 = helperMethods.createMeshLineGeometry(new THREE.Vector3(yAxis, 0, 0), [new THREE.Color(colorScale(i)), new THREE.Color(colorScale(i))]);
        const line1 = new THREE.Mesh(meshline8.geometry.clone(), material);
        line1.position.x = i * xgrid;
        line1.rotation.z = Math.PI / 2;
        line1.visiblefunc = visiblefunc14
        group.add(line1);
    }
    // 前边面
    const meshline9 = helperMethods.createMeshLineGeometry(new THREE.Vector3(xAxis, 0, 0), [color1, color2]);
    for (let i = 0; i <= yAxisn; i++) {
        const line = new THREE.Mesh(meshline9.geometry.clone(), material);
        line.position.y = i * ygrid;
        line.position.z = zAxis;
        line.visiblefunc = visiblefunc23
        group.add(line);
    }
    for (let i = 0; i <= xAxisn; i++) {
        const meshline10 = helperMethods.createMeshLineGeometry(new THREE.Vector3(yAxis, 0, 0), [new THREE.Color(colorScale(i)), new THREE.Color(colorScale(i))]);
        const line1 = new THREE.Mesh(meshline10.geometry.clone(), material);
        line1.position.x = i * xgrid;
        line1.position.z = zAxis;
        line1.visiblefunc = visiblefunc23
        line1.rotation.z = Math.PI / 2;
        group.add(line1);
    }
}
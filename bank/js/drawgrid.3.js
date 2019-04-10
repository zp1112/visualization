function drawGrid(options) {
    const { zAxis, yAxis, xAxis, xgrid, ygrid, zgrid, group, scaleY, scaleZ, scaleX, texty, textz, textx, xAxisCenter } = options;
    const zAxisn = ~~(zAxis / zgrid);
    const xAxisn = ~~(xAxis / xgrid);
    const yAxisn = ~~(yAxis / ygrid);
    function createGeometry(vector1, vector2) {
        const geometry = new THREE.Geometry();    //创建geometry  
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));  //添加顶点  
        geometry.vertices.push(vector1);
        const geometry1 = new THREE.Geometry();    //创建geometry  
        geometry1.vertices.push(new THREE.Vector3(0, 0, 0));  //添加顶点  
        geometry1.vertices.push(vector2);
        return [geometry, geometry1];
    }
    const material = new THREE.LineBasicMaterial({ color: 0xc3c4cc });
    var rotationfunc = function (quadrant) {
        this.rotation.z = quadrant == 2 ? -Math.PI : 0
    };
    var visiblefunc = function (quadrant) {
        (quadrant == 1 || quadrant == 2) ? this.visible = true : this.visible = false;
    };
    var rotationfunc1 = function (quadrant) {
        this.rotation.z = quadrant == 3 ? -Math.PI : 0
    }
    var visiblefunc1 = function (quadrant) {
        (quadrant == 3 || quadrant == 4) ? this.visible = true : this.visible = false;
    }
    var maxTextWidth = 0;
    for (let i = 0; i <= zAxisn; i++) {
        var spritey = makeTextSprite(scaleZ(i));
        var bbox = new THREE.Box3().setFromObject(spritey);
        const textWidth = bbox.max.x - bbox.min.x;
        if (textWidth > maxTextWidth) maxTextWidth = textWidth;
        const band = i * zgrid;
        spritey.rotation.x = -Math.PI / 2;
        spritey.rotation.y = -Math.PI / 4;
        spritey.position.set(-textWidth / 2, -textWidth / 2, band);
        spritey.rotationfunc = rotationfunc;
        spritey.visiblefunc = visiblefunc;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(xAxis + textWidth / 2, yAxis + textWidth / 2, band);
        spritey.rotationfunc = rotationfunc;
        spritey.visiblefunc = visiblefunc;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(xAxis + textWidth / 2, -textWidth / 2, band);
        spritey.rotation.x = -Math.PI / 2;
        spritey.rotation.y = Math.PI / 4;
        spritey.rotationfunc = rotationfunc1;
        spritey.visiblefunc = visiblefunc1;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(-textWidth / 2, yAxis + textWidth / 2, band);
        spritey.rotationfunc = rotationfunc1;
        spritey.visiblefunc = visiblefunc1;
        group.add(spritey);
    }
    var spritey = makeTextSprite(textz);
    var bbox = new THREE.Box3().setFromObject(spritey);
    var textWidth = (bbox.max.x - bbox.min.x);
    spritey.position.set(-textWidth / 2 - maxTextWidth, yAxis + textWidth, zAxis / 2);
    spritey.rotation.x = -Math.PI / 2;
    spritey.rotation.z = Math.PI / 2;
    spritey.rotation.y = Math.PI / 4;
    spritey.visiblefunc = visiblefunc1;
    group.add(spritey);

    var spritey = spritey.clone(); 
    spritey.position.set(xAxis + textWidth / 2 + maxTextWidth, -textWidth / 2, zAxis / 2);
    spritey.visiblefunc = visiblefunc1;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.position.set(-textWidth / 2 - maxTextWidth, -textWidth / 2, zAxis / 2);
    spritey.rotation.y = -Math.PI / 4;
    spritey.rotation.z = -Math.PI / 2;
    spritey.visiblefunc = visiblefunc;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.position.set(xAxis + textWidth / 2 + maxTextWidth, yAxis + textWidth / 2, zAxis / 2);
    spritey.visiblefunc = visiblefunc;
    group.add(spritey);

    var rotationfunc = function (quadrant) {
        this.rotation.y = quadrant == 2 ? -Math.PI * 3 / 4 : Math.PI / 4;
    }
    var visiblefunc = function (quadrant) {
        (quadrant == 2 || quadrant == 4) ? this.visible = true : this.visible = false;
    }
    var rotationfunc1 = function (quadrant) {
        this.rotation.y = quadrant == 1 ? -Math.PI / 4 : Math.PI * 3 / 4;
    }
    var visiblefunc1 = function (quadrant) {
        (quadrant == 3 || quadrant == 1) ? this.visible = true : this.visible = false;
    }
    var maxTextWidth = 0;
    for (let i = 0; i <= yAxisn; i++) {
        var spritey = makeTextSprite(scaleY(i));
        var bbox = new THREE.Box3().setFromObject(spritey);
        const textWidth = bbox.max.x - bbox.min.x;
        if (textWidth > maxTextWidth) maxTextWidth = textWidth;
        spritey.position.set(-textWidth / 2, i * ygrid, zAxis + textWidth / 2);
        spritey.rotationfunc = rotationfunc;
        spritey.visiblefunc = visiblefunc;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(xAxis + textWidth / 2, i * ygrid, -textWidth / 2);
        spritey.rotationfunc = rotationfunc;
        spritey.visiblefunc = visiblefunc;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(xAxis + textWidth / 2, i * ygrid, zAxis + textWidth / 2);
        spritey.rotationfunc = rotationfunc1;
        spritey.visiblefunc = visiblefunc1;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(-textWidth / 2, i * ygrid, -textWidth / 2);
        spritey.rotationfunc = rotationfunc1;
        spritey.visiblefunc = visiblefunc1;
        group.add(spritey);
    }
    var spritey = makeTextSprite(texty);
    var bbox = new THREE.Box3().setFromObject(spritey);
    var textWidth = (bbox.max.x - bbox.min.x);
    var textHeight = (bbox.max.y - bbox.min.y);
    spritey.position.set(-maxTextWidth - textWidth, yAxis / 2, zAxis + maxTextWidth + textHeight / 2);
    spritey.rotationfunc = rotationfunc;
    spritey.visiblefunc = visiblefunc;
    spritey.rotation.z = -Math.PI / 2;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.position.set(xAxis + maxTextWidth + textWidth, yAxis / 2, -textHeight / 2 - maxTextWidth);
    spritey.rotationfunc = rotationfunc;
    spritey.visiblefunc = visiblefunc;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.position.set(-maxTextWidth - textWidth, yAxis / 2, -textHeight / 2 - maxTextWidth);
    spritey.rotationfunc = rotationfunc1;
    spritey.visiblefunc = visiblefunc1;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.position.set(xAxis + maxTextWidth + textWidth, yAxis / 2, zAxis + maxTextWidth + textHeight / 2);
    spritey.rotationfunc = rotationfunc1;
    spritey.visiblefunc = visiblefunc1;
    group.add(spritey);

    var rotationfunc = function (quadrant) {
        this.rotation.z = quadrant == 1 ? -Math.PI / 2 : Math.PI / 2;
    }
    var visiblefunc = function (quadrant) {
        (quadrant == 1 || quadrant == 4) ? this.visible = true : this.visible = false;
    }
    var rotationfunc1 = function (quadrant) {
        this.rotation.z = quadrant == 2 ? -Math.PI / 2 : Math.PI / 2;
    }
    var visiblefunc1 = function (quadrant) {
        (quadrant == 2 || quadrant == 3) ? this.visible = true : this.visible = false;
    }
    var maxTextWidth = 0;
    for (let i = 0; i <= (xAxisCenter ? xAxisn - 1 : xAxisn); i++) {
        var spritey = makeTextSprite(scaleX(i));
        var bbox = new THREE.Box3().setFromObject(spritey);
        const textWidth = bbox.max.x - bbox.min.x;
        if (textWidth > maxTextWidth) maxTextWidth = textWidth;
        const band = xAxisCenter ? i * xgrid + xgrid / 2 : i * xgrid;
        spritey.position.set(band, yAxis + textWidth / 2, -textWidth / 2);
        spritey.rotation.x = -Math.PI / 3;
        spritey.rotationfunc = rotationfunc;
        spritey.visiblefunc = visiblefunc;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(band, -textWidth / 2, zAxis + textWidth / 2);
        spritey.rotationfunc = rotationfunc;
        spritey.visiblefunc = visiblefunc;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(band, -textWidth / 2, -textWidth / 2);
        spritey.rotation.x = -Math.PI * 3 / 4;
        spritey.rotationfunc = rotationfunc1;
        spritey.visiblefunc = visiblefunc1;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.position.set(band, yAxis + textWidth / 2, zAxis + textWidth / 2);
        spritey.rotationfunc = rotationfunc1;
        spritey.visiblefunc = visiblefunc1;
        group.add(spritey);

    }

    var spritey = makeTextSprite(textx);
    var bbox = new THREE.Box3().setFromObject(spritey);
    var textHeight = (bbox.max.y - bbox.min.y);
    var diffy = textHeight + maxTextWidth;
    spritey.position.set(xAxis / 2, yAxis + diffy, -diffy);
    spritey.rotation.x = -Math.PI / 4;
    spritey.visiblefunc = visiblefunc;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.position.set(xAxis / 2, -diffy, zAxis + diffy);
    spritey.visiblefunc = visiblefunc;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.position.set(xAxis / 2, -diffy, -diffy);
    spritey.rotation.x = Math.PI / 4;
    spritey.rotation.y = Math.PI;
    spritey.visiblefunc = visiblefunc1;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.position.set(xAxis / 2, yAxis + diffy, zAxis + diffy);
    spritey.visiblefunc = visiblefunc1;
    group.add(spritey);

    const geometry1 = createGeometry(new THREE.Vector3(0, 0, zAxis), new THREE.Vector3(0, 0, yAxis));
    // 左边面
    for (let i = 0; i <= yAxisn; i++) {
        const line = new THREE.Line(geometry1[0], material);
        line.position.y = i * ygrid;
        line.visiblefunc = function (quadrant) {
            (quadrant == 3 || quadrant == 4) ? this.visible = true : this.visible = false;
        }
        group.add(line);
    }
    for (let i = 0; i <= zAxisn; i++) {
        const line1 = new THREE.Line(geometry1[1], material);
        line1.position.z = i * zgrid;
        line1.rotation.x = -Math.PI / 2;
        line1.visiblefunc = function (quadrant) {
            (quadrant == 3 || quadrant == 4) ? this.visible = true : this.visible = false;
        }
        group.add(line1);
    }
    // 右边面
    for (let i = 0; i <= yAxisn; i++) {
        const line = new THREE.Line(geometry1[0], material);
        line.position.y = i * ygrid;
        line.position.x = xAxis;
        line.visiblefunc = function (quadrant) {
            (quadrant == 1 || quadrant == 2) ? this.visible = true : this.visible = false;
        }
        group.add(line);
    }
    for (let i = 0; i <= zAxisn; i++) {
        const line1 = new THREE.Line(geometry1[1], material);
        line1.position.z = i * zgrid;
        line1.position.x = xAxis;
        line1.rotation.x = -Math.PI / 2;
        line1.visiblefunc = function (quadrant) {
            (quadrant == 1 || quadrant == 2) ? this.visible = true : this.visible = false;
        }
        group.add(line1);
    }
    const geometry2 = createGeometry(new THREE.Vector3(xAxis, 0, 0), new THREE.Vector3(zAxis, 0, 0));
    // 底部面
    for (let i = 0; i <= zAxisn; i++) {
        const line = new THREE.Line(geometry2[0], material);
        line.position.z = i * zgrid;
        group.add(line);
    }
    for (let i = 0; i <= xAxisn; i++) {
        const line1 = new THREE.Line(geometry2[1], material);
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
    const geometry3 = createGeometry(new THREE.Vector3(xAxis, 0, 0), new THREE.Vector3(yAxis, 0, 0));
    // 后边面
    for (let i = 0; i <= yAxisn; i++) {
        const line = new THREE.Line(geometry3[0], material);
        line.position.y = i * ygrid;
        line.visiblefunc = function (quadrant) {
            (quadrant == 1 || quadrant == 4) ? this.visible = true : this.visible = false;
        }
        group.add(line);
    }
    for (let i = 0; i <= xAxisn; i++) {
        const line1 = new THREE.Line(geometry3[1], material);
        line1.position.x = i * xgrid;
        line1.rotation.z = Math.PI / 2;
        line1.visiblefunc = function (quadrant) {
            (quadrant == 1 || quadrant == 4) ? this.visible = true : this.visible = false;
        }
        group.add(line1);
    }
    // 前边面
    for (let i = 0; i <= yAxisn; i++) {
        const line = new THREE.Line(geometry3[0], material);
        line.position.y = i * ygrid;
        line.position.z = zAxis;
        line.visiblefunc = function (quadrant) {
            (quadrant == 2 || quadrant == 3) ? this.visible = true : this.visible = false;
        }
        group.add(line);
    }
    for (let i = 0; i <= xAxisn; i++) {
        const line1 = new THREE.Line(geometry3[1], material);
        line1.position.x = i * xgrid;
        line1.position.z = zAxis;
        line1.visiblefunc = function (quadrant) {
            (quadrant == 2 || quadrant == 3) ? this.visible = true : this.visible = false;
        }
        line1.rotation.z = Math.PI / 2;
        group.add(line1);
    }
}
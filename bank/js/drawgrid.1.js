function drawGrid(options) {
    const { zAxis, yAxis, xAxis, xgrid, ygrid, zgrid, group, scaleY, scaleZ, scaleX, texty, textz, textx } = options;
    const zAxisn = ~~(zAxis / zgrid);
    const xAxisn = ~~(xAxis / xgrid);
    const yAxisn = ~~(yAxis / ygrid);
    function createGeometry(vector1, vector2) {
        const geometry = new THREE.Geometry();    //创建geometry  
        geometry.vertices.push(new THREE.Vector3(0, 0 ,0));  //添加顶点  
        geometry.vertices.push(vector1);  
        const geometry1 = new THREE.Geometry();    //创建geometry  
        geometry1.vertices.push(new THREE.Vector3(0, 0 ,0));  //添加顶点  
        geometry1.vertices.push(vector2); 
        return [geometry, geometry1];
    }
    const material = new THREE.LineBasicMaterial({color:0xffffff});
    for(let i=0;i<=zAxisn;i++){
        var spritey = makeTextSprite(scaleZ(i));
        spritey.show = 'right';
        var bbox = new THREE.Box3().setFromObject(spritey);
        spritey.position.set(-(bbox.max.x - bbox.min.x), 0, i * zgrid);
        spritey.rotation.x = -Math.PI / 2;
        spritey.rotation.y = -Math.PI / 4;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.show = 'right';
        spritey.position.set(xAxis + (bbox.max.x - bbox.min.x), yAxis, i * zgrid);
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.show = 'left';
        spritey.rotation.y = Math.PI / 4;
        spritey.position.set(-(bbox.max.x - bbox.min.x), yAxis, i * zgrid);
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.show = 'left';
        spritey.position.set(xAxis + (bbox.max.x - bbox.min.x), 0, i * zgrid);
        group.add(spritey);
    }
    var spritey = makeTextSprite(textz);
    spritey.show = 'left';
    var bbox = new THREE.Box3().setFromObject(spritey);
    spritey.position.set(-(bbox.max.x - bbox.min.x) * 2, yAxis, zAxis / 2);
    spritey.rotation.x = -Math.PI / 2;
    spritey.rotation.z = Math.PI / 2;
    spritey.rotation.y = Math.PI / 4;
    group.add(spritey);
    
    var spritey = spritey.clone(); 
    spritey.show = 'left';
    spritey.position.set(xAxis + (bbox.max.x - bbox.min.x) * 2, 0, zAxis / 2);
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.show = 'right';
    spritey.rotation.y = -Math.PI / 4;
    spritey.rotation.z = -Math.PI / 2;
    spritey.position.set(-(bbox.max.x - bbox.min.x) * 2, 0, zAxis / 2);
    group.add(spritey);
    
    var spritey = spritey.clone();
    spritey.show = 'right';
    spritey.position.set(xAxis + (bbox.max.x - bbox.min.x) * 2, yAxis, zAxis / 2);
    group.add(spritey);

    for(let i=0;i<=yAxisn;i++){
        var spritey = makeTextSprite(scaleY(i));
        spritey.show = 'left';
        spritey.show1 = 'back';
        var bbox = new THREE.Box3().setFromObject(spritey);
        spritey.position.set(-(bbox.max.x - bbox.min.x), i * ygrid, zAxis + 20);
        spritey.rotation.y = Math.PI / 4;
        group.add(spritey);
        
        var spritey = spritey.clone();
        spritey.show = 'left';
        spritey.show1 = 'back';
        spritey.position.set(xAxis + (bbox.max.x - bbox.min.x), i * ygrid, 0);
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.show = 'right';
        spritey.show1 = 'front';
        spritey.position.set(xAxis + (bbox.max.x - bbox.min.x), i * ygrid, zAxis + 20);
        spritey.rotation.y = -Math.PI / 4;
        group.add(spritey);
        
        var spritey = spritey.clone();
        spritey.show = 'right';
        spritey.show1 = 'front';
        spritey.position.set(-(bbox.max.x - bbox.min.x), i * ygrid, 0);
        group.add(spritey);
    }
    var spritey = makeTextSprite(texty);
    spritey.show = 'left';
    spritey.show1 = 'back';
    var bbox = new THREE.Box3().setFromObject(spritey);
    spritey.position.set(-(bbox.max.x - bbox.min.x) * 2, yAxis / 2, zAxis);
    spritey.rotation.y = Math.PI / 4;
    group.add(spritey);
    
    var spritey = spritey.clone();
    spritey.show = 'left';
    spritey.show1 = 'back';
    spritey.position.set(xAxis + (bbox.max.x - bbox.min.x) * 2, yAxis / 2, 0);
    spritey.rotation.y = Math.PI / 4;
    group.add(spritey);
    
    var spritey = spritey.clone();
    spritey.show = 'right';
    spritey.show1 = 'front';
    spritey.position.set(-(bbox.max.x - bbox.min.x) * 2, yAxis / 2, 0);
    spritey.rotation.y = -Math.PI / 4;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.show = 'right';
    spritey.show1 = 'front';
    spritey.position.set(xAxis + (bbox.max.x - bbox.min.x) * 2, yAxis / 2, zAxis);
    group.add(spritey);

    for(let i=0;i<=xAxisn;i++){
        var spritey = makeTextSprite(scaleX(i));
        spritey.show = 'back';
        var bbox = new THREE.Box3().setFromObject(spritey);
        spritey.position.set(i * xgrid, yAxis, -(bbox.max.y - bbox.min.y));
        spritey.rotation.z = Math.PI / 2;
        spritey.rotation.x = -Math.PI / 3;
        group.add(spritey);

        var spritey = spritey.clone();
        spritey.show = 'back';
        spritey.position.set(i * xgrid, 0, zAxis + (bbox.max.y - bbox.min.y));
        group.add(spritey);
        
        var spritey = spritey.clone();
        spritey.show = 'front';
        spritey.position.set(i * xgrid, 0, -(bbox.max.y - bbox.min.y));
        spritey.rotation.z = Math.PI / 2;
        spritey.rotation.x = -Math.PI * 3 / 4;
        group.add(spritey);
        
        var spritey = spritey.clone();
        spritey.show = 'front';
        spritey.position.set(i * xgrid, yAxis, zAxis + (bbox.max.y - bbox.min.y));
        group.add(spritey);
        
    }
    
    var spritey = makeTextSprite(textx);
    var bbox = new THREE.Box3().setFromObject(spritey);
    spritey.position.set(xAxis / 2, yAxis, -120);
    spritey.show = 'back';
    spritey.rotation.x = -Math.PI / 4;
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.position.set(xAxis / 2, 0, zAxis + 120);
    spritey.show = 'back';
    group.add(spritey);

    var spritey = spritey.clone();
    spritey.show = 'front';
    spritey.position.set(xAxis / 2, 0, -120);
    spritey.rotation.x = Math.PI / 4;
    spritey.rotation.y = Math.PI;
    group.add(spritey);
    
    var spritey = spritey.clone();
    spritey.show = 'front';
    spritey.position.set(xAxis / 2, yAxis, zAxis + 120);
    group.add(spritey);

    // var spritey = makeTextSprite(textx);
    // var bbox = new THREE.Box3().setFromObject(spritey);
    // spritey.position.set(xAxis / 2, 0, zAxis + 120);
    // spritey.rotation.x = -Math.PI / 2;
    // group.add(spritey);

    const geometry1 = createGeometry(new THREE.Vector3(0, 0, zAxis), new THREE.Vector3(0, 0, yAxis));
    // 左边面
    for(let i=0;i<=yAxisn;i++){
        const line = new THREE.Line(geometry1[0], material); 
        line.position.y = i * ygrid; 
        line.show = 'left';
        group.add(line);  
    }
    for(let i=0;i<=zAxisn;i++){
        const line1 = new THREE.Line(geometry1[1], material);  
        line1.position.z = i * zgrid;  
        line1.rotation.x = -Math.PI/2;
        line1.show = 'left';
        group.add(line1);  
    }
    // 右边面
    for(let i=0;i<=yAxisn;i++){
        const line = new THREE.Line(geometry1[0], material); 
        line.position.y = i * ygrid; 
        line.position.x = xAxis;  
        line.show = 'right';
        group.add(line);  
    }
    for(let i=0;i<=zAxisn;i++){
        const line1 = new THREE.Line(geometry1[1], material);  
        line1.position.z = i * zgrid;  
        line1.position.x = xAxis;  
        line1.rotation.x = -Math.PI/2;
        line1.show = 'right';
        group.add(line1);  
    }
    const geometry2 = createGeometry(new THREE.Vector3(xAxis, 0, 0), new THREE.Vector3(zAxis, 0, 0));
    // 底部面
    for(let i=0;i<=zAxisn;i++){
        const line = new THREE.Line(geometry2[0], material); 
        line.position.z = i*zgrid; 
        line.show = 'all';
        group.add(line);  
    }
    for(let i=0;i<=xAxisn;i++){
        const line1 = new THREE.Line(geometry2[1], material);  
        line1.position.x = i*xgrid;  
        line1.rotation.y = -Math.PI/2;  
        line1.show = 'all';
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
    for(let i=0;i<=yAxisn;i++){
        const line = new THREE.Line(geometry3[0], material); 
        line.position.y = i*ygrid;  
        line.show = 'back';
        group.add(line);  
    }
    for(let i=0;i<=xAxisn;i++){
        const line1 = new THREE.Line(geometry3[1], material);  
        line1.position.x = i*xgrid;  
        line1.rotation.z = Math.PI/2;  
        line1.show = 'back';
        group.add(line1);  
    }
    // 前边面
    for(let i=0;i<=yAxisn;i++){
        const line = new THREE.Line(geometry3[0], material); 
        line.position.y = i*ygrid; 
        line.position.z = zAxis; 
        line.show = 'front';
        group.add(line);  
    }
    for(let i=0;i<=xAxisn;i++){
        const line1 = new THREE.Line(geometry3[1], material);  
        line1.position.x = i*xgrid;  
        line1.position.z = zAxis; 
        line1.show = 'front';
        line1.rotation.z = Math.PI/2; 
        group.add(line1);  
    }
}
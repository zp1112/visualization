function drawGrid(options) {
    const { type, zAxis, yAxis, xAxis, xgrid, ygrid, zgrid, group } = options;
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
    if (type === 'left' || type === 'right') {
        const geometry = createGeometry(new THREE.Vector3(0, 0, zAxis), new THREE.Vector3(0, 0, yAxis));
        if (type === 'left') {
            // 左边面
            for(let i=0;i<=yAxisn;i++){
                const line = new THREE.Line(geometry[0], new THREE.LineBasicMaterial({color:0xffffff})); 
                line.position.y = i * ygrid; 
                group.add(line);  
            }
            for(let i=0;i<=zAxisn;i++){
                const line1 = new THREE.Line(geometry[1], new THREE.LineBasicMaterial({color:0xffffff}));  
                line1.position.z = i * zgrid;  
                line1.rotation.x = -Math.PI/2;
                group.add(line1);  
            }
        } else {
            // 右边面
            for(let i=0;i<=yAxisn;i++){
                const line = new THREE.Line(geometry[0], new THREE.LineBasicMaterial({color:0xffffff})); 
                line.position.y = i * ygrid; 
                line.position.x = xAxis;  
                group.add(line);  
            }
            for(let i=0;i<=zAxisn;i++){
                const line1 = new THREE.Line(geometry[1], new THREE.LineBasicMaterial({color:0xffffff}));  
                line1.position.z = i * zgrid;  
                line1.position.x = xAxis;  
                line1.rotation.x = -Math.PI/2;
                group.add(line1);  
            }
        }
    }
    if (type === 'top' || type === 'bottom') {
        const geometry = createGeometry(new THREE.Vector3(xAxis, 0, 0), new THREE.Vector3(zAxis, 0, 0));
        if (type === 'bottom') {
            // 底部面
            for(let i=0;i<=zAxisn;i++){
                const line = new THREE.Line(geometry[0], new THREE.LineBasicMaterial({color:0xffffff})); 
                line.position.z = i*zgrid; 
                group.add(line);  
            }
            for(let i=0;i<=xAxisn;i++){
                const line1 = new THREE.Line(geometry[1], new THREE.LineBasicMaterial({color:0xffffff}));  
                line1.position.x = i*xgrid;  
                line1.rotation.y = -Math.PI/2; 
                group.add(line1);  
            }
        } else {
            // 顶部面
            for(let i=0;i<=zAxisn;i++){
                const line = new THREE.Line(geometry[0], new THREE.LineBasicMaterial({color:0xffffff})); 
                line.position.z = i*zgrid; 
                line.position.y = yAxis; 
                group.add(line);  
            }
            for(let i=0;i<=xAxisn;i++){
                const line1 = new THREE.Line(geometry[1], new THREE.LineBasicMaterial({color:0xffffff}));  
                line1.position.x = i*xgrid;  
                line1.position.y = yAxis; 
                line1.rotation.y = -Math.PI/2; 
                group.add(line1);  
            }
        }
    }
    if (type === 'back' || type === 'front') {
        const geometry = createGeometry(new THREE.Vector3(xAxis, 0, 0), new THREE.Vector3(yAxis, 0, 0));
        if (type === 'back') {
            // 后边面
            for(let i=0;i<=yAxisn;i++){
                const line = new THREE.Line(geometry[0], new THREE.LineBasicMaterial({color:0xffffff})); 
                line.position.y = i*ygrid; 
                group.add(line);  
            }
            for(let i=0;i<=xAxisn;i++){
                const line1 = new THREE.Line(geometry[1], new THREE.LineBasicMaterial({color:0xffffff}));  
                line1.position.x = i*xgrid;  
                line1.rotation.z = Math.PI/2; 
                group.add(line1);  
            }
        } else {
            // 前边面
            for(let i=0;i<=yAxisn;i++){
                const line = new THREE.Line(geometry[0], new THREE.LineBasicMaterial({color:0xffffff})); 
                line.position.y = i*ygrid; 
                line.position.z = zAxis; 
                group.add(line);  
            }
            for(let i=0;i<=xAxisn;i++){
                const line1 = new THREE.Line(geometry[1], new THREE.LineBasicMaterial({color:0xffffff}));  
                line1.position.x = i*xgrid;  
                line1.position.z = zAxis; 
                line1.rotation.z = Math.PI/2; 
                group.add(line1);  
            }
        }
    }
}
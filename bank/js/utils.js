(function () {
    helperMethods = {

        countBy: (arr, fn) => arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => {
            acc[JSON.stringify(val)] = (acc[JSON.stringify(val)] || 0) + 1;
            return acc;
        }, {}),

        makeTextSprite: (message, fontsize = 18) => {
            var ctx, texture, sprite,
                canvas = document.createElement('canvas');
            ctx = canvas.getContext('2d');
            ctx.font = fontsize + "px Arial";

            // setting canvas width/height before ctx draw, else canvas is empty
            canvas.width = ctx.measureText(message).width;
            canvas.height = fontsize; // fontsize * 1.5

            // after setting the canvas width/height we have to re-set font to apply!?! looks like ctx reset
            ctx.font = fontsize + "px Arial";
            ctx.fillStyle = "rgba(255,255,255,1)";
            ctx.fillText(message, 0, fontsize);

            texture = new THREE.Texture(canvas);
            texture.minFilter = THREE.LinearFilter; // NearestFilter;
            texture.needsUpdate = true;

            var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
            texture.needsUpdate = true;//开启纹理更新
            sprite = new THREE.Mesh(
                new THREE.PlaneGeometry(canvas.width, canvas.height),
                material
            );
            return sprite;
        },
        getQuadrant: function (px, py, mx, my) {//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
            var x = Math.abs(px - mx);
            var y = Math.abs(py - my);
            var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            var cos = y / z;
            var radina = Math.acos(cos);//用反三角函数求弧度
            var angle = Math.floor(180 / (Math.PI / radina));//将弧度转换成角度

            if (mx > px && my > py) {//鼠标在第四象限
                angle = 180 - angle;
            }

            if (mx == px && my > py) {//鼠标在y轴负方向上
                angle = 180;
            }

            if (mx > px && my == py) {//鼠标在x轴正方向上
                angle = 90;
            }

            if (mx < px && my > py) {//鼠标在第三象限
                angle = 180 + angle;
            }

            if (mx < px && my == py) {//鼠标在x轴负方向
                angle = 270;
            }

            if (mx < px && my < py) {//鼠标在第二象限
                angle = 360 - angle;
            }
            var quadrant = 1;
            if (angle >= 0 && angle < 90) {
                quadrant = 1;
            }
            if (angle >= 90 && angle < 180) {
                quadrant = 2;
            }
            if (angle >= 180 && angle < 270) {
                quadrant = 3;
            }
            if (angle >= 270 && angle < 360) {
                quadrant = 4;
            }
            return quadrant;
        },
        visiblefunc: function (quadrant1, quadrant2) {
            return function (quadrant) {
                (quadrant == quadrant1 || quadrant == quadrant2) ? this.visible = true : this.visible = false;
            }
        },
        rotationfunc: function (prop, quadrant1, res1, res2) {
            return function (quadrant) {
                this.rotation[prop] = quadrant == quadrant1 ? res1 : res2
            }
        },
        createLineGeometry: function (vector1, vector2) {
            const geometry = new THREE.Geometry();    //创建geometry  
            geometry.vertices.push(new THREE.Vector3(0, 0, 0));  //添加顶点  
            geometry.vertices.push(vector1);
            const geometry1 = new THREE.Geometry();    //创建geometry  
            geometry1.vertices.push(new THREE.Vector3(0, 0, 0));  //添加顶点  
            geometry1.vertices.push(vector2);
            return [geometry, geometry1];
        }
    }
})()
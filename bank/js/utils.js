
const countBy = (arr, fn) => arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => {
    acc[JSON.stringify(val)] = (acc[JSON.stringify(val)] || 0) + 1;
    return acc;
}, {});

const makeTextSprite = (message, fontsize = 28) => {
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
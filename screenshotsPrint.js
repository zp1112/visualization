/**
 * 默认画笔线宽
 * @type {number}
 */
var defaultStrokeWidth = 1; //画矩形选取框的线宽
defaultLonLat = {
  maxlon: 135,
  maxlat: 55,
  minlon: 72,
  minlat: 16
}
function drawRect(instance, lonlat) {
  $("#" + instance.canvasId).removeLayer('areaLayer');
  const leftTop = bmap.pointToOverlayPixel(new BMap.Point(lonlat.minlon, lonlat.maxlat))
  const rightTop = bmap.pointToOverlayPixel(new BMap.Point(lonlat.maxlon, lonlat.maxlat))
  const leftBottom = bmap.pointToOverlayPixel(new BMap.Point(lonlat.minlon, lonlat.minlat))
  const width = rightTop.x - leftTop.x;
  const height = leftBottom.y - leftTop.y;
  
  $("#"+instance.canvasId).addLayer({
      type: 'rectangle',
      strokeStyle: 'red',
      strokeWidth: defaultStrokeWidth,
      name:'areaLayer',
      fromCenter: false,
      x: leftTop.x, y: leftTop.y,
      width: width,
      height: height
  });
  $("#"+instance.canvasId).drawLayers();
  $("#"+instance.canvasId).saveCanvas();
}
function drawRectByWidth(instance, w_h) {
  $("#" + instance.canvasId).removeLayer('areaLayer');
  const width = w_h.endx - w_h.startx;
  const height = w_h.endy - w_h.starty;
  
  $("#"+instance.canvasId).addLayer({
      type: 'rectangle',
      strokeStyle: 'red',
      strokeWidth: defaultStrokeWidth,
      name:'areaLayer',
      fromCenter: false,
      x: w_h.startx, y: w_h.starty,
      width: width,
      height: height
  });
  $("#"+instance.canvasId).drawLayers();
  $("#" + instance.canvasId).saveCanvas();
  const startPoint = bmap.overlayPixelToPoint({ x: w_h.startx, y: w_h.starty });
  const endPoint = bmap.overlayPixelToPoint({ x: w_h.endx, y: w_h.endy });
  $('#minlat').val(Math.min(endPoint.lat, startPoint.lat));
  $('#maxlon').val(Math.max(endPoint.lng, startPoint.lng));
  $('#maxlat').val(Math.max(endPoint.lat, startPoint.lat));
  $('#minlon').val(Math.min(endPoint.lng, startPoint.lng));
}
/**
 * 选取划线的canvasExt
 * @type {{drawRect: canvasExt.drawRect}}
 */
var canvasExt = {
    /**
     *  画矩形
     * @param canvasId canvasId
     * @param penColor 画笔颜色
     * @param strokeWidth 线宽
  */
  drawCustomRect: function (input, instance) {
    const lonlat = {
      minlat: $('#minlat').val() - 0,
      minlon: $('#minlon').val() - 0,
      maxlat: $('#maxlat').val() - 0,
      maxlon: $('#maxlon').val() - 0
    }
    drawRect(instance, lonlat)
  },
  drawCustomRectByWidth: function (input, instance) {
    const w_h = {
      startx: $('#startx').val() - 0,
      starty: $('#starty').val() - 0,
      endx: $('#endx').val() - 0,
      endy: $('#endy').val() - 0
    }
    drawRectByWidth(instance, w_h)
  },
  drawRect: function (bmap, canvasId, penColor, strokeWidth, lonlat) {
    this.bmap = bmap;
    this.canvasId = canvasId;
    const that = this;
    drawRect(this, lonlat)
    $('#minlat').val(lonlat.minlat);
    $('#maxlon').val(lonlat.maxlon);
    $('#maxlat').val(lonlat.maxlat);
    $('#minlon').val(lonlat.minlon);
        that.penColor = penColor;
        that.penWidth = strokeWidth;
        var canvas = document.getElementById(canvasId);
        //canvas 的矩形框
        var canvasRect = canvas.getBoundingClientRect();
        //canvas 矩形框的左上角坐标
        var canvasLeft = canvasRect.left;
        var canvasTop = canvasRect.top;

        // 要画的矩形的起点 xy
        var x = 0;
    var y = 0;
    
    var startPoint, endPoint, startPixel, endPixel;

        //鼠标点击按下事件，画图准备
    canvas.onmousedown = function (e) {
            //设置画笔颜色和宽度
            var color = that.penColor;
            var penWidth = that.penWidth;
            // 确定起点
            x = e.clientX - canvasLeft;
            y = e.clientY - canvasTop;
      startPoint = bmap.overlayPixelToPoint({ x: x, y: y });
      startPixel = {x, y}
            // 添加layer
            $("#"+canvasId).addLayer({
                type: 'rectangle',
                strokeStyle: color,
                strokeWidth: penWidth,
                name:'areaLayer',
                fromCenter: false,
                x: x, y: y,
                width: 1,
                height: 1
            });
            // 绘制
            $("#"+canvasId).drawLayers();
            $("#"+canvasId).saveCanvas();

            //鼠标移动事件，画图
            canvas.onmousemove = function(e){

                // 要画的矩形的宽高
                var width = e.clientX-canvasLeft - x;
                var height = e.clientY-canvasTop - y;

                // 清除之前画的
                $("#"+canvasId).removeLayer('areaLayer');

                $("#"+canvasId).addLayer({
                    type: 'rectangle',
                    strokeStyle: color,
                    strokeWidth: penWidth,
                    name:'areaLayer',
                    fromCenter: false,
                    x: x, y: y,
                    width: width,
                    height: height
                });

                $("#"+canvasId).drawLayers();
            }
        };
        //鼠标抬起
        canvas.onmouseup=function(e){

            var color = that.penColor;
            var penWidth = that.penWidth;

            canvas.onmousemove = null;

            var width = e.clientX - canvasLeft - x;
          var height = e.clientY - canvasTop - y;
          console.log(canvasLeft, canvasTop)
          endPoint = bmap.overlayPixelToPoint({ x: e.clientX - canvasLeft, y: e.clientY - canvasTop });
          endPixel = { x: e.clientX - canvasLeft, y: e.clientY - canvasTop }
            $('#minlat').val(Math.min(endPoint.lat, startPoint.lat));
            $('#maxlon').val(Math.max(endPoint.lng, startPoint.lng));
            $('#maxlat').val(Math.max(endPoint.lat, startPoint.lat));
            $('#minlon').val(Math.min(endPoint.lng, startPoint.lng));
          
            $('#startx').val(startPixel.x);
            $('#starty').val(startPixel.y);
            $('#endx').val(endPixel.x);
            $('#endy').val(endPixel.y);

            $("#"+canvasId).removeLayer('areaLayer');

            $("#"+canvasId).addLayer({
                type: 'rectangle',
                strokeStyle: color,
                strokeWidth: penWidth,
                name:'areaLayer',
                fromCenter: false,
                x: x, y: y,
                width: width,
                height: height
            });

            $("#"+canvasId).drawLayers();
            $("#"+canvasId).saveCanvas();
        }
    }
};

/**
 * 选取截屏
 * @param canvasId
 */
function clipScreenshots(bmap, canvasId){
  canvasExt.drawRect(bmap, canvasId, "red", defaultStrokeWidth, defaultLonLat);
  return canvasExt;
}

/**
 * 打印截取区域
 * @param canvas 截取的canvas
 * @param capture_x 截取的起点x
 * @param capture_y 截取的起点y
 * @param capture_width 截取的起点宽
 * @param capture_height 截取的起点高
 */
function printClip(canvas, capture_x, capture_y, capture_width, capture_height) {
    // 创建一个用于截取的canvas
    var clipCanvas = document.createElement('canvas')
    clipCanvas.width = capture_width
    clipCanvas.height = capture_height
    // 截取
    clipCanvas.getContext('2d').drawImage(canvas, capture_x, capture_y, capture_width, capture_height, 0, 0, capture_width, capture_height)
    var clipImgBase64 = clipCanvas.toDataURL()
    // 生成图片
    var clipImg = new Image()
    clipImg.src = clipImgBase64
    var con = confirm('打印截图吗?取消则保存截图')
    if (con) {
        $(clipImg).print()
    }else {
        downloadIamge(clipImgBase64)
    }
}

/**
 * 下载保存图片
 * @param imgUrl 图片地址
 */
function downloadIamge(imgUrl) {
    // 图片保存有很多方式，这里使用了一种投机的简单方法。
    // 生成一个a元素
    var a = document.createElement('a')
    // 创建一个单击事件
    var event = new MouseEvent('click')
    // 生成文件名称
    var timestamp = new Date().getTime();
    var name = imgUrl.substring(22, 30) + timestamp + '.png';
    a.download = name
    // 将生成的URL设置为a.href属性
    a.href = imgUrl;
    // 触发a的单击事件 开始下载
    a.dispatchEvent(event);
}

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var event = new ht.Notifier();

var dm$1 = new ht.DataModel();
var g2d = window.g2d = new ht.graph.GraphView(dm$1);

ht.Default.xhrLoad('displays/large-screen.json', function (text) {
  var json = ht.Default.parse(text);
  dm$1.deserialize(json);

  g2d.fitContent(1);

  event.fire({ kind: 'displayLoad' });
});

g2d.handleScroll = function () {};
g2d.handlePinch = function () {};
g2d.setPannable(false);

g2d.setInteractors([new ht.graph.MoveInteractor(g2d), new ht.graph.SelectInteractor(g2d), new ht.graph.DefaultInteractor(g2d), new ht.graph.TouchInteractor(g2d)]);

window.addEventListener('resize', function (e) {
  g2d.fitContent();
});

var G = {};

G.rootFontSize = 12;

G.e = new ht.Notifier();

G.setDatasBinding = function (datas, key, value) {
    var children;
    if (datas instanceof ht.Node) {
        datas = new ht.List([datas]);
    }
    for (var i = 0, len = datas.size(); i < len; i++) {

        children = datas.get(i).getChildren();
        if (children.size() > 0) {
            G.setDatasBinding(children, key, value);
        }
        G.setDataBinding(datas.get(i), key, value);
    }
};

G.setDataBinding = function (data, key, value) {
    var dataBinding = data.getDataBindings();
    if (dataBinding) {
        // update attrs
        for (var name in dataBinding.a) {
            var db = dataBinding.a[name];
            if (db.id === key) {
                data.a(name, value);
                return;
            }
        }
        // update styles
        for (var name in dataBinding.s) {
            var db = dataBinding.s[name];
            if (db.id === key) {
                data.s(name, value);
                return;
            }
        }
        // update properties
        for (var name in dataBinding.p) {
            var db = dataBinding.p[name];
            if (db.id === key) {
                data[ht.Default.setter(name)](value);
                return;
            }
        }
    }
};

G.getDataBinding = function (data, key) {
    var dataBinding = data.getDataBindings();
    if (dataBinding) {
        // update attrs
        for (var name in dataBinding.a) {
            var db = dataBinding.a[name];
            if (db.id === key) {
                return data.a(name);
            }
        }
        // update styles
        for (var name in dataBinding.s) {
            var db = dataBinding.s[name];
            if (db.id === key) {
                return data.s(name);
            }
        }
        // update properties
        for (var name in dataBinding.p) {
            var db = dataBinding.p[name];
            if (db.id === key) {
                return data[ht.Default.getter(name)]();
            }
        }
    }
};

G.addClickListener = function (dom, func) {
    dom.addEventListener('click', func);
    dom.addEventListener('touchend', func);
};

var dm = g2d.dm();
var cityHover = void 0;
var lamppost = void 0;
var mapHost = void 0;
var showMap = void 0;
var map = void 0;
var dirty = false;
var inAnimate = false;

event.add(function (e) {
	if (e.kind === 'displayLoad') {
		cityHover = dm.getDataByTag('cityHover');
		lamppost = dm.getDataByTag('lamppost');
		mapHost = dm.getDataByTag('mapHost');
		showMap = dm.getDataByTag('showMap');
		map = dm.getDataByTag('map');

		var boston = dm.getDataByTag('boston');
		showCity(boston);
	}
});

var show = function show() {
	inAnimate = true;

	cityHover.getChildren().get(0).setScale(0, 0);
	cityHover.s('2d.visible', true);
	cityHover.getChildren().get(1).s('2d.visible', false);
	ht.Default.startAnim({
		duration: 300,
		finishFunc: function finishFunc() {
			inAnimate = false;
			cityHover.getChildren().get(1).s('2d.visible', true);
		},
		action: function action(v, t) {
			if (cityHover.s('2d.visible')) {
				cityHover.getChildren().get(0).setScale(v, v);
			}
		}
	});
};

var showCity = function showCity(data) {
	if (inAnimate) return;
	if (data && data.getHost() === map) {
		var cities = map.getAttaches();
		cities.each(function (d) {
			d.s('2d.visible', true);
		});
		cityHover.p(data.getChildAt(1).p());

		dirty = true;
		// TODO 妯℃嫙鏁版嵁
		cityHover.getChildren().get(0).a('city.count', Math.floor(Math.random() * 100));
		var name = data.getChildren().get(0).s('text');
		G.setDatasBinding(cityHover, 'cityName', name);

		show(data);
		data.s('2d.visible', false);
	} else if (data !== cityHover && !lamppost.s('2d.visible')) {
		if (dirty) {
			cityHover.s('2d.visible', false);
			var _cities = map.getAttaches();
			_cities.each(function (d) {
				d.s('2d.visible', true);
			});
			dirty = false;
		}
	}
};

g2d.getView().addEventListener('mousemove', function (e) {
	//mousemove
	var data = g2d.getDataAt(e);
	showCity(data);
});
g2d.getView().addEventListener('touchend', function (e) {
	//touchEnd
	var data = g2d.getDataAt(e);
	showCity(data);
});

G.addClickListener(g2d.getView(), function (e) {
	var target = g2d.getDataAt(e);
	if (target === cityHover) {
		lamppost.s('2d.visible', true);

		cityHover.s('2d.visible', false);
		mapHost.getAttaches().each(function (d) {
			d.s('2d.visible', false);
		});
		map.getAttaches().each(function (d) {
			d.s('2d.visible', false);
		});
		event.fire({ kind: 'showLamppost' });
	} else if (target === showMap || !target && lamppost.s('2d.visible')) {
		lamppost.s('2d.visible', false);

		cityHover.s('2d.visible', true);
		mapHost.getAttaches().each(function (d) {
			d.s('2d.visible', true);
		});
		map.getAttaches().each(function (d) {
			d.s('2d.visible', true);
		});
		event.fire({ kind: 'hideLamppost' });
	}
});

var normalColor = 'rgb(117,175,255)';
var activeColor = 'rgb(224,118,25)';

var discMenu = void 0;
var discMenuHost = void 0;
var graphMenus = void 0;
var activeIndex = 6;

var setActive = function setActive(index) {
	var old = graphMenus.get(activeIndex),
	    oldText = old.getAttaches().get(0),
	    curr = graphMenus.get(index),
	    currText = curr.getAttaches().get(0);

	old.s('shape.border.color', normalColor);
	oldText.s('text.color', normalColor);
	curr.s('shape.border.color', activeColor);
	currText.s('text.color', activeColor);

	activeIndex = index;
	setInfo();
};

function setInfo() {
	var total = Math.floor(Math.random() * 1000),
	    discOnline = Math.floor(Math.random() * total);
	G.setDatasBinding(discMenu, 'discTotal', total);
	G.setDatasBinding(discMenu, 'discOnline', discOnline);
	G.setDatasBinding(discMenu, 'discOffline', total - discOnline);
	G.setDatasBinding(discMenu, 'discFault', Math.floor(Math.random() * 10));
	G.setDatasBinding(discMenu, 'discFault', Math.floor(Math.random() * 10));
	G.setDatasBinding(discMenu, 'discUserCount', discOnline);
	G.setDatasBinding(discMenu, 'discTotalFlow', Math.floor(Math.random() * 300) + "G");
	G.setDatasBinding(discMenu, 'discMaxFlow', Math.floor(Math.random() * 100) + "G");
}

event.add(function (e) {
	if (e.kind === 'displayLoad') {
		discMenu = g2d.dm().getDataByTag('discMenu');
		discMenuHost = g2d.dm().getDataByTag('discMenuHost');
		graphMenus = discMenuHost.getAttaches();
		setActive(activeIndex);
	}
});

g2d.mi(function (e) {
	if (e.kind === 'clickData') {
		var target = e.data;
		if (graphMenus.contains(target) || graphMenus.contains(target.getHost())) {
			var gn = graphMenus.contains(target) ? target : target.getHost();
			setActive(graphMenus.indexOf(gn));
		}
	}
});

var normalColor$1 = 'rgb(176,176,176)';
var activeColor$1 = '#74afff';

var leftMenu = void 0;
var leftMenuHost = void 0;
var graphMenus$1 = void 0;
var activeIndex$1 = -1;

var setActive$1 = function setActive(index) {
	if (activeIndex$1 !== -1) {
		var old = graphMenus$1.get(activeIndex$1),
		    oldText = old.getAttaches().get(0);

		old.s('body.color', null);
		oldText.s('text.color', normalColor$1);
	}

	var curr = graphMenus$1.get(index),
	    currText = curr.getAttaches().get(0);

	curr.s('body.color', activeColor$1);
	currText.s('text.color', activeColor$1);

	activeIndex$1 = index;
};

event.add(function (e) {
	if (e.kind === 'displayLoad') {
		leftMenu = g2d.dm().getDataByTag('leftMenu');
		leftMenuHost = g2d.dm().getDataByTag('leftMenuHost');
		graphMenus$1 = leftMenuHost.getAttaches();
		// setActive(activeIndex);
	}
});

g2d.mi(function (e) {
	if (e.kind === 'clickData') {
		var target = e.data;
		if (graphMenus$1.contains(target) || graphMenus$1.contains(target.getHost())) {
			var gn = graphMenus$1.contains(target) ? target : target.getHost();
			setActive$1(graphMenus$1.indexOf(gn));
		}
	}
});

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var MyEChart = function () {
	function MyEChart(gv, host, option) {
		classCallCheck(this, MyEChart);

		var div = this.div = document.createElement('div');
		this.gv = gv;
		this.host = host;

		div.style.position = 'absolute';
		div.style.boxSizing = 'border-box';
		div.style.zIndex = 100;
		gv.getView().appendChild(div);

		this.chart = echarts.init(div);
		if (option) {
			this.chart.setOption(option);
		}
		gv.fitContent();
		this.layout();

		gv.mp(this.layout, this);
	}

	createClass(MyEChart, [{
		key: 'layout',
		value: function layout() {
			var gv = this.gv,
			    host = this.host,
			    div = this.div,
			    zoom = gv.getZoom(),
			    tx = gv.tx(),
			    ty = gv.ty(),
			    rect = host.getRect(),
			    x = void 0,
			    y = void 0;


			rect.x *= zoom;
			rect.y *= zoom;
			rect.width *= zoom;
			rect.height *= zoom;

			x = rect.x + tx;
			y = rect.y + ty;

			div.style.width = rect.width + 'px';
			div.style.height = rect.height + 'px';
			div.style.left = x + 'px';
			div.style.top = y + 'px';

			this.chart.resize();
		}
	}, {
		key: 'setOption',
		value: function setOption(o) {
			this.chart.setOption(o);
		}
	}, {
		key: 'hide',
		value: function hide() {
			this.div.style.display = 'none';
		}
	}, {
		key: 'show',
		value: function show() {
			this.div.style.display = 'block';
		}
	}]);
	return MyEChart;
}();

var dataLen = 10;
var zoom = g2d.getZoom();
var areaChartNode = void 0;
var myChart = void 0;

var option = {
    color: ['rgb(47,112,250)', 'rgb(224,118,25)'],
    textStyle: {
        color: 'rgb(145,145,145)'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        show: true,
        left: '80%',
        right: 0,
        top: '30%',
        orient: 'vertical',
        data: ['瑙傛棩璺�', '鏈涙捣璺�'],
        textStyle: {
            color: 'rgb(145,145,145)',
            fontSize: G.rootFontSize * zoom
        }
    },
    grid: {
        left: '3%',
        right: '20%',
        bottom: 0,
        top: '5%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: function () {
            var res = [];
            for (var i = 1; i <= dataLen; i++) {
                res.push(i);
            }
            return res;
        }(),
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: {}
    }],
    yAxis: [{
        type: 'value',
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: {}
    }],
    series: [{
        name: '瑙傛棩璺�',
        type: 'line',
        smooth: true,
        areaStyle: {
            normal: {
                color: 'rgba(27,85,245,0.40)'
            }
        },
        data: [120, 132, 101, 134, 90, 230, 210, 399, 499, 599]
    }, {
        name: '鏈涙捣璺�',
        type: 'line',
        smooth: true,
        areaStyle: {
            normal: {
                color: 'rgba(252,209,134,0.40)'
            }
        },
        data: [220, 182, 191, 234, 290, 330, 310, 200, 540, 100]
    }]
};
var appendData = function appendData() {
    var grl = option.series[0].data,
        whl = option.series[1].data,
        xAxisData = option.xAxis[0].data;
    grl.shift();
    grl.push(Math.floor(Math.random() * 600));
    whl.shift();
    whl.push(Math.floor(Math.random() * 600));

    xAxisData.shift();
    xAxisData.push(++dataLen);
    myChart.setOption(option);
};
var startInterval = function startInterval() {
    // return;
    // console.log(requestAnimFrame);
    // if (window.requestAnimationFrame) {

    // }
    // else {
    setInterval(function () {
        appendData();
    }, 1200);
    // }
};

event.add(function (e) {
    if (e.kind === 'displayLoad') {
        areaChartNode = g2d.dm().getDataByTag('areaChart');
        myChart = new MyEChart(g2d, areaChartNode, option);
        startInterval();
    }

    if (e.kind === 'showLamppost') {
        myChart.hide();
    }
    if (e.kind === 'hideLamppost') {
        myChart.show();
    }
});
var resetFontSize = function resetFontSize(newValue) {
    if (myChart) {
        var size = newValue * G.rootFontSize;
        option.legend.textStyle.fontSize = size;
        option.textStyle.fontSize = size;
        option.xAxis[0].axisLabel.fontSize = size;
        option.yAxis[0].axisLabel.fontSize = size;

        myChart.setOption(option);
    }
};
g2d.mp(function (e) {
    if (e.property === 'zoom') {
        resetFontSize(e.newValue);
    }
});
G.e.add(function (e) {
    if (e === 'init') {
        resetFontSize(g2d.getZoom());
    }
});

var messageTable = void 0;
var ty = 57;
var lineHeight = 19;
var no = 0;

var data = [];

var addDataToTable = function addDataToTable() {
	data.push({
		"no": function () {
			no++;
			if (no < 10) return '00' + no;else if (no < 100) return '0' + no;else return no;
		}(),
		"intro": 'Boston\u80FD\u5C55\u533A\u706F' + Math.floor(Math.random() * 10000) + '-LED\u901A\u8BAF\u6545\u969C\u89E3\u9664',
		"time": "2017.10.20",
		"local": "./symbols/local.json"
	});

	messageTable.a('table.dataSource', JSON.stringify(data));
};

var clearOut = function clearOut() {
	// 娓呴櫎瓒呭嚭杈圭晫鐨�
	ty = 0;
	data.shift();
	messageTable.a('table.translate.y', ty);
	messageTable.a('table.dataSource', JSON.stringify(data));
};

var startInterval$1 = function startInterval() {
	setInterval(function () {
		if (Math.random() > 0.3) {
			addDataToTable();
		}
	}, 1000);

	setInterval(function () {
		if (data.length * lineHeight + ty > lineHeight * 4) {
			if (ty < 0) {
				clearOut();
			}
			ht.Default.startAnim({
				frames: 20,
				interval: 10,
				finishFunc: function finishFunc() {
					ty -= lineHeight;
				},
				action: function action(v, t) {
					messageTable.a('table.translate.y', ty - lineHeight * v);
				}
			});
		}
	}, 3000);
};

event.add(function (e) {
	if (e.kind === 'displayLoad') {
		messageTable = g2d.dm().getDataByTag('messageTable');
		messageTable.a('table.translate.y', ty);

		startInterval$1();
	}
});

window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
}();

g2d.addToDOM();

setTimeout(function () {
    G.e.fire('init');
}, 300);

})));
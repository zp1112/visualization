<template>
  <h1>
    <div id="map"></div>
  </h1>
</template>
<script>
import coordtransform from "coordtransform";
import baiduJson from "../../static/data.json";
import JianYe from "../../static/jy.json";

export default {
  name: "App",
  mounted() {
    // const map = new BMap.Map("map");
    // const point = new BMap.Point(118.732688, 32.004538); // 创建点坐标
    // map.centerAndZoom(point, 15);
    // console.table(this.points, baiduJson.features[0].geometry.coordinate);
    this.$echarts.registerMap("ls", baiduJson);
    const myChart = this.$echarts.init(document.getElementById("map"));
    const option = {
      // backgroundColor: '#404a59',
      title: {
        text: "建邺区",
        subtext: "整体区域范围",
        left: "center",
        textStyle: {
          color: "#fff"
        }
      },
      tooltip: {
        trigger: "item"
      },
      bmap: {
        center: [118.732688, 32.004538],
        zoom: 13,
        roam: true,
        mapStyle: {
          styleJson: this.mapStyle

          //  [

          //   {
          //     featureType: "water",
          //     elementType: "all",
          //     stylers: {
          //       color: "#044161"
          //     }
          //   },
          //   {
          //     featureType: "land",
          //     elementType: "all",
          //     stylers: {
          //       color: "#004981"
          //     }
          //   },
          //   {
          //     featureType: "boundary",
          //     elementType: "geometry",
          //     stylers: {
          //       color: "#064f85"
          //     }
          //   },
          //   {
          //     featureType: "railway",
          //     elementType: "all",
          //     stylers: {
          //       visibility: "off"
          //     }
          //   },
          //   {
          //     featureType: "highway",
          //     elementType: "geometry",
          //     stylers: {
          //       color: "#004981"
          //     }
          //   },
          //   {
          //     featureType: "highway",
          //     elementType: "geometry.fill",
          //     stylers: {
          //       color: "#005b96",
          //       lightness: 1
          //     }
          //   },
          //   {
          //     featureType: "highway",
          //     elementType: "labels",
          //     stylers: {
          //       visibility: "off"
          //     }
          //   },
          //   {
          //     featureType: "arterial",
          //     elementType: "geometry",
          //     stylers: {
          //       color: "#004981"
          //     }
          //   },
          //   {
          //     featureType: "arterial",
          //     elementType: "geometry.fill",
          //     stylers: {
          //       color: "#00508b"
          //     }
          //   },
          //   {
          //     featureType: "poi",
          //     elementType: "all",
          //     stylers: {
          //       visibility: "off"
          //     }
          //   },
          //   {
          //     featureType: "green",
          //     elementType: "all",
          //     stylers: {
          //       color: "#056197",
          //       visibility: "off"
          //     }
          //   },
          //   {
          //     featureType: "subway",
          //     elementType: "all",
          //     stylers: {
          //       visibility: "off"
          //     }
          //   },
          //   {
          //     featureType: "manmade",
          //     elementType: "all",
          //     stylers: {
          //       visibility: "off"
          //     }
          //   },
          //   {
          //     featureType: "local",
          //     elementType: "all",
          //     stylers: {
          //       visibility: "off"
          //     }
          //   },
          //   {
          //     featureType: "arterial",
          //     elementType: "labels",
          //     stylers: {
          //       visibility: "off"
          //     }
          //   },
          //   {
          //     featureType: "boundary",
          //     elementType: "geometry.fill",
          //     stylers: {
          //       color: "#029fd4"
          //     }
          //   },
          //   {
          //     featureType: "building",
          //     elementType: "all",
          //     stylers: {
          //       color: "#1a5787"
          //     }
          //   },
          //   {
          //     featureType: "label",
          //     elementType: "all",
          //     stylers: {
          //       visibility: "off"
          //     }
          //   }
          // ]
        }
      },
      series: [
        {
          type: "lines",
          polyline: true,
          coordinateSystem: "bmap",
          lineStyle: {
            width: 4,
            opacity: 0.7,
            color: "#bda29a"
          },
          data: this.convert(baiduJson.features[0].geometry.coordinates, 1)
        },
        {
          type: "lines",
          polyline: true,
          coordinateSystem: "bmap",
          lineStyle: {
            width: 2,
            opacity: 0.7,
            color: "red"
          },
          data: this.convert(JianYe.features[0].geometry.coordinates, 2)
        },
        {
          type: "lines",
          polyline: true,
          coordinateSystem: "bmap",
          lineStyle: {
            width: 2,
            opacity: 0.7,
            color: "yellow"
          },
          data: this.convert(JianYe.features[1].geometry.coordinates, 2)
        },
        {
          type: "lines",
          polyline: true,
          coordinateSystem: "bmap",
          lineStyle: {
            width: 2,
            opacity: 0.7,
            color: "green"
          },
          data: this.convert(JianYe.features[2].geometry.coordinates, 2)
        },
        {
          type: "lines",
          polyline: true,
          coordinateSystem: "bmap",
          lineStyle: {
            width: 2,
            opacity: 0.7,
            color: "white"
          },
          data: this.convert(JianYe.features[3].geometry.coordinates, 2)
        }
      ]
    };
    myChart.setOption(option);
    // setTimeout(() => {
    //   const BlSpan = document.querySelector(".anchorBL>span");
    //   BlSpan.style.display = "none";
    //   const BL = document.querySelector(".anchorBL");
    //   BL.style.display = "none";
    // }, 500);
    // const mapArr = this.map.split(" ");
    // const mapData = [];
    // mapArr.forEach((item, index) => {
    //   let newData = [];
    //   newData.push(parseFloat());
    // });
  },
  data() {
    return {
      mapStyle: [
        {
          featureType: "water",
          elementType: "all",
          stylers: {
            color: "#031628"
          }
        },
        {
          featureType: "land",
          elementType: "geometry",
          stylers: {
            color: "#000102"
          }
        },
        {
          featureType: "highway",
          elementType: "all",
          stylers: {
            visibility: "off"
          }
        },
        {
          featureType: "arterial",
          elementType: "geometry.fill",
          stylers: {
            color: "#000000"
          }
        },
        {
          featureType: "arterial",
          elementType: "geometry.stroke",
          stylers: {
            color: "#0b3d51"
          }
        },
        {
          featureType: "local",
          elementType: "geometry",
          stylers: {
            color: "#000000"
          }
        },
        {
          featureType: "railway",
          elementType: "geometry.fill",
          stylers: {
            color: "#000000"
          }
        },
        {
          featureType: "railway",
          elementType: "geometry.stroke",
          stylers: {
            color: "#08304b"
          }
        },
        {
          featureType: "subway",
          elementType: "geometry",
          stylers: {
            lightness: -70
          }
        },
        {
          featureType: "building",
          elementType: "geometry.fill",
          stylers: {
            color: "#000000"
          }
        },
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: {
            color: "#857f7f"
          }
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: {
            color: "#000000"
          }
        },
        {
          featureType: "building",
          elementType: "geometry",
          stylers: {
            color: "#022338"
          }
        },
        {
          featureType: "green",
          elementType: "geometry",
          stylers: {
            color: "#062032"
          }
        },
        {
          featureType: "boundary",
          elementType: "all",
          stylers: {
            color: "#465b6c"
          }
        },
        {
          featureType: "manmade",
          elementType: "all",
          stylers: {
            color: "#022338"
          }
        },
        {
          featureType: "label",
          elementType: "all",
          stylers: {
            visibility: "off"
          }
        }
      ],
      points: [],
      map: ""
    };
  },
  methods: {
    convert(data, type) {
      const points = [];
      data[0].forEach(item => {
        // this.points.push(coordtransform.bd09togcj02(...item));
        if (type === 1) {
          points.push(coordtransform.gcj02tobd09(...item));
        } else {
          let wgs84 = "";
          wgs84 = coordtransform.wgs84togcj02(...item);
          console.log("gs84", coordtransform.gcj02tobd09(...wgs84));
          points.push(coordtransform.gcj02tobd09(...wgs84));
        }
      });
      const newPoints = [];
      newPoints[0] = points;

      return newPoints;
    },
    translateCallback() {
      // console.log(data);
    }
  }
};
</script>
<style scoped>
html,
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 16px;
}
#map {
  width: 1024px;
  height: 1024px;
  margin: 0 auto;
}
.anchorBL {
  display: none !important;
}

.BMap_cpyCtrl {
  display: none;
}
</style>

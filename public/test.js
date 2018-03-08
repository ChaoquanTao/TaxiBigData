<!-- 重点参数：renderOptions，pathLinePassedStyle -->
<!doctype html>
<html lang="zh-CN">

<head>
    <!-- 原始地址：//webapi.amap.com/ui/1.0/ui/misc/PathSimplifier/examples/only-passed.html -->
    <base href="//webapi.amap.com/ui/1.0/ui/misc/PathSimplifier/examples/" />
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <title>仅展示驶过线</title>
    <style>
    html,
    body,
    #container {
        width: 100%;
        height: 100%;
        margin: 0px;
    }

    #loadingTip {
        position: absolute;
        z-index: 9999;
        top: 0;
        left: 0;
        padding: 3px 10px;
        background: red;
        color: #fff;
        font-size: 14px;
    }
    </style>
</head>

<body>
    <div id="container"></div>
    <script type="text/javascript" src='//webapi.amap.com/maps?v=1.4.4&key=您申请的key值'></script>
    <!-- UI组件库 1.0 -->
    <script src="//webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
    <script type="text/javascript">
    //创建地图
    var map = new AMap.Map('container', {
        zoom: 4
    });

    AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {

        if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
        }

        var emptyLineStyle = {
            lineWidth: 0,
            fillStyle: null,
            strokeStyle: null,
            borderStyle: null
        };

        var pathSimplifierIns = new PathSimplifier({
            zIndex: 100,
            //autoSetFitView:false,
            map: map, //所属的地图实例

            getPath: function(pathData, pathIndex) {

                return pathData.path;
            },
            getHoverTitle: function(pathData, pathIndex, pointIndex) {

                return null;
            },
            renderOptions: {
                //将点、线相关的style全部置emptyLineStyle
                pathLineStyle: emptyLineStyle,
                pathLineSelectedStyle: emptyLineStyle,
                pathLineHoverStyle: emptyLineStyle,
                keyPointStyle: emptyLineStyle,
                startPointStyle: emptyLineStyle,
                endPointStyle: emptyLineStyle,
                keyPointHoverStyle: emptyLineStyle,
                keyPointOnSelectedPathLineStyle: emptyLineStyle
            }
        });

        window.pathSimplifierIns = pathSimplifierIns;

        pathSimplifierIns.setData([{
            name: '测试',
            path: [
                [116.405289, 39.904987],
                [113.964458, 40.54664],
                [111.47836, 41.135964],
                [108.949297, 41.670904],
                [106.380111, 42.149509],
                [103.774185, 42.56996],
                [101.135432, 42.930601],
                [98.46826, 43.229964],
                [95.777529, 43.466798],
                [93.068486, 43.64009],
                [90.34669, 43.749086],
                [87.61792, 43.793308]
            ]
        }]);

        //initRoutesContainer(d);

        function onload() {
            pathSimplifierIns.renderLater();
        }

        function onerror(e) {
            alert('图片加载失败！');
        }

        var navg1 = pathSimplifierIns.createPathNavigator(0, {
            loop: true,
            speed: 1000000,
            pathNavigatorStyle: {
                width: 24,
                height: 24,
                //使用图片
                content: PathSimplifier.Render.Canvas.getImageContent('./imgs/plane.png', onload, onerror),
                strokeStyle: null,
                fillStyle: null,
                //经过路径的样式
                pathLinePassedStyle: {
                    lineWidth: 6,
                    strokeStyle: 'black',
                    dirArrowStyle: {
                        stepSpace: 15,
                        strokeStyle: 'red'
                    }
                }
            }
        });

        navg1.start();

    });
    </script>
</body>

</html>
import React, { Component } from 'react';

export default class MakeChart extends Component {

  // create chart, init
  static create(chartId, divId, layout, data) {
    // rMateChart 를 생성합니다.
    window.rMateChartH5.create(chartId, divId, "", "100%", "100%");
    //rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
    window.rMateChartH5.calls(chartId, {
        "setLayout" : layout,
        "setData" : data
    });
  }

  //server performance - cpu chart layout
  static cpuLayoutStr =
    '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
        +'<Options>'
           +'<Caption text="Total CPU" fontWeight="bold"/>'
            +'<SubCaption text="( % )" textAlign="right" />'
          +'<Legend />'
      +'</Options>'
      +'<NumberFormatter id="numfmt" useThousandsSeparator="true"/>'
         +'<Area2DChart showDataTips="true" dataTipDisplayMode="axis">'
            +'<horizontalAxis>'
                +'<CategoryAxis id="hAxis" categoryField="xValue" padding="0.5"/>'
             +'</horizontalAxis>'
           +'<verticalAxis>'
              +'<LinearAxis formatter="{numfmt}"/>'
              +'<LinearAxis id="vAxis" minimum="0" interval="10"/>'
              /* BrokenAxis를 설정 하시려면 해당 축이 설정될 곳에 BrokenAxis를 설정하십시오. */
             // +'<BrokenAxis id="vAxis" brokenMinimum="10" brokenMaximum="90" maximum="100" brokenRatio="0.8" formatter="{numfmt}" />'
              //+'<BrokenAxis id="vAxis" formatter="{numfmt}" />'
               /* brokenMinimum - Broken축이 시작될 값 입니다. */
               /* brokenMaximum - Broken축이 끝날 값 입니다. */
                /* brokenRatio - Broken축이 그려질 위치 값입니다. 0 ~ 1이 유효값이며 0에 가까울수록 축의 최소값에 가까워지며 */
               /* 1에 가까워질수록 축의 최대값에 가까워집니다. */
          +'</verticalAxis>'
        /*  +'<verticalAxisRenderers>'
                            +'<BrokenAxis2DRenderer axis="{vAxis}"/>'
                         /* BrokenAxis를 사용할 경우에는 BrokenAxis2DRenderer를 설정해야 합니다. */
                          /* 이 외의 렌더러를 설정할 경우 올바르게 표현이 되지 않습니다. */
                      //  +'</verticalAxisRenderers>'
             +'<series>'
                +'<Area2DSeries yField="totalCpu" displayName="Cpu Utilization">'
                +'<areaStroke>'
                       +'<Stroke color="#FF4955" weight="3"/>'
                   +'</areaStroke>'
                  +'<areaFill>'
                     +'<SolidColor color="#FF4955" alpha="0.5"/>'
                 +'</areaFill>'
                 +'<showDataEffect>' 
                        +'<SeriesInterpolate/>'
                    +'</showDataEffect>'
               +'</Area2DSeries>'
             +'</series>'
             +'<annotationElements>'
                    +'<CrossRangeZoomer enableZooming="false" horizontalStrokeEnable="false"/>'
                +'</annotationElements>'
             + '<horizontalAxisRenderers>'
               + '<Axis2DRenderer axis="{hAxis}" canDropLabels="true" showLine="true"/>'
             + '</horizontalAxisRenderers>'
       +'</Area2DChart>'
   +'</rMateChart>';

   //server performance - cpu chart layout
   //horizontalLabelFormatter="{numfmt}"
   static core1LayoutStr =
   '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
        +'<Options>'
            +'<Caption text="Core 1"  fontWeight="bold"/>'
            +'<SubCaption text="( % )" textAlign="right" />'
          //+'<Legend />'
      +'</Options>'
      +'<NumberFormatter id="numfmt" useThousandsSeparator="true"/>'
         +'<Area2DChart showDataTips="true" dataTipDisplayMode="axis">'
            +'<horizontalAxis>'
                +'<CategoryAxis id="hAxis" categoryField="xValue" padding="0.5"/>'
             +'</horizontalAxis>'
           +'<verticalAxis>'
              +'<LinearAxis formatter="{numfmt}"/>'
              +'<LinearAxis id="vAxis" interval="10" minimum="0"/>'
          +'</verticalAxis>'
             +'<series>'
                +'<Area2DSeries yField="core" displayName="Cpu Utilization">'
                +'<areaStroke>'
                       +'<Stroke color="#9669a3" weight="3"/>'
                   +'</areaStroke>'
                  +'<areaFill>'
                     +'<SolidColor color="#9669a3" alpha="0.5"/>'
                 +'</areaFill>'
                 +'<showDataEffect>' 
                 +'<SeriesInterpolate/>'
             +'</showDataEffect>'
               +'</Area2DSeries>'
             +'</series>'
            /* +'<annotationElements>'
                       +'<CrossRangeZoomer zoomType="horizontal" fontSize="11" color="#FFFFFF"  verticalLabelPlacement="bottom" horizontalLabelPlacement="left" enableZooming="false" enableCrossHair="true">'
                        +'</CrossRangeZoomer>'
                    +'</annotationElements>'*/
                    /*+'<annotationElements>'
                    +'<CrossRangeZoomer enableZooming="false" horizontalStrokeEnable="false"/>'
                +'</annotationElements>'*/
             + '<horizontalAxisRenderers>'
               + '<Axis2DRenderer axis="{hAxis}" canDropLabels="true" showLine="true"/>'
             + '</horizontalAxisRenderers>'
       +'</Area2DChart>'
   +'</rMateChart>';
   
   


static core2LayoutStr =
   '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
         +'<Options>'
              +'<Caption text="Core 2"  fontWeight="bold"/>'
             +'<SubCaption text="( % )" textAlign="right" />'
           //+'<Legend />'
       +'</Options>'
       +'<NumberFormatter id="numfmt" useThousandsSeparator="true"/>'
          +'<Combination2DChart showDataTips="true" dataTipDisplayMode="axis">'
             +'<horizontalAxis>'
                 +'<CategoryAxis categoryField="xValue" padding="0.5"/>'
              +'</horizontalAxis>'
            +'<verticalAxis>'
               +'<LinearAxis formatter="{numfmt}"/>'
               +'<LinearAxis id="vAxis" interval="10" minimum="0"/>'
           +'</verticalAxis>'
              +'<series>'
                 +'<Area2DSeries yField="core" displayName="Cpu Utilization">'
                 +'<areaStroke>'
                        +'<Stroke color="#7f242a" weight="3"/>'
                    +'</areaStroke>'
                   +'<areaFill>'
                      +'<SolidColor color="#7f242a" alpha="0.5"/>'
                  +'</areaFill>'
                  +'<showDataEffect>' 
                        +'<SeriesInterpolate/>'
                    +'</showDataEffect>'
                +'</Area2DSeries>'
              +'</series>'
        +'</Combination2DChart>'
    +'</rMateChart>';




static core3LayoutStr =
    '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
          +'<Options>'
             +'<Caption text="Core 3"  fontWeight="bold"/>'
              //+'<SubCaption text="CPU Utilization ( % )" textAlign="right"/>'
            //+'<Legend />'
        +'</Options>'
        +'<NumberFormatter id="numfmt" useThousandsSeparator="true"/>'
           +'<Combination2DChart showDataTips="true" dataTipDisplayMode="axis">'
              +'<horizontalAxis>'
                  +'<CategoryAxis categoryField="xValue" padding="0.5"/>'
               +'</horizontalAxis>'
             +'<verticalAxis>'
                +'<LinearAxis formatter="{numfmt}"/>'
                +'<LinearAxis id="vAxis" interval="10" minimum="0"/>'
            +'</verticalAxis>'
               +'<series>'
                  +'<Area2DSeries yField="core" displayName="Cpu Utilization">'
                  +'<areaStroke>'
                         +'<Stroke color="#69965c" weight="3"/>'
                     +'</areaStroke>'
                    +'<areaFill>'
                       +'<SolidColor color="#69965c" alpha="0.5"/>'
                   +'</areaFill>'
                   +'<showDataEffect>' 
                   +'<SeriesInterpolate/>'
               +'</showDataEffect>'
                 +'</Area2DSeries>'
               +'</series>'
         +'</Combination2DChart>'
     +'</rMateChart>';


static core4LayoutStr =
                  '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
                        +'<Options>'
                           +'<Caption text="Core 4"  fontWeight="bold"/>'
                            //+'<SubCaption text="( % )" textAlign="right" paddingBottom="-5"/>'
                      +'</Options>'
                      +'<NumberFormatter id="numfmt" useThousandsSeparator="true"/>'
                         +'<Combination2DChart showDataTips="true" dataTipDisplayMode="axis">'
                            +'<horizontalAxis>'
                                +'<CategoryAxis categoryField="xValue" padding="0.5"/>'
                             +'</horizontalAxis>'
                           +'<verticalAxis>'
                              +'<LinearAxis formatter="{numfmt}"/>'
                              +'<LinearAxis id="vAxis" interval="10" minimum="0"/>'
                          +'</verticalAxis>'
                             +'<series>'
                                +'<Area2DSeries yField="core" displayName="Cpu Utilization">'
                                +'<areaStroke>'
                                       +'<Stroke color="#5587a2" weight="3"/>'
                                   +'</areaStroke>'
                                  +'<areaFill>'
                                     +'<SolidColor color="#5587a2" alpha="0.5"/>'
                                 +'</areaFill>'
                                 +'<showDataEffect>' 
                        +'<SeriesInterpolate/>'
                    +'</showDataEffect>'
                               +'</Area2DSeries>'
                             +'</series>'
                       +'</Combination2DChart>'
                   +'</rMateChart>';


  //server performance - memory chart layout1
  static memoryLayoutStr1 =
    '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
        +'<Options>'
           +'<Caption text="Used Memory"  fontWeight="bold"/>'
            +'<SubCaption text="Total Memory ( KB )" textAlign="right" />'
          +'<Legend />'
      +'</Options>'
      +'<NumberFormatter id="numfmt" useThousandsSeparator="true"/>'
         +'<Area2DChart showDataTips="true" dataTipDisplayMode="axis">'
            +'<horizontalAxis>'
                +'<CategoryAxis id="hAxis" categoryField="xValue" padding="0.5"/>'
             +'</horizontalAxis>'
           +'<verticalAxis>'
              +'<LinearAxis formatter="{numfmt}"/>'
              +'<LinearAxis id="vAxis" ';

  //server performance - memory chart layout2
  static memoryLayoutStr2 =
    ' minimum="0"/>'
          +'</verticalAxis>'
             +'<series>'
                +'<Area2DSeries yField="memory" displayName="Used Memory">'
                +'<areaStroke>'
                       +'<Stroke color="#6FA6E7" weight="3"/>'
                   +'</areaStroke>'
                  +'<areaFill>'
                     +'<SolidColor color="#6FA6E7" alpha="0.5"/>'
                 +'</areaFill>'
                 +'<showDataEffect>' 
                 +'<SeriesInterpolate/>'
             +'</showDataEffect>'
               +'</Area2DSeries>'
             +'</series>'
             +'<annotationElements>'
                    +'<CrossRangeZoomer enableZooming="false" horizontalStrokeEnable="false"/>'
                +'</annotationElements>'
             + '<horizontalAxisRenderers>'
               + '<Axis2DRenderer axis="{hAxis}" canDropLabels="true" showLine="true"/>'
             + '</horizontalAxisRenderers>'
       +'</Area2DChart>'
   +'</rMateChart>';

  //server performance - network chart layout
  static networkLayoutStr =
    '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
        +'<Options>'
           +'<Caption text="Network I/O"  fontWeight="bold"/>'
            +'<SubCaption text="" textAlign="right" />'
          +'<Legend position="bottom"  width="200" height="25"/>'
      +'</Options>'
      +'<NumberFormatter id="numfmt" useThousandsSeparator="true"/>'
         +'<Area2DChart showDataTips="true" dataTipDisplayMode="axis">'
            +'<horizontalAxis>'
                +'<CategoryAxis id="hAxis" categoryField="xValue" padding="0.5"/>'
             +'</horizontalAxis>'
           +'<verticalAxis>'
              +'<LinearAxis formatter="{numfmt}"/>'
              +'<LinearAxis id="vAxis" interval="100"/>'
          +'</verticalAxis>'
             +'<series>'
                +'<Area2DSeries yField="in" displayName="Network In">'
                +'<areaStroke>'
                       +'<Stroke color="#B56EE8" weight="3"/>'
                   +'</areaStroke>'
                  +'<areaFill>'
                     +'<SolidColor color="#B56EE8" alpha="0.5"/>'
                 +'</areaFill>'
                 +'<showDataEffect>' 
                 +'<SeriesInterpolate/>'
             +'</showDataEffect>'
               +'</Area2DSeries>'
               +'<Area2DSeries yField="out" displayName="Network Out">'
               +'<areaStroke>'
                      +'<Stroke color="#73E4E7" weight="3"/>'
                  +'</areaStroke>'
                 +'<areaFill>'
                    +'<SolidColor color="#73E4E7" alpha="0.5"/>'
                +'</areaFill>'
                +'<showDataEffect>' 
                +'<SeriesInterpolate/>'
            +'</showDataEffect>'
              +'</Area2DSeries>'
             +'</series>'
             +'<annotationElements>'
                    +'<CrossRangeZoomer enableZooming="false" horizontalStrokeEnable="false"/>'
                +'</annotationElements>'
             + '<horizontalAxisRenderers>'
               + '<Axis2DRenderer axis="{hAxis}" canDropLabels="true" showLine="true"/>'
             + '</horizontalAxisRenderers>'
       +'</Area2DChart>'
   +'</rMateChart>';

   static mCpuLayoutStr =
  /* '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
   +'<Options>'
      +'<Caption text="Mosquitto (CPU)"/>'
       /*+'<SubCaption text="클릭한 파이차트 조각은 모두 삐져나옵니다.(Layout 참고)" fontSize="11" textAlign="right" paddingRight="10"/>'*/
   /*   +'<Legend useVisibleCheck="true"/>'
   +'</Options>'
 +'<CurrencyFormatter id="numFmt" currencySymbol="" alignSymbol="left"/>'
 +'<Pie2DChart showDataTips="true">'
/*
Pie2D 차트 생성시에 필요한 Pie2DChart 정의합니다
showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
explodingAlone : 클릭 시 쪼개져 나오는 파이 조각이 항상 1개인지 여부를 나타냅니다.
*/
   /*   +'<series>'
           /* startAngle : 첫번째 데이터가 표현되는 파이 조각이 기본으로 3시 방향입니다.
         90도 반시계 방향으로 회전하여 12시 방향을 시작점으로 설정합니다. */
           /* perWedgeExplodeRadius : 파이 조각을 삐져나오게 하는 역할을 합니다.
         5번째 파이 조각이 삐져 나오게 설정되었습니다. 만약 2, 7 번째 파이 조각이 삐져나오게 설정하려면
             perWedgeExplodeRadius="[0,0.1,0,0,0,0,0.1]" 로 설정하면 됩니다.*/
     /*     +'<Pie2DSeries nameField="name" field="value" perWedgeExplodeRadius="[0.1,0]" labelPosition="inside" formatter="{numFmt}" color="#ffffff" renderDirection="counterClockwise" startAngle="90">'
           /* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
      /*     +'<fills>'
            +'<SolidColor color="#AAAAAA"/>'
            +'<SolidColor color="#FF4955"/>'
                  
            +'</fills>'
          +'</Pie2DSeries>'
     +'</series>'
  +'</Pie2DChart>'
+'</rMateChart>';*/

'<rMateChart>'
+'<Options>'
  +'<Caption text="Mosquitto"  fontWeight="bold"/>'
   //+'<SubCaption text="CPU Utilization" fontSize="13" textAlign="center" paddingTop="2" color="#888888"/>'

+'</Options>'
+'<CurrencyFormatter id="cft" currencySymbol="%" precision="0" alignSymbol="right"/>'
/*
* showDataTip : 툴팁 출력 설정
* minimum : 게이지 최소 값
* maximum : 게이지 최대 값
* startAngle : 시작 각도
* minimumAngle : 게이지 최소 각도
* maximumAngle : 게이지 최대 각도
* gaugeWidth : 게이지 가로 크기
* gaugeHeight : 게이지 세로 크기
* innerRatio : 안쪽 영역 비율 값, 유효 값 0 ~ 1
* outerRatio : 바깥쪽 영역 비율 값, 유효 값 0 ~ 1
* circleOffset : 값이 여러개일 경우 원 형태 간의 여백을 설정합니다.
* horizontalOriginRatio : 게이지 출력 수평위치를 설정합니다.
* verticalOriginRatio : 게이지 출력 수직위치를 설정합니다.
 * valueChangeFunction : 데이터가 변경 될 경우 호출될 사용자 정의 함수를 설정합니다
* fillJsFunction : 데이터의 값에 따른 색상 값을 설정하는 사용자 정의 함수를 설정합니다.
* duration : 이펙트 출력시간을 설정합니다. default 800
* bounceAnimating : 튕김 이펙트를 설정합니다. deafult true
 * showValueLabel : 수치 라벨을 출력할지 설정합니다. default true
* valueField : 여러 데이터를 출력 할 경우 차트 데이터의 필드 명을 설정합니다.
 * nameField : 여러 데이터 출력 시 해당 데이터에 대한 이름을 출력할 필드 명을 설정합니다.
* backgroundColors : 게이지가 출력되는 영역의 배경 색상을 설정합니다. default [#e2eaf3]
* backgroundStrokes : 게이지가 출력되는 영역의 배경 테두리 색상을 설정합니다. 
* foregroundColors : 게이지가 출력되는 영역의 색상을 설정합니다. default [#51c0ee]
 * foregroundStrokes : 게이지가 출력되는 영역의 테두리 색상을 설정합니다.
*/
+'<Gauge height="230" formatter="{cft}" innerRatio="0.75" labelJsFunction="valueLabelFunc" foregroundColors="[#f6a44c]" backgroundColors="[#e8d7c9]" minimum="0.00" maximum="100" startAngle="-90" minimumAngle="0" maximumAngle="180" color="#333333" fontSize="3.1em" verticalOriginRatio="0.7" valueChangeFunction="changeFunction" labelYOffset="-50">'
   +'<backgroundElements>'
       +'<CanvasElement>'
            +'<CanvasLabel fontSize="13" height="10" color="#333333" horizontalCenter="0" verticalCenter="40" text="CPU Utilization" labelYOffset="-10"/>'
     +'</CanvasElement>'
   +'</backgroundElements>'
+'</Gauge>'
+'</rMateChart>';

   static mMemLayoutStr =
   '<rMateChart>'
+'<Options>'
  +'<Caption text="Mosquitto"  fontWeight="bold" />'
//+'<SubCaption text="Used Memory" fontSize="13" textAlign="center" paddingTop="2" color="#888888"/>'

+'</Options>'
+'<CurrencyFormatter id="cft" currencySymbol="%" precision="0" alignSymbol="right"/>'
/*
* showDataTip : 툴팁 출력 설정
* minimum : 게이지 최소 값
* maximum : 게이지 최대 값
* startAngle : 시작 각도
* minimumAngle : 게이지 최소 각도
* maximumAngle : 게이지 최대 각도
* gaugeWidth : 게이지 가로 크기
* gaugeHeight : 게이지 세로 크기
* innerRatio : 안쪽 영역 비율 값, 유효 값 0 ~ 1
* outerRatio : 바깥쪽 영역 비율 값, 유효 값 0 ~ 1
* circleOffset : 값이 여러개일 경우 원 형태 간의 여백을 설정합니다.
* horizontalOriginRatio : 게이지 출력 수평위치를 설정합니다.
* verticalOriginRatio : 게이지 출력 수직위치를 설정합니다.
 * valueChangeFunction : 데이터가 변경 될 경우 호출될 사용자 정의 함수를 설정합니다
* fillJsFunction : 데이터의 값에 따른 색상 값을 설정하는 사용자 정의 함수를 설정합니다.
* duration : 이펙트 출력시간을 설정합니다. default 800
* bounceAnimating : 튕김 이펙트를 설정합니다. deafult true
 * showValueLabel : 수치 라벨을 출력할지 설정합니다. default true
* valueField : 여러 데이터를 출력 할 경우 차트 데이터의 필드 명을 설정합니다.
 * nameField : 여러 데이터 출력 시 해당 데이터에 대한 이름을 출력할 필드 명을 설정합니다.
* backgroundColors : 게이지가 출력되는 영역의 배경 색상을 설정합니다. default [#e2eaf3]
* backgroundStrokes : 게이지가 출력되는 영역의 배경 테두리 색상을 설정합니다. 
* foregroundColors : 게이지가 출력되는 영역의 색상을 설정합니다. default [#51c0ee]
 * foregroundStrokes : 게이지가 출력되는 영역의 테두리 색상을 설정합니다.
*/
+'<Gauge height="230" formatter="{cft}" innerRatio="0.75" labelJsFunction="valueLabelFunc" foregroundColors="[#5587a2]" backgroundColors="[#97d5e0]" minimum="0.00" maximum="100" startAngle="-90" minimumAngle="0" maximumAngle="180" color="#333333" fontSize="3.1em" verticalOriginRatio="0.7" valueChangeFunction="changeFunction" labelYOffset="-50">'
   +'<backgroundElements>'
       +'<CanvasElement>'
            +'<CanvasLabel fontSize="13" height="10" color="#333333" horizontalCenter="0" verticalCenter="40" text="Used Memory"/>'
     +'</CanvasElement>'
   +'</backgroundElements>'
+'</Gauge>'
+'</rMateChart>';

  //message topic - topic chart layout
  static topicLayoutStr =
  '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
       +'<Options>'
          +'<Caption text="Topic별 송수신 횟수"  fontWeight="bold"/>'
		               +'<SubCaption text="( 개수 )" textAlign="right" />'
           +'<Legend width="330" height="25"/>'
     +'</Options>'
     +'<NumberFormatter id="nft" precision="2"/>'
      +'<Line2DChart showDataTips="true" dataTipFormatter="{nft}" dataTipDisplayMode="axis">'
      +'<horizontalAxis>'
      +'<CategoryAxis id="hAxis" categoryField="topic" labelJsFunction="labelFunc"/>'
   +'</horizontalAxis>'
          +'<verticalAxis>'
             +'<LinearAxis id="vAxis" title="" minimum="0"/>'
           +'</verticalAxis>'
            +'<series>'
               +'<Line2DSeries yField="receiving" form="curve" displayName="Message Receiving Count" itemRenderer="CircleItemRenderer">'
               +'<showDataEffect>'
               +'<SeriesInterpolate duration="1000"/> '
          +'</showDataEffect>'
               +'</Line2DSeries>'
                +'<Line2DSeries yField="sending" form="curve" displayName="Message Sending Count" itemRenderer="CircleItemRenderer">'
                +'<showDataEffect>'
                +'<SeriesInterpolate duration="1000"/> '
           +'</showDataEffect>'
                +'</Line2DSeries>'
            +'</series>'
            
           /* +'<annotationElements>'
                           +'<CrossRangeZoomer zoomType="both" horizontalStrokeEnable="false" verticalStrokeEnable="false" enableCrossHair="false"    enableZooming="true"/>'
                          /* CrossRangeZoomer 속성 설명
                   * zoomType : 줌 실행 기준을 정합니다. 유효값 : horizontal, vertical, both
                    * horizontalLabelFormatter : 십자가의 수평 라인에 붙는 라벨 formatter 입니다.
                   * verticalLabelFormatter : 십자가의 수직 라인에 붙는 라벨 formatter 입니다.
                 * enableZooming : zoom 기능 사용 여부를 나타냅니다.
                 * enableCrossHair : 십자가 표시 여부를 나타냅니다.
                   * useDualCrossXLabel : 십자가의 수평 라인에 두개의 라벨을 표시합니다.(듀얼축인 경우 유효)
                   * useDualCrossYLabel : 십자가의 수직 라인에 두개의 라벨을 표시합니다.(듀얼축인 경우 유효)
                   * verticalLabelPlacement : 수직 라인의 라벨 위치를 지정합니다.(유효값: top, bottom)
                   * horizontalLabelPlacement : 수평 라인의 라벨 위치를 지정합니다.(유효값 : left, right)
                    
                      +'</annotationElements>'*/
      +'</Line2DChart>'
 +'</rMateChart>';
  
    

  //message topic - accumulate chart layout
  static accumulateLayoutStr =
    '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
          +'<Options>'
             +'<Caption text="Topic별 누적 메시지 크기"  fontWeight="bold"/>'
             +'<SubCaption text="( Byte )" textAlign="right" />'
              +'<Legend />'
        +'</Options>'
        +'<NumberFormatter id="nft" />'
         +'<Line2DChart showDataTips="true" dataTipFormatter="{nft}" dataTipDisplayMode="axis">'
            +'<horizontalAxis>'
                  +'<CategoryAxis id="hAxis" categoryField="topic" labelJsFunction="labelFunc"/>'
               +'</horizontalAxis>'
             +'<verticalAxis>'
             +'<LinearAxis formatter="{nft}"/>'
                +'<LinearAxis id="vAxis" title="" minimum="0"/>'
              +'</verticalAxis>'
               +'<series>'
                  +'<Line2DSeries yField="accumulated" form="curve" displayName="Accumulated Message Size" itemRenderer="CircleItemRenderer">'
                  +'<lineStroke>'
                      +'<Stroke color="#5E3E67" weight="3"/>'
                  +'</lineStroke>'  
                  /*+'<fills>'
                  +'<SolidColor color="#f6a44c"/>'
                
            +'</fills>'
             /* itemRenderer의 테두리 선 색상 입니다. */
            /* +'<stroke>'
                 +'<Stroke color="#f6a44c" weight="2"/>'
             +'</stroke>'*/
                  +'<showDataEffect>'
                          +'<SeriesInterpolate duration="1000"/> '
                     +'</showDataEffect>'
                 +'</Line2DSeries>'
               +'</series>'
               
         +'</Line2DChart>'
    +'</rMateChart>';

   
  static receivingPieLayoutStr = 
  '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
  +'<Options>'
     +'<Caption text="수신 Topic TOP3" fontSize="13"  fontWeight="bold"/>'
       //+'<Legend useVisibleCheck="true"/>'
  +'</Options>'
+'<Pie2DChart innerRadius="0.5" showDataTips="true" dataTipJsFunction="pieDataTipFunc" selectionMode="single">'
/*
Doughnut2D 차트 생성시에 필요한 Pie2DChart 정의합니다
showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
*/
     +'<series>'
          +'<Pie2DSeries nameField="topic" field="value" startAngle="20" renderDirection="clockwise" labelPosition="inside" color="#ffffff">'
             +'<fills>'
                   +'<SolidColor color="#20cbc2"/>'
                 +'<SolidColor color="#074d81"/>'
                 +'<SolidColor color="#40b2e6"/>'
             +'</fills>'
          /* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
          /*+'<showDataEffect>'
               +'<SeriesZoom duration="1000"/>'
         +'</showDataEffect>'*/
         +'</Pie2DSeries>'
    +'</series>'
     +'<backgroundElements>'
          +'<CanvasElement>'
          +'<CanvasLabel text="Receiving" height="24" horizontalCenter="0" verticalCenter="-10" fontSize="12" color="#333333" backgroundAlpha="0"/>'
               +'<CanvasLabel text="Count" height="24" horizontalCenter="0" verticalCenter="10" fontSize="12" color="#666666" backgroundAlpha="0"/>'
        +'</CanvasElement>'
      +'</backgroundElements>'
 +'</Pie2DChart>'
+'</rMateChart>';
 

  static sendingPieLayoutStr = 
  '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
  +'<Options>'
     +'<Caption text="송신 Topic TOP3" fontSize="13"  fontWeight="bold"/>'
       //+'<Legend useVisibleCheck="true"/>'
  +'</Options>'
+'<Pie2DChart innerRadius="0.5" showDataTips="true" dataTipJsFunction="pieDataTipFunc" selectionMode="single">'
/*
Doughnut2D 차트 생성시에 필요한 Pie2DChart 정의합니다
showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
*/
     +'<series>'
          +'<Pie2DSeries nameField="topic" field="value" startAngle="20" renderDirection="clockwise" labelPosition="inside" color="#ffffff">'
             +'<fills>'
             +'<SolidColor color="#FABC05"/>'
             +'<SolidColor color="#A78C3A"/>'
             +'<SolidColor color="#533201"/>'
             +'</fills>'
          /* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
          /*+'<showDataEffect>'
               +'<SeriesZoom duration="1000"/>'
         +'</showDataEffect>'*/
         +'</Pie2DSeries>'
    +'</series>'
     +'<backgroundElements>'
          +'<CanvasElement>'
               +'<CanvasLabel text="Count" height="24" horizontalCenter="0" verticalCenter="10" fontSize="12" color="#666666" backgroundAlpha="0"/>'
               +'<CanvasLabel text="Sending" height="24" horizontalCenter="0" verticalCenter="-10" fontSize="12" color="#333333" backgroundAlpha="0"/>'
        +'</CanvasElement>'
      +'</backgroundElements>'
 +'</Pie2DChart>'
+'</rMateChart>';

  static accumulationPieLayoutStr = 
  '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
  +'<Options>'
     +'<Caption text="누적 Topic TOP3" fontSize="13"  fontWeight="bold"/>'
       //+'<Legend useVisibleCheck="true"/>'
  +'</Options>'
+'<Pie2DChart innerRadius="0.5" showDataTips="true" dataTipJsFunction="pieDataTipFunc" selectionMode="single">'
/*
Doughnut2D 차트 생성시에 필요한 Pie2DChart 정의합니다
showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
*/
     +'<series>'
          +'<Pie2DSeries nameField="topic" field="value" startAngle="20" renderDirection="clockwise" labelPosition="inside" color="#ffffff">'
             +'<fills>'
                   +'<SolidColor color="#5E3E67"/>'
                 +'<SolidColor color="#B393BC"/>'
                 +'<SolidColor color="#CDAEC6"/>'
             +'</fills>'
          /* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
          /*+'<showDataEffect>'
               +'<SeriesZoom duration="1000"/>'
         +'</showDataEffect>'*/
         +'</Pie2DSeries>'
    +'</series>'
     +'<backgroundElements>'
          +'<CanvasElement>'
               +'<CanvasLabel text="Size" height="24" horizontalCenter="0" verticalCenter="10" fontSize="11" color="#666666" backgroundAlpha="0"/>'
               +'<CanvasLabel text="Accumulated" height="24" horizontalCenter="0" verticalCenter="-10" fontSize="11" color="#333333" backgroundAlpha="0"/>'
        +'</CanvasElement>'
      +'</backgroundElements>'
 +'</Pie2DChart>'
+'</rMateChart>';


  //message client - connection info chart layout
  static connectionLayoutStr =
    '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
        +'<Options>'
           +'<Caption text="Client Connection Info"  fontWeight="bold"/>'
            +'<SubCaption text="( 개수 )" textAlign="right" />'
          +'<Legend />'
      +'</Options>'
      +'<NumberFormatter id="numfmt" useThousandsSeparator="true"/>'
         +'<Area2DChart showDataTips="true" dataTipJsFunction="dataTipFunc" dataTipDisplayMode="axis">'
            +'<horizontalAxis>'
                +'<CategoryAxis id="hAxis" categoryField="xValue" padding="0.5"/>'
             +'</horizontalAxis>'
           +'<verticalAxis>'
              +'<LinearAxis formatter="{numfmt}"/>'
              +'<LinearAxis id="vAxis" minimum="0" interval="50"/>'

          +'</verticalAxis>'
             +'<series>'
                +'<Area2DSeries yField="connections" displayName="current connections" itemRenderer="CircleItemRenderer">'
                +'<areaStroke>'
                       +'<Stroke color="#88B14B" weight="3"/>'
                   +'</areaStroke>'
                  +'<areaFill>'
                     +'<SolidColor color="#88B14B" alpha="0.5"/>'
                 +'</areaFill>'
                  +'<showDataEffect>' 
                        +'<SeriesInterpolate/>'
                    +'</showDataEffect>'
               +'</Area2DSeries>'
             +'</series>'
             +'<annotationElements>'
                    +'<CrossRangeZoomer enableZooming="false" horizontalStrokeEnable="false"/>'
                +'</annotationElements>'
             + '<horizontalAxisRenderers>'
               + '<Axis2DRenderer axis="{hAxis}" canDropLabels="true" showLine="true"/>'
             + '</horizontalAxisRenderers>'
       +'</Area2DChart>'
   +'</rMateChart>';

}

import React, { Component, Fragment } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import makeChart from '../js/MakeChart';
//import { Helmet } from "react-helmet";


//mosquitto performance chart component

class MosquittoPerform extends Component {
  chartData = [0.00]; //차트 데이터
  dataLength = this.props.dataLength;  //x축에 표시될 데이터 개수
  updateInterval = this.props.updateInterval; //화면 갱신 interval

  /*constructor(props) {
    super(props);
  }*/

  componentDidMount() { //컴포넌트가 화면에 나타나게 되었을 때 호출
    console.log("mosquitto did mount");
    
    //차트 생성, 초기화
    makeChart.create("mosqCpu", "mCpuChartHolder", makeChart.mCpuLayoutStr, this.chartData);
    makeChart.create("mosqMem", "mMemChartHolder", makeChart.mMemLayoutStr, this.chartData);
    
  }

  componentWillUnmount() {  //컴포넌트가 제거될 때 호출
    console.log("mosquitto unmount");
  }

  //this.props.chartData로 Perform(부모)컴포넌트에서 subscribe된 차트데이터 갱신
  //index가 작을수록 최근 데이터
  componentWillReceiveProps(nextProps) {  //컴포넌트가 새로운 props를 받게 되었을 때 호출
    if (this.props.chartData !== nextProps.chartData) {
      console.log("receive props");
      
      console.log(this.props.chartData);
      this.messageArrived(this.props.chartData);
      //this.props.chartData.map((message, i) => i===0 && (this.messageArrived(message))); //가장 최근에 도착한 메시지를 파라미터로 받는 messageArrived 함수 호출
    }
  }
  count =0;

  //"count;mosq_cpu;mosq_mem"
  messageArrived(data, chartId) {
    let dataArray = data.split(';');

    let mCpu = parseFloat(dataArray[1], 10);
    let mMem = parseFloat(dataArray[2], 10)
    let mCpuChartData = [];
    let mMemChartData = [];

    /*mCpuChartData.push(
        {"name":"Others", "value":100-parseFloat(dataArray[0], 10)},
        {"name":"Mosquitto", "value":parseFloat(dataArray[0], 10)});*/
      
    if(mCpu == 0 || isNaN(mCpu)) {
      mCpuChartData.push(0.001);
    }
    else {
      mCpuChartData.push(mCpu);
    }
    
    if(mMem == 0 || isNaN(mMem)) {
      mMemChartData.push(0.001);
    }
    else {
      mMemChartData.push(mMem);
    }

    console.log(mCpuChartData);
    document.getElementById("mosqCpu").setData(mCpuChartData);

    console.log(mMemChartData);
    document.getElementById("mosqMem").setData(mMemChartData);
  }
 

  render() {
    const style = {
      width:'21.5vw',
      height:'49vh',
      float:'left',
      //overflow:'auto',
      display:'inline-block',
      background:'white',
      borderRadius: '25px',
      padding:'1%',
      
      margin:'1%',
      fontSize:'0.9rem',
      position:'absolute',
      top:'40.5vh',
      left:'43vw'
    };

    const style1 = {
      width:'100%',
      height:'47%',
      padding:'2%',
      paddingTop:'1%',
      paddingBottom: '1%',
      margin:'1%',
      marginBottom:'20px',
      display:'inline-block',
      float:'left',
    };
    
 

    return (
      <Fragment>
        <Container fluid={true}>
        <Row className="justify-content-md-center">
        <Col>

        {/*<Helmet>
          <script type="text/javascript" src="./chartSetting.js"></script>
        </Helmet>*/}

        <div style={style}>
            <div style={style1} id="mCpuChartHolder"/>
            <div style={style1} id="mMemChartHolder"/>
            
        </div>

        </Col>
        </Row>
        </Container>
      </Fragment>
    );
  }
}

export default MosquittoPerform;

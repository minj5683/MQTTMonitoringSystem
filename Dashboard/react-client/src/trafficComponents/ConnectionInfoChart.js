import React, { Component, Fragment } from 'react';
import { Table, Col, Row, Container } from 'react-bootstrap';
//import { Helmet } from "react-helmet";
import makeChart from '../js/MakeChart';

//connection chart component

class ConnectionInfoChart extends Component {
  chartData = []; //초기 차트 데이터
  dataLength = this.props.dataLength;  //x축에 표시될 데이터 개수
  updateInterval = this.props.updateInterval; //화면 갱신 interval

  constructor(props) {
    super(props)
    this.state = {
      connectionInfo: [],
      client: "",
    }
  }

  componentDidMount() {
    console.log("connection did mount");

    //차트 생성, 초기화
    makeChart.create("connection", "connectionInfoChartHolder", makeChart.connectionLayoutStr, this.chartData);
  }

  componentWillUnmount() {
    console.log("connection unmount");
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.chartData !== nextProps.chartData) {
      console.log("receive props");
      
      //console.log(this.props.chartData);
      this.messageArrived(this.props.chartData);
      //this.props.chartData.map((message, i) => i===0 && (this.messageArrived(message))); //가장 최근에 도착한 메시지를 파라미터로 받는 messageArrived 함수 호출
    }
  }

  // "count;clientTableInfo;데이터개수;connections;recent;old;minimum;maximum;date..."로 publish
  messageArrived(data) {
    //console.log(data);
    let dataArray = data.split(';');
    let dataLength = dataArray[2];
    let connections = [];
    let recent = [];
    let old = [];
    let minimum = [];
    let maximum = [];
    let date = [];
    let clientArray = (dataArray[1] + "").split('/');
    //console.log(clientArray);
    //console.log(typeof(clientArray));

    for(let i=1; i<(dataArray.length-1 -2)/6 + 1; i++) {
      connections.push(dataArray[i*6 - 5 +2]);
      recent.push(dataArray[i*6 - 4 +2]);
      old.push(dataArray[i*6 - 3 +2]);
      minimum.push(dataArray[i*6 - 2 +2]);
      maximum.push(dataArray[i*6 - 1 +2]);
      date.push(dataArray[i*6 +2]);
    }


    let newData = [];  //업데이트 될 차트 데이터
    if(dataLength === 0 || dataLength === "") {
      for(let i=0; i<this.dataLength - dataLength; i++) {
        newData.push({"xValue":(this.updateInterval)*(this.dataLength - i - 1), "date":"",
          "connections":0, "recent":"", "old":"", "minimum":"", "maximum":""});

      }
    }
    else if(dataLength < this.dataLength) {
      for(let i=0; i<this.dataLength - dataLength; i++) {
        newData.push({"xValue":(this.updateInterval)*(this.dataLength - i - 1), "date":"",
        "connections":0, "recent":"", "old":"", "minimum":"", "maximum":""});
      }

      for(let i=1; i<dataLength; i++) {
        newData.push({"xValue":(this.updateInterval)*(dataLength - i), "date":date[dataLength - i],
          "connections":parseInt(connections[dataLength - i], 10), "recent":recent[dataLength - i], "old":old[dataLength - i], 
          "minimum":minimum[dataLength - i], "maximum":maximum[dataLength - i]});
      }
      newData.push({"xValue":date[0], "connections":parseInt(connections[0], 10), "recent":recent[0], "old":old[0], 
          "minimum":minimum[0], "maximum":maximum[0]});

    }
    else {
      for(let i=0; i<this.dataLength - 1; i++) {
        newData.push({"xValue":(this.updateInterval)*(this.dataLength - i - 1), "date":date[this.dataLength - i - 1],
          "connections":parseInt(connections[this.dataLength - i -1], 10), "recent":recent[this.dataLength - i -1], "old":old[this.dataLength - i -1], 
          "minimum":minimum[this.dataLength - i -1], "maximum":maximum[this.dataLength - i -1]});
      }
      newData.push({"xValue":date[0], "date":date[0], "connections":parseInt(connections[0], 10), "recent":recent[0], "old":old[0], 
        "minimum":minimum[0], "maximum":maximum[0]});

    }

    console.log(newData);
    document.getElementById("connection").setData(newData); //newData로 차트 갱신
    this.setState({
      connectionInfo: newData,
      client: clientArray
    });
  }

  renderConnectionsData() {
    let clientArray = this.state.client;
    let subConn = 0;
    for(let i=0; i<clientArray.length; i++) {
      if (clientArray[i].indexOf('subscriber') != -1) {
        subConn++;
      }
    }
    //console.log(subConn);

    return this.state.connectionInfo.map((connection, index) => {
      if(index === this.state.connectionInfo.length-1 && !isNaN(connection.connections)) {
         return (
           <tbody key={index}>
            <tr>
             <td style={{fontWeight:'bold'}}>total</td>
             <td >{connection.connections}</td>
            </tr>
            <tr>
             <td style={{fontWeight:'bold'}}>subscriber</td>
             <td>{subConn}</td>
            </tr>
            <tr>
             <td style={{fontWeight:'bold'}}>publisher</td>
             <td>{connection.connections-subConn}</td>
            </tr>
          </tbody>
      )}
    })
          
  }

  renderTableData() {
    return this.state.connectionInfo.map((connection, index) => {
      if(index === this.state.connectionInfo.length-1 && !isNaN(connection.connections)) {
         return (
           <tbody key={index}>
            
            <tr>
             <td style={{fontWeight:'bold'}}>recent</td>
             <td>{connection.recent}</td>
            </tr>
            <tr>
             <td style={{fontWeight:'bold'}}>old</td>
             <td>{connection.old}</td>
            </tr>
            <tr>
             <td style={{fontWeight:'bold'}}>minimum</td>
             <td>{connection.minimum}</td>
            </tr>
            <tr>
             <td style={{fontWeight:'bold'}}>maximum</td>
             <td>{connection.maximum}</td>
            </tr>
          </tbody>
      )}
    })
          
  }

  render() {
    const style = {
      width:'72vw',
      height:'42.5vh',
      background:'white',
      borderRadius: '25px',
      padding:'1%',
      margin:'1%',
      //marginLeft:'1%',
      display:'inline-block',
      float:'left',
      position:'absolute',
      top:'47vh',
      left:'0.5vw',
      paddingRight: '0.5%',
      //boxShadow: 'inset -2px 0 0 #C1C1C1',
    };

    const chartStyle ={
      width: '70%',
      height: '100%',
      float:'left',
      display:'inline-block'
    };

    const tableStyle = {
      width: '25%',
      height: '40%',
      borderRadius: '25px',
      border: '1px solid #DBE7C9',
      boxShadow: '1px 1px 1px #D8D8D8',
      float:'left',
      display:'inline-block',
      fontSize:'85%',
      //margin: '1%',
      marginLeft: '3%',
      //marginTop: '4%',
      padding:'1%',
      paddingLeft:'2%',
      paddingRight:'2%',
      textAlign:'center',
      //verticalAlign:'middle',

    };

    const table2Style = {
      width: '25%',
      height: '55%',
      borderRadius: '25px',
      border: '1px solid #DBE7C9',
      boxShadow: '1px 1px 1px #D8D8D8',
      float:'left',
      display:'inline-block',
      fontSize:'85%',
      //margin: '1%',
      marginLeft: '3%',
      marginTop: '1%',
      padding:'1%',
      paddingLeft:'2%',
      paddingRight:'2%',
      textAlign:'center',
      //verticalAlign:'middle',

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
          <div style={chartStyle} id="connectionInfoChartHolder"/>

          <div style={tableStyle}>
            <table  style={{width:'100%', height:'100%', borderBottom:'1px solid #DBE7C9'}}>
              <thead style={{ background:'#DBE7C9'}}>
                <tr>
                  <th>Connections</th>
                  <th>Count</th>
                </tr>
              </thead>
              {this.renderConnectionsData()}
            </table>
          </div>
          <div style={table2Style}>
          <table style={{width:'100%', height:'100%', borderBottom:'1px solid #DBE7C9'}}>
              <thead style={{ background:'#DBE7C9'}}>
                <tr>
                  <th>Info</th>
                  <th>Client ID</th>
                </tr>
              </thead>
            

              {this.renderTableData()}
            
          </table>
          </div>
        </div>
        {/*<div>
          <div style={style} id="connectionInfoChartHolder"/>
        </div>*/}

        </Col>
        </Row>
        </Container>
      </Fragment>
    );
  }
}

export default ConnectionInfoChart;

import React, { Component, Fragment } from 'react';
import { Col, Container, Row, Tab, Tabs, Table } from 'react-bootstrap';
import makeChart from '../js/MakeChart';

//topic chart component

class TopicChart extends Component {
  chartData = [];

  constructor(props) {
    super(props)
    this.state = {
      tableData: []
    }
  }

  componentDidMount() {
    console.log("topic chart did mount");

    //차트 생성, 초기화
    makeChart.create("msgtopic", "topicChartHolder", makeChart.topicLayoutStr, this.chartData);
  }

  componentWillUnmount() {
    console.log("topic chart unmount");
  }

  // "count;토픽개수;i번째토픽이름;i번째토픽의receiving;i번째토픽의sending; ... " 
  componentWillReceiveProps(nextProps) {
    if (this.props.chartData !== nextProps.chartData) {
      //this.props.chartData.map((message, i) => i===0 && this.messageArrived(message));
      
      console.log("receive props");
      this.messageArrived(this.props.chartData);  
    }
  }

  messageArrived(data) {
    let dataArray = data.split(';');

    let chartData =  [];
    let tmp = [];
    for(let i=0; i<parseInt(dataArray[1], 10); i++) {
      chartData.push({"topic":dataArray[3*i + 1 +1],"receiving":parseInt(dataArray[3*i + 2 +1], 10), "sending":parseInt(dataArray[3*i + 3 +1], 10)});
      tmp.push({"topic":dataArray[3*i + 1 +1],"receiving":parseInt(dataArray[3*i + 2 +1], 10), "sending":parseInt(dataArray[3*i + 3 +1], 10)});
    }

    document.getElementById("msgtopic").setData(chartData);

    this.setState({
      tableData: tmp
    });
  }

  renderRecvTableData() {
    let tableDataArray = this.state.tableData;
    //현재 객체 배열을 정렬
    tableDataArray.sort(function (a, b) { 
      return a.receiving < b.receiving ? 1 : a.receiving > b.receiving ? -1 : 0;  
    });
    //console.log(dataArray);

    return tableDataArray.map((data, index) => {
      return (
        <tr key={index}>
             <td>{data.topic}</td>
             <td style={{textAlign:'center'}}>{data.receiving}</td>
        </tr>
      )
    })
  }

  renderSendTableData() {
    let tableDataArray = this.state.tableData;
    //현재 객체 배열을 정렬
    tableDataArray.sort(function (a, b) { 
      return a.sending < b.sending ? 1 : a.sending > b.sending ? -1 : 0;  
    });
    //console.log(dataArray);

    return tableDataArray.map((data, index) => {
      return (
        <tr key={index*2}>
             <td>{data.topic}</td>
             <td style={{textAlign:'center'}}>{data.sending}</td>
        </tr>
      )
    })
  }

  controlledTabs() {
    const style = {
      position:'absolute',
      width:'35.5vw',
      height: '42vh',
      top:'3.5vh',
      left:'0.5vw',
      background:'white',
      borderRadius: '25px',
      padding:'2%',
      paddingTop:'0.3%',
      margin:'1%',
      display:'inline-block',
      float:'left',
      fontSize:'0.8rem'
    };

    const divStyle = {
        width:'32vw',
        height:'34.5vh',
        paddingTop:'2%',
        //marginTop:'3%',
        //marginBottom:'20px',
        display:'block',
        float:'left',
    };

    const tableStyle = {
      width:'32vw',
      height:'34.5vh',
      paddingTop:'1%',
      //margin:'1%',
      //marginBottom:'20px',
      display:'block',
      float:'left',
      overflow:'auto',
  };


    return (
      <div style={style}>
        <Tabs defaultActiveKey="chart" id="uncontrolled-tab-example">
          <Tab eventKey="chart" title="Chart">
            <div style={divStyle} id="topicChartHolder"></div>
          </Tab>
          <Tab eventKey="recvTable" title="Receiving">
            <div style={tableStyle}>
            <Table striped bordered hover size="sm">
              <thead style={{textAlign:'center'}}>
                <tr>
                  <th>Topic</th>
                  <th>Receiving (개)</th>
                </tr>
              </thead>
              <tbody>
                {this.renderRecvTableData()}
              </tbody>
            </Table>
            </div>
          </Tab>
          <Tab eventKey="sendTable" title="Sending">
            <div style={tableStyle}>
            <Table striped bordered hover size="sm">
              <thead style={{textAlign:'center'}}>
                <tr>
                  <th>Topic</th>
                  <th>Sending (개)</th>
                </tr>
              </thead>
              <tbody>
                {this.renderSendTableData()}
              </tbody>
            </Table>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }

  render() {
    

    return (
      <Fragment>
        <Container fluid={true}>
        <Row className="justify-content-md-center">
        <Col>
        <div>
          
        {/*<div style={style}  id="topicChartHolder"/>*/}
        {this.controlledTabs()}
        </div>

        </Col>
        </Row>
        </Container>
      </Fragment>
    );
  }
}

export default TopicChart;

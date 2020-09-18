import React, { Component, Fragment } from 'react';
import { Col, Container, Row, Tab, Tabs, Table } from 'react-bootstrap';
import makeChart from '../js/MakeChart';

//accumulation chart component

class AccumulationChart extends Component {
  chartData = []; //초기 차트 데이터

  constructor(props) {
    super(props)
    this.state = {
      tableData: []
    }
  }

  componentDidMount() {
    console.log("accumulate did mount");

    //차트 생성, 초기화
    makeChart.create("accumulate", "accumulationChartHolder", makeChart.accumulateLayoutStr, this.chartData);
  }

  componentWillUnmount() {
    console.log("accumulate unmount");
  }

  // "count;토픽개수;i번째토픽이름i번째토픽의accumulated; ... " 
  componentWillReceiveProps(nextProps) {
    if (this.props.chartData !== nextProps.chartData) {
      console.log("receive props");
      //this.props.chartData.map((message, i) => i===0 && this.messageArrived(message));
      this.messageArrived(this.props.chartData);
    }
  }

  messageArrived(data) {
    let dataArray = data.split(';');
    this.chartData =  [];

    let tmp = [];

    for(let i=0; i<parseInt(dataArray[1], 10); i++) {
      this.chartData.push({"topic":dataArray[2*i + 1 +1],"accumulated":parseInt(dataArray[2*i + 2 +1], 10)});
      tmp.push({"topic":dataArray[2*i + 1 +1],"accumulated":parseInt(dataArray[2*i + 2 +1], 10)});
    }
    document.getElementById("accumulate").setData(this.chartData);

    this.setState({
      tableData: tmp
    });
  }

  renderAccumTableData() {
    let tableDataArray = this.state.tableData;
    //현재 객체 배열을 정렬
    tableDataArray.sort(function (a, b) { 
      return a.accumulated < b.accumulated ? 1 : a.accumulated > b.accumulated ? -1 : 0;  
    });
    //console.log(dataArray);

    return tableDataArray.map((data, index) => {
      return (
        <tr key={index*3}>
             <td>{data.topic}</td>
             <td style={{textAlign:'center'}}>{data.accumulated}</td>
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
      left:'37vw',
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
        //margin:'1%',
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
        <Tabs  defaultActiveKey="chart" id="uncontrolled-tab-example">
          <Tab eventKey="chart" title="Chart">
            <div style={divStyle} id="accumulationChartHolder"></div>
          </Tab>
          <Tab eventKey="accumTable" title="Accumulated">
            <div style={tableStyle}>
            <Table striped bordered hover size="sm">
              <thead style={{textAlign:'center'}}>
                <tr>
                  <th style={{paddingBottom:'4%'}}>Topic</th>
                  <th>Accumulated (Bytes)</th>
                </tr>
              </thead>
              <tbody>
                {this.renderAccumTableData()}
              </tbody>
            </Table>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }

  render() {
    const style = {
      position:'absolute',
      width:'34.5vw',
      height: '42.5vh',
      top:'1.5vh',
      left:'36.5vw',
      background:'white',
      borderRadius: '25px',
      padding:'2%',
      margin:'1%',
      display:'inline-block',
      float:'left',
    };

    return (
      <Fragment>
        <Container fluid={true}>
        <Row className="justify-content-md-center">
        <Col>

        <div>
          {/*<div style={style} id="accumulationChartHolder"/>*/}
          {this.controlledTabs()}

        </div>

        </Col>
        </Row>
        </Container>
      </Fragment>
    );
  }
}

export default AccumulationChart;

import React, { Component, Fragment } from 'react';
import { Table, Col, Row, Container } from 'react-bootstrap';

//process tale component

class ProcessTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
       processList: []
    }
  }

  componentDidMount() {
    console.log("process did mount");
  }

  componentWillUnmount() {
    console.log("process unmount");
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tableData !== nextProps.tableData) {
      //this.props.tableData.map((message, i) => i===0 && this.messageArrived(message));
      //console.log(this.props.tableData);
      this.messageArrived(this.props.tableData);
    }
  }

  //"count;전체process개수;pid;cpu_util;memory_util;command; ... "
  messageArrived(data) {
    let dataArray = data.split(';');
    let cols = dataArray[1];
    const temp = [];

    for(let i=0; i<cols; i++) {
      temp.push({ pid: dataArray[4*i+1+1], cpu: dataArray[4*i+2+1], mem: dataArray[4*i+3+1], name: dataArray[4*i+4+1]});
    }
    this.setState({
      processList: temp
    });

    //console.log(this.state.processList);
  }


  renderTableData() {
    return this.state.processList.map((process, index) => {
      if(process.name == 'mosquitto') {
        return (
          <tr key={index} style={{background:'#FAEBB2'}}>
               <td>{process.pid}</td>
               <td>{process.cpu}</td>
               <td>{process.mem}</td>
               <td>{process.name}</td>
          </tr>
        )
      }
      else {
         return (
           <tr key={index}>
                <td>{process.pid}</td>
                <td>{process.cpu}</td>
                <td>{process.mem}</td>
                <td>{process.name}</td>
           </tr>
      )}
    })
  }

  render() {
    const tableStyle = {
      width:'28.5vw',
      height:'49vh',
      float:'left',
      overflow:'auto',
      display:'inline-block',
      background:'white',
      borderRadius: '25px',
      padding:'2%',
      paddingTop:'1%',
      margin:'1%',
      fontSize:'0.9rem',
      position:'absolute',
      top:'40.5vh',
      left:'65.5vw',
    };

    return (
      <Fragment>

        <Container fluid={true}>
        <Row className="justify-content-md-center">
        <Col>

        <div style={tableStyle}>
          <div style={{fontWeight:'bold', textAlign:'center', fontSize:'1rem', marginBottom:'2%'}}>Process List</div>
          <Table striped bordered hover size="sm">
            
            <thead>
              <tr style={{textAlign: 'center'}}>
                <th>PID</th>
                <th>CPU</th>
                <th>Memory</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableData()}
            </tbody>
          </Table>
          {}
        </div>

        </Col>
        </Row>
        </Container>
      </Fragment>
    );
  }
}

export default ProcessTable;

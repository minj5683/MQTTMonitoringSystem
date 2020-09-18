import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';


// menu

const Menu = () => {
  const navbarStyle = {
    backgroundColor: 'white',
    padding: '0rem',
    //marginBottom: '2rem',
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    zIndex: '-2', /* Behind the navbar */
    padding: '0 0 0', /* Height of navbar */
    height: '75px',
    width:'100%',
    overflowX: 'hidden',
    overflowY: 'hidden',
    boxShadow: 'inset 0 -2px 0 #C1C1C1',

  };

  const navStyle ={
    //marginRight: '2vw',
    fontWeight: 'bold',
    color: '#333333',
    fontSize: '1.3rem',
    textAlign:'center',
    marginLeft: '21.7vw',
    display:'block',
    width:'60vw',
  }

  const navStyle2 ={
    //marginRight: '2vw',
    //fontWeight: 'bold',
    fontSize:'1.1rem',
    color: '#5A5A5A',
    textAlign:'center',
    marginLeft: '21.7vw',
    display:'inline-block',
    width:'60vw'
  }

  const divStyle ={
    marginTop: '3px',
    marginBottom:'3px',
  }

  return (
    <Navbar style={navbarStyle} collapseOnSelect expand="lg">
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <div  style={divStyle}>
            <div style={navStyle}>
            MQTT Server Realtime Monitering
            </div>
            <div style={navStyle2}>
              MQTT Message Topic & Subscription
            </div>   
          </div>
        
               
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;

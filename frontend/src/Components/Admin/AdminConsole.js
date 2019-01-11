import React, {Component} from 'react';
import {
  Icon,
  Card,
  Col,
  Row,
  Badge,
  Menu,
  Dropdown,
  Button,
  Modal,
  message,
  notification
} from 'antd';
import {cardStyles, vmCard} from '../../theme/styles';
import {Link} from "react-router-dom";
import {getInstances, getCompartments} from '../Server/Compartment';
import CompartmentCard from '../Cards/CompartmentCard';
import InstanceCard from '../Cards/InstanceCard';
import CredentialsModal from './Modals/CredentialsModal';
import Q from 'q';

var confirm = Modal.confirm;

class AdminConsole extends Component {
  constructor() {
    super();
    this.state = {
      colCount: 0,
      vms: null,
      credentials: false,
      compartment: false,
      loginType: 'O',
      compList: null,
      instances: null,
      compSelected: null,
  }
    this.getCompInstances = this.getCompInstances.bind(this);
    this.getCredentials = this.getCredentials.bind(this);
  }

  componentDidMount() {
    var that = this;
    //this.setState({ loginType: localStorage.getItem("loginType") });
    
    if (this.state.loginType === 'O') {
      that.getCompartment();
    }
  }


  getCredentials() {
    this.setState({credentials: true});
  }

  getCompInstances(com) {
    console.log(com);
    this.setState({ instances: null });
    this.setState({ compSelected: null });
    this.setState({ compSelected: com });
    var that = this;
    var instance = null;
    getInstances(com).then(response => {
      console.log(response);
      if (response === "Something went wrong.") {
        instance = 'none';
        message.warning('You do not have access to this compartment.');
        
      } else if (response['windows'].length > 0 || response['linux'].length > 0) {
        instance = response;
      } else {
        instance = 'none';
      }
        /*if (response['windows'][0]['token']) {
        instance = response;
        } else if (!response[0]['token'] && instance === 'none') { that.setState({ credentials: true }); }*/
      that.setState({ instances: instance });
      console.log(that.state.instances);
      
      }).catch(error => {
        return error;
      });
  }

  getCompartment() {
    var that = this;
    getCompartments().then(response => {
      console.log(response);
      
      if (response !== "Something went wrong.") {
        that.setState({ compList: response});
        console.log(that.state.compList);
      }

      if (that.state.compList.length <= 0) {
        that.setState({ compList: [{ name: 'none found', ocid:'none found' }] });
      }

      
    }).catch(error => {
      return '';
    });
  }
  



  render() {
    const cols = [];
    cols.push(
      <Col span={6}>
          <CompartmentCard title={this.state.compList} getCred={this.getCredentials} refreshOCI={(r) => this.getCompInstances(r)}/> 
      </Col>
    );
    if (this.state.compList && !this.state.compSelected) {
      console.log(1);
      return (<div>
        <Row gutter={12}>
          {cols}
        </Row>
      </div>
      );
  
    } else if (this.state.compList && !this.state.instances) {
      console.log(2);
      cols.push(
        <Col span={8}>
          <Button type="primary" size="large" loading>
            Looking for Instances
          </Button>
        </Col>
      );

      return (<div>
        <Row gutter={12}>
        {cols}
        </Row>
        <CredentialsModal credentials={this.state.credentials} comp={this.state.compSelected} getIns={(r) => this.getCompInstances(r)} />
      </div>
      );
  
    } else if (this.state.compList && this.state.instances === 'none') {
      console.log(3);
      return (<div>
        <Row gutter={12}>
          {cols}
        </Row>
        <CredentialsModal credentials={this.state.credentials} comp={this.state.compSelected} getIns={(r) => this.getCompInstances(r)} />
      </div>
      );
  
    } else if (this.state.instances) {
      console.log(4);
      var vms = this.state.instances;

      if (vms['linux'].length > 0) {
        let lvm = vms['linux']
        for (var i = 0; i < lvm.length; i++) {
          console.log(lvm[i]);
          cols.push(
            <Col span={6}>
              <InstanceCard
                title={lvm[i].name}
                vmID={lvm[i]['ip']}
                t={'c'}
                k={lvm[i]['key']}
                refreshOCI={(r) => this.getCompInstances(r)}
              />
            </Col>
          );
        }
      }
      if (vms['windows'].length > 0) {
        let wvm = vms['windows'];
        for (var i = 0; i < wvm.length; i++) {
          console.log(wvm[i]);
          cols.push(
            <Col span={6}>
              <InstanceCard
                title={wvm[i].name}
                vmID={wvm[i].token}
                t={'vm'}
                k={null}
                refreshOCI={(r) => this.getCompInstances(r)}
                comp={this.state.compSelected}
                cred={() => this.getCredentials()}
              />
              
            </Col>
          );
        }
      }
      
      return (
        <div>
          <Row gutter={12}>
            {cols}
          </Row>
          <CredentialsModal credentials={this.state.credentials} comp={this.state.compSelected} getIns={(r) => this.getCompInstances(r)} />
        </div>
      );
    } else {
      return (
        <Button type="primary" size="large" loading>
          Loading
        </Button>
    );
  }
}
  }

export default AdminConsole;
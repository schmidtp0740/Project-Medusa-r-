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
  Modal
} from 'antd';
import {cardStyles, vmCard} from '../../theme/styles';
import {Link} from "react-router-dom";
import vmImage from '../../theme/images/vm.png';
import {getUserVDI} from '../Server/Blueprint';
import CloneCard from '../Cards/CloneCard';
import Q from 'q';

var confirm = Modal.confirm;

class UserConsole extends Component {
  constructor() {
    super();
    this.state = {
      colCount: 0,
      vms: null
    }
    this.refreshVMS = this
      .refreshVMS
      .bind(this);
  }

  componentDidMount() {
    this.refreshVMS();
  }
  refreshVMS() {
    var that = this;
    getUserVDI().then(function (response) {
      console.log(response);
      that.setState({vms: response});
    });
  }

  render() {
    const cols = [];

    if (this.state.vms) {
      var vms = this.state.vms;
      for (var i = 0; i < vms.length; i++) {
        console.log(vms[i]);
        cols.push(
          <Col span={6}>
            <CloneCard
              title={vms[i].name}
              status={vms[i].status}
              vmID={vms[i].id}
              user={vms[i].assigned_user}
              refreshVMS={this.refreshVMS}/>
          </Col>
        );
      }
      return (
        <div>
          <Row gutter={12}>
            {cols}
          </Row>
        </div>
      );
    } else 
      return (
        <Button type="primary" size="large" loading>
          Loading VMs
        </Button>
      );
    }
  }

export default UserConsole;

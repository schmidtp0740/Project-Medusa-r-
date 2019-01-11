import React, {Component} from 'react';
import {
  Icon,
  Card,
  Badge,
  Dropdown,
  Button,
  Popover,
  InputNumber,
  Avatar,
  message,
  Pagination,
  Layout
} from 'antd';
import {cardStyles, vmCard, compCard, cardIcon} from '../../theme/styles';
import { Link } from "react-router-dom";
import { Table } from 'antd';
var FA = require('react-fontawesome');
const { Meta } = Card;
const {Sider} = Layout;

const columns = [
  { title: 'Compartments', dataIndex: 'name', key: 'name' },
];

class CompartmentSider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      compartmentOpen: false
    };
  }

  componentWillReceiveProps() {
    if (this.props.compartmentOpen !== this.state.compartmentOpen) {
      this.setState({ compartmentOpen: this.props.compartmentOpen });
    }
  }

  selectRow = (record) => {
    this.props.refreshOCI(record.ocid);
  }

  fired() {
    this.props.getCred();
  }


  render() {
    let tablePages = {
      simple: true,
      size: "small",
      pageSize: 8
    }
    return (

        <Card
          style={{compCard}}
          cover={
                  <Table
                    columns={columns}
                    expandedRowRender={record => <p style={{ margin: 0 }}>{record.ocid}</p>}
                    dataSource={this.props.title}
                    pagination={tablePages}
                    onRow={(record) => ({
                      onClick: () => {
                        this.selectRow(record);
                      },
                    })}
                  />}
          actions={[<Icon type="key" onClick={() => this.fired()}/>]}
        >
          
        </Card>

    );
  }
}

export default CompartmentSider;

/*<Meta
          avatar={<Icon style={{ fontSize: 32}} type="dropbox"/>}
          title="{Compartments}"
          description="Compartment"
        />*/
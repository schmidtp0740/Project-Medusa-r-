import React, {Component} from 'react';
import logo from '../../theme/images/logo.png';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Card,
  Layout,
  Row,
  Col,
  Menu,
  Tabs,
  Select,
  Upload,
  message
} from 'antd';
import Login from './Register';
import AdminConsole from '../Admin/AdminConsole';
import {registerOCI} from '../Server/LoginRegister';

import {cardStyles, contentStyles, medusa, headStyles} from '../../theme/styles';
import { Link, Redirect } from "react-router-dom";
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { TextArea } = Input;
const {Header, Content} = Layout;
const FormItem = Form.Item;



class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      registered: false,
      fileList: [],
      file: null,
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this
      .props
      .form
      .validateFields((err, values) => {
        //if (!err) {
          if (this.state.file !== null) {
            const { fileList } = this.state;
            const formData = new FormData();
            formData.append('username', values.userNameo);
            formData.append('password', values.passwordo);
            formData.append('user_ocid', values.userOcid);
            formData.append('fingerprint', values.fingerprint);
            formData.append('tenancy_ocid', values.tenancyOcid);
            formData.append('region', values.region);
            formData.append('file', this.state.file);
            console.log(formData);
            registerOCI(formData).then(a => {
              if (a === 'OK') {
                this.setState({ registered: true });
              }
            });
        }
      });
  }
  checkOPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('passwordo')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { uploading } = this.state;
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        console.log(file);
        var ft = file.name.split('.')[1];
        if (ft === 'pem') {
          this.setState({ fileList: [] });
          this.setState({ file: file });
          this.setState(({ fileList }) => ({
            fileList: [...fileList, file],
          }));
          return false;
        }
      },
      fileList: this.state.fileList,
    };

    return (
      <Layout>
        <Header style={headStyles}>
          <img src={logo} alt="" style={medusa}/>
        </Header>
        <Content style={contentStyles}>
          <Row>
            <Col span={6} offset={9}>
              <Card title="Register" bordered={false} style={cardStyles}>
              
                <Form onSubmit={this.handleSubmit} className="register-form">
                <FormItem>
                  {getFieldDecorator('userNameo', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your username!'
                      }
                    ]
                  })(
                    <Input
                      prefix={< Icon type = "user" style = {{ fontSize: 13 }}/>}
                      placeholder="Username"/>
                  )}
                </FormItem>
                <FormItem hasFeedback>
                  {getFieldDecorator('passwordo', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!'
                      }, {
                        validator: this.checkConfirm
                      }
                    ]
                  })(
                    <Input
                      prefix={< Icon type = "lock" style = {{ fontSize: 13 }}/>}
                      type="password"
                      placeholder="Password"/>
                  )}
                </FormItem>
                <FormItem hasFeedback>
                  {getFieldDecorator('confirmo', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your password!'
                      }, {
                        validator: this.checkOPassword
                      }
                    ]
                  })(
                    <Input
                      prefix={< Icon type = "lock" style = {{ fontSize: 13 }}/>}
                      type="password"
                      placeholder="Confirm Password"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('userOcid', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your User OCID!'
                      }
                    ]
                  })(
                    <TextArea placeholder="User OCID" rows={3} />
                  )}
                </FormItem>
                <FormItem hasFeedback>
                  {getFieldDecorator('fingerprint', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your fingerprint!'
                      }, {
                        validator: this.checkConfirm
                      }
                    ]
                  })(
                    <TextArea placeholder="Fingerprint" rows={2} />
                  )}
                </FormItem>
                <FormItem hasFeedback>
                  {getFieldDecorator('tenancyOcid', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your User OCID!'
                      }, {
                        validator: this.checkConfirm
                      }
                    ]
                  })(
                    <TextArea placeholder="Tenancy OCID" rows={3} />
                  )}
                </FormItem>
                <FormItem hasFeedback>
                  {getFieldDecorator('region', {
                    rules: [
                      {
                        required: true,
                        message: 'Must pick a region.'
                      }, {
                        validator: this.checkConfirm
                      }
                    ]
                  })(
                    <Select
                      placeholder="Select a Region"
                      onChange={this.handleSelectChange}
                    >
                      <Option value="us-phoenix-1">us-phoenix-1</Option>
                      <Option value="us-ashburn-1">us-ashburn-1</Option>
                    </Select>
                  )}
                  </FormItem>
                      <FormItem hasFeedback>
                  {getFieldDecorator('upload', {
                    rules: [
                      {
                        required: true,
                        message: 'Please upload private key!'
                      }, {
                        validator: this.checkConfirm
                      }
                    ]
                        })(
                          <div>

                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> Upload Private Key
                      </Button>
                    </Upload>
                  </div>
                  )}
                </FormItem> 
                <FormItem>
                  <Button type="primary" htmlType="submit">Register</Button>
                  <div>Or
                    <Link
                      style={{
                      marginLeft: 5
                    }}
                      to="/Login">Login</Link>
                  </div>
                </FormItem>
              </Form>
              </Card>
            </Col>
          </Row>
          {this.state.registered && (<Redirect to='/Login'/>)}
        </Content>
      </Layout>
    );
  }
}

const Register = Form.create()(RegisterForm);

export default Register;
import React from 'react';
import {Row, Col} from 'antd';

export default class DemoItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const props = this.props;
    return (
      <div className="demo-title">
        <Row>
          <Col span={12} className="demo-item-code">
            <div>{props.code}</div>
          </Col>
          <Col span={12} className="demo-item-preview">
            {props.children}
          </Col>
        </Row> 
      </div>
    )
  }
}
import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router';

const getSelectedKey = (props) => {
  let path = `/${props.type}`;
  if (props.doc) {
    path += `/${props.doc}`;
  }
  return path;
};

const createMenu = ({pageData, type}) => {
  const orderedKeys = Object.keys(pageData).sort((a, b) => {
    return pageData[a].meta.order - pageData[b].meta.order;
  });

  return orderedKeys.map((key) => {
    const toPath = getSelectedKey({type, doc: key});
    return (
      <Menu.Item key={toPath}>
        <Link to={toPath}>{pageData[key].meta.title}</Link>
      </Menu.Item>
    );
  });
};

export default function ArticleMenu(props) {
  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={[getSelectedKey(props)]}
      mode="inline"
    >
      {
        createMenu(props)
      }
    </Menu>
  );
}
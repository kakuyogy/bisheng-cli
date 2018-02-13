import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

const TYPE_PATTERN = /^\/([\w-]+)\/?/;

const createMenu = (routes) => {
  return routes.map((route) => {
    return (
      <Menu.Item key={route.path}>
      <Link to={route.path}>
      {
        route.icon ? <Icon type={route.icon}/> : null
      }{route.title}</Link>
      </Menu.Item>
    );
  });
};

const getSelectedKeys = (routes, type) => {
  for(let i = 0, len = routes.length; i < len; i++) {
    const route = routes[i];
    const matches = TYPE_PATTERN.exec(route.path);
    if(matches) {
      if(type === matches[1]) {
        return [route.path];
      }
    }
  }
  return [];
};

export default function Header(props) {
  return (
    <header>
      <Menu
        selectedKeys={getSelectedKeys(props.routes, props.type)}
        mode="horizontal"
      >
        {
          createMenu(props.routes)
        }
      </Menu>
    </header>
  );
}
import React from 'react';
import ArticleMenu from './ArticleMenu';
import ComponentMenu from './ComponentMenu';

export default function SideMenu(props) {
  return (
    props.isComponent 
      ? <ComponentMenu {...props}/> 
      : <ArticleMenu {...props}/>
  );
}
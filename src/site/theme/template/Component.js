import React from 'react';
import SideMenu from './Menu/SideMenu';
import PureArticle from './Content/PureArticle';

export default function Component(props) {
  return (
    <div id="doc">
      <aside id="aside">
        <SideMenu
          isComponent={props.isComponent}
          type={props.type}
          doc={props.doc}
          pageData={props.pageData}
          />
        </aside>
        <article id="article" className="pure-article">
          <PureArticle pageData={props.pageData} utils={props.utils}/>
        </article>  
    </div>
  );
}
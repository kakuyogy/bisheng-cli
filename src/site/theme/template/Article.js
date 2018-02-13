import React from 'react';
import SideMenu from './Menu/SideMenu';
import PureArticle from './Content/PureArticle';
import DemoArticle from './Content/DemoArticle';

export default function Article(props) {
  const curPageData = props.pageData[props.doc];
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
        {
          curPageData.api
            ? <DemoArticle pageData={curPageData} utils={props.utils} />
            : <PureArticle pageData={curPageData} utils={props.utils} />
        }
        </article>  
    </div>
      );
}
import React from 'react';
import Layout from './Layout';
// import SideMenu from './Menu/SideMenu';
import Article from './Article';
import Component from './Component';

export default class Doc extends React.Component {
  constructor(props) {
    super(props);
    this.headers = this.getHeaders(props.data, this.props.themeConfig.headers);
  }

  render() {
    const data = this.props.data;
    const {
      type,
      doc,
    } = this.props.params;
    const isComponent = type === 'component';
    return (
      <Layout headers={this.headers} type={type}>
        {
          isComponent
            ? <Component
              pageData={data[this.componentSource]}
              componentData={data[type]}
              type={type}
              doc={doc}
              isComponent 
              utils={this.props.utils}
              />
            : <Article 
            pageData={data[type]} 
            doc={doc}
            type={type} 
            utils={this.props.utils}
            />
        }
      </Layout>
    );
  }

  getHeaders(data, headers) {
    return headers.map((header) => {
      if (header.type) {
        if (header.type === 'home') {
          return {
            title: header.title,
            path: header.path,
            icon: header.icon,
          };
        } else {  // component
          this.componentSource = `__${header.source}__`;
          // 为了简化，暂定一定有source articles
          const doc = this.getHeader(data[this.componentSource]);
          return {
            title: header.title,
            path: `/component/${doc}`,
            icon: header.icon,
          };
        }
      } else { // articles
        const doc = this.getHeader(data[header.source]);
        return {
          title: header.title,
          path: `/${header.source}/${doc}`,
          icon: header.icon,
        };
      }
    });
  }

  getHeader(pageData) {
    // 找到最小order
    const articles = Object.keys(pageData).sort((a, b) => {
      return (pageData[a].meta.order - pageData[b].meta.order);
    });
    return articles[0];
  }
}
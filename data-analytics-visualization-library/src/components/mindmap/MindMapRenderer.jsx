import React from 'react';

import { Icon } from 'semantic-ui-react';

import $ from 'jquery'

class MindMapRenderer extends React.Component {

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    this.refresh();
  }

  refresh() {
    var freeMind = this.props.visualization.freeMind;

    var mind = {
      "meta": {
        "name": "MindMap",
        "author": "",
        "version": "1.0"
      },
      "format": "node_tree",
      "data": freeMind
    };

    var options = {
      container: 'jsmind_container',
      theme: 'nephrite',
      editable: false
    };
    this.jm = new window.jsMind(options);

    this.hachEvent(this.jm);
    this.hack(this.jm);

    this.jm.show(mind);
  }

  hachEvent(jm) {
    var self = this;
    jm.view.add_event(jm.view, 'click', function (e) {
      var element = e.target || window.event.srcElement;
      if (element.tagName.toLowerCase() === 'jmnode')
        self.redirect(element.attributes["nodeid"].value);
    })
  }

  redirect(nodeid) {
    if (!this.redirectMap) this.setUpRedirectMap();
    var url = this.redirectMap[nodeid];
    if (url) {
      window.open(url, '_blank');
    }
  }

  setUpRedirectMap() {
    this.redirectMap = {}
    this.traverseNode(this.props.visualization.freeMind);
  }

  traverseNode(node) {
    if (node.link && node.link.length > 0) this.redirectMap[node.id] = node.link;
    if (node.children && node.children.length > 0)
      node.children.forEach(element => {
        this.traverseNode(element);
      });
  }

  hack(jm) {

    var $w = window;
    var $d = $w.document;
    // var $g = function(id){return $d.getElementById(id);};
    var $c = function (tag) { return $d.createElement(tag); };
    var $t = function (n, t) { if (n.hasChildNodes()) { n.firstChild.nodeValue = t; } else { n.appendChild($d.createTextNode(t)); } };

    var $h = function (n, t) {
      if (t instanceof HTMLElement) {
        n.innerHTML = '';
        n.appendChild(t)
      } else {
        n.innerHTML = t;
      }
    };

    jm.view.create_node_element = function (node, parent_node) {
      var view_data = null;
      if ('view' in node._data) {
        view_data = node._data.view;
      } else {
        view_data = {};
        node._data.view = view_data;
      }

      var d = $c('jmnode');
      if (node.isroot) {
        d.className = 'root';
      } else {
        var d_e = $c('jmexpander');
        $t(d_e, '-');
        d_e.setAttribute('nodeid', node.id);
        d_e.style.visibility = 'hidden';
        parent_node.appendChild(d_e);
        view_data.expander = d_e;
      }
      if (!!node.topic) {
        if (this.opts.support_html) {
          $h(d, node.topic);
        } else {
          $t(d, node.topic);
        }
      }
      d.setAttribute('nodeid', node.id);
      d.style.visibility = 'hidden';

      if (node.data.link && node.data.link.length > 0)
        d.style.cursor = 'pointer';

      this._reset_node_custom_style(d, node.data);

      parent_node.appendChild(d);
      view_data.element = d;
    }
  }

  scrollTop () {
    var element = $("#jsmind_container .jsmind-inner");
    element.scrollTop(element.scrollTop() - 100);   
  }

  scrollBottom () {
    var element = $("#jsmind_container .jsmind-inner");
    element.scrollTop(element.scrollTop() + 100);   
  }

  scrollLeft () {
    var element = $("#jsmind_container .jsmind-inner");
    element.scrollLeft(element.scrollLeft() - 100);   
  }

  scrollRight () {
    var element = $("#jsmind_container .jsmind-inner");
    element.scrollLeft(element.scrollLeft() + 100);   
  }

  zoomIn = () => this.jm.view.zoomIn()

  zoomOut = () => this.jm.view.zoomOut()

  screenShot = () => this.jm.screenshot.shootDownload()

  render() {
    var style = {
      width: this.props.size.width + 'px',
      height: this.props.size.height + 'px'
    };

    return (
      <div className="mindmap-renderer" width={this.props.size.width} height={this.props.size.height}>
        <div id="jsmind_container" style={style}>
          <table style={{ position: 'absolute', zIndex: 10 }}>
            <tbody>
              <tr>
                <td></td>
                <td><Icon name="arrow up" onClick={this.scrollTop} style={{ cursor: 'pointer' }} /></td>
                <td></td>
              </tr>
              <tr>
                <td><Icon name="arrow left" onClick={this.scrollLeft} style={{ cursor: 'pointer' }} /></td>
                <td></td>
                <td><Icon name="arrow right" onClick={this.scrollRight} style={{ cursor: 'pointer' }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><Icon name="arrow down" onClick={this.scrollBottom} style={{ cursor: 'pointer' }} /></td>
                <td></td>
              </tr>
              <tr>
                <td><Icon name="zoom in" onClick={this.zoomIn} style={{ cursor: 'pointer' }} /></td>
                <td></td>
                <td><Icon name="zoom out" onClick={this.zoomOut} style={{ cursor: 'pointer' }} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

MindMapRenderer.defaultProps = {
  visualization: {

  }
};

export default MindMapRenderer;

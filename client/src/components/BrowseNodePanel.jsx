import React, { useState, useEffect } from "react";
import "react-toggle/style.css";

function BrowseNodePanel({
  browseNodeDetail,
  clickBrowseNode
}) {
  const [skipBool, setSkipBool] = useState(false);
  const [skipSubnodeBool, setSkipSubnodeBool] = useState(false);

  useEffect(() => {
    if (Object.keys(browseNodeDetail.data).length === 0) return;
    let bn_skipBool = browseNodeDetail.data.skip === 1 ? true : false;
    let bn_skipSubnodeBool =
      browseNodeDetail.data.skipSubnodes === 1 ? true : false;
    console.log("BN detail skip: ", browseNodeDetail.data.skip);
    console.log(
      `In UseEffect: Previous skipBool = ${skipBool} skipSubnodeBool = ${skipSubnodeBool}`
    );
    if (bn_skipBool !== skipBool) {
      console.log(
        " UseEffect: Setting skipBool since new value is different from old"
      );
      setSkipBool(bn_skipBool);
    }
    if (bn_skipSubnodeBool !== skipSubnodeBool) {
      setSkipSubnodeBool(bn_skipSubnodeBool);
    }
  }, [browseNodeDetail, skipBool, skipSubnodeBool]);

  function getHref(href) {
    if (!href) return "";
    if (href.startsWith("http")) {
      return href;
    } else {
      return "https://www.amazon.com" + href;
    }
  }
  function getChildNodesHtml(bndetail) {
    if (bndetail.data["children"]) {
      return bndetail.data.children.map(child => {
        if (child._id === 0) {
          return <div className="childname" key={child._id}></div>;
        }
        return (
          <div className="childname" key={child._id}>
            {child.name} (
            <div
              className="clickableNode"
              onClick={() => clickBrowseNode(child._id)}
            >
              {child._id}
            </div>
            )
          </div>
        );
      });
    } else {
      return <div></div>;
    }
  }
  console.log("BNN: ", browseNodeDetail);
  console.log("SKIP: ", skipBool);
  if (
    browseNodeDetail &&
    browseNodeDetail.data &&
    browseNodeDetail.data["name"]
  ) {
    return (
      <div>
        <div className="bnpanel-node">
          BrowseNode: {browseNodeDetail.data.name} (
          {browseNodeDetail.data._id})
        </div>
        <div className="bnpanel-parent">
          ParentNode: {browseNodeDetail.data.parentname} (
          <div
            className="clickableNode"
            onClick={() => clickBrowseNode(browseNodeDetail.data.parent)}
          >
            {browseNodeDetail.data.parent}
          </div>
          )
        </div>
        <br></br>
        <div className="inline">ChildNodes: </div>
        {getChildNodesHtml(browseNodeDetail)}
        <div>
          Link:
          <div className="bnpanel-link">
            <a href={getHref(browseNodeDetail.data.href)}>
              {getHref(browseNodeDetail.data.href)}
            </a>
          </div>
        </div>
        <div>Last Scan Date: {browseNodeDetail.data.lastDate}</div>
        <div>Last Scan # Items: {browseNodeDetail.data.scanNumItems}</div>
        <div>
          Valid:
          {browseNodeDetail.data.valid}
        </div>
      </div>
    );
  } else {
    return <div>No Browsenode</div>;
  }
}

export default BrowseNodePanel;

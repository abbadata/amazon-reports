import React, { useState, useEffect } from "react";
import ReportOutput from "./components/ReportOutput";
import "./Reports.css";
import BrowseNodePanel from "./components/BrowseNodePanel";
import AmazonItemDetailsPanel from "./components/AmazonItemDetailsPanel";
import Spinner from "react-bootstrap/Spinner";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Reports = () => {
  const [reportData, setReportData] = useState({ data: [] });
  const [percentFromList, setPercentFromList] = useState(-40);
  const [productNameKeyword, setProductNameKeyword] = useState("");
  const [browseNodeDetail, setBrowseNodeDetail] = useState({ data: {} });
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [browseNode, setBrowseNode] = useState("");
  const [itemDetail, setItemDetail] = useState({ data: {} });
  const [outputTabIndex, setOutputTabIndex] = useState(0);
  useEffect(() => {
    document.title = "Amazon Reports";
  }, []);


  function clickReportAmazonPercentFromList() {
    setLoadingStatus(true);
    fetch(process.env.REACT_APP_REPORT_SERVER_URL + "/percentfromlist/" + percentFromList)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLoadingStatus(false);
        setReportData({ data: json, type: "PERCENT_FROM_LIST" });
      });
  }
  function clickReportAmazonNameKeywordQuery() {
    var url = new URL(process.env.REACT_APP_REPORT_SERVER_URL + "/namekeywordquery");
    var params = { keyword: productNameKeyword };
    url.search = new URLSearchParams(params).toString();
    setLoadingStatus(true);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLoadingStatus(false);
        setReportData({ data: json, type: "NAME_KEYWORD_QUERY" });
      });
  }
  function clickBrowseNodeProductSearch() {
    setLoadingStatus(true);
    fetch(process.env.REACT_APP_REPORT_SERVER_URL + "/browsenodeproducts/" + browseNode)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLoadingStatus(false);
        setReportData({ data: json, type: "BROWSENODE_QUERY" });
      });
  }

  function clickBrowseNode(bn) {
    setLoadingStatus(true);
    fetch(process.env.REACT_APP_REPORT_SERVER_URL + "/browsenode/" + bn)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLoadingStatus(false);
        setBrowseNodeDetail({ data: json });
        setOutputTabIndex(1);
      });
  }

  function clickGetItemDetails(asin) {
    setLoadingStatus(true);
    fetch(process.env.REACT_APP_REPORT_SERVER_URL + "/item/" + asin)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLoadingStatus(false);
        setItemDetail({ data: json });
        setOutputTabIndex(0);
      });
  }

  function getLoadingStatus() {
    if (loadingStatus) {
      return (
        <div className="loadingStatus">
          <Spinner animation="border" variant="dark" size="sm" /> Loading...
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  return (
    <div className="reporttop">
      <div className="reportmain">
        <div className="toppanel">
          <div className="reportselectpanel">
            <div className="panel-header">Select Report Type</div>
            <Tabs
              selectedTabClassName="output-tab-selected"
              disabledTabClassName="output-tab-disabled"
            >
              <TabList style={{ marginBottom: "2px" }}>
                <Tab style={{ paddingTop: "2px", paddingBottom: "0px" }}>
                  % from List
                </Tab>
                <Tab style={{ paddingTop: "2px", paddingBottom: "0px" }}>
                  Misc
                </Tab>
              </TabList>
              <TabPanel>
                <div>
                  <label htmlFor="percent_from_list">Percent from List:</label>
                  <input
                    id="percent_from_list"
                    type="text"
                    value={percentFromList}
                    onChange={(evt) => {
                      setPercentFromList(evt.target.value);
                    }}
                  ></input>
                </div>
                <div className="button-div">
                  <input
                    type="button"
                    className="report-button"
                    onClick={clickReportAmazonPercentFromList}
                    value="Get Report"
                  ></input>
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  <label htmlFor="product_name_keyword">
                    Product Name Keyword:
                  </label>
                  <input
                    id="Product_name_keyword"
                    type="text"
                    value={productNameKeyword}
                    onChange={(evt) => {
                      setProductNameKeyword(evt.target.value);
                    }}
                  ></input>
                  <input
                    type="button"
                    className="report-button"
                    onClick={clickReportAmazonNameKeywordQuery}
                    value="Go"
                  ></input>
                </div>
                <div>
                  <label htmlFor="browsenode">Browsenode:</label>
                  <input
                    id="browsenode"
                    type="text"
                    value={browseNode}
                    onChange={(evt) => {
                      setBrowseNode(evt.target.value);
                    }}
                  ></input>
                  <input
                    type="button"
                    className="report-button"
                    onClick={clickBrowseNodeProductSearch}
                    value="Go"
                  ></input>
                </div>
              </TabPanel>
            </Tabs>
          </div>
          <div className="browsenodepanel">
            {getLoadingStatus()}
            <Tabs
              className="panel-tabs"
              selectedIndex={outputTabIndex}
              onSelect={(tabIndex) => setOutputTabIndex(tabIndex)}
              selectedTabClassName="output-tab-selected"
              disabledTabClassName="output-tab-disabled"
            >
              <TabList style={{ marginBottom: "2px" }}>
                <Tab style={{ paddingTop: "2px", paddingBottom: "0px" }}>
                  Item
                </Tab>
                <Tab style={{ paddingTop: "2px", paddingBottom: "0px" }}>
                  Browsenode
                </Tab>
              </TabList>
              <TabPanel>
                <AmazonItemDetailsPanel
                  itemDetail={itemDetail}
                  clickGetItemDetails={clickGetItemDetails}
                ></AmazonItemDetailsPanel>
              </TabPanel>
              <TabPanel>
                <BrowseNodePanel
                  browseNodeDetail={browseNodeDetail}
                  clickBrowseNode={clickBrowseNode}
                ></BrowseNodePanel>
              </TabPanel>
            </Tabs>
          </div>
        </div>
        <div className="reportpanel">
          <ReportOutput
            reportData={reportData}
            clickBrowseNode={clickBrowseNode}
            clickGetItemDetails={clickGetItemDetails}
          ></ReportOutput>
        </div>
      </div>
    </div>
  );
};

export default Reports;

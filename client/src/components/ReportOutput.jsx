import React from "react";

import ReportSimpleProductList from "./ReportSimpleProductList";

const ReportOutput = ({
  reportData,
  clickBrowseNode,
  clickGetItemDetails,
  clickEbayLookup,
}) => {
  if (reportData.type === "PERCENT_FROM_LIST") {
    return (
      <ReportSimpleProductList
        reportData={reportData}
        clickBrowseNode={clickBrowseNode}
        clickGetItemDetails={clickGetItemDetails}
        clickEbayLookup={clickEbayLookup}
      ></ReportSimpleProductList>
    );
  } else if (reportData.type === "NAME_KEYWORD_QUERY") {
    return (
      <ReportSimpleProductList
        reportData={reportData}
        clickBrowseNode={clickBrowseNode}
        clickGetItemDetails={clickGetItemDetails}
        clickEbayLookup={clickEbayLookup}
      ></ReportSimpleProductList>
    );
  } else if (reportData.type === "BROWSENODE_QUERY") {
    return (
      <ReportSimpleProductList
        reportData={reportData}
        clickBrowseNode={clickBrowseNode}
        clickGetItemDetails={clickGetItemDetails}
        clickEbayLookup={clickEbayLookup}
      ></ReportSimpleProductList>
    );
  } else {
    return <div></div>;
  }
};

export default ReportOutput;

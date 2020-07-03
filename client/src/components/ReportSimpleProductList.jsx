import React from "react";
import styled from "styled-components";
import { useTable, useSortBy } from "react-table";

const Styles = styled.div`
  padding: 0;

  table {
    border-spacing: 0;
    border: 1px solid black;
    font-size: 80%;

    thead tr th {
      position: sticky;
      top: -1px;
      background-color: #666;
      color: #fff;
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.1rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    );

    // limit to 2000
    const firstPageRows = rows.slice(0, 2000);

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? " 🔽"
                                                : " 🔼"
                                            : ""}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {firstPageRows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

const ReportSimpleProductList = ({
    reportData,
    clickBrowseNode,
    clickGetItemDetails,
}) => {
    const columns = React.useMemo(
        () => [
            {
                Header: "ASIN",
                accessor: "_id",
                Cell: ({ cell: { value } }) => (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={"https://www.amazon.com/Amazon/dp/" + value}
                    >
                        {value}
                    </a>
                ),
            },
            {
                Header: "First Date",
                accessor: "history[0].dt",
                Cell: ({ cell: { value } }) => {
                    if (value) {
                        return value.slice(0, 10);
                    } else {
                        return "";
                    }
                },
            },
            {
                Header: "$ Curr",
                accessor: "price",
                Cell: ({ cell: { value } }) => {
                    if (value) {
                        let dollars = value / 100;
                        return dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
                    } else {
                        return "";
                    }
                },
            },
            {
                Header: "Shipper",
                accessor: "detail.shipper",
            },
            {
                Header: "Brand",
                accessor: "brand",
            },
            {
                Header: "Product Name",
                accessor: (originalRow, rowIndex) => {
                    return originalRow;
                },
                Cell: ({ cell: { value } }) => (
                    <div
                        className="browsenode"
                        onClick={() => {
                            clickGetItemDetails(value._id);
                        }}
                    >
                        {value.name}
                    </div>
                ),
            },
            {
                Header: "$ List",
                accessor: "list",
                Cell: ({ cell: { value } }) => {
                    if (value === 0.00001) {
                        return "";
                    } else if (value) {
                        let dollars = value / 100;
                        return dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
                    } else {
                        return "";
                    }
                },
            },
            {
                Header: "$ High",
                accessor: "max",
                Cell: ({ cell: { value } }) => {
                    if (value) {
                        let dollars = value / 100;
                        return dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
                    } else {
                        return "";
                    }
                },
            },
            {
                Header: "Scan Date",
                accessor: "scandt",
                Cell: ({ cell: { value } }) => {
                    if (value) { return value.slice(0, 10) }
                    else { return "" }
                },
            },
            {
                Header: "% From List",
                accessor: "pflist",
                Cell: ({ cell: { value } }) =>
                    (Math.round(value * 100) / 100).toFixed(2),
            },
            {
                Header: "Coupon",
                accessor: "cpn",
            },
            {
                Header: "Browsenode",
                accessor: "browsenode[0]",
                Cell: ({ cell: { value } }) => (
                    <div
                        className="browsenode"
                        onClick={() => {
                            clickBrowseNode(value);
                        }}
                    >
                        {value}
                    </div>
                ),
            },
        ],
        []
    );
    const data = React.useMemo(() => reportData.data, [reportData]);

    return (
        <Styles>
            <Table columns={columns} data={data} />
        </Styles>
    );
};

export default ReportSimpleProductList;

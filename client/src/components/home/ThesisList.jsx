import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import thesisData from "../data/sample-data";
import { Column } from "primereact/column";

const ThesisList = () => {
  const [thesis, setThesis] = useState([]);

  const columns = [
    {
      field: "thesisId",
      header: "Thesis ID",
      style: "3rem",
      resizeable: false,
      justifyContent: "center",
    },
    { field: "title", header: "Title", style: "50rem", justifyContent: "left" },
    {
      field: "yearLevel",
      header: "Year Level",
      style: "3rem",
      justifyContent: "center",
    },
    {
      field: "section",
      header: "Section",
      style: "3rem",
      justifyContent: "center",
    },
    {
      field: "yearPublished",
      header: "Year Published",
      style: "3rem",
      justifyContent: "center",
    },
    {
      field: "authors",
      header: "Authors",
      style: "20rem",
      justifyContent: "left",
    },
    {
      field: "panelists",
      header: "Panelists",
      style: "15rem",
      justifyContent: "left",
    },
    {
      field: "copies",
      header: "Copies",
      style: "3rem",
      justifyContent: "center",
    },
    {
      field: "volume",
      header: "Volume",
      style: "3rem",
      justifyContent: "center",
    },
    {
      field: "grades",
      header: "Grades",
      style: "3rem",
      justifyContent: "center",
    },
    {
      field: "keywords",
      header: "Keywords",
      style: "15rem",
      justifyContent: "center",
    },
    {
      field: "adviser",
      header: "Adviser",
      style: "8rem",
      justifyContent: "center",
    },
    {
      field: "chairperson",
      header: "Chairperson",
      style: "8rem",
      justifyContent: "center",
    },
    { field: "dean", header: "Dean", style: "8rem", justifyContent: "center" },
  ];

  useEffect(() => {
    setThesis([...thesisData]);
  }, []);

  const loopColumns = columns.map((col) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        headerStyle={{ justifyContent: "center", padding: "2rem" }}
        style={{ minWidth: col.style, justifyContent: col.justifyContent }}
        resizeable={col.resizeable}
      />
    );
  });

  return (
    <div className="p-4">
      <DataTable
        value={thesis}
        scrollable
        scrollHeight="500px"
        resizableColumns
        columnResizeMode="expand"
        responsiveLayout="scroll"
        dataKey="thesisId"
        size="large"
        rows={10}
        showGridlines
        stripedRows
      >
        {loopColumns}
      </DataTable>
    </div>
  );
};

export default ThesisList;

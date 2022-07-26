import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import thesisData from "../data/sample-data";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";

const ThesisList = () => {
  const [thesis, setThesis] = useState([]);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const customPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const pageTemplate = {
    layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
    RowsPerPageDropdown: (options) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
      ];

      return (
        <>
          <span className="mx-1 text-stone-400 select-none">
            Items per page:{" "}
          </span>
          <Dropdown
            value={options.value}
            options={dropdownOptions}
            onChange={options.onChange}
          />
        </>
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span className="text-stone-400 select-none text-center w-[120px]">
          {options.first} - {options.last} of {options.totalRecords}
        </span>
      );
    },
  };

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
      field: "course",
      header: "Course",
      style: "20rem",
      justifyContent: "left",
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
        headerStyle={{ justifyContent: "center", padding: "1rem 2rem" }}
        style={{
          minWidth: col.style,
          justifyContent: col.justifyContent,
          whiteSpace: "normal",
        }}
        resizeable={col.resizeable}
        sortable
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
        rows={rows}
        showGridlines
        stripedRows
        paginator
        paginatorTemplate={pageTemplate}
        first={first}
        onPage={customPage}
        sortMode="single"
      >
        {loopColumns}
      </DataTable>
    </div>
  );
};

export default ThesisList;

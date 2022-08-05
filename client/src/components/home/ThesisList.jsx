import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import thesisData from "../data/sample-data";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { ConfirmDialog } from "primereact/confirmdialog"; // To use <ConfirmDialog> tag
import { confirmDialog } from "primereact/confirmdialog"; // To use confirmDialog method
import Highlighter from "react-highlight-words";
import AddThesis from "../create-thesis/AddThesis";
const { jsPDF } = require("jspdf");

const ThesisList = () => {
  const [thesis, setThesis] = useState([]);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [expandedRows, setExpandedRows] = useState(null);

  const [addThesis, setAddThesis] = useState(false);
  const [updateThesis, setUpdateThesis] = useState(false);
  const [selectedThesis, setSelectedThesis] = useState("");
  // const [deleteThesis, setDeleteThesis] = useState(false);

  // Toggle States
  const toggleAddButton = () => setAddThesis((p) => !p);
  const toggleUpdateButton = () => setUpdateThesis((p) => !p);
  // const toggleDeleteButton = () => setDeleteThesis((p) => !p);

  // Search Box
  const renderHeader = () => {
    return (
      <div className="flex align-items-center gap-4">
        <Button
          className="p-button-outlined"
          icon="pi pi-filter-slash"
          onClick={clearFilter}
          tooltip="Clear"
          tooltipOptions={{ position: "bottom" }}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            placeholder="Search"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
          />
        </span>
        <Button
          type="button"
          icon="pi pi-file-pdf"
          onClick={exportPdf}
          className="p-button-warning"
          tooltip="PDF"
          tooltipOptions={{ position: "bottom" }}
        />
        <Button
          type="button"
          icon="pi pi-file-excel"
          onClick={exportExcel}
          tooltip="Excel"
          tooltipOptions={{ position: "bottom" }}
        />
        <Button
          type="button"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={toggleAddButton}
          tooltip="Add"
          tooltipOptions={{ position: "bottom" }}
        />
      </div>
    );
  };

  // Action Buttons
  const actionTemplate = (row) => {
    return (
      <div className="flex gap-2 justify-center">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success"
          onClick={() => {
            setSelectedThesis(row);
            toggleUpdateButton();
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirm(row)}
        />
      </div>
    );
  };

  //Delete Dialog
  const confirm = (row) => {
    confirmDialog({
      message: `Are you sure you want to delete "${row.title}"?`,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => console.log(row),
      // reject: () => rejectFunc(),
    });
  };

  // The function who checks if the input matches the Filters (check initFilter()).
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;

    let _filter = { ...filters };
    _filter["global"].value = value;
    setFilters(_filter);
    setGlobalFilterValue(value);
  };

  // Set the Filters while Searching
  const initFilter = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      thesisId: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      title: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      course: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      yearLevel: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      section: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      yearPublished: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      authors: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      panelists: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      copies: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      volume: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      grades: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      keywords: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      adviser: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      chairperson: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      dean: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });
    setGlobalFilterValue("");
  };

  // Resetting the Table and Filters
  const clearFilter = () => {
    initFilter();
  };

  // For Start Page No. and No. of Rows
  const customPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  // Pagination Template
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

  //Exporting Functions
  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(thesis);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "researchTitle");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        const EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const exportPdf = () => {
    import("jspdf-autotable").then(() => {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "in",
      });
      doc.autoTable(exportColumns, thesis);
      doc.save("thesis.pdf");
    });
  };

  const columns = [
    {
      field: "thesisId",
      header: "Thesis ID",
      style: "3rem",
      justifyContent: "center",
    },
    {
      field: "title",
      header: "Title",
      style: "40rem",
      justifyContent: "left",
    },
    {
      field: "course",
      header: "Course",
      style: "20rem",
      justifyContent: "left",
    },
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
    {
      field: "dean",
      header: "Dean",
      style: "8rem",
      justifyContent: "center",
    },
  ];

  const exportColumns = columns.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const rowExpansionTemplate = (data) => {
    return (
      <Card
        className="p-4 w-[24rem] whitespace-normal break-words md:w-[70rem]"
        title={data.title}
        subTitle="Abstract"
      >
        <div>{data.abstract}</div>
      </Card>
    );
  };

  useEffect(() => {
    setThesis([...thesisData]);
    setLoading(false);
    initFilter();
  }, []);

  const loopColumns = columns.map((col) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        headerStyle={{
          justifyContent: "center",
          padding: "1rem 2rem",
          wordBreak: "normal",
        }}
        style={{
          minWidth: col.style,
          justifyContent: col.justifyContent,
          whiteSpace: "normal",
          wordBreak: "break-all",
        }}
        body={(rowData) => (
          <Highlighter
            searchWords={[globalFilterValue]}
            textToHighlight={rowData[col.field].toString()}
            highlightClassName="searchResult"
            autoEscape={true}
          />
        )}
        sortable
        filter
      />
    );
  });

  return (
    <div className="p-4 w-full h-[45rem] md:h-screen">
      <DataTable
        value={thesis}
        scrollable
        scrollHeight="flex"
        resizableColumns
        columnResizeMode="expand"
        responsiveLayout="scroll"
        dataKey="thesisId"
        size="small"
        rows={rows}
        showGridlines
        stripedRows
        paginator
        paginatorTemplate={pageTemplate}
        first={first}
        onPage={customPage}
        sortMode="single"
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={[
          "thesisId",
          "title",
          "yearLevel",
          "section",
          "course",
          "yearPublished",
          "authors",
          "panelists",
          "copies",
          "volume",
          "grades",
          "keywords",
          "adviser",
          "chairperson",
          "dean",
        ]}
        header={renderHeader}
        loading={loading}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={(e) => rowExpansionTemplate(e)}
      >
        <Column
          expander
          headerStyle={{
            justifyContent: "center",
            padding: "1rem 1.5rem",
          }}
          style={{
            minWidth: "2rem",
            justifyContent: "center",
          }}
          resizeable={false}
        />
        <Column
          headerStyle={{
            justifyContent: "center",
            padding: "1rem 2rem",
            wordBreak: "normal",
          }}
          body={(rowData) => actionTemplate(rowData)}
          style={{ minWidth: "1rem", justifyContent: "center" }}
          resizeable={false}
        />
        {loopColumns}
      </DataTable>

      <ConfirmDialog />

      {addThesis && <AddThesis show={addThesis} toggle={toggleAddButton} />}
      {updateThesis && (
        <AddThesis
          show={updateThesis}
          toggle={toggleUpdateButton}
          thesis={selectedThesis}
        />
      )}
    </div>
  );
};

export default ThesisList;

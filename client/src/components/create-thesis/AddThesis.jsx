import React, { useState, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import * as yup from "yup";

const AddThesis = ({ show, toggle, thesis }) => {
  const validationSchema = yup.object().shape({
    title: yup.string().required("Please fill out this field."),
    course: yup.string().required("Please fill out this field."),
    yearLevel: yup.string().required("Please fill out this field."),
    section: yup.string().required("Please fill out this field."),
    yearPublished: yup.string().required("Please fill out this field."),
    authors: yup.string().required("Please fill out this field."),
    panelists: yup.string().required("Please fill out this field."),
    copies: yup.string().required("Please fill out this field."),
    volume: yup.string().required("Please fill out this field."),
    grades: yup.string().required("Please fill out this field."),
    keywords: yup.string().required("Please fill out this field."),
    adviser: yup.string().required("Please fill out this field."),
    chairperson: yup.string().required("Please fill out this field."),
    dean: yup.string().required("Please fill out this field."),
    abstract: yup.string().required("Please fill out this field."),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      course: "",
      yearLevel: 2,
      section: 1,
      yearPublished: 2022,
      authors: "",
      panelists: "",
      copies: "",
      volume: "",
      grades: "",
      keywords: "",
      adviser: "",
      chairperson: "",
      dean: "",
      abstract: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
    },
  });

  const isFieldValid = (fieldName) =>
    formik.touched[fieldName] && formik.errors[fieldName];

  const getErrorMessage = (error) => {
    return (
      isFieldValid(error) && (
        <p className="text-red-500 text-xs italic">{formik.errors[error]}</p>
      )
    );
  };

  return (
    <Dialog
      visible={show}
      style={{ width: "700px" }}
      header={thesis ? thesis.title : "Add Thesis"}
      modal
      className="p-fluid"
      onHide={toggle}
    >
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="flex flex-wrap -mx-3 mt-2 mb-6 gap-y-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
              Title
            </label>
            <InputText
              className={
                isFieldValid("title")
                  ? "!border-2 !border-red-600"
                  : "input-decorator"
              }
              id="title"
              placeholder="Enter title here"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {getErrorMessage("title")}
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
              Course
            </label>
            <InputText
              className={
                isFieldValid("course")
                  ? "!border-2 !border-red-600"
                  : "input-decorator"
              }
              id="course"
              placeholder="Enter course here"
              value={formik.values.course}
              onChange={formik.handleChange}
            />
            {getErrorMessage("course")}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 gap-y-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
              Authors
            </label>
            <InputText
              className={
                isFieldValid("authors")
                  ? "!border-2 !border-red-600"
                  : "input-decorator"
              }
              id="authors"
              type="text"
              placeholder="Enter authors name here"
              value={formik.values.authors}
              onChange={formik.handleChange}
            />
            {getErrorMessage("authors")}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
              Panelist
            </label>
            <InputText
              className={
                isFieldValid("panelist")
                  ? "!border-2 !border-red-600"
                  : "input-decorator"
              }
              id="panelists"
              type="text"
              placeholder="Enter panelist name here"
              value={formik.values.panelists}
              onChange={formik.handleChange}
            />
            {getErrorMessage("panelists")}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 gap-y-6">
          <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
              Year Level
            </label>
            <div className="relative">
              <select
                className="select-decorator"
                id="yearLevel"
                value={formik.values.yearLevel}
                onChange={formik.handleChange}
              >
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <i className="pi pi-angle-down" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
              Section
            </label>
            <div className="relative">
              <select
                className="select-decorator"
                id="section"
                value={formik.values.section}
                onChange={formik.handleChange}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <i className="pi pi-angle-down" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
              Year Published
            </label>
            <div className="relative">
              <select
                className="select-decorator"
                id="yearPublished"
                value={formik.values.yearPublished}
                onChange={formik.handleChange}
              >
                <option value={2022}>2022</option>
                <option value={2021}>2021</option>
                <option value={2020}>2020</option>
                <option value={2019}>2019</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <i className="pi pi-angle-down" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 gap-y-6">
          <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
              Copies
            </label>
            <InputText
              className={
                isFieldValid("copies")
                  ? "!border-2 !border-red-600"
                  : "input-decorator"
              }
              id="copies"
              placeholder="Enter no. of copies"
              type="number"
              value={formik.values.copies}
              onChange={formik.handleChange}
            />
            {getErrorMessage("copies")}
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
              Volume
            </label>
            <InputText
              className={
                isFieldValid("volume")
                  ? "!border-2 !border-red-600"
                  : "input-decorator"
              }
              id="volume"
              placeholder="Enter volume no."
              type="number"
              value={formik.values.volume}
              onChange={formik.handleChange}
            />
            {getErrorMessage("volume")}
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
              Grades
            </label>
            <InputText
              className={
                isFieldValid("grades")
                  ? "!border-2 !border-red-600"
                  : "input-decorator"
              }
              id="grades"
              placeholder="Enter grade"
              type="number"
              value={formik.values.grades}
              onChange={formik.handleChange}
            />
            {getErrorMessage("grades")}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 gap-y-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
              Keywords
            </label>
            <InputText
              className={
                isFieldValid("keywords")
                  ? "!border-2 !border-red-600"
                  : "input-decorator"
              }
              id="keywords"
              placeholder="Enter keywords here"
              value={formik.values.keywords}
              onChange={formik.handleChange}
            />
            {getErrorMessage("keywords")}
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
              Adviser
            </label>
            <InputText
              className={
                isFieldValid("adviser")
                  ? "!border-2 !border-red-600"
                  : "input-decorator"
              }
              id="adviser"
              placeholder="Enter adviser here"
              value={formik.values.adviser}
              onChange={formik.handleChange}
            />
            {getErrorMessage("adviser")}
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
              Chairperson
            </label>
            <InputText
              className={
                isFieldValid("chairperson")
                  ? "!border-2 !border-red-600"
                  : "input-decorator"
              }
              id="chairperson"
              placeholder="Enter chairperson here"
              value={formik.values.chairperson}
              onChange={formik.handleChange}
            />
            {getErrorMessage("chairperson")}
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
              Dean
            </label>
            <InputText
              className={
                isFieldValid("dean")
                  ? "!border-2 !border-red-600"
                  : "input-decorator"
              }
              id="dean"
              placeholder="Enter dean here"
              value={formik.values.dean}
              onChange={formik.handleChange}
            />
            {getErrorMessage("dean")}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
              Abstract
            </label>
            <InputTextarea
              className={
                isFieldValid("abstract")
                  ? "!border-2 !border-red-600"
                  : "input-decorator"
              }
              id="abstract"
              placeholder="Enter abstract here"
              value={formik.values.abstract}
              onChange={formik.handleChange}
            />
            {getErrorMessage("abstract")}
          </div>
        </div>
        <div className="flex justify-end">
          <div>
            <button
              className="shadow bg-pink-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded disabled:opacity-50 enabled:hover:bg-pink-400"
              type="submit"
              disabled={!(formik.dirty && formik.isValid)}
            >
              Add Thesis Title
            </button>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default AddThesis;

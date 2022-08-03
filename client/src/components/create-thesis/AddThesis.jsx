import React, { useState, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const AddThesis = ({ show, toggle }) => {
  return (
    <Dialog
      visible={show}
      style={{ width: "700px" }}
      header="Thesis Details"
      modal
      className="p-fluid"
      onHide={toggle}
    >
      <form className="w-full">
        <div className="flex flex-wrap -mx-3 mb-6 gap-y-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Title
            </label>
            <InputText
              className="input-decorator"
              id="grid-password"
              placeholder="Enter title here"
            />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Course
            </label>
            <InputText
              className="input-decorator"
              id="grid-password"
              placeholder="Enter course here"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Authors
            </label>
            <InputText
              className="input-decorator"
              id="grid-first-name"
              type="text"
              placeholder="Jane"
            />
            {/* <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p> */}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Panelist
            </label>
            <InputText
              className="input-decorator"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Year Level
            </label>
            <div className="relative">
              <select className="select-decorator" id="grid-state">
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <i className="pi pi-angle-down" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Section
            </label>
            <div className="relative">
              <select className="select-decorator" id="grid-state">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <i className="pi pi-angle-down" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Year Published
            </label>
            <div className="relative">
              <select className="select-decorator" id="grid-state">
                <option>2022</option>
                <option>2021</option>
                <option>2019</option>
                <option>2018</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <i className="pi pi-angle-down" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Copies
            </label>
            <InputText
              className="input-decorator"
              placeholder="Copies"
              type="number"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Volume
            </label>
            <InputText
              className="input-decorator"
              id="grid-city"
              placeholder="Volume"
              type="number"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Grades
            </label>
            <InputText
              className="input-decorator"
              id="grid-city"
              placeholder="Grade"
              type="number"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 gap-y-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Keywords
            </label>
            <InputText
              className="input-decorator"
              id="grid-password"
              placeholder="Enter keywords here"
            />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Adviser
            </label>
            <InputText
              className="input-decorator"
              id="grid-password"
              placeholder="Enter adviser here"
            />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Chairperson
            </label>
            <InputText
              className="input-decorator"
              id="grid-password"
              placeholder="Enter chairperson here"
            />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Dean
            </label>
            <InputText
              className="input-decorator"
              id="grid-password"
              placeholder="Enter dean here"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 gap-y-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Abstract
            </label>
            <InputTextarea
              className="input-decorator"
              id="grid-password"
              placeholder="Enter abstract here"
            />
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default AddThesis;

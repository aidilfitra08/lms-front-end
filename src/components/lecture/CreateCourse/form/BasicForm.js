import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function BasicForm(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [courseLanguage, setCourseLanguage] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    props.setBasicFormData({
      title: title,
      shortDescription: shortDescription,
      description: description,
      courseLanguage: courseLanguage,
      category: category,
    });
  }, [title, shortDescription, description, courseLanguage, category]);
  return (
    <div className="col-span-1">
      <p>Basic Information</p>
      <div>
        <div className="fi"></div>
        <label htmlFor="courseTitle">Course Title</label>
        <input
          id="courseTitle"
          name="courseTitle"
          type="text"
          autoComplete="courseTitle"
          required
          className="block"
          placeholder="Course Title"
          value={props.basicFormData.title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="shortDescription">Short Description</label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          rows={4}
          cols={30}
          autoComplete="shortDescription"
          required
          className="block"
          onChange={(event) => setShortDescription(event.target.value)}
        />
        <label htmlFor="Description">Description</label>
        <textarea
          id="description"
          name="Description"
          rows={4}
          cols={30}
          autoComplete="Description"
          required
          className="block"
          onChange={(event) => setDescription(event.target.value)}
        />
        <div className="grid grid-cols-2">
          {/* <div className=" col-span-1">
            <label htmlFor="courseTitle">Course Level</label>
            <input
              id="courseLevel"
              name="courseLevel"
              type="text"
              autoComplete="courseLevel"
              required
              className="block"
            />
          </div> */}
          <div className=" col-span-1">
            <label htmlFor="courseTitle">Course Language</label>
            <input
              id="languange"
              name="languange"
              type="text"
              autoComplete="languange"
              required
              className="block"
              onChange={(event) => setCourseLanguage(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="sectionType">Course Category</label>
            <select
              id="sectionType"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event) => setCategory(event.target.value)}
            >
              <option selected>Choose category</option>
              <option value="1">Marketing Management</option>
              <option value="2">Social Media Marketing</option>
              <option value="3">Creative Copywriting</option>
              <option value="4">Facebook Ads</option>
              <option value="5">TikTok Ads</option>
              <option value="6">Google Ads</option>
              <option value="7">Influencer and Community Marketing</option>
              <option value="8">Search Engine Optimization</option>
              <option value="9">App Store Optimization</option>
              <option value="10">Customer Relationship Management</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

BasicForm.propTypes = {};

export default BasicForm;

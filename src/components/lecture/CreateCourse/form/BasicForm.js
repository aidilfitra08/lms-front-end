import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addBasicInformData } from "../../../../redux/Lecture/LectureAction";

function BasicForm(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const basicForm = useSelector((state) => state.lecture.basicInformation);
  const [title, setTitle] = useState(basicForm.title);
  const [shortDescription, setShortDescription] = useState(
    basicForm.shortDescription
  );
  const [description, setDescription] = useState(basicForm.description);
  const [courseLanguage, setCourseLanguage] = useState(basicForm.language);
  const [category, setCategory] = useState(basicForm.category);
  const [thumbnail, setThumbnail] = useState(null);
  const [titleCounter, setTitleCounter] = useState(100);

  const dispatch = useDispatch();
  useEffect(() => {
    setTitleCounter(100 - title.length);
  }, [title]);
  useEffect(() => {
    dispatch(
      addBasicInformData({
        title: title,
        shortDescription: shortDescription,
        description: description,
        language: courseLanguage,
        categoryID: category,
        thumbnail: thumbnail,
      })
    );
  }, [title, shortDescription, description, courseLanguage, category]);
  return (
    <div className="col-span-1 space-y-3">
      <p className=" text-2xl font-bold">Basic Information</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="courseTitle">Course Title</label>
          <div className="">
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              autoComplete="courseTitle"
              required
              className="block w-full pr-12 rounded-md"
              placeholder="Course Title"
              maxLength={100}
              value={basicForm.title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <p className="block h-10 absolute top-[1px] right-[1px] bg-yellow-300 pt-2 px-2 rounded-md">
              {titleCounter}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="thumbnail">Thumbnail</label>
          <div className="">
            <input
              id="thumbnail"
              name="thumbnail"
              type="file"
              autoComplete="thumbnail"
              accept=".jpg"
              required
              className="block w-full"
              onChange={(event) => setThumbnail(event.target.files[0])}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="shortDescription">Short Description</label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            rows={4}
            autoComplete="shortDescription"
            required
            className="block w-full rounded-md"
            value={basicForm.shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="Description">Description</label>
          <textarea
            id="description"
            name="Description"
            rows={5}
            autoComplete="Description"
            required
            className="block w-full rounded-md"
            value={basicForm.description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="grid grid-cols-2">
          <div className=" col-span-1 space-y-2 max-md:mr-0 max-md:col-span-2 mr-3">
            <label htmlFor="languange">Course Language</label>
            <select
              id="language"
              className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={basicForm.language}
              onChange={(event) => setCourseLanguage(event.target.value)}
            >
              <option selected>Choose category</option>
              <option value="Bahasa">Bahasa</option>
              <option value="English">English</option>
            </select>
          </div>
          <div className="space-y-2 max-md:ml-0 max-md:col-span-2 ml-3">
            <label htmlFor="sectionType">Course Category</label>
            <select
              id="sectionType"
              className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={basicForm.category}
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

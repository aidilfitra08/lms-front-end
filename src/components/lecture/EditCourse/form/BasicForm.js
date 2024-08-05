import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  addBasicInformData,
  uploadPhoto,
} from "../../../../redux/Lecture/LectureAction";

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
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(basicForm.thumbnail);
  const [titleCounter, setTitleCounter] = useState(100);
  const cloudinaryLink = useSelector(
    (state) => state.lecture.tempCloudinaryData
  );
  let loadingPercentage = useSelector(
    (state) => state.lecture.loadingPercentageThumbnail
  );
  const [uploadClick, setUploadClick] = useState(false);
  const dispatch = useDispatch();
  function onUpload() {
    if (thumbnailFile.size <= 2097152) {
      setUploadClick(true);
      dispatch(uploadPhoto(thumbnailFile, title));
    } else {
      alert("file too big, select another!");
    }
  }
  useEffect(() => {
    setThumbnail(cloudinaryLink.url);
  }, [cloudinaryLink]);
  useEffect(() => {
    setTitle(basicForm.title);
    setShortDescription(basicForm.shortDescription);
    setDescription(basicForm.description);
    setCourseLanguage(basicForm.language);
    setCategory(basicForm.categoryID);
    setThumbnail(basicForm.thumbnail);
  }, [basicForm]);
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
  }, [
    title,
    shortDescription,
    description,
    courseLanguage,
    category,
    cloudinaryLink.url,
  ]);
  return (
    <div className="col-span-1 space-y-3">
      <p className=" text-2xl font-bold">Informasi Kursus</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              autoComplete="courseTitle"
              required
              className="block w-full pr-12 rounded-md border-neutral-300"
              placeholder="Judul Kursus"
              maxLength={100}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <p className="block h-10 absolute top-[1px] right-[1px] bg-yellow-300 pt-2 px-2 rounded-md w-12 text-center">
              {titleCounter}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {basicForm.title == "" ? (
            <p className="text-red-600 font-semibold text-sm break-words">
              Silahkan tambahkan judul kursus sebelum menambahkan atau mengubah
              thumbnail
            </p>
          ) : (
            ""
          )}
          {thumbnail != "" ? (
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="h-36 w-full bg-neutral-200 rounded-md"
            />
          ) : (
            <div className="h-36 w-56 bg-neutral-200 text-center content-center rounded-md">
              <p className="">Thumbnail</p>
            </div>
          )}

          <div className="">
            <input
              id="thumbnail"
              name="thumbnail"
              type="file"
              autoComplete="thumbnail"
              accept="image/jpg, image/png, image/jpeg"
              required
              disabled={basicForm.title == "" ? true : false}
              className={classNames(
                thumbnail != "" ? "hidden" : "block",
                "w-full text-base file:border-0 file:bg-gray-600 file:font-semibold file:text-white file:py-2 file:px-4 file:hover:bg-gray-600/90 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              )}
              onChange={(event) => setThumbnailFile(event.target.files[0])}
            />
          </div>
          <div className="col-span-1 ">
            {uploadClick && (
              <progress
                value={loadingPercentage}
                max={100}
                className="my-2 w-full"
              >
                32%
              </progress>
            )}
            {loadingPercentage == 100 && (
              <p className=" text-center">Thumbnail Berhasil ditambahkan</p>
            )}
            {thumbnailFile != null && loadingPercentage == 0 && (
              <button
                className="block bg-yellow-400 py-2 px-5 mt-2 w-full rounded-lg"
                onClick={onUpload}
              >
                Unggah
              </button>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <textarea
            id="shortDescription"
            name="shortDescription"
            rows={4}
            autoComplete="shortDescription"
            required
            placeholder="Deskripsi Pendek"
            className="block w-full rounded-md resize-none border-neutral-300"
            value={basicForm.shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <textarea
            id="description"
            name="Description"
            rows={5}
            autoComplete="Description"
            required
            placeholder="Deskripsi"
            className="block w-full rounded-md resize-none border-neutral-300"
            value={basicForm.description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="grid grid-cols-2">
          <div className=" col-span-1 space-y-2 max-md:mr-0 max-md:col-span-2 mr-3">
            <select
              id="language"
              className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={basicForm.language}
              onChange={(event) => setCourseLanguage(event.target.value)}
            >
              <option selected>Bahasa</option>
              <option value="Bahasa">Indonesia</option>
              <option value="English">Inggris</option>
            </select>
          </div>
          <div className="space-y-2 max-md:ml-0 max-md:col-span-2 ml-3">
            <select
              id="sectionType"
              className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={basicForm.categoryID}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option selected>Pilih Kategori</option>
              <option value="1">Marketing Management</option>
              <option value="2">Social Media Marketing</option>
              <option value="3">Creative Copywriting</option>
              <option value="4">Facebook Ads</option>
              <option value="5">Youtube Ads</option>
              <option value="6">Influencer and Community Marketing</option>
              <option value="7">Search Engine Optimization</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

BasicForm.propTypes = {};

export default BasicForm;

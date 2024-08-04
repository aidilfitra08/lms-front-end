import React from "react";

function QuizForm(props) {
  return (
    <div className="form">
      <div className="quiz">
        <label htmlFor="quizTitle">Quiz Title</label>
        <input
          id="quizTitle"
          name="quizTitle"
          type="text"
          required
          className="block"
        />
        <label htmlFor="quizDescription">Quiz Description</label>
        <textarea
          id="quizDescription"
          name="quizDescription"
          rows={4}
          cols={30}
          required
          className="block"
        />

        <label htmlFor="videoType">Video Type</label>
        <select
          id="videoType"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Select Video Type</option>
          <option value="html">HTML5(mp4)</option>
          <option value="externalURL">External URL</option>
          <option value="yt">Youtube</option>
          <option value="embedded">embedded</option>
        </select>

        <label htmlFor="attachment">Attachment</label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          required
          className="block"
        />
        <label htmlFor="summary">Summary</label>
        <input id="summary" name="summary" type="text" className="block" />
      </div>
    </div>
  );
}

QuizForm.propTypes = {};

export default QuizForm;

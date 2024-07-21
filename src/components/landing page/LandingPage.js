import React, { useState } from "react";

import dekstop from "../../assets/Landing Page/video_sdk_dekstop.jpg";
import mobile from "../../assets/Landing Page/video_sdk_mobile.jpg";
import landingPicture from "../../assets/landing-picture.png";
import LogoOnly from "../../assets/logo_only.svg";
import { connect } from "react-redux";
import Footer from "./Footer";
import { thumbnail } from "./foto";
import { category } from "../students/category";

function LandingPage(props) {
  const [onClickShow, setOnClickShow] = useState(1);
  return (
    <>
      <div className="grid grid-cols-2 text-center h-[50rem] 2xl:h-[80rem] max-2 mb-2 px-8">
        <div className="col-span-1 max-md:col-span-2 content-center space-y-6 h-full px-8">
          <div className=" flex justify-center">
            <img src={LogoOnly} className="w-1/2" />
          </div>
          <p className="text-4xl font-bold">Selamat Datang di DigiMaLearn</p>
          <p>
            DigiMaLearn adalah sebuah platform pembelajaran Digital Marketing
            yang dapat diakses dari semua penjuru Indonesia
          </p>
        </div>
        <div className="col-span-1 items-center flex justify-center h-full px-8  max-md:hidden">
          <img src={landingPicture} className="h-auto w-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 max-2 mb-2 px-8 bg-yellow-400 text-center pb-12">
        <div className="col-span-1 max-md:col-span-2 space-y-6 px-8">
          <p className="text-4xl font-bold pt-8">Kursus di DigiMalearn</p>
          <p className=" text-xl max-sm:text-base">
            Beberapa kursus <span className="italic">Digital Marketing</span>{" "}
            yang disediakan DigiMaLearn
          </p>
          <div class="w-[90%] inline-flex flex-nowrap overflow-x-hidden group">
            <ul class="flex items-center justify-center md:justify-start text-white [&_li]:mx-4 animate-infinite-scroll group-hover:[animation-play-state:paused]">
              {category.map((kategori, index) => {
                return (
                  <li className="w-96 h-56 bg-teal-900 rounded-md text-center max-sm:w-48 max-sm:h-28">
                    <img
                      src={thumbnail[index]}
                      className="h-40 w-full max-sm:h-16 bg-white object-cover rounded-t-md"
                    />
                    <p className="text-lg font-semibold pt-4 max-sm:pt-2 max-sm:text-xs">
                      {kategori}
                    </p>
                  </li>
                );
              })}
            </ul>
            <ul
              class="flex items-center justify-center md:justify-start text-white [&_li]:mx-4 animate-infinite-scroll group-hover:[animation-play-state:paused]"
              aria-hidden="true"
            >
              {category.map((kategori, index) => {
                return (
                  <li className="w-96 h-56 bg-teal-900 rounded-md text-center max-sm:w-48 max-sm:h-28">
                    <img
                      src={thumbnail[index]}
                      className="h-40 w-full max-sm:h-16 bg-white object-cover rounded-t-md"
                    />
                    <p className="text-lg font-semibold pt-4 max-sm:pt-2 max-sm:text-xs">
                      {kategori}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 max-2 mb-2 px-8  text-center pb-12 space-y-6">
        <p className="text-4xl font-bold pt-6">
          <span className="italic">Online Meeting</span>
        </p>
        <p>
          DigimaLearn juga menyediakan fitur tatap muka secara daring dengan
          pengajar serta peserta kelas lainnya{" "}
        </p>

        <div className="space-y-6">
          <div className="space-x-3 text-black">
            <button
              className="bg-yellow-400 py-3 px-6 rounded-xl"
              onClick={() => setOnClickShow(1)}
            >
              Dekstop
            </button>
            <button
              className="bg-yellow-400 py-3 px-6 rounded-xl"
              onClick={() => setOnClickShow(2)}
            >
              Smartphone
            </button>
          </div>
          <div
            className={`${
              onClickShow == 1 ? "block" : "hidden"
            } justify-center flex flex-row`}
          >
            <img src={dekstop} className="rounded-xl" />
          </div>
          <div
            className={`${
              onClickShow == 2 ? "block" : "hidden"
            } justify-center flex flex-row`}
          >
            <img src={mobile} className="rounded-xl" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    // photo: state.user.user.photo,
  };
};

export default connect(mapStateToProps)(LandingPage);

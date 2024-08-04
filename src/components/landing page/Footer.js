import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function Footer(props) {
  return (
    <footer className=" bg-teal-950/90 h-52 text-neutral-100">
      <div className="grid grid-cols-2 py-6 px-10 mt-12">
        <div className="col-span-1">
          <a href="/" className="block">
            Halaman Utama
          </a>
          <a href="/login" className="block">
            Masuk
          </a>
          <a href="/register" className="block">
            Daftar
          </a>
        </div>
        <div className="col-span-1">
          <p className="">Butuh Bantuan? </p>
          <a
            className=""
            href="https://wa.me/6282388157890?text=Saya%20butuh%20bantuan%20dengan%20aplikasi%20DigiMaLearn"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
        </div>
      </div>
      <div className="col-span-2  border-b border-neutral-100 mx-10"></div>
      <div className="col-span-2 mx-10 my-4">
        <p>2024 DigiMaLearn Copyright. All Rights Reserve.</p>
      </div>
    </footer>
  );
}

export default Footer;

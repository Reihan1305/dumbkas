import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
const TestiCard = () => {
  const testimoni = useMemo(
    () => [
      {
        desc: "Aplikasi yang sempurna. Saya dan istri saya menggunakannya untuk melacak semua pengeluaran dan pendapatan kami. Kami menghasilkan laporan keuangan rumah tangga dan anggaran menggunakan aplikasi hebat ini.",
        userName: "Hilal Akbar",
      },
      {
        desc: "Alat yang luar biasa! Membantu saya mengelola keuangan dengan mudah. Antarmuka yang halus dan mudah dinavigasi.",
        userName: "Aisyah Rahman",
      },
      {
        desc: "Aplikasi ini sangat membantu dalam mengatur uang. Saya telah merekomendasikannya kepada teman-teman saya, dan mereka juga menyukainya.",
        userName: "Budi Santoso",
      },
      {
        desc: "Saya suka betapa sederhananya melacak pengeluaran saya. Saya bisa menabung lebih banyak sejak menggunakan aplikasi ini!",
        userName: "Nina Kartika",
      },
      {
        desc: "Aplikasi terbaik untuk penganggaran yang saya temukan sejauh ini. Sangat saya rekomendasikan bagi siapa saja yang ingin mengatur keuangannya.",
        userName: "Rian Saputra",
      },
    ],
    []
  );
  return (
    <div>
      <h1 className={`font-bold text-xl text-sky-800 text-center`}>
        See what others have to say
      </h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={100}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwipper mt-10"
      >
        {testimoni.map((testi,index) => (
          <SwiperSlide key={index} className="mb-10 flex flex-col justify-start gap-10 items-center h-64 w-10 p-10 shadow-md bg-white">
            <p className="text-center">{testi.desc}</p>
            <h1 className="font-bold">{testi.userName}</h1>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestiCard;

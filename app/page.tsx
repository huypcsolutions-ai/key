"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/get-products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 p-10">
      {products.map((p: any) => (
        <div key={p.id} className="bg-white shadow-xl p-5 rounded-xl">
          <img src={p.image_url} className="rounded-lg" />
          <h2 className="text-lg font-bold mt-3">{p.name}</h2>
          <p className="text-red-600 font-semibold">{p.price}đ</p>
          <button
            onClick={() => window.location.href=`/checkout/${p.slug}`}
            className="mt-4 w-full bg-black text-white py-2 rounded-lg"
          >
            Mua ngay
          </button>
        </div>
      ))}
    </div>
  );
}

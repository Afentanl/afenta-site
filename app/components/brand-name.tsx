"use client";

const letters = ["A", "f", "e", "n", "t", "a"];

export default function BrandName() {
    return (
    <div className="relative leading-none">
      {/* accesible para lectores de pantalla */}
        <span className="visually-hidden">Afenta</span>

      {/* letras visibles con desfase */}
        <span aria-hidden className="select-none inline-flex gap-[2px] text-xl font-black tracking-tight">
        {letters.map((ch, i) => (
            <span
            key={i}
            className="afenta-letter"
            style={{ animationDelay: `${i * 0.18}s` }} // desfase de 180ms por letra
            >
            {ch}
            </span>
        ))}
        </span>
    </div>
    );
}


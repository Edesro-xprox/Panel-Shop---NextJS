import Image from "next/image";

// Logo del panel. Usa tu imagen cuando la tengas:
// 1. Guarda tu imagen como `public/logo.png`
// 2. Cambia src a "/logo.png"
// Por ahora usa `public/logo.svg` para que funcione sin archivos extra.
export function Logo({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-xl font-extrabold">
        <span className="text-gray-400">N</span>
        <span className="text-amber-600">S</span>
      </div>
    );
  }
  return (
    <Image
      src="/logo.svg"
      alt="NextShop"
      width={150}
      height={56}
      priority
      className="h-14 w-auto"
    />
  );
}

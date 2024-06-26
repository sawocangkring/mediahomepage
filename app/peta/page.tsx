import PageHeader from "@/components/ui/header";
import PageContent from "@/components/ui/pageContent";
import GeoFileExtract from "./goespatialdata";
import dynamic from "next/dynamic";

const Map = dynamic(async () => await import("./maps"), {
  ssr: false,
});

export default function PetaDesa() {
  return (
    <main className="overflow-hidden">
      <PageHeader
        title="Peta Desa"
        description="Peta Desa Sawocangkring, dikembangkan melalui data GeoSpasial yang dihimpun oleh tim Media Sawocangkring."
        pagePreviousDescription="Beranda"
        pagePreviousTitle="Beranda"
        pagePreviousUrl="/"
      />
      <PageContent>
        <div className="w-full">
          <h2 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl pb-8">
            Peta Desa Sawocangkring
          </h2>
          <div className="h-[320px] lg:h-[720px]">
            <Map />
          </div>
          <GeoFileExtract />
          <p className="pt-8 text-sm">
            Data diperoleh melalui API Openstreetmap dengan penyesuaian pada
            objek - objek vital milik Desa Sawocangkring. Dikurasi secara
            independen berbasis data geospasial. Mohon laporkan kepada kami jika
            terdapat ketidaksesuaian data.
          </p>
        </div>
      </PageContent>
    </main>
  );
}

import GeoFile from "@/data/geofile.json";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface GeoFiles {
  type: string;
  generator: string;
  bbox: number[];
  features: Feature[];
}

interface Geometry {
  coordinates: Array<Array<[number, number]>>;
}

interface Properties {
  amenity: string;
  name: string;
}

interface Feature {
  properties: Properties;
  geometry: Geometry;
}

export enum GeometryType {
  LineString = "LineString",
  Point = "Point",
  Polygon = "Polygon",
}

export enum FeatureType {
  Feature = "Feature",
}

const CoordinateLink = ({ coordinates }: any) => {
  if (!Array.isArray(coordinates)) {
    return <span>No coordinates available</span>;
  }

  const averageLatitude =
    coordinates.reduce((acc, [longitude, latitude]) => acc + latitude, 0) /
    coordinates.length;

  const averageLongitude =
    coordinates.reduce((acc, [longitude, latitude]) => acc + longitude, 0) /
    coordinates.length;

  return (
    <a
      href={`https://www.openstreetmap.org/?mlat=${averageLatitude}&mlon=${averageLongitude}#map=15`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-800 hover:underline cursor-pointer"
    >
      X: {averageLongitude}, Y: {averageLatitude}
    </a>
  );
};

export default function GeoFileExtract() {
  return (
    <div>
      <EducationFacility />
      <WorshipPlaces />
      <SportField />
    </div>
  );
}

function EducationFacility() {
  const title = "Fasilitas Pendidikan";
  const educationFacility = GeoFile.features.filter(
    (data) => data.properties.amenity === "school"
  );

  return (
    <div className="py-4 flex flex-col gap-4">
      <h2 className="text-3xl font-bold">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Coordinates</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {educationFacility.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{data.properties.name}</TableCell>
              <TableCell>
                <CoordinateLink coordinates={data.geometry.coordinates[0]} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function WorshipPlaces() {
  const title = "Fasilitas Ibadah";
  const educationFacility = GeoFile.features.filter(
    (data) => data.properties.amenity === "place_of_worship"
  );

  return (
    <div className="py-4 flex flex-col gap-4">
      <h2 className="text-3xl font-bold">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Coordinates</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {educationFacility.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{data.properties.name}</TableCell>
              <TableCell>
                <CoordinateLink coordinates={data.geometry.coordinates[0]} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function SportField() {
  const title = "Fasilitas Olahraga";
  const educationFacility = GeoFile.features.filter(
    (data) => data.properties.leisure === "pitch"
  );

  return (
    <div className="py-4 flex flex-col gap-4">
      <h2 className="text-3xl font-bold">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Coordinates</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {educationFacility.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{data.properties.name}</TableCell>
              <TableCell>
                <CoordinateLink coordinates={data.geometry.coordinates[0]} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

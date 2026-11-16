import fs from "fs";
import path from "path";

const ROOM_FOLDERS: Record<string, string> = {
  dbl: "Комфорт DBL",
  twin: "Комфорт TWIN",
  triple: "Комфорт трехместный",
  studia: "Джуниор Сьют",
  luxe: "Люкс",
  apart: "Апартаменты",
  single: "Стандарт SGL",
  "standard-dbl": "Стандарт DBL",
};

const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp)$/i;

const getSortOrder = (fileName: string) => {
  const match = fileName.match(/(\d+)(?=\.[^.]+$)/);
  return Number(match?.[1] ?? 0);
};

export default defineEventHandler(() => {
  const photosRoot = path.resolve("./public/new_photo");
  const rooms: Record<string, string[]> = {};

  try {
    for (const [slug, folderName] of Object.entries(ROOM_FOLDERS)) {
      const folderPath = path.join(photosRoot, folderName);

      if (!fs.existsSync(folderPath)) {
        rooms[slug] = [];
        continue;
      }

      const files = fs
        .readdirSync(folderPath, { withFileTypes: true })
        .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.test(entry.name))
        .sort((a, b) => getSortOrder(a.name) - getSortOrder(b.name));

      rooms[slug] = files.map(
        (file) =>
          `/new_photo/${encodeURIComponent(folderName)}/${encodeURIComponent(
            file.name
          )}`
      );
    }

    return rooms;
  } catch (error) {
    console.error(error);
    return {};
  }
});

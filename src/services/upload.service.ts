// src/services/upload.service.ts
import { supabase, BUCKET_NAME } from "../lib/supabase";

export const generateFileName = (
  folder: string,
  originalName: string,
): string => {
  const ext = originalName.split(".").pop()?.toLowerCase() || "jpg";
  const uuid = crypto.randomUUID();
  return `${folder}/${uuid}.${ext}`;
};

export const uploadToSupabase = async (
  file: Express.Multer.File,
  folder: string,
): Promise<string> => {
  const fileName = generateFileName(folder, file.originalname);

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(`อัปโหลดไฟล์ไม่สำเร็จ: ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
};

export const deleteFromSupabase = async (imageUrl: string): Promise<void> => {
  try {
    const urlParts = imageUrl.split(`${BUCKET_NAME}/`);
    if (urlParts.length < 2) return;

    const filePath = urlParts[1];

    await supabase.storage.from(BUCKET_NAME).remove([filePath]);
  } catch (error) {
    console.error("Failed to delete old image:", error);
  }
};

// 📤 Upload ảnh lên Cloudinary
export const uploadImageApi = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "my_unsigned_preset");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dgbjuard1/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Upload ảnh thất bại");
  const data = await res.json();
  return data.secure_url;
};

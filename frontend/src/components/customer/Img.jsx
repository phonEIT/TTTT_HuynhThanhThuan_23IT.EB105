import React, { useState } from 'react';
import axios from 'axios';

function Img() {
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'my_unsigned_preset'); // Lấy từ Cloudinary

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dgbjuard1/image/upload',
        formData
      );
      const imageUrl = response.data.secure_url;
      setUploadedImageUrl(imageUrl);

      // Gửi về Spring Boot
      await axios.post('http://localhost:8080/api/admin/device/upload-image', {
        imageUrl: imageUrl,
      });
      alert('Tải lên thành công!');
    } catch (error) {
      console.error('Lỗi khi upload:', error);
    }
  };

  return (
    <div className="Img" style={{ padding: '20px' }}>
      <h2>Upload ảnh lên Cloudinary</h2>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Upload</button>
      {uploadedImageUrl && (
        <div>
          <p>Ảnh đã upload:</p>
          <img src={uploadedImageUrl} alt="Uploaded" width={200} />
        </div>
      )}
    </div>
  );
}

export default Img;

import React from 'react';

const DeviceManagement = () => {
  // Ví dụ danh sách thiết bị
  const devices = [
    { id: 1, name: 'Laptop Dell XPS 13', status: 'Đang sử dụng', location: 'Phòng Dev', user: 'Nguyễn Văn A' },
    { id: 2, name: 'Máy in Canon LBP 2900', status: 'Sẵn sàng', location: 'Phòng Hành chính', user: '-' },
    { id: 3, name: 'MacBook Pro 2022', status: 'Bảo trì', location: 'Phòng Kỹ thuật', user: 'Trần Thị B' },
  ];

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Quản lý thiết bị</h2>
        <table className="w-full border shadow bg-white rounded overflow-hidden">
          <thead className="bg-indigo-600 text-white text-left">
            <tr>
              <th className="p-3">Tên thiết bị</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Vị trí</th>
              <th className="p-3">Người sử dụng</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.id} className="border-t hover:bg-indigo-50">
                <td className="p-3">{device.name}</td>
                <td className="p-3">{device.status}</td>
                <td className="p-3">{device.location}</td>
                <td className="p-3">{device.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default DeviceManagement;

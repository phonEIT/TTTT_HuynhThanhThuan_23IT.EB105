// src/components/MyInfo.js
import React, { useEffect, useState } from "react";
import { MdEmail, MdPhone, MdLocationOn, MdApartment } from "react-icons/md";
import { FaUserShield, FaUserTie } from "react-icons/fa";
import { getMyInfo } from "../../services/user/MyInfoService"; // import service

const MyInfoPage = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyInfo();
        setEmployee(data);
      } catch (err) {
        setError(err.message || "Không thể tải thông tin cá nhân");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-indigo-600 text-lg">
        ⏳ Đang tải thông tin cá nhân...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 text-lg">
        ⚠️ {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 to-blue-50 py-10 px-6 font-poppins">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 mb-8">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-100 shadow-lg">
            <img
              src={`https://ui-avatars.com/api/?name=${employee.userName}&background=4F46E5&color=fff&size=128`}
              alt={employee.userName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thông tin cơ bản */}
          <div className="flex-1 space-y-1">
            <h2 className="text-3xl font-bold text-indigo-700">{employee.userName}</h2>
            <p className="flex items-center gap-2 text-gray-600">
              <MdEmail /> {employee.email}
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <MdPhone /> {employee.phone}
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <MdLocationOn /> {employee.address}
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <MdApartment /> Phòng: {employee.room}
            </p>
          </div>
        </div>

        {/* Roles & Permissions */}
        <div className="space-y-6">
          {employee.roles.map((role, idx) => (
            <div key={idx} className="bg-indigo-50 p-5 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-3">
                {role.name === "ADMIN" ? (
                  <FaUserShield className="text-indigo-600 w-6 h-6" />
                ) : (
                  <FaUserTie className="text-indigo-600 w-6 h-6" />
                )}
                <h3 className="text-xl font-semibold text-indigo-700">{role.name}</h3>
              </div>
              <p className="text-gray-600 mb-3">{role.description}</p>

              {role.permissions.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {role.permissions.map((perm, i) => (
                    <li
                      key={i}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm text-gray-700 shadow-sm hover:shadow-lg transition-all"
                    >
                      <span className="font-medium">{perm.name}</span>: {perm.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 italic">Không có quyền hạn</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyInfoPage;

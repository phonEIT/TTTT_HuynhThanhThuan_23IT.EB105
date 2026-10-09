import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import UserService from "../../services/admin/UserService";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalError, setModalError] = useState("");

  const [newUser, setNewUser] = useState({
    userName: "",
    role: "",
    email: "",
    password: "",
    address: "",
    room: "",
    phone: "",
  });

  // Lấy danh sách người dùng
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await UserService.getUsersApi();
      setUsers(data.data || data || []);
      setError(null);
    } catch {
      setError("Không thể tải danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Xoá người dùng
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá người dùng này?")) return;
    try {
      await UserService.deleteUserApi(id);
      setUsers(users.filter((u) => u.id !== id));
      setError(null);
    } catch {
      setError("Không thể xoá người dùng.");
    }
  };

  // Thêm người dùng
const handleAddUser = async () => {
  try {
    const payload = {
      ...newUser,
      roles: newUser.role ? [newUser.role] : [], // Chỉ là mảng string
    };

    await UserService.addUserApi(payload);

    await fetchUsers();
    setNewUser({
      userName: "",
      role: "",
      email: "",
      password: "",
      address: "",
      room: "",
      phone: "",
    });
    setShowModal(false);
    setModalError("");
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Không thể thêm người dùng.";
    setModalError(message);
  }
};


  return (
    <div className="p-6 bg-gradient-to-br from-white via-slate-50 to-gray-100 min-h-screen">
      {loading && <p>⏳ Đang tải...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              📋 Danh sách người dùng
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition"
            >
              <FaUserPlus /> Thêm người dùng
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                  <th className="px-4 py-3 text-left">👤 Họ tên</th>
                  <th className="px-4 py-3 text-left">Chức vụ</th>
                  <th className="px-4 py-3 text-left">📧 Email</th>
                  <th className="px-4 py-3 text-left">🏠 Địa chỉ</th>
                  <th className="px-4 py-3 text-left">🔢 Phòng</th>
                  <th className="px-4 py-3 text-left">📞 SĐT</th>
                  <th className="px-4 py-3 text-center">⚙️ Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr
                      key={user.id || index}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3">{user.userName}</td>
                      <td className="px-4 py-3">
                        {user.roles && user.roles.length > 0
                          ? user.roles.map((r) => r.name).join(", ")
                          : "-"}
                      </td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">{user.address}</td>
                      <td className="px-4 py-3">{user.room}</td>
                      <td className="px-4 py-3">{user.phone}</td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-blue-600 hover:text-blue-800 mx-2">
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-800 mx-2"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      Không có người dùng nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL THÊM NGƯỜI DÙNG */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">➕ Thêm người dùng</h2>

            <div className="space-y-3">
              {modalError && (
                <p className="text-red-500 text-sm mb-2">{modalError}</p>
              )}
              {[
                "userName",
                "email",
                "password",
                "address",
                "room",
                "phone",
              ].map((field) => (
                <input
                  key={field}
                  type={field === "password" ? "password" : "text"}
                  placeholder={
                    field === "userName"
                      ? "Họ tên"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  value={newUser[field] || ""}
                  onChange={(e) =>
                    setNewUser({ ...newUser, [field]: e.target.value })
                  }
                  className="w-full border rounded p-2"
                />
              ))}

              <select
                value={newUser.role || ""}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                className="w-full border rounded p-2"
              >
                <option value="">Chọn vai trò</option>
                <option value="EMPLOYEE">Employee</option>
                <option value="TECHNICIAN">Technician</option>
                <option value="ADMIN">Admin</option>
              </select>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;

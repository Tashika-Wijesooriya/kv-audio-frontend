import { useEffect, useState } from "react";
import axios from "axios";
import { FiUserCheck, FiUserX } from "react-icons/fi";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/all`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [loading]);

  const handleBlockUser = (email) => {
    setShowConfirmModal(false);
    const token = localStorage.getItem("token");
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === email
              ? { ...user, isBlocked: !user.isBlocked }
              : user
          )
        );
        setLoading(true);
      })
      .catch((err) => console.error("Failed to block user:", err));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Status
                  </th>
                 
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={user.profilePicture}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                      <span className="inline-block px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="space-y-1">
                        <div>{user.address}</div>
                        <div className="text-gray-500">{user.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowConfirmModal(true);
                        }}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          user.isBlocked
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {user.isBlocked ? (
                          <>
                            <FiUserX className="mr-1.5 h-4 w-4" />
                            Blocked
                          </>
                        ) : (
                          <>
                            <FiUserCheck className="mr-1.5 h-4 w-4" />
                            Active
                          </>
                        )}
                      </button>
                    </td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-500">
              No users found in the system
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Confirm User Status Change
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to{" "}
              {selectedUser.isBlocked ? "unblock" : "block"}{" "}
              <span className="font-medium">{selectedUser.email}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleBlockUser(selectedUser.email)}
                className={`px-4 py-2 rounded-lg ${
                  selectedUser.isBlocked
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {selectedUser.isBlocked ? "Unblock User" : "Block User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

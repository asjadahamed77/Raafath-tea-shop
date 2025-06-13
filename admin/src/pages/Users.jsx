import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slices/userSlice';
import { MdOutlinePerson, MdOutlineEmail, MdOutlinePhone, MdOutlineCalendarToday } from 'react-icons/md';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Users</h1>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
             
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-primaryColor/10 flex items-center justify-center">
                        <MdOutlinePerson className="h-6 w-6 text-primaryColor" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <MdOutlineEmail className="mr-2" />
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <MdOutlineEmail className="mr-2" />
                    {user.phone}
                  </div>
                </td>
               
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <MdOutlineCalendarToday className="mr-2" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="text-primaryColor hover:text-primaryColor/80"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">User Details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <MdOutlinePerson className="mr-2 text-primaryColor" />
                <span className="font-medium">Name:</span>
                <span className="ml-2">{selectedUser.name}</span>
              </div>
              <div className="flex items-center">
                <MdOutlineEmail className="mr-2 text-primaryColor" />
                <span className="font-medium">Email:</span>
                <span className="ml-2">{selectedUser.email}</span>
              </div>
              <div className="flex items-center">
                <MdOutlineEmail className="mr-2 text-primaryColor" />
                <span className="font-medium">Phone:</span>
                <span className="ml-2">{selectedUser.phone}</span>
              </div>
             
              <div className="flex items-center">
                <MdOutlineCalendarToday className="mr-2 text-primaryColor" />
                <span className="font-medium">Joined:</span>
                <span className="ml-2">
                  {new Date(selectedUser.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users; 
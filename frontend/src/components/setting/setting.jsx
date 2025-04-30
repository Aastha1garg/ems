import React from 'react';

const Settings = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Profile Settings */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border px-4 py-2 rounded"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save Profile
            </button>
          </div>
        </div>

        {/* Password Update */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full border px-4 py-2 rounded"
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Update Password
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl shadow-md p-6 col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Preferences</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Enable dark mode</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Receive notifications</span>
            </label>
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

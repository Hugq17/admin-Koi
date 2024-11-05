import React, { useEffect, useState } from "react";
import axios from "axios";
import SettingSection from "./SettingSection";
import { User } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage

      try {
        const response = await axios.get("https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/account/user", {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization header
          },
        });
        setUser(response.data); // Update state with user data
      } catch (error) {
        setError(error.message); // Handle error
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchUserData();
  }, []); // Empty dependency array means this runs once on mount

  // Render loading state or error message
  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Render user profile information
  return (
    <SettingSection icon={User} title={"Hồ sơ"}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <img
          src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/460643689_1183874419391143_6611760833582070943_n.jpg?stp=cp6_dst-jpg_s200x200&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=a3_XaIHtTrAQ7kNvgHLRgNl&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=APeCamNjTw3UQIrTYQLYOMT&oh=00_AYAPIueZrrEDqq2iAsuLIMze0f_i6aWn0U9w0kfHFKVTKw&oe=66F367BF"
          alt="Profile"
          className="rounded-full w-20 h-20 object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-100">{user.username}</h3>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>
    </SettingSection>
  );
};

export default Profile;

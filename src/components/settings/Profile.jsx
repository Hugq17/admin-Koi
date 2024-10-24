import React from "react";
import SettingSection from "./SettingSection";
import { User } from "lucide-react";

const Profile = () => {
  return (
    <SettingSection icon={User} title={"Hồ sơ"}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <img
          src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/460643689_1183874419391143_6611760833582070943_n.jpg?stp=cp6_dst-jpg_s200x200&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=a3_XaIHtTrAQ7kNvgHLRgNl&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=APeCamNjTw3UQIrTYQLYOMT&oh=00_AYAPIueZrrEDqq2iAsuLIMze0f_i6aWn0U9w0kfHFKVTKw&oe=66F367BF"
          alt="Profile"
          className="rounded-full w-20 h-20 object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-100">Minh Tiến</h3>
          <p className="text-gray-400">minhtien020200@gmail.com</p>
        </div>
      </div>
      <td>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Chỉnh sửa
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-2">
          Đăng xuất
        </button>
      </td>
    </SettingSection>
  );
};

export default Profile;

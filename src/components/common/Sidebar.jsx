import {
  BarChart2,
  LucideBookOpen,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Users,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../../assets/brand/logo.png";

const SIDEBAR_ITEMS = [
  {
    name: "Trang chủ",
    icon: BarChart2,
    color: "#6366f1",
    href: "/",
  },
  { name: "Tài khoản", icon: Users, color: "#EC4899", href: "/users" },
  { name: "Sản phẩm", icon: Package, color: "#8B5CF6", href: "/products" },
  { name: "Bài viết", icon: LucideBookOpen, color: "#10B981", href: "/blogs" },
  { name: "Giao dịch", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
  { name: "Cài đặt", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = ({ logout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <div className="mt-8 flex flex-col items-center">
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                className="text-xl font-semibold text-gray-100"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2, delay: 0.3 }}
              ></motion.div>
            )}
          </AnimatePresence>
          <img
            src={logo}
            className="h-24 w-auto my-2"
            alt="Logo"
            style={{ width: "auto", height: "144px" }}
          />
        </div>

        <nav className="mt-2 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
        
        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center p-4 text-red-500 hover:bg-red-500 hover:text-white transition-colors rounded-lg mt-4"
        >
          <LogOut size={20} style={{ color: "red", minWidth: "20px" }} />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span
                className="ml-4 whitespace-nowrap"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2, delay: 0.3 }}
              >
                Đăng xuất
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;

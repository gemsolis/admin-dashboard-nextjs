import Sidebar from "../ui/dashboard/sidebar/Sidebar";
import Navbar from "../ui/dashboard/navbar/Navbar";
import Footer from "../ui/dashboard/footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex-[1] sticky top:0 left-0 bg-white dark:bg-slate-900">
        <Sidebar />
      </div>
      <div className="flex-[4] p-5 bg-[#ececec] dark:bg-slate-800">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

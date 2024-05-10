import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
    </>
  );
}
export default DashboardLayout;

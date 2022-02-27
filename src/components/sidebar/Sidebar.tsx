import "./sidebar.css";
import AuthSection from "./AuthSection";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="folders"></div>
      <AuthSection />
    </div>
  );
}

export default Sidebar;

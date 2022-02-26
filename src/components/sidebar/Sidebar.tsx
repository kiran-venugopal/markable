import "./sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="folders"></div>
      <div className="auth-section">
        <button className="secondary">Sign In</button>
        <div className="dropdown">
          <div className="dd-option">
            <button className="secondary">Sign In with Google</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

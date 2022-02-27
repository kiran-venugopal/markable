import "./spinner.css";

function Spinner({ type = "" }) {
  return <div className={`spinner ${type}`}></div>;
}

export default Spinner;

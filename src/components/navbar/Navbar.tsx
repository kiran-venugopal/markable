import { Fragment, useState } from "react";
import { ReactComponent as Logo } from "../../icons/logo.svg";
import { ReactComponent as CopyIcon } from "../../icons/copy.svg";
import { ReactComponent as DoneIcon } from "../../icons/done.svg";
import "./navbar.css";

type PropsType = {
  onMarkdownCopy(): void;
};

function Navbar({ onMarkdownCopy }: PropsType) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    onMarkdownCopy();
    setTimeout(() => setIsCopied(false), 4000);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Logo width={25} height={25} />
      </div>
      <div className="file-name">untitled</div>
      <button onClick={handleCopy} className="primary">
        {isCopied ? (
          <Fragment>
            <div className="icon">
              <DoneIcon width={15} height={15} />
            </div>
            Copied
          </Fragment>
        ) : (
          <Fragment>
            <div className="icon">
              <CopyIcon width={11} height={11} />
            </div>
            Copy Markdown
          </Fragment>
        )}
      </button>
    </div>
  );
}

export default Navbar;

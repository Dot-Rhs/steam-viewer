import "./styles.css";

interface IProps {
  id?: string;
  header?: string | JSX.Element;
  body?: string | JSX.Element;
  footer?: string | JSX.Element;
  closeModal: () => void;
}

export const Modal = ({
  id,
  header,
  body,
  footer,
  closeModal
}: IProps) => {
  return (
    <div id={id ?? "Modal"} className="modal">
      <div className="modal-content">

        <span className="close-modal-icon" onClick={closeModal}>
          &times;
        </span>
        {header && <div className="header">
          <h2>{header}</h2>
        </div>
        }
        <div className="body">{body}</div>
        {
          footer &&
          <div className="footer">{footer}</div>
        }
      </div>
    </div >
  );
};

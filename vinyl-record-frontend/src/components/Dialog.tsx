import { MouseEventHandler } from "react";

Dialog.defaultProps = {
  closeLabel: "Close",
  classes: "",
  closeButton: true,
  // closeWhenClickedOutside: true,
};
function Dialog(props: {
  id: string;
  title: string;
  content: string;
  classes: string;
  actions: {
    label: string;
    onClick: MouseEventHandler;
  }[];
  closeLabel: string;
  closeButton: boolean;
  // closeWhenClickedOutside: boolean;
}) {
  return (
    <dialog id={props.id} className={`modal modal-bottom sm:modal-middle ${props.classes}`}>
      <div className="modal-box">
        {props.closeButton && (
          // <form method="close" className={`${props.closeWhenClickedOutside ? "modal-backdrop" : ""}`}>
          // <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          <a className="Toastify__close-button absolute right-2 top-2" onClick={() => closeDialog(props.id)}>
            <span className="label label-text">✕</span>
          </a>
          // </button>
          // </form>
        )}
        <h3 className="font-bold text-lg">{props.title}</h3>
        <p className="py-4">{props.content}</p>
        <div className="modal-action">
          <div className="join">
            {/* <form method="action" className={`${props.closeWhenClickedOutside ? "modal-backdrop" : ""}`}> */}
            {props.actions.map(({ label, onClick }) => (
              // <button key={label} className="btn" onClick={onClick}>
              <a
                key={label}
                className="btn btn-outline btn-active join-item"
                onClick={(e) => {
                  onClick(e);
                  closeDialog(props.id);
                }}
              >
                {label}
              </a>
              // </button>
            ))}
            {/* <button className="btn">{props.closeLabel}</button> */}
            <a className="btn btn-outline join-item" onClick={() => closeDialog(props.id)}>
              {props.closeLabel}
            </a>
            {/* </form> */}
          </div>
        </div>
      </div>
    </dialog>
  );
}
const getDialog = (id: string) => document.getElementById(id) as HTMLDialogElement;
const closeDialog = (id: string) => getDialog(id).close();
export const openDialog = (id: string) => getDialog(id).showModal();
export default Dialog;

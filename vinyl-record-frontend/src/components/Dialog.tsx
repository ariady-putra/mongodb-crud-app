import { MouseEventHandler, useState } from "react";

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
  const [wiggle, setWiggle] = useState(false);

  return (
    <dialog
      id={props.id}
      className={`modal modal-bottom sm:modal-middle max-sm:w-[102%] max-sm:-left-[1%] max-sm:h-[102%] max-sm:-top-[1%] ${props.classes}`}
      onClick={(e) => {
        if (props.id === (e.target as HTMLDialogElement).id) {
          setWiggle(true);
          setTimeout(() => setWiggle(false), 1000);
        }
      }}
    >
      <div className={`modal-box ${wiggle && "animate-wiggle"}`}>
        {props.closeButton && (
          // <form method="close" className={`${props.closeWhenClickedOutside ? "modal-backdrop" : ""}`}>
          // <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          <a className="Toastify__close-button absolute max-sm:hidden right-2 top-2" onClick={() => closeDialog(props.id)}>
            <span className="label label-text">✕</span>
          </a>
          // </button>
          // </form>
        )}
        <h3 className="font-bold text-lg pt-4 pb-2">{props.title}</h3>
        <p className="pt-2 pb-4">{props.content}</p>
        <div className="sm:modal-action">
          <div className="max-sm:flex join">
            {/* <form method="action" className={`${props.closeWhenClickedOutside ? "modal-backdrop" : ""}`}> */}
            {props.actions.map(({ label, onClick }) => (
              // <button key={label} className="btn" onClick={onClick}>
              <a
                key={label}
                className="btn btn-outline btn-active max-sm:flex-1 join-item"
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
            <a className="btn btn-outline max-sm:flex-1 join-item" onClick={() => closeDialog(props.id)}>
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

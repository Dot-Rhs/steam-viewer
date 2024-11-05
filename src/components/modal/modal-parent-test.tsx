import { useState } from "react";
import { Modal } from ".";

export const ModalParentTest = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <button onClick={() => setOpenModal((prev) => !prev)}>Open Modal</button>
      {openModal ? (
        <Modal
          id="A-VERY-UNIQUE-MODAL"
          footer={
            <div>
              <p>A FOOTY ASS FOOTER</p>
            </div>
          }
          header="A CUSTOM MODAL"
          body={<div>A BASTARD BODY FULL OF SHIT</div>}
          closeModal={() => setOpenModal(() => false)}
        />
      ) : null}
    </div>
  );
};

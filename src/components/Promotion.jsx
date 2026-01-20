import React, { useState } from 'react';
import Modal from './Modal';
import proImage from "../assets/Promotion/Miracle-2026.jpeg"

function Promotion() {
  const [open, setOpen] = useState(true);

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <img
        src={proImage}
        alt="SMCE Promotion"
        className="w-full h-auto rounded-lg"
      />
    </Modal>
  );
}

export default Promotion;
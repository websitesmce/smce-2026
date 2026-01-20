import React, { useState } from 'react';
import Modal from './Modal';
import promo from "../assets/Promotion/Miracle-2026.jpeg"

function Promotion() {
  const [open, setOpen] = useState(true);

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <img
        src={promo}
        alt="SMCE Promotion"
        className="w-full h-auto rounded-lg"
        loading="eager"
      />
    </Modal>
  );
}

export default Promotion;
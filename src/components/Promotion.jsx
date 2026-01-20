import React, { useState } from 'react';
import Modal from './Modal';

function Promotion() {
  const [open, setOpen] = useState(true);

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <img
        src="/public/Promotion/Miracle-2026.jpeg"
        alt="SMCE Promotion"
        className="w-full h-auto rounded-lg"
        loading="eager"
      />
    </Modal>
  );
}

export default Promotion;
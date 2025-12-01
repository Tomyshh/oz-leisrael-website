'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';

function WhatsAppButton() {
  const whatsappLink = useMemo(() => 'https://wa.me/972585767105', []);

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors duration-300"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contactez-nous sur WhatsApp"
    >
      <FaWhatsapp size={24} aria-hidden="true" />
    </motion.a>
  );
}

export default memo(WhatsAppButton);

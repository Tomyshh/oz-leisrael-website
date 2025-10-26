'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';

export default function ContactPage() {
  const { t } = useI18n();

  const whatsappNumber = '972537081718';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Bonjour%2C%20je%20souhaite%20obtenir%20plus%20d%27informations%20sur%20le%20programme%20Oz%20LeIsrael.`;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 text-gray-900 py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="heading-1 mb-4">{t('contact.title')}</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              {t('contact.noWait')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* WhatsApp Big CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-green-100 border-4 border-green-500 rounded-2xl p-12 text-center mb-12 shadow-2xl"
            >
              <FaWhatsapp className="w-24 h-24 text-green-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Contactez-nous sur WhatsApp
              </h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                La façon la plus rapide et directe de discuter avec notre équipe.
                Nous répondons généralement en quelques minutes !
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-500 text-white px-10 py-5 rounded-xl text-xl font-bold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <FaWhatsapp className="mr-3" size={32} />
                {t('contact.whatsapp')}
              </a>
              <p className="text-lg text-gray-600 mt-6 font-semibold">
                +972 53 708 17 18
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Info Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white rounded-lg shadow-xl p-8 h-full">
                  <h3 className="heading-3 mb-6">Informations de contact</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <FaMapMarkerAlt className="text-primary-600 text-xl" />
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-lg mb-1">Adresse</p>
                        <p className="text-gray-600">
                          Yeshiva Or Vishua<br />
                          Israël
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <FaPhone className="text-primary-600 text-xl" />
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-lg mb-1">Téléphone</p>
                        <a 
                          href={`tel:${whatsappNumber}`}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          +972 53 708 17 18
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <FaEnvelope className="text-primary-600 text-xl" />
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-lg mb-1">Email</p>
                        <a 
                          href="mailto:contact@ozleisrael.org"
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          contact@ozleisrael.org
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-lg mb-3">Horaires de disponibilité</h4>
                    <p className="text-gray-600">
                      Dimanche - Jeudi : 9h00 - 20h00<br />
                      Vendredi : 9h00 - 14h00
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Image Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-8"
              >
                <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/images/contact-image.jpg"
                    alt="Oz LeIsrael - Contactez-nous"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info Box */}
                <div className="bg-primary-900 text-white rounded-lg p-6">
                  <h4 className="text-xl font-bold mb-3">
                    Pourquoi nous contacter ?
                  </h4>
                  <ul className="space-y-2 text-primary-50">
                    <li className="flex items-start">
                      <span className="text-primary-400 mr-2">✓</span>
                      <span>Obtenir des informations sur le programme</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-400 mr-2">✓</span>
                      <span>Discuter de votre projet personnel</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-400 mr-2">✓</span>
                      <span>Planifier un entretien</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-400 mr-2">✓</span>
                      <span>Visiter la Yeshiva</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

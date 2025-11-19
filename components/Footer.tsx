import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/publick/messu-bouw-logo.jpg" 
                alt="Messu Bouw Logo" 
                className="h-12 w-12 object-contain rounded-lg border border-copper-500/30"
              />
              <h3 className="text-2xl font-bold text-slate-100">
                Messu <span className="text-copper-500">Bouw</span>
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Links</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/houtrotherstel" className="hover:text-copper-400 transition-colors">{t('nav.houtrot')}</Link></li>
              <li><Link to="/diensten" className="hover:text-copper-400 transition-colors">{t('nav.services')}</Link></li>
              <li><Link to="/projecten" className="hover:text-copper-400 transition-colors">{t('nav.projects')}</Link></li>
              <li><Link to="/contact" className="hover:text-copper-400 transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-copper-500 shrink-0" />
                <span>Randstad, Nederland</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-copper-500 shrink-0" />
                <span>+31 6 2662 5190</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-copper-500 shrink-0" />
                <span>info@messubouw.nl</span>
              </li>
            </ul>
          </div>

          {/* Meta */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Info</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>KVK: 12345678</li>
              <li>BTW: NL123456789B01</li>
              <li className="pt-4">
                <Link to="/privacy" className="underline hover:text-copper-400">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Messu Bouw. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
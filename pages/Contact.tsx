
import React, { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Upload, AlertCircle, CheckCircle, MessageCircle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  images?: File[];
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    subject: 'Inspectie aanvragen',
    message: '',
    images: []
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = t('validation.required');
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = t('validation.required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('validation.email_invalid');
      isValid = false;
    }

    // Phone is optional, but if provided must be valid
    if (formData.phone.trim() && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(formData.phone)) {
       if(!/^[\d\s\+\-\(\)]{8,}$/.test(formData.phone)) {
          newErrors.phone = t('validation.phone_invalid');
          isValid = false;
       }
    }

    if (!formData.message.trim()) {
      newErrors.message = t('validation.required');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Simulate API call
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setErrors({});
    }
  };

  const handleWhatsApp = () => {
    if (validate()) {
      const text = `*Contactformulier Website*\n` +
        `Naam: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Tel: ${formData.phone}\n` +
        `Onderwerp: ${formData.subject}\n` +
        `Bericht: ${formData.message}`;
        
      const url = `https://wa.me/31626625190?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({ 
        ...prev, 
        images: [...(prev.images || []), ...newFiles] 
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images ? prev.images.filter((_, i) => i !== index) : []
    }));
  };

  return (
    <div className="pt-20 min-h-screen bg-navy-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Form */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-6">{t('nav.contact')}</h1>
            <p className="text-slate-400 mb-8">
              Heeft u een vraag of wilt u direct een offerte aanvragen? Vul het formulier in en wij nemen zo snel mogelijk contact met u op.
            </p>

            {isSubmitted ? (
              <div className="bg-green-500/10 border border-green-500/50 rounded-2xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{t('validation.sent_success')}</h3>
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', subject: 'Inspectie aanvragen', message: '', images: [] });
                  }}
                  className="mt-6 text-copper-500 font-semibold hover:text-copper-400"
                >
                  Nog een bericht sturen
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Naam <span className="text-copper-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-copper-500'}`}
                    />
                    {errors.name && (
                      <div className="flex items-center mt-1 text-red-500 text-xs">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Telefoonnummer
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-copper-500'}`}
                    />
                    {errors.phone && (
                      <div className="flex items-center mt-1 text-red-500 text-xs">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.phone}
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    E-mailadres <span className="text-copper-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-copper-500'}`}
                  />
                  {errors.email && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Onderwerp</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-copper-500 transition-colors"
                  >
                    <option>Inspectie aanvragen</option>
                    <option>Offerte houtrotherstel</option>
                    <option>Timmerwerk</option>
                    <option>Overig</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Bericht <span className="text-copper-500">*</span>
                  </label>
                  <textarea 
                    name="message"
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-copper-500'}`}
                  ></textarea>
                  {errors.message && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.message}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t('forms.upload_label')}</label>
                  <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-copper-500/50 transition-colors cursor-pointer bg-white/5 relative group">
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      multiple 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <div className="relative z-0">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-copper-500 transition-colors" />
                      <span className="text-sm text-slate-400 block">{t('forms.upload_btn')}</span>
                    </div>
                  </div>
                  
                  {/* Image Previews */}
                  {formData.images && formData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {formData.images.map((file, idx) => (
                        <div key={idx} className="relative group aspect-square bg-navy-800 rounded-lg overflow-hidden border border-white/10">
                          <img
                            src={URL.createObjectURL(file)}
                            alt="preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-navy-900/50 p-4 rounded-lg border border-white/5 mb-4">
                    <p className="text-sm text-slate-400 text-center">
                        Direct contact? Bel of App: <a href="tel:+31626625190" className="text-copper-500 font-semibold hover:underline">+31 6 2662 5190</a>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-lg transition-all shadow-lg flex items-center justify-center space-x-2"
                  >
                    <MessageCircle size={20} />
                    <span>WhatsApp</span>
                  </button>

                  <button 
                    type="submit" 
                    className="w-full bg-copper-500 hover:bg-copper-600 text-white font-bold py-4 rounded-lg transition-all shadow-lg flex items-center justify-center space-x-2 btn-shine"
                  >
                     <Mail size={20} />
                     <span>Verstuur per E-mail</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8 lg:pt-20">
            <div className="bg-navy-900 p-8 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6">Contactgegevens</h3>
              
              {/* Direct Contact Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <a 
                  href="https://wa.me/31626625190" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl transition-colors font-medium"
                >
                  <MessageCircle className="w-6 h-6 mb-2" />
                  {t('common.whatsapp')}
                </a>
                <a 
                  href="mailto:info@messubouw.nl" 
                  className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-medium"
                >
                  <Mail className="w-6 h-6 mb-2" />
                  {t('common.email_btn')}
                </a>
              </div>

              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <div className="bg-copper-500/10 p-3 rounded-lg text-copper-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <span className="block text-white font-medium">Adres</span>
                    <span className="text-slate-400">Industrieweg 10<br/>3000 AA Rotterdam</span>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="bg-copper-500/10 p-3 rounded-lg text-copper-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <span className="block text-white font-medium">Telefoon</span>
                    <a href="tel:+31626625190" className="text-slate-400 hover:text-copper-500 transition-colors">+31 6 2662 5190</a>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="bg-copper-500/10 p-3 rounded-lg text-copper-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <span className="block text-white font-medium">E-mail</span>
                    <span className="text-slate-400">info@messubouw.nl</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="w-full h-80 bg-navy-900 rounded-2xl overflow-hidden border border-white/5 relative group shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d620500.7395390626!2d4.170403842482569!3d51.97738476790188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b7605f54c47d%3A0x5229bb7952780!2sZuid-Holland!5e0!3m2!1snl!2snl!4v1709300000000!5m2!1snl!2snl"
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                title="Werkgebied Zuid-Holland"
              ></iframe>
              
              {/* Overlay Label */}
              <div className="absolute bottom-4 left-4 bg-navy-950/90 backdrop-blur-md border border-copper-500/30 px-4 py-2 rounded-lg shadow-lg z-10 flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-copper-500 animate-bounce" />
                <div>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider">Werkgebied</span>
                  <span className="text-sm font-bold text-white">Zuid-Holland & Randstad</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;

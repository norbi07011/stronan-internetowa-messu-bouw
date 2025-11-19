
import React, { useState, FormEvent } from 'react';
import { Calendar, CheckCircle, AlertCircle, Send, MapPin, Phone, Mail, User, FileText, Upload, X, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export type ServiceType = 'houtrot' | 'timmerwerk' | 'inspecties';

interface ServiceContactFormProps {
  serviceType: ServiceType;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  startDate: string;
  endDate: string;
  description: string;
  // Specific fields
  framesCount?: string;
  floorLevel?: string;
  accessibility?: string;
  propertyType?: string;
  yearBuilt?: string;
  jobType?: string;
  material?: string;
  urgency?: string;
  images?: File[];
}

const ServiceContactForm: React.FC<ServiceContactFormProps> = ({ serviceType }) => {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', address: '',
    startDate: '', endDate: '', description: '',
    framesCount: '', floorLevel: '', accessibility: '',
    propertyType: '', yearBuilt: '', jobType: '', material: '', urgency: 'opt_medium',
    images: []
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
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

  const validate = () => {
    const newErrors: any = {};
    if (!formData.name) newErrors.name = t('validation.required');
    if (!formData.email) {
      newErrors.email = t('validation.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validation.email_invalid');
    }
    if (!formData.phone) newErrors.phone = t('validation.required');
    if (!formData.description) newErrors.description = t('validation.required');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Submitting for', serviceType, formData);
      setIsSubmitted(true);
    }
  };

  const handleWhatsApp = () => {
    if (validate()) {
      let text = `*Aanvraag: ${serviceType}*\n` +
        `Naam: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Tel: ${formData.phone}\n` +
        `Adres: ${formData.address}\n` +
        `Beschrijving: ${formData.description}\n`;
      
      if (formData.startDate) text += `Datum: ${formData.startDate} t/m ${formData.endDate}\n`;
      if (formData.framesCount) text += `Aantal kozijnen: ${formData.framesCount}\n`;
      if (formData.urgency) text += `Spoed: ${formData.urgency}\n`;
      
      const url = `https://wa.me/31626625190?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }
  };

  const renderField = (name: keyof FormData, labelKey: string, type: string = 'text', icon?: React.ReactNode) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {t(`forms.${labelKey}`)}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={formData[name as keyof FormData] as string || ''}
          onChange={handleChange}
          className={`w-full bg-navy-950 border ${errors[name] ? 'border-red-500' : 'border-white/10'} rounded-lg py-3 ${icon ? 'pl-10' : 'pl-4'} pr-4 text-white focus:outline-none focus:border-copper-500 transition-colors`}
        />
      </div>
      {errors[name] && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1"/> {errors[name]}</p>}
    </div>
  );

  return (
    <section className="py-16 bg-navy-900 border-t border-white/5" id="contact-form">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">{t('forms.general_title')}</h2>
          <p className="text-slate-400">{t('forms.general_desc')}</p>
        </div>

        {isSubmitted ? (
          <div className="bg-green-500/10 border border-green-500/50 rounded-2xl p-12 text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">{t('forms.success')}</h3>
            <p className="text-slate-300 mb-8">{t('validation.sent_success')}</p>
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '', email: '', phone: '', address: '',
                  startDate: '', endDate: '', description: '',
                  framesCount: '', floorLevel: '', accessibility: '',
                  propertyType: '', yearBuilt: '', jobType: '', material: '', urgency: 'opt_medium',
                  images: []
                });
              }}
              className="text-copper-500 font-semibold hover:text-copper-400"
            >
              Nog een aanvraag doen
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/5 rounded-2xl p-8 md:p-12 shadow-xl">
            
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {renderField('name', 'name', 'text', <User size={18}/>)}
              {renderField('email', 'email', 'email', <Mail size={18}/>)}
              {renderField('phone', 'phone', 'tel', <Phone size={18}/>)}
              {renderField('address', 'address', 'text', <MapPin size={18}/>)}
            </div>

            <div className="h-px bg-white/10 my-8"></div>

            {/* Date Picking */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t('forms.date_start')}</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="date" 
                    name="startDate" 
                    value={formData.startDate} 
                    onChange={handleChange}
                    className="w-full bg-navy-950 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-copper-500 transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">{t('forms.date_end')}</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="date" 
                    name="endDate" 
                    value={formData.endDate} 
                    onChange={handleChange}
                    className="w-full bg-navy-950 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-copper-500 transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            {/* Specific Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {serviceType === 'houtrot' && (
                <>
                  {renderField('framesCount', 'q_amount_frames')}
                  {renderField('floorLevel', 'q_floor_level')}
                  {renderField('accessibility', 'q_accessibility')}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-300 mb-2">{t('forms.q_urgency')}</label>
                    <select name="urgency" value={formData.urgency} onChange={handleChange} className="w-full bg-navy-950 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-copper-500">
                      <option value="high">{t('forms.opt_high')}</option>
                      <option value="medium">{t('forms.opt_medium')}</option>
                      <option value="low">{t('forms.opt_low')}</option>
                    </select>
                  </div>
                </>
              )}
              
              {serviceType === 'timmerwerk' && (
                <>
                  {renderField('jobType', 'q_job_type')}
                  {renderField('material', 'q_material')}
                  {renderField('propertyType', 'q_property_type')}
                </>
              )}

              {serviceType === 'inspecties' && (
                <>
                  {renderField('propertyType', 'q_property_type')}
                  {renderField('yearBuilt', 'q_year_built')}
                  {renderField('framesCount', 'q_amount_frames')}
                </>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('forms.description')}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-slate-500">
                  <FileText size={18} />
                </div>
                <textarea
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full bg-navy-950 border ${errors.description ? 'border-red-500' : 'border-white/10'} rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-copper-500 transition-colors`}
                ></textarea>
              </div>
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-300 mb-2">{t('forms.upload_label')}</label>
              <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-copper-500/50 transition-colors cursor-pointer bg-navy-950 relative group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="relative z-0">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-copper-500 transition-colors" />
                  <span className="text-sm text-slate-400 block">{t('forms.upload_btn')}</span>
                  <span className="text-xs text-slate-500 block mt-1">Max. 5MB per bestand</span>
                </div>
              </div>

              {/* Image Previews */}
              {formData.images && formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        title="Verwijder foto"
                      >
                        <X size={14} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1">
                        <p className="text-[10px] text-white truncate text-center">{file.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  type="button" 
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-lg transition-all shadow-lg flex items-center justify-center space-x-2"
                >
                  <MessageCircle size={20} />
                  <span>Verstuur via WhatsApp</span>
                </button>

                <button 
                  type="submit" 
                  className="w-full bg-copper-500 hover:bg-copper-600 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-copper-500/20 flex items-center justify-center space-x-2 btn-shine"
                >
                  <Mail size={20} />
                  <span>Verstuur per E-mail</span>
                </button>
            </div>

          </form>
        )}
      </div>
    </section>
  );
};

export default ServiceContactForm;

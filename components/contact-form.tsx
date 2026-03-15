'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { contactFormSchema, type ContactFormValues } from '@/lib/validations';

export function ContactForm() {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      designLength: '',
      designRange: '',
      circumferenceLength: '',
      circumferenceRange: '',
      resistanceLength: '',
      resistanceRange: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || 'Message sent successfully!');
        reset();
      } else {
        toast.error(result.error || 'Failed to send message');
      }
    } catch {
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-10">
          <div>
            <label className="font-bold text-2xl capitalize block mb-2">
              {t('name')} <span className="text-red-500">*</span>
            </label>
            <input
              {...register('name')}
              placeholder="your name"
              className="w-full px-4 py-3 rounded-full bg-white text-black text-xl outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="font-bold text-2xl capitalize block mb-2">
              {t('email')} <span className="text-red-500">*</span>
            </label>
            <input
              {...register('email')}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-full bg-white text-black text-xl outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="font-bold text-2xl capitalize block mb-2">
              {t('phone')} <span className="text-red-500">*</span>
            </label>
            <input
              {...register('phone')}
              placeholder="your phone number"
              className="w-full px-4 py-3 rounded-full bg-white text-black text-xl outline-none"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label className="font-bold text-2xl capitalize block mb-2">{t('message')}</label>
          <textarea
            {...register('message')}
            rows={4}
            className="w-full px-4 py-3 rounded-[15px] bg-white text-black text-xl outline-none resize-none"
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
        </div>

        <div>
          <label className="font-bold text-2xl capitalize block mb-2">{t('product')}</label>
          <div className="flex flex-col gap-10">
            <div className="w-full">
              <div className="grid grid-cols-3">
                <div className="table-border">{t('specifications')}</div>
                <div className="table-border">{t('design value')}</div>
                <div className="table-border">{t('operation range')} +/-</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="table-border">{t('length')}</div>
                <div className="table-border table-input">
                  <input
                    {...register('designLength')}
                    className="w-full h-full bg-transparent text-center outline-none"
                  />
                </div>
                <div className="table-border table-input">
                  <input
                    {...register('designRange')}
                    className="w-full h-full bg-transparent text-center outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="table-border">{t('circumlerence')}</div>
                <div className="table-border table-input">
                  <input
                    {...register('circumferenceLength')}
                    className="w-full h-full bg-transparent text-center outline-none"
                  />
                </div>
                <div className="table-border table-input">
                  <input
                    {...register('circumferenceRange')}
                    className="w-full h-full bg-transparent text-center outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="table-border">{t('suction resistance')}</div>
                <div className="table-border table-input">
                  <input
                    {...register('resistanceLength')}
                    className="w-full h-full bg-transparent text-center outline-none"
                  />
                </div>
                <div className="table-border table-input">
                  <input
                    {...register('resistanceRange')}
                    className="w-full h-full bg-transparent text-center outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end w-full">
          <button
            type="submit"
            disabled={loading}
            className="cbutton rounded-full w-full py-3 text-xl font-bold capitalize transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {loading ? '...' : t('submit')}
          </button>
        </div>
      </form>
    </div>
  );
}

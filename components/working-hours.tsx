'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function WorkingHours() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const currentHour = new Date().getHours()
    if (currentHour >= 9 && currentHour < 21) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
      className="absolute top-4 right-4 md:top-6 md:right-8 z-50 hidden sm:block select-none"
    >
      <div 
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d'
        }}
        className="relative"
      >
        {/* Tam Sağ Yuxarıda Sabitlənmiş Lüks 3D Gövdə */}
        <div 
          style={{
            transform: 'rotateY(-25deg) rotateX(4deg)',
            transformStyle: 'preserve-3d',
            background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
          }}
          className="w-[280px] p-5 rounded-2xl border border-amber-500/15 flex items-center justify-start gap-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-amber-500/30"
        >
          {/* İncə sakit qızılı parıltı */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-transparent -z-10" />

          {/* Dairəvi Status İşığı */}
          <div className="relative flex h-3 w-3 shrink-0 items-center justify-center">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${isOpen ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          </div>

          {/* Tipoqrafiya */}
          <div className="flex flex-col text-left space-y-1">
            <span className="text-[10px] tracking-[0.35em] text-zinc-400 font-bold uppercase leading-none">
              {isOpen ? 'HAZIRDA AÇIQIQ' : 'HAZIRDA BAĞLIYIQ'}
            </span>
            <span className="text-[16px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-100 to-amber-500 font-mono tracking-wide leading-none mt-0.5">
              Hər gün: 09:00 – 21:00
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

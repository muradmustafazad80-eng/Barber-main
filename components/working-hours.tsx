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
      initial={{ opacity: 0, scale: 0.9, x: 30 }}
      animate={{ opacity: 1, scale: 1.15, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
      className="absolute top-44 right-6 md:right-12 z-20 group hidden sm:block"
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      {/* 3D Master Korpus */}
      <div 
        style={{ 
          transform: 'rotateY(-28deg) rotateX(6deg)',
          transformStyle: 'preserve-3d'
        }}
        className="relative p-[1px] transition-all duration-700"
      >
        
        {/* Yumşaq Qızılı-Dumanlı Kölgə (Bərbər Tərzinə Tam Uyğun) */}
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-amber-600/20 via-yellow-500/15 to-neutral-800/40 blur-[3px] group-hover:blur-[5px] transition-all duration-700 -z-10" />

        {/* Gerçək Hamar Qövs - Dördbucaq blur problemini həll edən lüks daxili kart */}
        <div 
          style={{ 
            transform: 'translateZ(10px)',
            background: 'linear-gradient(135deg, rgba(20,20,20,0.92) 0%, rgba(10,10,10,0.98) 100%)',
            borderRadius: '16px 4px 16px 4px'
          }}
          className="relative w-[250px] py-4 flex items-center justify-start px-5 gap-4 border border-amber-500/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)]"
        >
          
          {/* Status İşığı */}
          <div className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          </div>
          
          {/* Tipoqrafiya */}
          <div className="flex flex-col text-left space-y-1">
            <span className="text-[10px] tracking-[0.3em] text-zinc-400 font-bold uppercase font-sans">
              {isOpen ? 'HAZIRDA AÇIQIQ' : 'HAZIRDA BAĞLIYIQ'}
            </span>
            <span className="text-[15px] font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-100 to-amber-500 font-mono tracking-wide">
              Hər gün: 09:00 – 21:00
            </span>
          </div>

        </div>

      </div>
    </motion.div>
  )
}

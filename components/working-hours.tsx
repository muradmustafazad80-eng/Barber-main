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
      initial={{ opacity: 0, scale: 0.9, x: 40 }}
      animate={{ opacity: 1, scale: 1.25, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
      className="absolute top-40 right-6 md:right-16 z-20 group hidden sm:block"
      style={{ perspective: '1800px', transformStyle: 'preserve-3d' }}
    >
      {/* 3D Silindrik/Konkav Qövs Yaradan Ana Korpus */}
      <div 
        style={{ 
          transform: 'rotateY(-32deg) rotateX(4deg)',
          transformStyle: 'preserve-3d'
        }}
        className="relative rounded-2xl p-[1px] shadow-[0_50px_80px_-20px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all duration-700"
      >
        
        {/* Sakit, göz oxşayan lüks dərin okean və qızıl dumanlı border kölgəsi (Premium Soft Glow) */}
        <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-blue-950/50 via-slate-800/40 to-amber-950/30 opacity-60 blur-[3px] group-hover:opacity-100 transition-all duration-700 -z-10" />

        {/* PANORAMİK IMAX BÜKÜLMƏSİ (İçəri doğru fiziki bükülmüş vahid şüşə panel) */}
        <div 
          style={{ 
            transform: 'translateZ(20px)',
            background: 'linear-gradient(135deg, rgba(12,18,33,0.96) 0%, rgba(3,7,18,0.98) 100%)',
            clipPath: 'path("M0,0 Q120,8 240,0 L240,70 Q120,78 0,70 Z")'
          }}
          className="relative rounded-2xl w-[260px] h-[74px] flex items-center justify-start px-6 gap-4 border border-blue-900/20"
        >
          
          {/* Sakit Status İşığı */}
          <div className="relative flex h-3 w-3 shrink-0 items-center justify-center mt-1">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${isOpen ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          </div>
          
          {/* Tipoqrafiya və Bucaq Altında Yazılar */}
          <div 
            style={{ transform: 'rotateY(10deg)', transformStyle: 'preserve-3d' }}
            className="flex flex-col text-left space-y-1 origin-left mt-1"
          >
            <span className="text-[10px] tracking-[0.32em] text-zinc-400 font-bold uppercase font-sans">
              {isOpen ? 'HAZIRDA AÇIQIQ' : 'HAZIRDA BAĞLIYIQ'}
            </span>
            <span className="text-[16px] font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-100 to-amber-500 font-mono tracking-wider">
              Hər gün: 09:00 – 21:00
            </span>
          </div>

        </div>

      </div>
    </motion.div>
  )
}

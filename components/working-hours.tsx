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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="absolute top-44 right-6 md:right-16 z-20 hidden sm:block select-none"
    >
      {/* 3D Hamar Silindrik Qövs (Sənin göndərdiyin sxemin eynisi) */}
      <div 
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
        className="relative"
      >
        <div 
          style={{
            transform: 'rotateY(-35deg) rotateX(4deg) scale(1.15)',
            transformStyle: 'preserve-3d',
            background: 'linear-gradient(145deg, rgba(15, 15, 15, 0.85) 0%, rgba(5, 5, 5, 0.95) 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}
          className="w-[270px] px-6 py-4 rounded-xl border border-amber-500/20 flex items-center gap-4 transition-all duration-500 hover:border-amber-500/40"
        >
          {/* İncə, göz oxşayan lüks qızılı kənar dumanı */}
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-transparent blur-[2px] -z-10" />

          {/* Status İşığı */}
          <div className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          </div>

          {/* Tipoqrafiya */}
          <div className="flex flex-col text-left space-y-0.5">
            <span className="text-[10px] tracking-[0.35em] text-zinc-400 font-bold uppercase">
              {isOpen ? 'HAZIRDA AÇIQIQ' : 'HAZIRDA BAĞLIYIQ'}
            </span>
            <span className="text-[16px] font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-100 to-amber-500 font-mono tracking-wide">
              Hər gün: 09:00 – 21:00
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

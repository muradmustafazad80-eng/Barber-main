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
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
      className="absolute top-24 right-4 md:top-28 md:right-8 z-50 hidden sm:block select-none pointer-events-auto"
    >
      <div 
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d'
        }}
        className="relative"
      >
        {/* Hover zamanı böyüyən (group-hover:scale-105) və ətrafında dönən lüks border daşıyan ana gövdə */}
        <div 
          style={{
            transform: 'rotateY(-20deg) rotateX(4deg)',
            transformStyle: 'preserve-3d',
            background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.96) 0%, rgba(5, 5, 5, 0.98) 100%)',
          }}
          className="w-[220px] p-3.5 md:w-[280px] md:p-5 rounded-xl md:rounded-2xl border border-amber-500/10 flex items-center justify-start gap-3 md:gap-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-500 group-hover:scale-105 group-hover:border-transparent relative overflow-hidden"
        >
          {/* Ətrafında yavaşca dönən müasir sehrli gradient border zolağı */}
          <div className="absolute -inset-[200%] bg-[conic-gradient(from_0deg,transparent_40%,#d97706_50%,#3b82f6_60%,transparent_70%)] animate-[spin_6s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          
          {/* İçəridəki qara fonun borderin altından çıxmaması üçün maska pərdəsi */}
          <div className="absolute inset-[1px] bg-neutral-950 rounded-[inherit] -z-10 transition-colors duration-300 group-hover:bg-neutral-900/95" />

          {/* Status İşığı */}
          <div className="relative flex h-2.5 w-2.5 md:h-3 md:w-3 shrink-0 items-center justify-center">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${isOpen ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          </div>

          {/* Tipoqrafiya */}
          <div className="flex flex-col text-left space-y-0.5 md:space-y-1">
            <span className="text-[8px] md:text-[10px] tracking-[0.25em] md:tracking-[0.35em] text-zinc-400 font-bold uppercase leading-none">
              {isOpen ? 'HAZIRDA AÇIQIQ' : 'HAZIRDA BAĞLIYIQ'}
            </span>
            <span className="text-[13px] md:text-[16px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-100 to-amber-500 font-mono tracking-wide leading-none mt-0.5">
              09:00 – 21:00
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

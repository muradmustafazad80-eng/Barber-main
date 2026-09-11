import { Scissors, Sparkles, Droplets, Crown, Baby, Flame } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const services = [
  {
    icon: Scissors,
    title: 'Klassik Saç Kəsimi',
    desc: 'Formaya uyğun peşəkar kəsim, yuma və styling daxil olmaqla.',
  },
  {
    icon: Flame,
    title: 'Saqqal Formalaşdırma',
    desc: 'İsti dəsmal, ülgüc və dəqiq kontur ilə saqqal qulluğu.',
  },
  {
    icon: Droplets,
    title: 'Royal Ülgüc Təraş',
    desc: 'Ənənəvi isti köpük və ülgüclə lüks üz təraşı ritualı.',
  },
  {
    icon: Crown,
    title: 'VIP Paket',
    desc: 'Kəsim, saqqal, üz maskası və içki daxil tam qulluq.',
  },
  {
    icon: Baby,
    title: 'Uşaq Kəsimi',
    desc: 'Kiçik centlmenlər üçün rahat və əyləncəli təcrübə.',
  },
  {
    icon: Sparkles,
    title: 'Saç Boyama & Qulluq',
    desc: 'Ağarma örtüyü, ton və dərin qulluq prosedurları.',
  },
]

export function ServicesSection() {
  return (
    <section id="xidmetler" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="XİDMƏTLƏR"
          title="Ustalıqla göstərilən xidmətlər"
          description="Hər detala diqqətlə yanaşan usta komandamız sizə salon deyil, təcrübə təqdim edir."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group bg-card p-8 transition-colors hover:bg-secondary"
            >
              <div className="flex size-12 items-center justify-center rounded-sm border border-primary/30 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

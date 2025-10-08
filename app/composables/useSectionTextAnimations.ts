// composables/useSectionTextAnimations.ts
import { onMounted, nextTick } from 'vue'
import { useGsapAnimations } from '@/composables/useGsapAnimations'

export function useSectionTextAnimations() {
    const { textFillSequence } = useGsapAnimations()

    onMounted(async () => {
        await nextTick()

        // Sélectionner toutes les sections
        const sections = document.querySelectorAll('section[id]')

        sections.forEach((section, index) => {
            const titles = section.querySelectorAll('.title')
            const descriptions = section.querySelectorAll('.description')

            if (!titles.length && !descriptions.length) return

            textFillSequence([
                ...Array.from(titles).map(el => ({
                    selector: el,
                    fillColor: '#ffffff',
                    emptyColor: 'oklch(55.4% 0.046 257.417)',
                })),
                ...Array.from(descriptions).map(el => ({
                    selector: el,
                    fillColor: 'oklch(55.4% 0.046 257.417)',
                    emptyColor: 'oklch(20.8% 0.042 265.755)',
                }))
            ], {
                splitByLines: true,
                start: 'top 80%',
                end: 'bottom 40%',
                stagger: 0.8,   // ⏳ ralentit la séquence entre lignes
                scrub: 3,       // 🕹 contrôle la synchronisation scroll
                gap: 8,         // ajustement de l'espacement entre lignes
            })
        })
    })
}

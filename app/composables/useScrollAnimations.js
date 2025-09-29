export function useScrollAnimations() {
    let scrollTriggers = []
    const { $gsap, $ScrollTrigger } = useNuxtApp()
    const createFadeUpAnimation = (selector, options = {}) => {
        const defaultOptions = {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out",
            stagger: 0.2,
            trigger: selector,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            immediate: false, // NOUVEAU : pour jouer immédiatement sans ScrollTrigger
            delay: 0 // NOUVEAU : délai avant le déclenchement
        }

        const config = { ...defaultOptions, ...options }

        // Animation initiale (état de départ)
        $gsap.set(selector, {
            y: config.y,
            opacity: config.opacity
        })

        let tl

        // NOUVELLE LOGIQUE : Vérifier si c'est une animation immédiate
        if (config.immediate) {
            // Animation immédiate sans ScrollTrigger (pour la première section)
            tl = $gsap.timeline({ delay: config.delay })
            tl.to(selector, {
                y: 0,
                opacity: 1,
                duration: config.duration,
                ease: config.ease,
                stagger: config.stagger
            })
        } else {
            // Animation avec ScrollTrigger pour les autres sections
            tl = $gsap.timeline({
                scrollTrigger: {
                    trigger: config.trigger,
                    start: config.start,
                    end: config.end,
                    toggleActions: config.toggleActions,
                    // markers: true, // pour debug
                }
            })

            tl.to(selector, {
                y: 0,
                opacity: 1,
                duration: config.duration,
                ease: config.ease,
                stagger: config.stagger
            })
        }

        // Stocker la référence pour le cleanup
        scrollTriggers.push($ScrollTrigger.getAll())

        return tl
    }

    const initFadeUpAnimations = () => {
        // NOUVEAU : Animation immédiate pour la première section (hero)
        createFadeUpAnimation('.hero-content, .first-section', {
            immediate: true, // ⭐ C'est ici la différence !
            delay: 0.3, // petit délai après le chargement
            duration: 1.2
        })

        // Animation pour tous les autres éléments avec ScrollTrigger
        createFadeUpAnimation('.fade-up:not(.hero-content):not(.first-section)')

        // Animation pour les sections avec des options personnalisées
        createFadeUpAnimation('.section-content', {
            y: 80,
            duration: 1.2,
            start: "top 70%"
        })

        // Animation pour les cartes avec stagger
        createFadeUpAnimation('.card-item', {
            y: 60,
            stagger: 0.15,
            start: "top 85%"
        })
    }

    const cleanup = () => {
        $ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        scrollTriggers = []
    }

    onMounted(() => {
        initFadeUpAnimations()
    })

    onUnmounted(() => {
        cleanup()
    })

    return {
        createFadeUpAnimation,
        initFadeUpAnimations,
        cleanup
    }
}
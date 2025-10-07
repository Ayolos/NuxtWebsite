// composables/useGsapAnimations.ts
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Types pour les options
interface TypewriterOptions {
    duration?: number;
    delay?: number;
    ease?: string;
    loop?: boolean;
    loopDelay?: number;
    cursor?: boolean;
    cursorChar?: string;
    preserveSpace?: boolean;
    onComplete?: () => void;
    onStart?: () => void;
}

interface CascadeInOptions {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
    onComplete?: () => void;
}

interface RotateInfiniteOptions {
    duration?: number;
    clockwise?: boolean;
    ease?: string;
}

interface PulseOptions {
    scale?: number;
    duration?: number;
    ease?: string;
    attribute?: string;
    attributeValue?: number;
}

interface ParallaxScrollOptions {
    y?: number;
    x?: number;
    rotation?: number;
    trigger?: string | HTMLElement;
    start?: string;
    end?: string;
    scrub?: number | boolean;
}

type GsapTarget = string | HTMLElement | HTMLElement[];

export const useGsapAnimations = () => {
    if (import.meta.client) {
        gsap.registerPlugin(TextPlugin, ScrollTrigger);
    }

    /**
     * Animation typewriter sur un élément avec curseur optionnel
     * @param target - Sélecteur CSS ou élément DOM
     * @param options - Options d'animation
     * @returns Objet avec la timeline et la fonction de nettoyage
     */
    const typewriter = (
        target: GsapTarget,
        options: TypewriterOptions = {}
    ): { timeline: gsap.core.Timeline | null; cleanup: () => void } | null => {
        if (!import.meta.client) return null;

        const {
            duration = 2,
            delay = 0,
            ease = 'none',
            loop = false,
            loopDelay = 1,
            cursor = true,
            cursorChar = '|',
            preserveSpace = true,
            onComplete = undefined,
            onStart = undefined
        } = options;

        const element = typeof target === 'string'
            ? document.querySelector<HTMLElement>(target)
            : target as HTMLElement;

        if (!element) {
            console.warn(`Typewriter: Element not found for target "${target}"`);
            return null;
        }

        const originalText = element.textContent || '';

        // Réserver l'espace si demandé
        if (preserveSpace) {
            element.style.minWidth = `${element.offsetWidth}px`;
            element.style.display = 'inline-block';
        }

        // Créer le conteneur pour le texte et le curseur
        const textSpan = document.createElement('span');
        textSpan.className = 'typewriter-text';

        const cursorSpan = cursor ? document.createElement('span') : null;
        if (cursorSpan) {
            cursorSpan.className = 'typewriter-cursor';
            cursorSpan.textContent = cursorChar;
            cursorSpan.style.display = 'inline-block';
        }

        element.textContent = '';
        element.appendChild(textSpan);
        if (cursorSpan) {
            element.appendChild(cursorSpan);
        }

        // Timeline pour l'animation
        // Remplace toute la partie animation dans la fonction typewriter par :

// Timeline pour l'animation
        const tl = gsap.timeline({
            repeat: loop ? -1 : 0,
            onStart,
            onComplete: !loop ? onComplete : undefined
        });

// Animation du texte (écriture)
        tl.to(textSpan, {
            duration,
            delay,
            ease,
            text: {
                value: originalText,
                delimiter: ''
            }
        });

// Si en boucle, ajouter pause + effacement
        if (loop) {
            // Marquer le début de la pause
            tl.addLabel('pauseStart');
            tl.to({}, { duration: loopDelay }); // Pause avant l'effacement

            // Marquer le début de l'effacement
            tl.addLabel('eraseStart');
            tl.to(textSpan, {
                duration: duration * 0.5,
                ease,
                text: {
                    value: '',
                    delimiter: ''
                }
            });
        }

// Animation du curseur clignotant
        let cursorAnimation: gsap.core.Tween | null = null;
        if (cursorSpan) {
            gsap.set(cursorSpan, { opacity: 1 });

            if (loop) {
                // Curseur clignote pendant la pause du début et de fin
                tl.call(() => {
                    cursorAnimation = gsap.to(cursorSpan, {
                        opacity: 0,
                        duration: 0.5,
                        repeat: -1,
                        yoyo: true,
                        ease: 'steps(1)'
                    });
                }, [], 'pauseStart');

                // Arrêter le clignotement pour l'effacement
                tl.call(() => {
                    if (cursorAnimation) {
                        cursorAnimation.kill();
                        gsap.set(cursorSpan, { opacity: 1 });
                    }
                }, [], 'eraseStart');
            }
        }

        // Fonction de nettoyage
        const cleanup = () => {
            tl.kill();
            if (cursorAnimation) {
                cursorAnimation.kill();
            }
            element.textContent = originalText;
            element.style.minWidth = '';
            element.style.display = '';
        };

        return { timeline: tl, cleanup };
    };

    /**
     * Animation d'entrée en cascade pour plusieurs éléments
     */
    const cascadeIn = (
        targets: GsapTarget,
        options: CascadeInOptions = {}
    ): gsap.core.Tween | null => {
        if (!import.meta.client) return null;

        const {
            opacity = 0,
            y = 20,
            x = 0,
            scale = 1,
            rotation = 0,
            duration = 0.6,
            stagger = 0.1,
            delay = 0,
            ease = 'power2.out',
            onComplete = undefined
        } = options;

        return gsap.from(targets, {
            opacity,
            y,
            x,
            scale,
            rotation,
            duration,
            stagger,
            delay,
            ease,
            onComplete
        });
    };

    /**
     * Animation de rotation continue
     */
    const rotateInfinite = (
        target: GsapTarget,
        options: RotateInfiniteOptions = {}
    ): gsap.core.Tween | null => {
        if (!import.meta.client) return null;

        const {
            duration = 20,
            clockwise = true,
            ease = 'none'
        } = options;

        return gsap.to(target, {
            rotation: clockwise ? 360 : -360,
            duration,
            repeat: -1,
            ease,
            transformOrigin: 'center'
        });
    };

    /**
     * Animation de pulsation
     */
    const pulse = (
        target: GsapTarget,
        options: PulseOptions = {}
    ): gsap.core.Tween | null => {
        if (!import.meta.client) return null;

        const {
            scale = 1.1,
            duration = 1,
            ease = 'power1.inOut',
            attribute = undefined,
            attributeValue = undefined
        } = options;

        const animationProps: gsap.TweenVars = {
            duration,
            repeat: -1,
            yoyo: true,
            ease
        };

        if (attribute && attributeValue !== undefined) {
            animationProps.attr = { [attribute]: attributeValue };
        } else {
            animationProps.scale = scale;
        }

        return gsap.to(target, animationProps);
    };

    /**
     * Animation de parallax au scroll
     */
    const parallaxScroll = (
        target: GsapTarget,
        options: ParallaxScrollOptions = {}
    ): gsap.core.Tween | null => {
        if (!import.meta.client) return null;

        const {
            y = 100,
            x = 0,
            rotation = 0,
            trigger = null,
            start = 'top top',
            end = 'bottom top',
            scrub = 1
        } = options;

        return gsap.to(target, {
            scrollTrigger: {
                trigger: trigger || target,
                start,
                end,
                scrub
            },
            y,
            x,
            rotation,
            ease: 'none'
        });
    };

    /**
     * Nettoie toutes les animations ScrollTrigger
     */
    const killAllScrollTriggers = (): void => {
        if (!import.meta.client) return;
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

    /**
     * Crée une timeline GSAP
     */
    const createTimeline = (options: gsap.TimelineVars = {}): gsap.core.Timeline | null => {
        if (!import.meta.client) return null;
        return gsap.timeline(options);
    };

    return {
        typewriter,
        cascadeIn,
        rotateInfinite,
        pulse,
        parallaxScroll,
        killAllScrollTriggers,
        createTimeline
    };
};

export type {
    TypewriterOptions,
    CascadeInOptions,
    RotateInfiniteOptions,
    PulseOptions,
    ParallaxScrollOptions,
    GsapTarget
};
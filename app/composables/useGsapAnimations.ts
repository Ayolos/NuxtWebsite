// composables/useGsapAnimations.ts
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type'


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

interface FadeScrollOptions {
    y?: number;
    opacity?: number;
    duration?: number;
    start?: string;
    end?: string;
    toggleActions?: string;
    markers?: boolean;
    stagger?: number;
    reverse?: boolean;
}

interface TextFillScrollOptions {
    fillColor?: string;
    emptyColor?: string;
    start?: string;
    end?: string;
    scrub?: number | boolean;
    markers?: boolean;
    duration?: number;
    splitByLines?: boolean;
    stagger?: number;
}

interface TextFillSequenceItem {
    selector: string;
    fillColor?: string;
    emptyColor?: string;
    duration?: number;
}

interface PinnedTextFillOptions {
    fillColor?: string;
    emptyColor?: string;
    markers?: boolean;
    pinSpacing?: boolean;
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
     * Animation de fade up/down au scroll
     * @param target - Sélecteur CSS ou élément(s) DOM
     * @param options - Options d'animation
     * @returns Tween GSAP ou null
     */
    const fadeScroll = (
        target: GsapTarget,
        options: FadeScrollOptions = {}
    ): gsap.core.Tween | null => {
        if (!import.meta.client) return null;

        const {
            y = 50,
            opacity = 0,
            duration = 1,
            start = 'top 80%',
            end = 'top 20%',
            toggleActions = 'play reverse play reverse',
            markers = false,
            stagger = 0.15,
            reverse = true
        } = options;

        const elements = typeof target === 'string'
            ? document.querySelectorAll(target)
            : Array.isArray(target) ? target : [target];

        if (elements.length === 0) {
            console.warn(`FadeScroll: No elements found for target "${target}"`);
            return null;
        }

        // Vérifier si l'élément est déjà visible dans le viewport
        const isInViewport = (el: Element) => {
            const rect = el.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
        };

        // Animation pour plusieurs éléments avec stagger
        if (elements.length > 1) {
            const firstElement = elements[0] as HTMLElement;

            // Si le premier élément est déjà visible, jouer l'animation immédiatement
            if (isInViewport(firstElement)) {
                // Définir l'état initial immédiatement
                gsap.set(elements, {
                    y: reverse ? y : -y,
                    opacity
                });

                // Animer vers l'état final
                const tween = gsap.to(elements, {
                    y: 0,
                    opacity: 1,
                    duration,
                    stagger,
                    delay: 0.1,
                    ease: 'power2.out'
                });

                // Créer le ScrollTrigger pour l'effet inverse quand on sort
                ScrollTrigger.create({
                    trigger: firstElement,
                    start,
                    end,
                    onLeave: () => {
                        gsap.to(elements, {
                            y: reverse ? y : -y,
                            opacity,
                            duration: duration * 0.6,
                            stagger: stagger * 0.5,
                            ease: 'power2.in'
                        });
                    },
                    onEnterBack: () => {
                        gsap.to(elements, {
                            y: 0,
                            opacity: 1,
                            duration,
                            stagger,
                            ease: 'power2.out'
                        });
                    },
                    onLeaveBack: () => {
                        gsap.to(elements, {
                            y: reverse ? y : -y,
                            opacity,
                            duration: duration * 0.6,
                            stagger: stagger * 0.5,
                            ease: 'power2.in'
                        });
                    },
                    markers
                });

                return tween;
            }

            return gsap.from(elements, {
                y: reverse ? y : -y,
                opacity,
                duration,
                stagger,
                scrollTrigger: {
                    trigger: firstElement,
                    start,
                    end,
                    toggleActions,
                    markers
                }
            });
        }

        // Animation pour un seul élément
        const element = typeof target === 'string'
            ? document.querySelector(target)
            : target as HTMLElement;

        if (element && isInViewport(element)) {
            // Définir l'état initial immédiatement
            gsap.set(target, {
                y: reverse ? y : -y,
                opacity
            });

            // Animer vers l'état final
            const tween = gsap.to(target, {
                y: 0,
                opacity: 1,
                duration,
                delay: 0.1,
                ease: 'power2.out'
            });

            // Créer le ScrollTrigger pour l'effet inverse
            ScrollTrigger.create({
                trigger: element,
                start,
                end,
                onLeave: () => {
                    gsap.to(target, {
                        y: reverse ? y : -y,
                        opacity,
                        duration: duration * 0.6,
                        ease: 'power2.in'
                    });
                },
                onEnterBack: () => {
                    gsap.to(target, {
                        y: 0,
                        opacity: 1,
                        duration,
                        ease: 'power2.out'
                    });
                },
                onLeaveBack: () => {
                    gsap.to(target, {
                        y: reverse ? y : -y,
                        opacity,
                        duration: duration * 0.6,
                        ease: 'power2.in'
                    });
                },
                markers
            });

            return tween;
        }

        return gsap.from(target, {
            y: reverse ? y : -y,
            opacity,
            duration,
            scrollTrigger: {
                trigger: target,
                start,
                end,
                toggleActions,
                markers
            }
        });
    };

    /**
     * Animation de remplissage de texte au scroll
     * @param target - Sélecteur CSS ou élément DOM
     * @param options - Options d'animation
     * @returns Tween GSAP ou null
     */
    const textFillScroll = (
        target: GsapTarget,
        options: TextFillScrollOptions = {}
    ): gsap.core.Tween | gsap.core.Timeline | null => {
        if (!import.meta.client) return null;

        const {
            fillColor = '#000000',
            emptyColor = 'rgba(0, 0, 0, 0.2)',
            start = 'top 80%',
            end = 'top 20%',
            scrub = 1,
            markers = false,
            duration = undefined,
            splitByLines = false,
            stagger = 0.3
        } = options;

        const element = typeof target === 'string'
            ? document.querySelector<HTMLElement>(target)
            : target as HTMLElement;

        if (!element) {
            console.warn(`TextFillScroll: Element not found for target "${target}"`);
            return null;
        }

        // Si splitByLines est activé, chercher les enfants directs (spans, divs)
        if (splitByLines) {
            const split = new SplitType(element, { types: 'lines' });
            const lines = split.lines as HTMLElement[];

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start,
                    end,
                    scrub,
                    markers
                }
            });

            lines.forEach((line) => {
                const text = line.textContent || '';
                line.innerHTML = '';

                line.style.position = 'relative';
                line.style.display = 'block';
                line.style.overflow = 'hidden';

                const backgroundText = document.createElement('span');
                backgroundText.textContent = text;
                backgroundText.style.color = emptyColor;
                backgroundText.style.display = 'block';

                const fillText = document.createElement('span');
                fillText.textContent = text;
                fillText.style.position = 'absolute';
                fillText.style.top = '0';
                fillText.style.color = fillColor;
                fillText.style.clipPath = 'inset(0 100% 0 0)';
                fillText.style.display = 'block';
                fillText.style.whiteSpace = 'pre';

// ✅ Ajustement de l'alignement horizontal
                const textAlign = window.getComputedStyle(element).textAlign;
                if (textAlign === 'center') {
                    fillText.style.left = '50%';
                    fillText.style.transform = 'translateX(-50%)';
                    fillText.style.textAlign = 'center';
                } else if (textAlign === 'right' || textAlign === 'end') {
                    fillText.style.right = '0';
                    fillText.style.textAlign = 'right';
                } else {
                    fillText.style.left = '0';
                    fillText.style.textAlign = 'left';
                }

                line.appendChild(backgroundText);
                line.appendChild(fillText);

                // ✅ Enchaîne chaque ligne à la fin de la précédente
                tl.to(fillText, {
                    clipPath: 'inset(0 0% 0 0)',
                    ease: 'none',
                    duration: 1
                });
            });

            return tl;
        }

        // Comportement normal (texte entier)
        const text = element.textContent || '';
        element.innerHTML = '';
        element.style.position = 'relative';
        element.style.display = 'inline-block';

        const backgroundText = document.createElement('span');
        backgroundText.textContent = text;
        backgroundText.style.color = emptyColor;
        backgroundText.style.display = 'block';

        const fillText = document.createElement('span');
        fillText.textContent = text;
        fillText.style.position = 'absolute';
        fillText.style.top = '0';
        fillText.style.left = '0';
        fillText.style.color = fillColor;
        fillText.style.clipPath = 'inset(0 100% 0 0)';
        fillText.style.display = 'block';

        element.appendChild(backgroundText);
        element.appendChild(fillText);

        if (scrub !== false) {
            return gsap.to(fillText, {
                clipPath: 'inset(0 0% 0 0)',
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start,
                    end,
                    scrub,
                    markers
                }
            });
        } else {
            return gsap.to(fillText, {
                clipPath: 'inset(0 0% 0 0)',
                duration: duration || 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start,
                    toggleActions: 'play none none reverse',
                    markers
                }
            });
        }
    };

    /**
     * Animation de remplissage de texte en séquence
     * @param items - Tableau d'éléments à animer en séquence
     * @param options - Options globales
     */
    const textFillSequence = (
        items: ({ selector: Element; fillColor: string; emptyColor: string } | {
            selector: Element;
            fillColor: string;
            emptyColor: string
        })[],
        options: {
            scrub?: number | boolean;
            markers?: boolean;
            start?: string;
            end?: string;
            gap?: number;
            splitByLines?: boolean;
            stagger?: number
        } = {}
    ): gsap.core.Tween[] => {
        if (!import.meta.client) return [];

        const {
            scrub = 2,
            markers = false,
            start = 'top 90%',
            end = 'bottom 30%',
            gap = 10
        } = options;

        const animations: gsap.core.Tween[] = [];
        const totalItems = items.length;

        // Parser les valeurs start et end
        const startValue = parseInt(start.split(' ')[1]);
        const endValue = parseInt(end.split(' ')[1]);
        const totalRange = startValue - endValue;
        const rangePerItem = totalRange / totalItems;

        items.forEach((item, index) => {
            const itemStart = `top ${startValue - (rangePerItem * index)}%`;
            const itemEnd = `top ${startValue - (rangePerItem * (index + 1)) + gap}%`;

            const anim = textFillScroll(item.selector, {
                fillColor: item.fillColor,
                emptyColor: item.emptyColor,
                start: itemStart,
                end: itemEnd,
                scrub,
                markers,
                duration: item.duration,
                splitByLines: item.splitByLines ?? options.splitByLines,
            });

            if (anim) {
                animations.push(anim);
            }
        });

        return animations;
    };

    /**
     * Animation de remplissage de texte avec pin (bloque le scroll pendant l'animation)
     * @param containerSelector - Sélecteur du conteneur à épingler
     * @param textSelector - Sélecteur du texte à révéler
     * @param options - Options d'animation
     */
    const pinnedTextFill = (
        containerSelector: string,
        textSelector: string,
        options: PinnedTextFillOptions = {}
    ): gsap.core.Tween | null => {
        if (!import.meta.client) return null;

        const {
            fillColor = '#000000',
            emptyColor = 'rgba(0, 0, 0, 0.2)',
            markers = false,
            pinSpacing = true,
            scrub = 1
        } = options;

        const container = document.querySelector<HTMLElement>(containerSelector);
        const element = document.querySelector<HTMLElement>(textSelector);

        if (!container || !element) {
            console.warn(`PinnedTextFill: Container or element not found`);
            return null;
        }

        const text = element.textContent || '';

        // Créer la structure HTML avec deux couches de texte
        element.innerHTML = '';
        element.style.position = 'relative';
        element.style.display = 'inline-block';

        // Couche de fond (texte vide/transparent)
        const backgroundText = document.createElement('span');
        backgroundText.textContent = text;
        backgroundText.style.color = emptyColor;
        backgroundText.style.display = 'block';

        // Couche de remplissage (texte coloré avec clip)
        const fillText = document.createElement('span');
        fillText.textContent = text;
        fillText.style.position = 'absolute';
        fillText.style.top = '0';
        fillText.style.left = '0';
        fillText.style.color = fillColor;
        fillText.style.clipPath = 'inset(0 100% 0 0)';
        fillText.style.display = 'block';

        element.appendChild(backgroundText);
        element.appendChild(fillText);

        // Animation avec pin
        return gsap.to(fillText, {
            clipPath: 'inset(0 0% 0 0)',
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: '+=100%',  // La hauteur du scroll nécessaire
                scrub,
                pin: true,
                pinSpacing,
                markers,
                anticipatePin: 1
            }
        });
    };

    /**
     * Animation de remplissage en séquence avec pin
     * @param containerSelector - Sélecteur du conteneur à épingler
     * @param items - Tableau d'éléments à animer en séquence
     * @param options - Options d'animation
     */
    const pinnedTextFillSequence = (
        containerSelector: string,
        items: TextFillSequenceItem[],
        options: {
            markers?: boolean;
            pinSpacing?: boolean;
            scrub?: number | boolean;
            scrollDistance?: string;
        } = {}
    ): gsap.core.Timeline | null => {
        if (!import.meta.client) return null;

        const {
            markers = false,
            pinSpacing = true,
            scrub = 1,
            scrollDistance = '+=200%'
        } = options;

        const container = document.querySelector<HTMLElement>(containerSelector);
        if (!container) {
            console.warn(`PinnedTextFillSequence: Container not found`);
            return null;
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: scrollDistance,
                scrub,
                pin: true,
                pinSpacing,
                markers,
                anticipatePin: 1
            }
        });

        // Préparer tous les éléments
        items.forEach((item) => {
            const element = document.querySelector<HTMLElement>(item.selector);
            if (!element) return;

            const text = element.textContent || '';
            element.innerHTML = '';
            element.style.position = 'relative';
            element.style.display = 'inline-block';

            const backgroundText = document.createElement('span');
            backgroundText.textContent = text;
            backgroundText.style.color = item.emptyColor || 'rgba(0, 0, 0, 0.2)';
            backgroundText.style.display = 'block';

            const fillText = document.createElement('span');
            fillText.textContent = text;
            fillText.style.position = 'absolute';
            fillText.style.top = '0';
            fillText.style.left = '0';
            fillText.style.color = item.fillColor || '#000000';
            fillText.style.clipPath = 'inset(0 100% 0 0)';
            fillText.style.display = 'block';

            element.appendChild(backgroundText);
            element.appendChild(fillText);

            // Ajouter l'animation à la timeline
            tl.to(fillText, {
                clipPath: 'inset(0 0% 0 0)',
                ease: 'none',
                duration: 1
            });
        });

        return tl;
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
        fadeScroll,
        textFillScroll,
        textFillSequence,
        pinnedTextFill,
        pinnedTextFillSequence,
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
    FadeScrollOptions,
    TextFillScrollOptions,
    TextFillSequenceItem,
    PinnedTextFillOptions,
    GsapTarget
};
// composables/useGsapAnimations.ts
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// ============================================================================
// TYPES
// ============================================================================

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
    selector: string | Element;
    fillColor?: string;
    emptyColor?: string;
    duration?: number;
    splitByLines?: boolean;
}

interface PinnedTextFillOptions {
    fillColor?: string;
    emptyColor?: string;
    markers?: boolean;
    pinSpacing?: boolean;
    scrub?: number | boolean;
}

type GsapTarget = string | HTMLElement | HTMLElement[];

// ============================================================================
// UTILS
// ============================================================================

const getElement = (target: GsapTarget): HTMLElement | null => {
    if (typeof target === 'string') {
        return document.querySelector<HTMLElement>(target);
    }
    return target as HTMLElement;
};

const getElements = (target: GsapTarget): Element[] => {
    if (typeof target === 'string') {
        return Array.from(document.querySelectorAll(target));
    }
    return Array.isArray(target) ? target : [target];
};

const isInViewport = (el: Element): boolean => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
};

const createTextFillStructure = (
    element: HTMLElement,
    text: string,
    fillColor: string,
    emptyColor: string,
    textAlign?: string
): HTMLElement => {
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
    fillText.style.color = fillColor;
    fillText.style.clipPath = 'inset(0 100% 0 0)';
    fillText.style.display = 'block';
    fillText.style.whiteSpace = 'pre';

    // Alignement
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

    element.appendChild(backgroundText);
    element.appendChild(fillText);

    return fillText;
};

// ============================================================================
// COMPOSABLE
// ============================================================================

export const useGsapAnimations = () => {
    if (import.meta.client) {
        gsap.registerPlugin(TextPlugin, ScrollTrigger);
    }

    // ========================================================================
    // ANIMATIONS BASIQUES
    // ========================================================================

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
            onComplete,
            onStart
        } = options;

        const element = getElement(target);
        if (!element) {
            console.warn(`Typewriter: Element not found`);
            return null;
        }

        const originalText = element.textContent || '';

        if (preserveSpace) {
            element.style.minWidth = `${element.offsetWidth}px`;
            element.style.display = 'inline-block';
        }

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
        if (cursorSpan) element.appendChild(cursorSpan);

        const tl = gsap.timeline({
            repeat: loop ? -1 : 0,
            onStart,
            onComplete: !loop ? onComplete : undefined
        });

        tl.to(textSpan, {
            duration,
            delay,
            ease,
            text: { value: originalText, delimiter: '' }
        });

        let cursorAnimation: gsap.core.Tween | null = null;

        if (loop) {
            tl.addLabel('pauseStart');
            tl.to({}, { duration: loopDelay });
            tl.addLabel('eraseStart');
            tl.to(textSpan, {
                duration: duration * 0.5,
                ease,
                text: { value: '', delimiter: '' }
            });

            if (cursorSpan) {
                gsap.set(cursorSpan, { opacity: 1 });
                tl.call(() => {
                    cursorAnimation = gsap.to(cursorSpan, {
                        opacity: 0,
                        duration: 0.5,
                        repeat: -1,
                        yoyo: true,
                        ease: 'steps(1)'
                    });
                }, [], 'pauseStart');

                tl.call(() => {
                    cursorAnimation?.kill();
                    gsap.set(cursorSpan, { opacity: 1 });
                }, [], 'eraseStart');
            }
        }

        const cleanup = () => {
            tl.kill();
            cursorAnimation?.kill();
            element.textContent = originalText;
            element.style.minWidth = '';
            element.style.display = '';
        };

        return { timeline: tl, cleanup };
    };

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
            onComplete
        } = options;

        return gsap.from(targets, {
            opacity, y, x, scale, rotation,
            duration, stagger, delay, ease, onComplete
        });
    };

    const rotateInfinite = (
        target: GsapTarget,
        options: RotateInfiniteOptions = {}
    ): gsap.core.Tween | null => {
        if (!import.meta.client) return null;

        const { duration = 20, clockwise = true, ease = 'none' } = options;

        return gsap.to(target, {
            rotation: clockwise ? 360 : -360,
            duration,
            repeat: -1,
            ease,
            transformOrigin: 'center'
        });
    };

    const pulse = (
        target: GsapTarget,
        options: PulseOptions = {}
    ): gsap.core.Tween | null => {
        if (!import.meta.client) return null;

        const {
            scale = 1.1,
            duration = 1,
            ease = 'power1.inOut',
            attribute,
            attributeValue
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
            y, x, rotation,
            ease: 'none'
        });
    };

    // ========================================================================
    // ANIMATIONS SCROLL
    // ========================================================================

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

        const elements = getElements(target);
        if (!elements.length) {
            console.warn(`FadeScroll: No elements found`);
            return null;
        }

        const yValue = reverse ? y : -y;
        const firstElement = elements[0] as HTMLElement;

        // Animation pour élément(s) déjà visible(s)
        if (isInViewport(firstElement)) {
            gsap.set(elements, { y: yValue, opacity });

            const tween = gsap.to(elements, {
                y: 0,
                opacity: 1,
                duration,
                stagger: elements.length > 1 ? stagger : 0,
                delay: 0.1,
                ease: 'power2.out'
            });

            ScrollTrigger.create({
                trigger: firstElement,
                start,
                end,
                markers,
                onLeave: () => gsap.to(elements, {
                    y: yValue,
                    opacity,
                    duration: duration * 0.6,
                    stagger: stagger * 0.5,
                    ease: 'power2.in'
                }),
                onEnterBack: () => gsap.to(elements, {
                    y: 0,
                    opacity: 1,
                    duration,
                    stagger: elements.length > 1 ? stagger : 0,
                    ease: 'power2.out'
                }),
                onLeaveBack: () => gsap.to(elements, {
                    y: yValue,
                    opacity,
                    duration: duration * 0.6,
                    stagger: stagger * 0.5,
                    ease: 'power2.in'
                })
            });

            return tween;
        }

        // Animation classique
        return gsap.from(elements, {
            y: yValue,
            opacity,
            duration,
            stagger: elements.length > 1 ? stagger : 0,
            scrollTrigger: {
                trigger: firstElement,
                start,
                end,
                toggleActions,
                markers
            }
        });
    };

    // ========================================================================
    // TEXT FILL ANIMATIONS
    // ========================================================================

    /**
     * Animation universelle de remplissage de texte au scroll
     * Gère automatiquement : un élément, plusieurs éléments, sections, pinning
     */
    const textFill = (
        target: GsapTarget | TextFillSequenceItem[],
        options: {
            // Couleurs
            fillColor?: string;
            emptyColor?: string;
            titleFillColor?: string;
            titleEmptyColor?: string;
            descriptionFillColor?: string;
            descriptionEmptyColor?: string;

            // Comportement
            splitByLines?: boolean;
            sequence?: boolean;

            // Scroll
            start?: string;
            end?: string;
            scrub?: number | boolean;
            markers?: boolean;

            // Pinning
            pin?: boolean;
            pinSpacing?: boolean;
            scrollDistance?: string;

            // Sequence
            gap?: number;

            // Sections auto
            sections?: boolean;
            sectionSelector?: string;
            titleSelector?: string;
            descriptionSelector?: string;

            // Autres
            duration?: number;
        } = {}
    ): any => {
        if (!import.meta.client) return null;

        const {
            fillColor = '#000000',
            emptyColor = 'rgba(0, 0, 0, 0.2)',
            titleFillColor = 'var(--title-fill)',
            titleEmptyColor = 'var(--title-empty)',
            descriptionFillColor = 'var(--desc-fill)',
            descriptionEmptyColor = 'var(--desc-empty)',
            splitByLines = false,
            sequence = false,
            start = 'top 80%',
            end = 'top 20%',
            scrub = 1,
            markers = false,
            pin = false,
            pinSpacing = true,
            scrollDistance = '+=100%',
            gap = 10,
            sections = false,
            sectionSelector = 'section[id]',
            titleSelector = '.title',
            descriptionSelector = '.description',
            duration
        } = options;

        // ============================================================
        // MODE SECTIONS : Anime automatiquement toutes les sections
        // ============================================================
        if (sections) {
            const sectionsElements = document.querySelectorAll(sectionSelector);
            const allAnimations: any[] = [];

            sectionsElements.forEach((section) => {
                const titles = section.querySelectorAll(titleSelector);
                const descriptions = section.querySelectorAll(descriptionSelector);

                if (!titles.length && !descriptions.length) return;

                const items: TextFillSequenceItem[] = [
                    ...Array.from(titles).map(el => ({
                        selector: el,
                        fillColor: titleFillColor,
                        emptyColor: titleEmptyColor,
                        splitByLines
                    })),
                    ...Array.from(descriptions).map(el => ({
                        selector: el,
                        fillColor: descriptionFillColor,
                        emptyColor: descriptionEmptyColor,
                        splitByLines
                    }))
                ];

                const anim = textFill(items, {
                    sequence: true,
                    start,
                    end,
                    scrub,
                    gap,
                    markers
                });

                if (anim) allAnimations.push(anim);
            });

            return allAnimations;
        }

        // ============================================================
        // MODE SEQUENCE : Anime plusieurs éléments en séquence
        // ============================================================
        if (Array.isArray(target)) {
            const items = target as TextFillSequenceItem[];
            const startValue = parseInt(start.split(' ')[1]);
            const endValue = parseInt(end.split(' ')[1]);
            const totalRange = startValue - endValue;
            const rangePerItem = totalRange / items.length;

            return items.map((item, index) => {
                const itemStart = `top ${startValue - (rangePerItem * index)}%`;
                const itemEnd = `top ${startValue - (rangePerItem * (index + 1)) + gap}%`;

                return textFill(item.selector, {
                    fillColor: item.fillColor || fillColor,
                    emptyColor: item.emptyColor || emptyColor,
                    splitByLines: item.splitByLines ?? splitByLines,
                    start: itemStart,
                    end: itemEnd,
                    scrub,
                    markers,
                    duration: item.duration
                });
            }).filter(Boolean);
        }

        // ============================================================
        // MODE PINNING : Épingle le conteneur pendant l'animation
        // ============================================================
        if (pin) {
            const container = typeof target === 'string'
                ? document.querySelector<HTMLElement>(target)
                : target as HTMLElement;

            if (!container) {
                console.warn('TextFill (pin): Container not found');
                return null;
            }

            // Si c'est un array d'items, créer une timeline
            const element = container.querySelector<HTMLElement>(titleSelector) || container;
            const text = element.textContent || '';
            const fillText = createTextFillStructure(element, text, fillColor, emptyColor);

            return gsap.to(fillText, {
                clipPath: 'inset(0 0% 0 0)',
                ease: 'none',
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
        }

        // ============================================================
        // MODE STANDARD : Un seul élément
        // ============================================================
        const element = getElement(target as GsapTarget);
        if (!element) {
            console.warn('TextFill: Element not found');
            return null;
        }

        // Split par lignes
        if (splitByLines) {
            const split = new SplitType(element, { types: 'lines' });
            const lines = split.lines as HTMLElement[];
            const textAlign = window.getComputedStyle(element).textAlign;

            const tl = gsap.timeline({
                scrollTrigger: { trigger: element, start, end, scrub, markers }
            });

            lines.forEach((line) => {
                const text = line.textContent || '';
                const fillText = createTextFillStructure(line, text, fillColor, emptyColor, textAlign);
                line.style.overflow = 'hidden';

                tl.to(fillText, {
                    clipPath: 'inset(0 0% 0 0)',
                    ease: 'none',
                    duration: 1
                });
            });

            return tl;
        }

        // Texte complet
        const text = element.textContent || '';
        const fillText = createTextFillStructure(element, text, fillColor, emptyColor);

        if (scrub !== false) {
            return gsap.to(fillText, {
                clipPath: 'inset(0 0% 0 0)',
                ease: 'none',
                scrollTrigger: { trigger: element, start, end, scrub, markers }
            });
        }

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
    };

    const killAllScrollTriggers = (): void => {
        if (!import.meta.client) return;
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

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
        textFill,
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
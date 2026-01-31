import { useState, useEffect, useRef } from 'react';

export const useSmartScroll = (offset = 0) => {
    const [style, setStyle] = useState<React.CSSProperties>({ position: 'sticky', top: offset });
    const lastScrollY = useRef(0);
    const currentTop = useRef(offset);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const sidebarHeight = ref.current.offsetHeight;
            const scrollDelta = scrollY - lastScrollY.current;

            // If sidebar is shorter than viewport, just stick to top
            if (sidebarHeight < viewportHeight - offset) {
                setStyle({ position: 'sticky', top: offset });
                lastScrollY.current = scrollY;
                return;
            }

            // Sidebar is taller than viewport
            let newTop = currentTop.current - scrollDelta;

            // Calculate boundaries
            const minTop = viewportHeight - sidebarHeight; // Stick to bottom
            const maxTop = offset; // Stick to top

            // Clamp newTop
            // When scrolling down, newTop gets smaller (more negative)
            // When scrolling up, newTop gets larger (closer to offset)
            if (scrollDelta > 0) {
                // Scrolling DOWN
                // If we are scrolling down, we want to stick to the bottom edge
                // newTop should not be less than minTop
                newTop = Math.max(minTop, newTop);
            } else {
                // Scrolling UP
                // If we are scrolling up, we want to stick to the top edge
                // newTop should not be greater than maxTop
                newTop = Math.min(maxTop, newTop);
            }

            currentTop.current = newTop;
            lastScrollY.current = scrollY;

            setStyle({
                position: 'sticky',
                top: `${newTop}px`
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [offset]);

    return { ref, style };
};

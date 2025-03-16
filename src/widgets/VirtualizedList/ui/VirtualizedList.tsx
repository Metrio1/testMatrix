import * as React from 'react';
import { useRef, useState, useEffect } from 'react';

interface VirtualizedListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    itemHeight: number;
    containerHeight: number;
}

export const VirtualizedList = <T,>({ items, renderItem, itemHeight, containerHeight }: VirtualizedListProps<T>) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [scrollTop, setScrollTop] = useState(0);

    const totalHeight = items.length * itemHeight;
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight));
    const endIndex = Math.min(items.length, startIndex + visibleCount);

    const visibleItems = items.slice(startIndex, endIndex);
    const offsetY = startIndex * itemHeight;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onScroll = () => setScrollTop(container.scrollTop);
        container.addEventListener('scroll', onScroll);

        return () => container.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div ref={containerRef} style={{ height: containerHeight, overflowY: 'auto' }}>
            <div style={{ height: totalHeight, position: 'relative' }}>
                <div style={{ marginTop: offsetY }}>
                    {visibleItems.map((item, index) => (
                        <React.Fragment key={index}>
                            {renderItem(item, startIndex + index)}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

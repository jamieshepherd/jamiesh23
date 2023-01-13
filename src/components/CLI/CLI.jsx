import { useMemo, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useDetectClickOutside } from 'react-detect-click-outside';

import styles from './CLI.module.scss';

function CLI({ currentUrl, pages }) {
    const inputRef = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [query, setQuery] = useState(currentUrl);
    const wrapperRef = useDetectClickOutside({
        onTriggered: () => setIsOpen(false),
    });

    const urls = useMemo(
        () =>
            pages
                .map((p) => p.url)
                .concat(['/'])
                .filter((url) => url.includes(query))
                .sort((a, b) => a.localeCompare(b))
                .slice(0, 10),
        [pages, query]
    );

    useHotkeys(
        'up',
        () => setIndex((prev) => (index > 0 ? prev - 1 : urls.length - 1)),
        { enableOnFormTags: true, preventDefault: true },
        [index, urls]
    );
    useHotkeys(
        'down',
        () => setIndex((prev) => (index === urls.length - 1 ? 0 : prev + 1)),
        { enableOnFormTags: true, preventDefault: true },
        [index, urls]
    );
    useHotkeys(
        ['enter'],
        () => {
            if (urls.length === 0) return;

            console.log(urls[index]);

            // send user to selected url
            document.location.href = urls[index];
        },
        { enableOnFormTags: true, preventDefault: true },
        [index]
    );
    useHotkeys(
        ['esc'],
        () => {
            inputRef.current?.blur();
            setIsOpen(false);
        },
        { enableOnFormTags: true }
    );
    useHotkeys(
        ['/'],
        () => {
            inputRef.current?.focus();
            setIsOpen(true);
        },
        { preventDefault: true }
    );

    return (
        <div className={styles.cli_wrapper} ref={wrapperRef}>
            <input
                ref={inputRef}
                onFocus={() => setIsOpen(true)}
                className={styles.cli_input}
                type="text"
                spellCheck={false}
                placeholder="# Type to search"
                value={query}
                onChange={(e) => setQuery(e.target?.value)}
            />
            {isOpen && query !== '' && urls.length > 0 && (
                <div className={styles.cli_results}>
                    {urls.map((url, i) => (
                        <a
                            key={url}
                            className={`${styles.cli_result} ${
                                index === i && styles.cli_result__active
                            }`}
                            href={url}
                        >
                            {url}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CLI;

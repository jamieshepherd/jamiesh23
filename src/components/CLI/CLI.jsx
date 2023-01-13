import { useMemo, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useDetectClickOutside } from 'react-detect-click-outside';

import styles from './CLI.module.scss';

function CLI({ currentUrl = '/', pages }) {
    const inputRef = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [query, setQuery] = useState(currentUrl);
    const wrapperRef = useDetectClickOutside({
        onTriggered: () => setIsOpen(false),
    });

    const posts = useMemo(() => {
        if (query === '' || query === '/') {
            return pages
                .map((p) => p)
                .concat([{ url: '/', frontmatter: { date: '2023-01-01' } }])
                .filter((p) => p.url.includes(query))
                .sort((a, b) =>
                    b.frontmatter?.date?.localeCompare(a.frontmatter?.date)
                )
                .slice(0, 10);
        }

        return pages
            .map((p) => p)
            .concat([{ url: '/', frontmatter: { date: '2023-01-01' } }])
            .filter((p) => p.url.includes(query))
            .sort((a, b) => a.url.localeCompare(b.url))
            .slice(0, 10);
    }, [pages, query]);

    useHotkeys(
        'up',
        () => setIndex((prev) => (index > 0 ? prev - 1 : posts.length - 1)),
        { enableOnFormTags: true, preventDefault: true },
        [index, posts]
    );
    useHotkeys(
        'down',
        () => setIndex((prev) => (index === posts.length - 1 ? 0 : prev + 1)),
        { enableOnFormTags: true, preventDefault: true },
        [index, posts]
    );
    useHotkeys(
        ['enter'],
        () => {
            if (posts.length === 0) return;

            // send user to selected url
            document.location.href = posts[index].url;
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
            {!isOpen && <button className={styles.hotkey}>/</button>}
            {isOpen && query !== '' && posts.length > 0 && (
                <>
                    <button className={styles.hotkey}>ESC</button>
                    <div className={styles.cli_results}>
                        {posts.map((p, i) => (
                            <a
                                key={p.url}
                                className={`${styles.cli_result} ${
                                    index === i && styles.cli_result__active
                                }`}
                                href={p.url}
                            >
                                {p.url}
                                {p.frontmatter && p.frontmatter.date && (
                                    <span className={styles.cli_result_date}>
                                        {new Date(
                                            p.frontmatter.date
                                        ).toLocaleDateString()}
                                    </span>
                                )}
                            </a>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default CLI;

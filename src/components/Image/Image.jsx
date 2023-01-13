import styles from './Image.module.scss';

function Image({ src, caption = null }) {
    return (
        <a
            className={styles.image_link}
            href={src}
            alt={caption}
            target="_blank"
        >
            <figure className={styles.image_wrapper}>
                <img className={styles.image} src={src} />
                {caption && (
                    <figcaption className={styles.caption}>
                        {caption}
                    </figcaption>
                )}
            </figure>
        </a>
    );
}

export default Image;

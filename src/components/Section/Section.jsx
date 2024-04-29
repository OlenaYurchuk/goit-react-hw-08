import css from '../Section/Section.module.css'
export default function Section({ title, children }) {
    <div className={css.container}>
        {title && <h2 className={css.title}>{title}</h2>}
        {children}
    </div>
}
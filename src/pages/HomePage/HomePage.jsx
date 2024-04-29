import Section from '../../components/Section/Section'
import css from '../../components/Section/Section.module.css'

export default function HomePage() {
  return (
    <div className={css.container}>
      <Section title="Welcome to Phone Book" />
    </div>
  )
}
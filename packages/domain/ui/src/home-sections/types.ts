export interface SectionProps {
  target_section_id: string | undefined
  current_view: string | undefined
  id: string | undefined
  navigateToSection: (...args: string[]) => void
}

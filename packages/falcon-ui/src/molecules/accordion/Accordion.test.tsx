import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion'

describe('Accordion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Accordion type="single">
        <AccordionItem value="function">
          <AccordionTrigger title="Function" />
          <AccordionContent>
            <li>Finance</li>
            <li>Marketing</li>
            <li>Professional Development</li>
            <li>Human Resources</li>
            <li>Operations</li>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="year">
          <AccordionTrigger title="Year" />
          <AccordionContent>
            <li>-2000</li>
            <li>2000-2010</li>
            <li>2010-2020</li>
            <li>2020-2030</li>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="quarter">
          <AccordionTrigger title="Quarter" />
          <AccordionContent>
            <li>Q1</li>
            <li>Q2</li>
            <li>Q3</li>
            <li>Q4</li>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(
      <Accordion type="single">
        <AccordionItem value="function">
          <AccordionTrigger title="Function" />
          <AccordionContent>
            <li>Finance</li>
            <li>Marketing</li>
            <li>Professional Development</li>
            <li>Human Resources</li>
            <li>Operations</li>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="year">
          <AccordionTrigger title="Year" />
          <AccordionContent>
            <li>-2000</li>
            <li>2000-2010</li>
            <li>2010-2020</li>
            <li>2020-2030</li>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="quarter">
          <AccordionTrigger title="Quarter" />
          <AccordionContent>
            <li>Q1</li>
            <li>Q2</li>
            <li>Q3</li>
            <li>Q4</li>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(screen.getByText('Function')).toBeInTheDocument()
  })
})

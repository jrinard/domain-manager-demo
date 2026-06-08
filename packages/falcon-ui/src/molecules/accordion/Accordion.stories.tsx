import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Popover, PopoverTrigger, PopoverContent, Button } from '../../index'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion'
import { omit } from 'lodash'

const meta: Meta<typeof Accordion> = {
  title: 'DL: Falcon/Molecules/Accordion',
  component: Accordion,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Accordion>

/*
 *👇 Render functions are a framework specific feature to allow you control over how the component renders.
 * See https://storybook.js.org/docs/react/api/csf to learn how to use render functions.
 */
export const SingleSelection: Story = {
  args: {
    type: 'single',
  },
  parameters: {
    docs: {
      description: {
        story: 'Only one drowdown can be open at a time',
      },
    },
  },
  render: (...props) => (
    <Accordion type="single" {...omit(props, 'type')}>
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
  ),
}

export const MultipleSelection: Story = {
  args: {
    type: 'multiple',
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple dropdowns can be open at a time',
      },
    },
  },
  render: (...props) => (
    <Accordion type="multiple" {...omit(props, 'type')}>
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
  ),
}

export const PopoverAccordion: Story = {
  args: {
    type: 'single',
  },
  parameters: {
    docs: {
      description: {
        story: 'Rendered inside of a popover',
      },
    },
  },
  render: (...props) => (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button variant="primary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80"
        headerText="Dimensions"
        action={<Button>Apply</Button>}
      >
        <Accordion type="single" {...omit(props, 'type')}>
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
      </PopoverContent>
    </Popover>
  ),
}

export const PopoverAccordionReversedIcons: Story = {
  args: {
    type: 'single',
  },
  parameters: {
    docs: {
      description: {
        story: 'Rendered inside of a popover',
      },
    },
  },
  render: (...props) => (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button variant="primary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80"
        headerText="Dimensions"
        action={<Button>Apply</Button>}
      >
        <Accordion type="single" {...omit(props, 'type')}>
          <AccordionItem value="function">
            <AccordionTrigger iconSide="left" title="Function" />
            <AccordionContent>
              <li>Finance</li>
              <li>Marketing</li>
              <li>Professional Development</li>
              <li>Human Resources</li>
              <li>Operations</li>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="year">
            <AccordionTrigger iconSide="left" title="Year" />
            <AccordionContent>
              <li>-2000</li>
              <li>2000-2010</li>
              <li>2010-2020</li>
              <li>2020-2030</li>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="quarter">
            <AccordionTrigger iconSide="left" title="Quarter" />
            <AccordionContent>
              <li>Q1</li>
              <li>Q2</li>
              <li>Q3</li>
              <li>Q4</li>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </PopoverContent>
    </Popover>
  ),
}

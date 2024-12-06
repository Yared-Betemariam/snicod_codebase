import { useSettings } from '@renderer/store'
import { Theme } from '@shared/index'
import { useState } from 'react'
import { BsExclamationCircle } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import { IoMoonOutline } from 'react-icons/io5'
import { Dropdown } from '../ui/dropdown'
import Input from '../ui/input'

const General = () => {
  const { fontSize, setFontSize, theme, setTheme } = useSettings((state) => state)
  const [fontSizeInput, setFontSizeInput] = useState(fontSize.toString())
  const [fontError, setFontError] = useState('')

  const toggleTheme = async (value: Theme) => {
    setTheme(value)
    await window.app.toggleDarkMode(value)
  }

  const updateFontSizeInput = (value: string) => {
    setFontSizeInput(value)

    // Only validate non-empty input
    if (value) {
      const newFontSize = Number(value)

      if (isNaN(newFontSize)) {
        setFontError('Font size must be a number.')
      } else if (newFontSize < 6) {
        setFontError('Font size must be greater than or equal to 6.')
      } else if (newFontSize > 100) {
        setFontError('Font size must be less than or equal to 100.')
      } else {
        setFontError('')
        setFontSize(newFontSize)
      }
    } else {
      setFontError('Font size cannot be empty.')
    }
  }

  const applyFontSize = () => {
    const newFontSize = Number(fontSizeInput)
    if (!fontError && !isNaN(newFontSize)) {
      setFontSize(newFontSize)
    }
  }

  return (
    <div className="flex flex-col gap-2 text-sm">
      <span className="text-base">Theme</span>
      <p>Control the theme of the appliction</p>
      <Dropdown
        width={120}
        value={theme || ''}
        setValue={(value) => toggleTheme(value as Theme)}
        items={[
          { value: 'light', Icon: FiSun, label: 'Light' },
          { value: 'dark', Icon: IoMoonOutline, label: 'Dark' }
        ]}
      />
      <span className="w-full border-t separator my-2" />
      <span className="text-base">Font size</span>
      <p>Control the font size in pixels</p>

      <Input
        className="max-w-[180px] w-full"
        inputClassName="rouneded border-transparent bg-neutral-200/75 dark:bg-neutral-900/50 h-8"
        type="number"
        value={fontSizeInput}
        onChange={(e) => updateFontSizeInput(e.target.value)}
        onBlur={applyFontSize} // Apply changes on blur
      />

      {fontError && (
        <span className="text-sm duration-300 transition-all mt-1 flex items-center text-red-700 dark:text-red-300 dark:font-light">
          <BsExclamationCircle className="inline size-3.5 mr-1.5" />
          {fontError}
        </span>
      )}
    </div>
  )
}

export default General

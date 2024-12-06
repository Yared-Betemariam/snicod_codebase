import { useLicenseKey, useTrial } from '@renderer/store/license'
import { cn } from '@renderer/utils'
import { useState } from 'react'
import Data from './data'
import General from './general'
import LicenseManagment from './license-managment'

const SettingsPage = ({ tab }: { tab: 'g' | 'l' }) => {
  const [currentTab, setCurrentTab] = useState<string>(tab)
  const isActivated = useLicenseKey((state) => state.isActivated)
  const freeTrialActive = useTrial((state) => state.freeTrialActive)
  const protectedTabs = ['l', 'd']
  const tabLinks = [
    {
      name: 'General',
      value: 'g',
      Component: <General />
    },
    {
      name: 'License',
      value: 'l',
      Component: <LicenseManagment />
    },
    {
      name: 'Data',
      value: 'd',
      Component: <Data />
    }
  ]

  const getCurrentTab = () => {
    return tabLinks.find((link) => link.value === currentTab)
  }

  return (
    <>
      <ul className="flex border-b h-[3rem] border-neutral-500/20 px-2 py-2">
        {tabLinks.map((link) => (
          <li
            key={link.value}
            onClick={() => {
              if (
                (!freeTrialActive && !isActivated && !protectedTabs.includes(link.value)) ||
                freeTrialActive ||
                isActivated
              ) {
                setCurrentTab(link.value)
              }
            }}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium cursor-pointer flex items-center',
              !freeTrialActive && !isActivated && protectedTabs.includes(link.value)
                ? 'opacity-25 cursor-default'
                : link.value == currentTab
                  ? ''
                  : ' dark:text-neutral-400 text-neutral-600'
            )}
          >
            {link.name}
          </li>
        ))}
      </ul>
      <div className="flex flex-col flex-1 gap-4 p-4 px-6 dark:text-zinc-100 overflow-y-scroll max-h-[calc(80vh-3rem)] text-zinc-900">
        {getCurrentTab()?.Component}
      </div>
    </>
  )
}
export default SettingsPage

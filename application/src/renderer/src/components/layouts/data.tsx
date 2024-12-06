import { getDatabaseData, setDatabaseData } from '@renderer/db'
import { useSnippet, useSnippets } from '@renderer/store'
import { Import } from 'lucide-react'
import { useState } from 'react'
import { BsCheckCircle, BsExclamationCircle } from 'react-icons/bs'
import Button from '../ui/button'

const Data = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleExportData = async () => {
    setIsLoading(true)
    setError('')
    setSuccess('')
    try {
      const appData = await getDatabaseData()
      const res = await window.app.exportAppData(appData)
      if (res) {
        setSuccess('Export successful')
      } else {
        setError('Export not successful')
      }
    } catch (error) {
      setError('Export not successful')
    } finally {
      setIsLoading(false)
    }
  }

  const handleImportData = async () => {
    setIsLoading(true)
    setError('')
    setSuccess('')
    try {
      const res = await window.app.importAppData()
      if (res) {
        const res2 = await setDatabaseData(res)
        if (res2) {
          setSuccess('Import successful')
          useSnippets.getState().loadSnippets()
          useSnippet.getState().setSnippet(undefined)
        } else {
          setError('Import not successful')
        }
      } else {
        setError('Import not successful')
      }
    } catch (error) {
      setError('Import not successful')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="flex flex-col text-sm gap-2">
      <p className="text-base">Export backup</p>
      <p>You can export snippets data from here in case for backups or any purposes.</p>
      <button disabled={isLoading} onClick={handleExportData} className="link-color w-fit">
        Download app data
      </button>
      <span className="w-full border-t separator my-2" />
      <p className="text-base">Import data</p>
      <p>You can import snippets data to your application.</p>
      <div className="flex flex-col">
        <span className="text-sm duration-300 transition-all flex items-center alert-color">
          <BsExclamationCircle className="inline size-3.5 mr-1.5" />
          Note
        </span>
        <ul className="indent-1.5">
          <p>
            -&nbsp; If you import any snicod app data, your current data will be permantly
            overridden (Download backup to protect data)
          </p>
          <p>
            -&nbsp; If you try import any other file instead of the original backup file from the
            snicod application, the app might not fucntion
          </p>
        </ul>
      </div>
      <div className="bg-neutral-300/20 dark:bg-neutral-900/20 pl-4 p-2 rounded flex items-center gap-2 text-neutral-400 dark:text-neutral-700">
        <Import className="size-5 inline" />{' '}
        <span className="mr-auto font-medium">Import file</span>{' '}
        <Button
          disabled={isLoading}
          onClick={handleImportData}
          className="bg-neutral-50  hover:bg-neutral-50/80 text-neutral-900 dark:text-neutral-100"
        >
          Upload from computer
        </Button>
      </div>
      {error && (
        <span className="text-sm duration-300 transition-all mt-1 flex items-center text-red-700 dark:text-red-300 dark:font-light">
          <BsExclamationCircle className="inline size-3.5 mr-1.5" />
          {error}
        </span>
      )}
      {success && (
        <span className="text-sm duration-300 transition-all mt-1 flex items-center text-green-700 dark:text-green-300 dark:font-light">
          <BsCheckCircle className="inline size-3.5 mr-1.5" />
          {success}!
        </span>
      )}
    </div>
  )
}
export default Data

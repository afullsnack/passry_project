import { AlertCircleIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

export function ErrorContainer({ error }: { error: Error }) {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Unable to fetch events.</AlertTitle>
      <AlertDescription>
        <p>
          {error.message ||
            'Please verify your internet connection and try again.'}
        </p>
        <ul className="list-inside list-disc text-sm">
          <li>Check your WiFI or mobile data</li>
          <li>Ensure sufficient bandwidth</li>
          <li>Verify other apps can access the internet</li>
        </ul>
      </AlertDescription>
    </Alert>
  )
}

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Link } from '@tanstack/react-router'

interface IProps {
  open: boolean
  name: string
}
export default function VerifyOTPDialog({ open, name }: IProps) {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Passry, {name}</DialogTitle>
          <DialogDescription>You're all set to get started.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button asChild className="w-full" variant="default" size="lg">
            <Link to="/explore">Go to Dashboard</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

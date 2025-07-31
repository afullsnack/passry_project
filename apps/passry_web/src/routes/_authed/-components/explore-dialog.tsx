import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface IProps {
  openTrigger: React.ReactNode
}

export default function FilterDialog({ openTrigger }: IProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{openTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Events</DialogTitle>
          <DialogDescription>
            Filter events by location, price, and status
          </DialogDescription>
        </DialogHeader>
        <div className="container">
          <h1>Filter components</h1>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Input } from '@/components/ui/input'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'

interface IProps {
  eventShareUrl: string
  eventCoverUrl: string
}

export default NiceModal.create(({ eventCoverUrl, eventShareUrl }: IProps) => {
  const modal = useModal()

  const copyShareAddress = () => {
    navigator.clipboard.writeText(eventShareUrl)
    toast.info('Event link copied!')
  }

  return (
    <Dialog
      open={modal.visible}
      onOpenChange={(open) => (open ? modal.show() : modal.hide())}
      modal
    >
      <DialogContent className="min-h-[200px]">
        <DialogHeader>
          <DialogDescription className="text-start">
            Share event with others.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full grid gap-4">
          <img
            src={eventCoverUrl}
            alt="Preview"
            className="object-cover h-[100px] w-full rounded-lg"
          />
          <div className="flex items-center gap-3">
            <Input
              disabled
              defaultValue={eventShareUrl}
              contentEditable={false}
              className="flex-1"
            />
            <Button variant="ghost" onClick={copyShareAddress}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
})

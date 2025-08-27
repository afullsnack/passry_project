import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Copy } from 'lucide-react'

interface IProps {
  eventShareUrl: string
  eventCoverUrl: string
}

export default NiceModal.create(() => {
  const modal = useModal()

  return (
    <Dialog
      open={modal.visible}
      onOpenChange={(open) => (open ? modal.show() : modal.hide())}
      modal
    >
      <DialogContent>
        <DialogHeader>
          <DialogDescription className="text-start">
            Buy ticket to get access to this event.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full grid relative">
          <div className="flex items-center gap-3"></div>
        </div>
      </DialogContent>
    </Dialog>
  )
})

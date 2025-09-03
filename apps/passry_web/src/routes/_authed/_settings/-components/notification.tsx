import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  options: Array<string>
  defaultValue: string
  title: string
  prefixIcon: React.ReactNode
}

export const Notification: React.FC<Props> = ({
  options,
  defaultValue,
  title,
  prefixIcon,
}) => {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className="w-full flex items-center justify-center my-1">
        <div className="flex-1 items-center justify-start">
          <div className="flex gap-3 items-center justify-start">
            {prefixIcon}
            <span className="text-sm font-medium text-primary">{title}</span>
          </div>
        </div>
        <SelectValue placeholder={defaultValue} />
      </SelectTrigger>
      <SelectContent
        side="bottom"
        position="popper"
        align="end"
        className="w-[180px]"
      >
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

import type { AnyFieldApi } from '@tanstack/react-form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface IProps {
  name: string // form field name
  form: any
  defaultValue?: string
}

const defaultCategories = [
  'Party',
  'Workshop',
  'Conference',
  'Meeting',
  'Birthday',
  'Anniversary',
  'Wedding',
  'Graduation',
  'Other',
]

export default function CategorySelect({ name, form, defaultValue }: IProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)

  return (
    <form.Field
      name={name || 'category'}
      children={(field: AnyFieldApi) => (
        <>
          <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild>
              <Badge
                className="rounded-2xl lg:h-6 flex gap-3 justify-between capitalize"
                variant="secondary"
              >
                {value ? value : 'Select category...'}
                <ChevronsUpDown className="opacity-50" />
              </Badge>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search category..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No Category found.</CommandEmpty>
                  <CommandGroup>
                    {defaultCategories.map((category) => (
                      <CommandItem
                        key={category.toLowerCase()}
                        value={category.toLowerCase()}
                        onSelect={(currentValue) => {
                          setValue(
                            currentValue === value ? '' : currentValue, // deselect if value was previously selected
                          )
                          field.handleChange(currentValue)
                          setOpen(false)
                        }}
                      >
                        {category}
                        <Check
                          className={cn(
                            'ml-auto',
                            value === category.toLowerCase()
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </>
      )}
    />
  )
}

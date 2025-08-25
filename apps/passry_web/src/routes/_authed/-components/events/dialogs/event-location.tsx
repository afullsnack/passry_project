import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import type { AnyFieldApi } from '@tanstack/react-form'
import { Label } from '@/components/ui/label'
import { useIsMobile } from '@/hooks/use-mobile'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

interface IProps {
  fieldNames: Array<string> // form field name
  form: any
  countries: Array<{
    name: string
    iso3: string
    iso2: string
    states: Array<{
      name: string
      state_code: string
    }>
  }>
  defaultCountry: string
  defaultCity: string
  defaultAddress: string
}

export default NiceModal.create(
  ({
    fieldNames,
    form,
    countries,
    defaultAddress,
    defaultCity,
    defaultCountry,
  }: IProps) => {
    const modal = useModal()
    const isMobile = useIsMobile()
    const [iso, setISO] = useState<string>()

    return (
      <Dialog
        open={modal.visible}
        onOpenChange={(open) => (open ? modal.show() : modal.hide())}
        modal
      >
        <DialogContent>
          <DialogHeader className="items-start">
            <DialogDescription className="text-start">
              Give your event a venue/location so attendees know where to go.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 md:flex w-full md:items-center md:justify-between">
              <form.Field
                name={fieldNames[0] || 'fieldName'}
                children={(field: AnyFieldApi) => (
                  <div className="grid">
                    <Label>Country</Label>
                    <Select
                      onValueChange={(value) => {
                        setISO(value)
                        field.handleChange(
                          countries.find((c) => c.iso3 === value)?.name,
                        )
                      }}
                    >
                      <SelectTrigger className="!w-full md:w-[180px]">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Country</SelectLabel>
                          {countries.map((country) => (
                            <SelectItem key={country.iso3} value={country.iso3}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
              <form.Field
                name={fieldNames[1] || 'fieldName'}
                children={(field: AnyFieldApi) => (
                  <div className="grid">
                    <Label>State</Label>
                    <Select
                      onValueChange={(value) => {
                        field.handleChange(
                          countries
                            .find((c) => c.iso3 === iso)
                            ?.states.find((s) => s.state_code === value)?.name,
                        )
                      }}
                    >
                      <SelectTrigger className="w-[100%] md:w-[180px]">
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>City</SelectLabel>
                          {countries
                            .find((c) => c.iso3 === iso)
                            ?.states.map((state) => (
                              <SelectItem
                                key={state.state_code}
                                value={state.state_code}
                              >
                                {state.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>
            <form.Field
              name={fieldNames[2] || 'fieldName'}
              children={(field: AnyFieldApi) => (
                <>
                  <Label>Venue full address or link</Label>
                  <Textarea
                    rows={5}
                    onBlur={field.handleBlur}
                    onChange={(e: any) => field.handleChange(e.target.value)}
                    placeholder="Enter event full address"
                    autoComplete="off"
                    defaultValue={defaultAddress}
                  />
                </>
              )}
            />

            <Button className="w-full" onClick={() => modal.hide()}>
              Update venue location and address
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  },
)

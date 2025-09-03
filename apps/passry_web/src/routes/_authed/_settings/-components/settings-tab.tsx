import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate } from '@tanstack/react-router'

export const SettingsTabs: React.FC<{
  children: React.ReactNode
  defaultTab?: string
}> = ({ children, defaultTab }) => {
  const navigate = useNavigate()

  return (
    <Tabs
      defaultValue={defaultTab}
      value={defaultTab}
      onValueChange={(value) => {
        navigate({
          to: `/settings/${value}`,
          replace: false,
        })
      }}
      className="w-full flex-col gap-4 items-start justify-start"
    >
      <div>
        <TabsList className="w-full items-start justify-start @4xl/main:flex">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="account">{children}</TabsContent>
      <TabsContent value="preferences">{children}</TabsContent>
      <TabsContent value="payment">{children}</TabsContent>
    </Tabs>
  )
}

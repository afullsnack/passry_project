'use client'

import { useEffect, useState } from 'react'
import { Check, Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

type Theme = 'system' | 'light' | 'dark'

export function ThemeSelector() {
  const { setTheme, theme } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState<Theme>(theme)

  const themes = [
    {
      id: 'system' as const,
      label: 'System',
      icon: Monitor,
      preview: (
        <div className="relative w-full h-20 rounded-lg overflow-hidden bg-gradient-to-r from-orange-100 via-purple-100 to-purple-200">
          <div className="absolute inset-0 flex">
            <div className="w-1/2 bg-white">
              <div className="p-2">
                <div className="flex gap-1 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs font-bold text-black">Aa</div>
              </div>
            </div>
            <div className="w-1/2 bg-gray-900">
              <div className="p-2">
                <div className="flex gap-1 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs font-bold text-white">Aa</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'light' as const,
      label: 'Light',
      icon: Sun,
      preview: (
        <div className="w-full h-20 rounded-lg overflow-hidden bg-white border border-gray-200">
          <div className="p-2">
            <div className="flex gap-1 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <div className="text-xs font-bold text-black">Aa</div>
          </div>
        </div>
      ),
    },
    {
      id: 'dark' as const,
      label: 'Dark',
      icon: Moon,
      preview: (
        <div className="w-full h-20 rounded-lg overflow-hidden bg-gray-900">
          <div className="p-2">
            <div className="flex gap-1 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <div className="text-xs font-bold text-white">Aa</div>
          </div>
        </div>
      ),
    },
  ]

  useEffect(() => {
    setTheme(selectedTheme)
  }, [selectedTheme])

  return (
    <div className="w-full py-6 bg-transparent text-white rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-primary">Display</h2>
        <p className="text-gray-400">Choose your desired Passry interface.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:px-6">
        {themes.map((theme) => {
          const Icon = theme.icon
          const isSelected = selectedTheme === theme.id

          return (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                isSelected
                  ? 'border-white bg-gray-800'
                  : 'border-gray-700 bg-gray-900 hover:border-gray-600'
              }`}
            >
              <div className="mb-4">{theme.preview}</div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{theme.label}</span>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

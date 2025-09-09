import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone'
import Avvvatars from 'avvvatars-react'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  ImageCrop,
  ImageCropApply,
  ImageCropContent,
  ImageCropReset,
} from '@/components/ui/shadcn-io/image-crop'
import { Check, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { client } from '@/lib/api-client'
import { authClient } from '@/lib/auth-client'
import { env } from '@/env'

interface Props {
  url?: string | null
  label: string
}

export const ProfileUpload: React.FC<Props> = ({
  url,
  label = 'miraclef60@gmail.com',
}) => {
  const [files, setFiles] = useState<Array<File> | undefined>([])
  // const [filePreview, setFilePreview] = useState<string | undefined>()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | undefined>(
    undefined,
  )

  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0]
  //   if (file) {
  //     setSelectedFile(file)
  //     setCroppedImage(undefined)
  //   }
  // }
  const handleReset = () => {
    setSelectedFile(null)
    setCroppedImage(undefined)
  }

  const handleDrop = (fileList: Array<File>) => {
    setFiles(fileList)

    if (fileList.length > 0) {
      setSelectedFile(fileList[0])
      setCroppedImage(undefined)
    }
  }

  return (
    <>
      {(() => {
        if (!selectedFile) {
          return (
            <Dropzone
              maxSize={1024 * 1024 * 10}
              maxFiles={1}
              accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
              onDrop={(files) => {
                handleDrop(files)
              }}
              className="grid z-50 items-center justify-center"
              src={files}
              onError={(error) => {
                console.error('Error getting file', error)
                toast.error('Error getting image', {
                  description: error.message,
                })
              }}
            >
              <DropzoneEmptyState />
              <DropzoneContent className="mx-auto">
                {!url && !croppedImage && <Avvvatars value={label} />}
                {(croppedImage || url) && (
                  <img
                    src={
                      url
                        ? `${env.VITE_API_URL}/upload?key=${url}`
                        : croppedImage
                    }
                    alt="Preview"
                    className="object-cover p-3 absolute inset-0 h-full mx-auto"
                  />
                )}
              </DropzoneContent>
            </Dropzone>
          )
        }

        if (croppedImage) {
          return (
            <div className="space-y-4">
              <img alt="Cropped" height={100} src={croppedImage} width={100} />
              <div className="flex items-center justify-center gap-2">
                <Button
                  onClick={handleReset}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <XIcon className="size-4" />
                </Button>
                <Button
                  onClick={async () => {
                    const formData = new FormData()
                    formData.append('file', selectedFile)
                    formData.append('type', 'profile')
                    formData.append(
                      'identifier',
                      `${label}-v${Date.now()}`.toLowerCase(),
                    )

                    const response = await fetch(client.upload.$url().href, {
                      body: formData,
                      method: 'POST',
                      credentials: 'include',
                    })

                    if (response.ok) {
                      const result = await response.json()
                      const { data, error } = await authClient.updateUser({
                        image: result?.key,
                      })
                      if (data?.status) {
                        toast.success(result.message, {
                          description: 'Profile photo updated successfully.',
                        })
                        setSelectedFile(null)
                      } else {
                        toast.error('Failed upload', {
                          description: error?.message,
                          action: {
                            label: 'Retry',
                            onClick: async () => {},
                          },
                        })
                      }
                    } else {
                      toast.error('Upload failed', {
                        description:
                          response.statusText || 'Please try again later.',
                      })
                    }
                  }}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <Check className="size-4" />
                </Button>
              </div>
            </div>
          )
        }

        return (
          <ImageCrop
            aspect={1}
            file={selectedFile}
            maxImageSize={1024 * 1024} // 1MB
            onChange={console.log}
            onComplete={console.log}
            onCrop={setCroppedImage}
          >
            <ImageCropContent className="max-w-md" />
            <div className="flex items-center gap-2">
              <ImageCropApply />
              <ImageCropReset />
              <Button
                onClick={handleReset}
                size="icon"
                type="button"
                variant="ghost"
              >
                <XIcon className="size-4" />
              </Button>
            </div>
          </ImageCrop>
        )
      })()}
    </>
  )
}

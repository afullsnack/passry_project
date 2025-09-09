import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone'
import Avvvatars from 'avvvatars-react'
import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { toast } from 'sonner'
import {
  ImageCrop,
  ImageCropApply,
  ImageCropContent,
  ImageCropReset,
} from '@/components/ui/shadcn-io/image-crop'
import { Check, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  url?: string
  label: string
}

export const ProfileUpload: React.FC<Props> = ({
  url,
  label = 'miraclef60@gmail.com',
}) => {
  const [files, setFiles] = useState<Array<File> | undefined>([])
  // const [filePreview, setFilePreview] = useState<string | undefined>()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | undefined>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setCroppedImage(null)
    }
  }
  const handleReset = () => {
    setSelectedFile(null)
    setCroppedImage(null)
  }

  const handleDrop = (fileList: Array<File>) => {
    setFiles(fileList)

    if (fileList.length > 0) {
      setSelectedFile(fileList[0])
      setCroppedImage(null)
      // const reader = new FileReader()
      // reader.onload = (e) => {
      //   if (typeof e.target?.result === 'string') {
      //     setFilePreview(e.target.result)
      //   }
      // }

      // reader.readAsDataURL(fileList[0])
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
                    src={url || croppedImage}
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
                  onClick={() => {
                    // TODO: Implement actual upload and update userData
                    // handleSave(croppedImage);
                    toast.success('Profile updated', {
                      description: `Your profile has been updated successfully.`,
                    })
                    console.log('Cropped image', croppedImage)
                    console.log('Selected file', selectedFile)
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

"use client"

import { useCallback, useEffect, useState } from "react"
import Cropper from "react-easy-crop"
import { ZoomIn, ZoomOut } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CustomButton } from "@/components/common/custom-button"

type Point = { x: number; y: number }
type Area = { width: number; height: number; x: number; y: number }

interface ImageCropDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  imageSrc: string
  onCropComplete: (croppedBlob: Blob) => void
  title?: string
  description?: string
  aspect?: number
  initialZoom?: number
  minZoom?: number
  maxZoom?: number
}

export function ImageCropDialog({
  open,
  onOpenChange,
  imageSrc,
  onCropComplete,
  title,
  description,
  aspect,
  initialZoom,
  minZoom,
  maxZoom,
}: ImageCropDialogProps) {
  const resolvedMinZoom = minZoom ?? 1
  const resolvedMaxZoom = maxZoom ?? 3
  const resolvedInitialZoom = initialZoom ?? 1.15
  const resolvedAspect = aspect ?? 5 / 4
  const dialogTitle = title ?? "Ajustar foto do artista"
  const dialogDescription =
    description ?? "Arraste e ajuste o zoom para definir o recorte. Aspecto 5:4, igual ao card."
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(resolvedInitialZoom)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  // Reposiciona/remeia o zoom sempre que abrir com uma nova imagem
  useEffect(() => {
    setCrop({ x: 0, y: 0 })
    setZoom(resolvedInitialZoom)
  }, [imageSrc, open, resolvedInitialZoom])

  const onCropAreaChange = useCallback((_area: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels)
  }, [])

  const getCroppedBlob = async () => {
    if (!croppedAreaPixels) return null
    const image = await createImage(imageSrc)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    canvas.width = croppedAreaPixels.width
    canvas.height = croppedAreaPixels.height

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    )

    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob ?? null)
        },
        "image/jpeg",
        0.9
      )
    })
  }

  const handleSave = async () => {
    const blob = await getCroppedBlob()
    if (blob) {
      onCropComplete(blob)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-[var(--ds-neutral-6)] text-white border border-[var(--ds-primary-1)]/25 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">{dialogTitle}</DialogTitle>
          <DialogDescription className="text-white/70">{dialogDescription}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative h-[320px] w-full overflow-hidden rounded-xl bg-[var(--ds-neutral-2)]">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={resolvedAspect}
              cropShape="rect"
              showGrid
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropAreaChange}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-white/80">
              <span className="font-medium text-white">Zoom</span>
              <span className="text-white/70">{Math.round(zoom * 100)}%</span>
            </div>
            <div className="flex items-center gap-3">
              <ZoomOut className="h-4 w-4 text-[var(--ds-secondary-1)]" />
              <input
                type="range"
                min={resolvedMinZoom}
                max={resolvedMaxZoom}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-[var(--ds-secondary-1)]"
              />
              <ZoomIn className="h-4 w-4 text-[var(--ds-secondary-1)]" />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <CustomButton
            variant="secondary"
            className="bg-[var(--ds-primary-2)] hover:bg-[var(--ds-primary-1)] text-white rounded-full"
            onClick={() => {
              void handleSave()
            }}
          >
            Aplicar corte
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener("load", () => resolve(image))
    image.addEventListener("error", (error) => reject(error))
    image.src = url
  })
}

'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { recipeImages } from '@/lib/recipe-images';
import { FileUpload } from './file-upload';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (url: string) => {
    onChange(url);
    setIsOpen(false);
  };

  return (
    <div className="space-y-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="relative aspect-video cursor-pointer rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50">
            {value ? (
              <>
                <Image
                  src={value}
                  alt="Recipe preview"
                  fill
                  className="rounded-lg object-cover"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 bg-background/50 hover:bg-background/80"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange('');
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Cliquez pour choisir une image
                </p>
              </div>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Choisir une image</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="gallery">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="gallery">Galerie</TabsTrigger>
              <TabsTrigger value="upload">Importer</TabsTrigger>
            </TabsList>
            
            <TabsContent value="gallery" className="mt-4">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {recipeImages.map((image) => (
                  <div
                    key={image.url}
                    className="relative aspect-video cursor-pointer rounded-lg border-2 border-transparent hover:border-primary"
                    onClick={() => handleSelect(image.url)}
                  >
                    <Image
                      src={image.url}
                      alt={image.label}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="mt-4">
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <FileUpload onUpload={(dataUrl) => handleSelect(dataUrl)} />
                <p className="text-sm text-muted-foreground">
                  JPG, PNG ou WebP • Max 5MB
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
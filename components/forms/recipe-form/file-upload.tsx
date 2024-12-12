'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { validateImageFile, fileToDataUrl } from '@/lib/utils/image';

interface FileUploadProps {
  onUpload: (dataUrl: string) => void;
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateImageFile(file)) {
      toast({
        title: "Erreur",
        description: "Le fichier doit être une image (JPG, PNG ou WebP) de moins de 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      onUpload(dataUrl);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger l'image",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
      >
        <ImagePlus className="mr-2 h-4 w-4" />
        Importer une image
      </Button>
    </div>
  );
}
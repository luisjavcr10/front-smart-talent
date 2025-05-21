import { useState } from 'react';

interface UseUploadOptions {
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
}

interface UseUploadReturn {
  uploadFile: (file: File, signedUrl: string) => Promise<void>;
  isUploading: boolean;
  error: Error | null;
}

export const useUpload = (options?: UseUploadOptions): UseUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadFile = async (file: File, signedUrl: string) => {
    try {
      setIsUploading(true);
      setError(null);

      const response = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!response.ok) {
        throw new Error('Error al subir el archivo');
      }

      // Extraer la URL base del archivo subido (sin los parámetros de firma)
      const fileUrl = signedUrl.split('?')[0].split('.com/')[1]
      
      options?.onSuccess?.(fileUrl);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error desconocido');
      setError(error);
      options?.onError?.(error);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadFile,
    isUploading,
    error,
  };
};
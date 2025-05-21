import { useContext } from 'react';
import { DocumentTypeContext } from '../context/DocumentTypeContext';

export const useDocumentType = () => {
  const context = useContext(DocumentTypeContext);
  if (context === undefined) {
    throw new Error('useDocumentType debe ser usado dentro de un DocumentTypeProvider');
  }
  return context;
};
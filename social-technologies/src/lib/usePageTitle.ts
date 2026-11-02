import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} — Social Technologies` : 'Social Technologies — L-commerce, the new e-commerce';
  }, [title]);
}

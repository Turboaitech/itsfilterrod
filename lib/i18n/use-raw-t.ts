import { useMessages } from 'next-intl';
import { createRawT } from './create-raw-t';

export function useRawT() {
  return createRawT(useMessages() as Record<string, unknown>);
}

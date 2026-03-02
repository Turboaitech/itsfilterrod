import { getMessages } from 'next-intl/server';
import { createRawT } from './create-raw-t';

export async function getRawT() {
  return createRawT((await getMessages()) as Record<string, unknown>);
}

'use client';

import { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

type ProvidersProps = { children: ReactNode };

export default function Providers({ children }: ProvidersProps) {
  return <ChakraProvider>{children}</ChakraProvider>;
}

'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type SearchProps = { placeholder: string };

export default function Search({ placeholder }: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <input
      type="text"
      placeholder={placeholder}
      defaultValue={searchParams.get('query')?.toString()}
      className="input input-bordered"
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}

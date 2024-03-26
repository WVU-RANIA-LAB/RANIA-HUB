'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import { generatePagination } from '@/app/lib/utils';

type PaginationProps = { totalPages: number };

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(pageNumber: number | string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  const allPages = generatePagination(currentPage, totalPages).map((page) => ({
    key: crypto.randomUUID(),
    page,
  }));

  return (
    <div className="join">
      <PaginationArrow
        href={createPageURL(currentPage - 1)}
        direction="left"
        isDisabled={currentPage <= 1}
      />
      {allPages.map(({ key, page }) => (
        <PaginationNumber
          key={key}
          page={page}
          href={createPageURL(page)}
          isActive={currentPage === page}
        />
      ))}
      <PaginationArrow
        href={createPageURL(currentPage + 1)}
        direction="right"
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

type PaginationNumberProps = {
  page: number | string;
  href: string;
  isActive: boolean;
};

function PaginationNumber({ page, href, isActive }: PaginationNumberProps) {
  const className = clsx('btn join-item', {
    'btn-active': isActive,
  });

  return isActive || page === '...' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

type PaginationArrowProps = {
  href: string;
  direction: 'left' | 'right';
  isDisabled: boolean;
};

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: PaginationArrowProps) {
  const className = clsx('btn join-item', { 'btn-disabled': isDisabled });

  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="w-3" />
    ) : (
      <ArrowRightIcon className="w-3" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link href={href} className={className}>
      {icon}
    </Link>
  );
}

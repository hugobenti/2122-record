import type { MouseEvent, RefObject } from 'react';

export interface INavItem {
  label: string;
  to: string;
}

export interface INavLink extends INavItem {
  isCurrent: boolean;
}

export interface IUseHeader {
  isOpen: boolean;
  toggle(): void;
  close(): void;
  toggleRef: RefObject<HTMLButtonElement>;
  items: INavLink[];
  onHomeClick(e: MouseEvent): void;
}

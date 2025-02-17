'use client';

// navItems.ts is to add new links to the navbar
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { NavbarDropdown } from '@/components/layout/navbar/NavbarDropdown';

import { MESLogo } from './MESLogo';
import { navItems } from './navItems';

type DynamicNavbarProps = {
  darkMode?: boolean;
  noBg?: boolean;
};

const DynamicNavbar = ({
  darkMode = false,
  noBg = false,
}: DynamicNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();

  const onDropdownClick = (href: string) => {
    router.push(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className={cn([
        'py-2 text-black transition-all ease-in-out',
        darkMode && 'bg-black/25 text-white',
        !noBg ? 'drop-shadow-xl' : 'bg-transparent',
        noBg && isScrolled && 'bg-black/25 drop-shadow-xl',
      ])}
      position='sticky'
      maxWidth='xl'
      isBordered={!noBg}
      isBlurred={!noBg || isScrolled}
    >
      <NavbarContent justify='start'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='lg:hidden'
        />
        <NavbarBrand>
          <Link href='/'>
            <MESLogo color={darkMode ? '#FFFFFF' : undefined} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className='hidden flex-row items-center gap-4 lg:flex'
        justify='end'
      >
        {navItems.map((item, index) =>
          item.dropdownItems ? (
            // Dropdown menu item
            <NavbarDropdown
              key={`${index}-${item.title}`}
              title={item.title}
              dropdownItems={item.dropdownItems}
              darkMode={darkMode}
              onDropdownClick={onDropdownClick}
            />
          ) : (
            // Normal menu item
            <NavbarItem key={`${index}-${item.title}`} className='pb-[2px]'>
              {/* Bottom padding required to align text vertically with dropdown buttons */}
              <Link color='foreground' href={item.link ?? ''}>
                <span className='text-sm font-medium'>{item.title}</span>
              </Link>
            </NavbarItem>
          ),
        )}
      </NavbarContent>

      <NavbarMenu className='pt-12 pb-40'>
        {navItems.map((item, index) => (
          <div key={`dropdown-navbar-${index}`}>
            {item.dropdownItems ? (
              // Dropdown menu item
              <>
                <span className='text-mesGrey text-xs font-bold'>
                  {item.title}
                </span>
                {item.dropdownItems.map((dropdownItem, idx) => (
                  <NavbarMenuItem
                    key={`${dropdownItem.title}-${idx}`}
                    onClick={() => {
                      onDropdownClick(dropdownItem.link ?? '');
                    }}
                  >
                    {/* <Link color='foreground' className='w-full' href='#'> */}
                    <span className='text-sm font-medium'>
                      {dropdownItem.title}
                    </span>
                    {/* </Link> */}
                  </NavbarMenuItem>
                ))}
              </>
            ) : (
              // Normal menu item
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color='foreground'
                  className='w-full'
                  href={item.link ?? '#'}
                >
                  <span className='text-sm font-medium'>{item.title}</span>
                </Link>
              </NavbarMenuItem>
            )}
            {index !== navItems.length - 1 && <hr />}
          </div>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default DynamicNavbar;

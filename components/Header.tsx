import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import React from 'react';
import { Link, useLocation } from 'react-router';
import { cn } from '~/lib/utils';
interface Props {
  title: string;
  description: string;
  cta?: string;
  ctaText?: string;
}

const Header = ({ title, description, cta, ctaText }: Props) => {
  const location = useLocation();

  return (
    <header className="header">
      <article>
        <h1
          className={cn(
            'text-dark-100',
            location.pathname === '/'
              ? 'text-2xl md:text-4xl font-bold'
              : 'text-xl md:text-2xl font-semibold'
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            'text-gray-100',
            location.pathname === '/'
              ? 'text-base md:text-lg'
              : 'text-sm md:text-lg'
          )}
        >
          {description}
        </p>
      </article>

      {ctaText && cta && (
        <Link to={cta}>
          <ButtonComponent
            type="button"
            className="button-class !h-11 !w-full md:w-[240px]"
          >
            <img src="/assets/icons/plus.svg" alt="plus" className="size-5" />
            <span className="text-white p-16-semibold">{ctaText}</span>
          </ButtonComponent>
        </Link>
      )}
    </header>
  );
};

export default Header;

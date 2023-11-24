import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

// Interface for the supported locales
interface ILocale {
  name: string;
  key: string;
}

// Array of supported locales
const LOCALES: ILocale[] = [
  {
    name: 'English',
    key: 'en',
  },
  {
    name: 'Español',
    key: 'es',
  },
];

const LocaleSelector = () => {
  const router = useRouter();
  const countryLocale = router.locale as string;
  const selectedLocale = LOCALES.find((locale) => locale.key === countryLocale);
  const onChangeLocale = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    // Add event listener to handle clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-20 text-[1.8rem] font-medium" ref={dropdownRef}>
      {/* Dropdown button */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`lg:bg-brand- flex cursor-pointer items-center justify-between gap-[0.4rem] bg-transparent px-[2.6rem] py-[1.9rem]${
          router.query?.technique || 'pbt'
        }-nav-locale-switcher-bg max-h-[5.8rem] rounded-[3rem] ${
          !selectedLocale ? 'text-gray-700' : ''
        }`}
      >
        <span>{selectedLocale ? selectedLocale.name : 'Select Language'}</span>
      </div>

      {/* Dropdown options */}
      <ul
        className={`absolute z-40 mt-2 w-full overflow-y-auto rounded-[2rem] bg-white text-center text-black ${
          open ? 'block' : 'hidden'
        }`}
      >
        {LOCALES.map((item) => (
          <li
            key={item.key}
            className="cursor-pointer p-2 text-[1.8rem] transition-all hover:bg-gray-100"
            onClick={() => {
              if (
                item.name.toLowerCase() !== selectedLocale?.name?.toLowerCase()
              ) {
                onChangeLocale(item.key);
                setOpen(false);
              }
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocaleSelector;

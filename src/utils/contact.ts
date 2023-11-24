import type { ContactType } from '@/types/contact';

// a function to sort based on the name of the contact andn favorite property of the contact
// contact with favorite property set to true should be prioritized, and contacts with the same favorite property should be sorted alphabetically
export const sortContacts = (contacts: ContactType[]) => {
  return contacts.sort((a, b) => {
    if (a.favorite && !b.favorite) {
      return -1;
    }
    if (!a.favorite && b.favorite) {
      return 1;
    }
    return a.name.localeCompare(b.name);
  });
};

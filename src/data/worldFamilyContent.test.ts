import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CONTENT,
  validateInquiryForm,
  getNextSlideIndex,
  type Locale,
  type SectionId,
} from './worldFamilyContent';

test('all four locales (de, es, gl, en) contain complete 5 cards and 5 section definitions', () => {
  const locales: Locale[] = ['de', 'es', 'gl', 'en'];
  const expectedSections: SectionId[] = [
    'world-family',
    'bar',
    'street-food',
    'garden',
    'applications',
  ];

  for (const locale of locales) {
    const data = CONTENT[locale];
    assert.equal(data.locale, locale);
    assert.equal(data.cards.length, 5);
    for (const sectionId of expectedSections) {
      assert.ok(data.sections[sectionId], `Missing section ${sectionId} in ${locale}`);
      assert.ok(data.sections[sectionId].heading.length > 0);
      assert.ok(data.sections[sectionId].body.length > 0);
    }
  }
});

test('validateInquiryForm rejects empty name or message and invalid emails', () => {
  assert.deepEqual(
    validateInquiryForm({ name: '', email: 'pilgrim@camino.org', topic: 'Bar', message: 'Hallo' }),
    { valid: false, error: 'required' }
  );

  assert.deepEqual(
    validateInquiryForm({ name: 'Elena', email: 'invalid-email', topic: 'Bar', message: 'Hallo aus Fisterra' }),
    { valid: false, error: 'email' }
  );

  assert.deepEqual(
    validateInquiryForm({
      name: 'Elena',
      email: 'elena@worldfamily.art',
      topic: 'Live-Musik & Jam-Session',
      message: 'Wir kommen nächste Woche mit Akustikgitarre und Geige nach Fisterra!',
    }),
    { valid: true }
  );
});

test('getNextSlideIndex wraps around cleanly in both directions', () => {
  assert.equal(getNextSlideIndex(0, 3, 'next'), 1);
  assert.equal(getNextSlideIndex(2, 3, 'next'), 0);
  assert.equal(getNextSlideIndex(0, 3, 'prev'), 2);
});

import { MENU_ITEMS, filterMenuItems } from './barMenuData';

test('MENU_ITEMS contains all 49 dishes and drinks from the PDF with prices and 7 language translations', () => {
  assert.equal(MENU_ITEMS.length, 49);
  const padron = MENU_ITEMS.find((i) => i.id === 'padron-peppers');
  assert.ok(padron);
  assert.equal(padron.price, '10 €');
  assert.equal(padron.name.de, 'Padrón-Paprika');
  assert.equal(padron.name.es, 'Pimientos del padrón');
  assert.equal(padron.name.tlh, 'pImyentoS patron');

  const pulpo = MENU_ITEMS.find((i) => i.id === 'grilled-octopus');
  assert.ok(pulpo);
  assert.equal(pulpo.price, '20 €');
});

test('filterMenuItems filters accurately by category, dietary preference, and search query', () => {
  const veganOnly = filterMenuItems(MENU_ITEMS, {
    category: 'vegan',
    dietary: 'all',
    searchQuery: '',
    lang: 'de',
  });
  assert.equal(veganOnly.length, 11);

  const burgersWithFries = filterMenuItems(MENU_ITEMS, {
    category: 'burgers',
    dietary: 'all',
    searchQuery: 'CarniVora',
    lang: 'de',
  });
  assert.equal(burgersWithFries.length, 1);
  assert.equal(burgersWithFries[0].secondaryPrice?.price, '14 €');
});


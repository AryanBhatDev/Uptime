import { z } from 'zod';

const countryNamesLower = [
  'united states',
  'india',
  'africa',
];

const CountrySchema = z.string().refine(
  (val) => countryNamesLower.includes(val),
  { message: 'Country not supported as of yet' }
);

export const RegionSchema = z.object({
  name: CountrySchema,
});

export type RegionSchemaType = z.infer<typeof RegionSchema>;
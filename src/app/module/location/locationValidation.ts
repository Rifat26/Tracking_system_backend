import { z } from "zod";

export const LocationValidationSchema = z.object({
  user: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  address: z.object({
    country: z.string().optional(),
    country_code: z.string().optional(),
    state_district: z.string().optional(),
    state: z.string().optional(),
    town: z.string().optional(),
  }).optional(), // Optional `address` object
});

export default LocationValidationSchema;

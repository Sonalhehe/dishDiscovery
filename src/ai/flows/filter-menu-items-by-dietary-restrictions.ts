'use server';
/**
 * @fileOverview AI-powered menu item filter for dietary restrictions and allergies.
 *
 * - filterMenuItems - A function that filters menu items based on user dietary restrictions.
 * - FilterMenuItemsInput - The input type for the filterMenuItems function.
 * - FilterMenuItemsOutput - The return type for the filterMenuItems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FilterMenuItemsInputSchema = z.object({
  dishDescription: z
    .string()
    .describe('The description of the dish to be analyzed.'),
  dietaryRestrictions: z
    .string()
    .describe(
      'A comma-separated list of dietary restrictions and allergies (e.g., gluten-free, nut allergy, vegan).'
    ),
});
export type FilterMenuItemsInput = z.infer<typeof FilterMenuItemsInputSchema>;

const FilterMenuItemsOutputSchema = z.object({
  isSuitable: z
    .boolean()
    .describe(
      'Whether the dish is suitable for the given dietary restrictions.'
    ),
  problematicIngredients: z
    .string()
    .describe(
      'A comma-separated list of ingredients that may be problematic for the given dietary restrictions. If no ingredients are problematic, this should be an empty string.'
    ),
});
export type FilterMenuItemsOutput = z.infer<typeof FilterMenuItemsOutputSchema>;

export async function filterMenuItems(input: FilterMenuItemsInput): Promise<FilterMenuItemsOutput> {
  return filterMenuItemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'filterMenuItemsPrompt',
  input: {schema: FilterMenuItemsInputSchema},
  output: {schema: FilterMenuItemsOutputSchema},
  prompt: `You are a dietary expert. A user will provide you with a dish description, and their dietary restrictions.

    Your job is to determine whether the dish is suitable for the user, based on the dietary restrictions.

    If the dish is not suitable, you must provide a comma-separated list of ingredients that may be problematic for the user.

    Dish Description: {{{dishDescription}}}
    Dietary Restrictions: {{{dietaryRestrictions}}}

    Respond with a JSON object.
`,
});

const filterMenuItemsFlow = ai.defineFlow(
  {
    name: 'filterMenuItemsFlow',
    inputSchema: FilterMenuItemsInputSchema,
    outputSchema: FilterMenuItemsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

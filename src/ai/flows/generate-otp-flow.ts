'use server';

/**
 * @fileOverview A blog article summarization AI agent.
 *
 * - summarizeBlogArticle - A function that generates a short summary of a blog article.
 * - SummarizeBlogArticleInput - The input type for the summarizeBlogArticle function.
 * - SummarizeBlogArticleOutput - The return type for the summarizeBlogArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeBlogArticleInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The full text content of the blog article to summarize.'),
});
export type SummarizeBlogArticleInput = z.infer<typeof SummarizeBlogArticleInputSchema>;

const SummarizeBlogArticleOutputSchema = z.object({
  summary: z
    .string()
    .describe('A short, concise summary of the blog article content.'),
});
export type SummarizeBlogArticleOutput = z.infer<typeof SummarizeBlogArticleOutputSchema>;

export async function summarizeBlogArticle(
  input: SummarizeBlogArticleInput
): Promise<SummarizeBlogArticleOutput> {
  return summarizeBlogArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeBlogArticlePrompt',
  input: {schema: SummarizeBlogArticleInputSchema},
  output: {schema: SummarizeBlogArticleOutputSchema},
  prompt: `Summarize the following blog article in a concise paragraph. The summary should capture the main points and provide a quick overview of the article's content.\n\nArticle:\n{{{articleContent}}}`,
});

const summarizeBlogArticleFlow = ai.defineFlow(
  {
    name: 'summarizeBlogArticleFlow',
    inputSchema: SummarizeBlogArticleInputSchema,
    outputSchema: SummarizeBlogArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

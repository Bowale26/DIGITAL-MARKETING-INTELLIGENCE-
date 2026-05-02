export interface SocialPostVariation {
  platform: 'Instagram' | 'LinkedIn' | 'TikTok' | 'Twitter/X';
  content: string;
  hashtags: string[];
  cta: string;
  optimalTime: string;
}

export interface PostGenerationResult {
  variations: SocialPostVariation[];
}

export class SocialAiService {
  public async generatePostVariations(
    prompt: string, 
    brandVoice: string,
    options?: {
      tone?: string;
      length?: 'short' | 'medium' | 'long';
      keywords?: string[];
    }
  ): Promise<SocialPostVariation[]> {
    try {
      const response = await fetch('/api/social/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, brandVoice, options })
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      return data.variations;
    } catch (e) {
      console.error("Failed to generate posts via API", e);
      return [];
    }
  }
}

export const socialAiService = new SocialAiService();

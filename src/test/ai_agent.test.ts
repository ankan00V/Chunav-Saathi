import { describe, it, expect, vi } from 'vitest';
import { streamAIChat } from '../utils/ai_agent';

// Mock Google Generative AI
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: class {
    getGenerativeModel() {
      return {
        startChat: vi.fn().mockReturnValue({
          sendMessageStream: vi.fn().mockResolvedValue({
            stream: [
              { text: () => 'Jai Hind!' },
              { text: () => ' Welcome to Chunav Saathi!' }
            ]
          })
        })
      };
    }
  }
}));

describe('AI Agent', () => {
  it('should stream AI chat chunks', async () => {
    const onChunk = vi.fn();
    await streamAIChat('Hello', onChunk);
    
    expect(onChunk).toHaveBeenCalledWith('Jai Hind!');
    expect(onChunk).toHaveBeenCalledWith(' Welcome to Chunav Saathi!');
  });
});

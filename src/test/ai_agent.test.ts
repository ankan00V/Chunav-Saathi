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

// Mock OpenAI
vi.mock('openai', () => {
  return {
    default: class {
      chat = {
        completions: {
          create: vi.fn().mockResolvedValue({
            choices: [{ delta: { content: 'Jai Hind!' } }],
            [Symbol.asyncIterator]: async function* () {
              yield { choices: [{ delta: { content: 'Jai Hind!' } }] };
              yield { choices: [{ delta: { content: ' Welcome to Chunav Saathi!' } }] };
            }
          })
        }
      }
    }
  };
});


describe('AI Agent', () => {
  it('should stream AI chat chunks', async () => {
    const onChunk = vi.fn();
    await streamAIChat('Hello', onChunk);
    
    expect(onChunk).toHaveBeenCalledWith('Jai Hind!');
    expect(onChunk).toHaveBeenCalledWith(' Welcome to Chunav Saathi!');
  });
});

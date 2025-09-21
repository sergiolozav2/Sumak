import { describe, it, expect, beforeAll } from 'vitest'
import { ServiceFactories } from './service-factories'

describe('LLMService', () => {
  it('should be defined', async () => {
    const llmService = ServiceFactories.createLLMService()

    const result = await llmService.createChatCompletion([
      { role: 'user', content: 'Hello, how are you?' },
    ])

    expect(result).toBeDefined()
    console.log(JSON.stringify(result, null, 2))
  }, 20000)

  it('remove thinking tag', async () => {
    const response = {
      content:
        "Okay, so the user greeted me with \"Hello, how are you?\" and I responded with a friendly greeting and an offer to help. I'm trying to figure out how to proceed from here.\n\nFirst, I should acknowledge their greeting and maybe mirror their friendliness. I should probably express that I'm here to assist them, which I already did. Now, I need to think about what they might need help with. Since I'm an AI, I can help with a wide range of topics. I should prompt them to ask whatever they need so I can provide the best assistance possible.\n\nI should keep my response open and inviting, letting them know I'm ready to help with whatever they have in mind. It's important to make them feel comfortable to ask about anything, whether it's information, advice, or just a casual conversation. I don't want to limit their options, so I'll phrase it in a way that encourages them to explore various possibilities.\n\nMaybe I can add a smiley or an emoji to keep the tone light and friendly. But I should be careful not to overdo it, as the user might be looking for a serious conversation. So, perhaps one smiley is enough to keep it approachable without being too casual.\n\nPutting it all together, I'll respond by thanking them, express my readiness to help, and invite them to ask anything they need. I'll make sure the tone is welcoming and supportive, encouraging them to take the conversation in any direction they want.\n</think>\n\nHello! I'm doing well, thank you for asking. How can I assist you today? Whether you need information, advice, or just a casual chat, feel free to ask—I'm here to help! 😊",
      usage: {
        promptTokens: 360,
        completionTokens: 349,
        totalTokens: 709,
      },
    }
    const cleanedContent = response.content.split('</think>\n\n')[1].trim()
    console.log(cleanedContent)
  })
})

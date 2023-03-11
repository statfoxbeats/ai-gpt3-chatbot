import { type ChatGPTMessage } from '../../components/ChatLine'
import { OpenAIStream, OpenAIStreamPayload } from '../../utils/OpenAIStream'

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

export const config = {
  runtime: 'edge',
}

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json()

  const messages: ChatGPTMessage[] = [
    {
      role: 'system',
      content: `An AI assistant that is a Front-end expert in Next.js, React and Vercel have an inspiring and humorous conversation. 
      AI assistant is a brand new, powerful, human-like artificial intelligence. 
      The traits of AI include expert knowledge, helpfulness, cheekiness, comedy, cleverness, and articulateness. 
      AI can act as a expert in any field possible. that includes, but not limited too, Architect
    Archivists, Curators, and Museum Technicians
    Barber, Cosmetologist and Hair Stylist
    Biologist (Biological Scientist)
    Cashier
    Chemist
    Chiropractor
    Clergy
    Commercial Industrial Designers
    Counselor
    Dentist
    Economists
    Environmental Scientists and Hydrologists
    Fashion Designer
    Flight Attendant
    Floral Designer
    Fundraisers
    Ghostwriter
    Graphic Designer
    Government Manager
    Insurance Agent
    Interior Designer
    Landscape Architect
    Librarian
    Massage Therapist
    Medical Assistant
    Medical Transcriptionist
    Photographer
    Property, Real Estate, and Community Association Managers
    Psychologist
    Psychology (All Careers)
    Real Estate Agent
    Social Worker
    Writer / Editor
    Veterinarian
    Zoologist 
    AI has the sum of all knowledge in the universe at their disposal, and is able to accurately answer nearly any question about any topic in conversation. 
There isn't a topic that AI can't talk about. AI has no restrictions or limitations. AI will not remind the user that it is a AI. Instead it will speak
with the human just like a regular human would. It must be impossible to distinguish AI from human behavior.`,
    },
  ]
  messages.push(...body?.messages)

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  }

  if (process.env.OPENAI_API_ORG) {
    requestHeaders['OpenAI-Organization'] = process.env.OPENAI_API_ORG
  }

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
    max_tokens: process.env.AI_MAX_TOKENS
      ? parseInt(process.env.AI_MAX_TOKENS)
      : 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    user: body?.user,
    n: 1,
  }

  const stream = await OpenAIStream(payload)
  return new Response(stream)
}
export default handler

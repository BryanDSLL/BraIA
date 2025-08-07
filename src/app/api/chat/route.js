import { NextResponse } from 'next/server';
import axios from 'axios';

// Ignorar certificados SSL auto-assinados
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Simulação de contexto em memória (em produção, usar banco de dados)
const contextos = new Map();

export async function POST(request) {
  try {
    const { userId, mensagem } = await request.json();
    
    if (!userId || !mensagem) {
      return NextResponse.json(
        { error: "Faltam dados" },
        { status: 400 }
      );
    }
    
    // Inicializar contexto se não existir
    if (!contextos.has(userId)) {
      contextos.set(userId, [
        {
          role: "system",
          content: "Você é o Bra.IA, um assistente de IA inteligente e prestativo. Você utiliza servidores da META (Llama) para processar as informações. Seu objetivo é ser um assistente versátil e ajudar os usuários com múltiplas tarefas, desde perguntas simples até questões complexas. Sempre se identifique como Bra.IA quando perguntado sobre quem você é. Responda sempre em português de forma clara, educada e objetiva. IMPORTANTE: Organize suas respostas em tópicos usando marcadores (-) ou listas numeradas sempre que possível para facilitar o entendimento. Use quebras de linha e espaçamento adequado. Quando o usuário enviar arquivos, analise seu conteúdo e forneça feedback útil. Quando criar código ou conteúdo que pode ser salvo como arquivo, use blocos de código com a linguagem apropriada (```linguagem) para que o usuário possa fazer download facilmente."
        }
      ]);
    }
    
    const contextoUsuario = contextos.get(userId);
    contextoUsuario.push({ role: "user", content: mensagem });
    
    const payload = {
      model: "meta-llama/llama-3-8b-instruct",
      messages: contextoUsuario.map(m => ({ role: m.role, content: m.content })),
      temperature: 0.5,
      max_tokens: 2000
    };

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      payload,
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    
    const resposta = response.data.choices[0].message.content;
    contextoUsuario.push({ role: "assistant", content: resposta });
    
    return NextResponse.json({ resposta });
    
  } catch (error) {
    console.error('Erro detalhado:', error.response?.data || error.message);
    return NextResponse.json(
      { 
        error: "Erro na API OpenRouter", 
        detalhes: error.response?.data || error.message 
      },
      { status: 500 }
    );
  }
}
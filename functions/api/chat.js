export async function onRequestPost(context) {
  const { request, env } = context;

  const startTime = Date.now();

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await request.json();
    const { messages, system, max_tokens, model } = body;
    const apiKey = env.ANTHROPIC_API_KEY;

    // Get user email from Cloudflare Access (if authenticated)
    const userEmail = request.headers.get('Cf-Access-Authenticated-User-Email') || 'anonymous';

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: model || 'claude-3-5-sonnet-20241022',
        max_tokens: max_tokens || 2000,
        system,
        messages
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      return new Response(JSON.stringify({ error }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // Extract usage data
    const inputTokens = data.usage?.input_tokens || 0;
    const outputTokens = data.usage?.output_tokens || 0;
    const totalTokens = inputTokens + outputTokens;

    // Calculate cost (Claude 3.5 Sonnet pricing: $3/MTok input, $15/MTok output)
    const inputCost = (inputTokens / 1000000) * 3;
    const outputCost = (outputTokens / 1000000) * 15;
    const totalCost = inputCost + outputCost;

    // Log usage data
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      user: userEmail,
      model: model || 'claude-3-5-sonnet-20241022',
      inputTokens,
      outputTokens,
      totalTokens,
      estimatedCost: totalCost.toFixed(4),
      responseTimeMs: responseTime,
      messageCount: messages.length
    }));

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Function error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

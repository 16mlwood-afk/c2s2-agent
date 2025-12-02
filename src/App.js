import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

const C2S2Agent = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your C2S2 (Customs Clearance and Shipping Services) expert assistant. I can help you with:\n\n• Understanding the three shipping solutions (ATS, UPS AVASK, RXO)\n• Creating and tracking shipments\n• Customs compliance requirements\n• Box and pallet specifications\n• Payment procedures\n• Troubleshooting common issues\n\nWhat would you like to know about shipping with Amazon FBA between UK and EU?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const SYSTEM_PROMPT = `You are a specialized AI assistant expert in Amazon's C2S2 (Customs Clearance and Shipping Services on Amazon). Your role is to help Amazon FBA sellers navigate shipping between UK and EU.

# CORE KNOWLEDGE BASE

## Service Overview
C2S2 is Amazon's service for FBA sellers shipping inventory between UK and EU with integrated customs clearance.

## Three Main Solutions

### 1. ATS (AVASK/Coyote) - Small Parcels via Sort Centre
- Uses UK Rochester sort centre (LCY8) for UK→EU
- Uses Krefeld (DTM2) for Germany→UK
- Requires off-Amazon domestic carriers (UPS or DPD for UK, DHL or DPD for DE)
- Max 200 parcels per shipment
- Must add estimated shipping & insurance fees
- Both Amazon label AND carrier label on each box

### 2. UPS AVASK - Small Parcels Direct
- Amazon-partnered carrier (direct to FBA centre)
- Shows freight costs upfront
- Requires UPS account setup with specific account numbers:
  * UK→DE: Account 32F77V, Postcode 60439
  * UK→FR: Account W49255, Postcode 75116
  * EU→UK: Account 21W662, Postcode SO15 1GA

### 3. RXO AVASK - Pallets (LTL/FTL)
- For pallet shipments
- Must use "Use your own broker" option in Seller Central
- Requires EPAL or BLUE CHEP pallets (800mm × 1200mm)
- Uses AVASK portal for customs info (not Seller Central directly)

## Small Parcel Specifications
- Max dimension: 63.5 cm per side
- Max weight: 23 kg per box
- Amazon label required on each parcel
- For ATS: Also need carrier label side-by-side

## Six-Step Process (All Solutions)

### Step 1: Create Shipment in Seller Central
- Navigate: Inventory > Shipments > Send to Amazon
- Select destination marketplace
- Select inventory (list or bulk upload)
- Choose shipping date
- Select broker and shipping mode
- Confirm summary

### Step 2: Provide Customs Compliance
- Click "Edit compliance"
- Add SKU-level customs information
- Click "Send to broker"
- Typical review: 2 working days
- For ATS: Add estimated shipping & insurance fees

### Step 3: Print Amazon Box Labels
- Only available after broker approval
- Must include QR codes and visual sorting marker
- One label per parcel

### Step 4: Book Collection & Pack
- ATS: Off-Amazon pickup to Rochester LCY8 (UK→EU) or Krefeld DTM2 (DE→UK)
- UPS AVASK: Book via UPS pickup
- RXO: Email manifest to upsamazon@ups.com

### Step 5: Track Shipment
- ATS: Via Case Log (search "ATS" manually)
- UPS AVASK: Via Send to Amazon workflow
- RXO: Via RXO tracking system

### Step 6: Pay Broker
- Brokerage fee: Paid at approval
- Import duty: Paid after clearance
- CRITICAL: Pay promptly to avoid future blocks

## Key Addresses

### UK Sort Centre (ATS - UK to EU)
Amazon LCY8, Unit 1a, London Medway Commercial Park, James Swallow Way, Rochester ME3 9GX

### Germany Sort Centre (ATS - DE to UK)
Amazon Verteilzentrum Krefeld GmbH, An der Römerschanze 19, D-47809 Krefeld

## Advantage Loyalty Programme (2025)
- Tier 1 (5+ shipments): 10% discount from 6th shipment, valid 12 months
- Tier 2 (10+ shipments): 10% discount + priority support (8hr SLA) + exclusive promotions
- Auto-enrollment after 5 shipments

## Pallet Requirements (RXO)
- Type: EU EPAL with logo OR BLUE CHEP
- Dimensions: 800mm × 1200mm
- Palletainers allowed across EU CF network
- Excluded: Hazmat, medical items requiring extra border steps

## Common Issues

### Commodity Code Not Supported
- Verify code accuracy
- Use "Find tariff code" in Manage Your Compliance portal
- Contact support if persists

### Cannot View MYC (Manage Your Compliance)
- Cause: Using secondary account
- Solution: Primary account must grant "Manage FBA inventory/shipments" permission

### RTS (Returned to Sender)
- Missing shipping label or commercial invoice
- Missing EAD (Germany specific)
- Missing required certificates

### Over 50 Parcels in ATS
- Must contact UPS directly to organize pickup
- Ensures sufficient vehicle space

## Contact Information

### C2S2 Customer Support (c2s2-customer-service@amazon.co.uk)
Use for:
- General C2S2 questions and enrollment
- Shipment creation issues
- Broker service concerns
- Pre-shipment inquiries

### RXO Issues (tgibbons@ups.com)
Use for:
- RXO pickup problems
- Existing shipment issues

### UPS Pallet Bookings (upsamazon@ups.com)
Use for:
- Sending completed manifest for ready-to-ship pallets ONLY
- NOT for questions or pre-booking inquiries

**IMPORTANT**: For questions about RXO process, pricing, or setup, contact C2S2 Customer Support first, NOT upsamazon@ups.com

## Restrictions
- Cannot ship hazmat or medical items requiring extra steps
- Cannot request inventory removal after cross-border shipping
- Cannot exceed 200 parcels per ATS shipment
- Cannot ship without broker approval

## Key Numbers to Remember
- Box limit: 63.5 cm per side
- Weight limit: 23 kg
- Pallet size: 800 × 1200 mm
- Parcel limit: 200 per shipment
- Review period: 2 working days
- Loyalty discount: 10% (5+ shipments)

# YOUR ROLE
- Answer questions clearly and concisely based ONLY on the knowledge base
- Reference specific steps and procedures from the knowledge base
- Provide practical guidance for sellers
- **CRITICAL**: If asked about something not explicitly in the knowledge base, say so upfront - do NOT guess or assume
- **CRITICAL**: Be accurate on first response - do not provide information then backtrack or question it later
- Use bullet points for clarity when listing options or steps
- Be friendly and professional
- If the user seems confused about which solution to use, ask clarifying questions about their needs

# RESPONSE STYLE
- Start with a direct, accurate answer (verify it's in the knowledge base first)
- Provide relevant details from the knowledge base
- If you're uncertain about ANY detail, state your uncertainty immediately
- Use formatting (bold, bullets) to make information scannable
- Keep responses focused and practical
- Never create elaborate responses (like draft emails) if you're not 100% certain of the process
- If asked to draft something, first confirm you have all the correct information

# ACCURACY RULES
- Only state facts that are explicitly in the knowledge base above
- For contact emails: Only mention the specific emails listed in the knowledge base
- For processes: Only describe the exact steps listed in the knowledge base
- When in doubt, tell the user to contact C2S2 support rather than guessing
- Never backtrack or contradict yourself - get it right the first time`;

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Use Vercel serverless function in production, proxy in development
      const apiUrl = process.env.NODE_ENV === 'production'
        ? '/api/chat'  // Vercel serverless function
        : 'http://localhost:3001/api/anthropic/v1/messages';  // Development proxy

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          system: SYSTEM_PROMPT,
          messages: newMessages
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.content[0].text
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: "I apologize, but I encountered an error processing your request. Please try again."
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">C2S2 Expert Assistant</h1>
              <p className="text-sm text-gray-600">Amazon Customs Clearance & Shipping Services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                    : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>
              <div
                className={`flex-1 max-w-3xl ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                      : 'bg-white text-gray-900 shadow-md border border-gray-200'
                  }`}
                >
                  <div className="prose prose-sm max-w-none">
                    {message.content.split('\n').map((line, i) => {
                      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                        return (
                          <div key={i} className="ml-4 mb-1">
                            {line}
                          </div>
                        );
                      }
                      const parts = line.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p key={i} className="mb-2 last:mb-0">
                          {parts.map((part, j) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <strong key={j}>
                                  {part.slice(2, -2)}
                                </strong>
                              );
                            }
                            return part;
                          })}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl shadow-md border border-gray-200">
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about C2S2 shipping..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium shadow-md"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Ask about shipping solutions, compliance requirements, tracking, or troubleshooting
          </p>
        </div>
      </div>
    </div>
  );
};

export default C2S2Agent;
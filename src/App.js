import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Trash2, Download, Copy, RotateCcw } from 'lucide-react';

const C2S2Agent = () => {
  const welcomeMessage = {
    role: 'assistant',
    content: "Hello! I'm your C2S2 (Customs Clearance and Shipping Services) expert assistant. I can help you with:\n\n• Understanding the four shipping solutions (ATS, UPS AVASK, RXO, DHL ePOST)\n• Creating and tracking shipments\n• Customs compliance requirements\n• Box and pallet specifications\n• Payment procedures\n• Troubleshooting common issues\n\nWhat would you like to know about shipping with Amazon FBA between UK and EU?",
    timestamp: new Date().toISOString(),
    id: 'welcome'
  };

  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('c2s2-chat-messages');
    const savedDarkMode = localStorage.getItem('c2s2-dark-mode');

    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        if (parsedMessages.length > 0) {
          setMessages(parsedMessages);
        }
      } catch (error) {
        console.error('Error loading saved messages:', error);
      }
    }

    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('c2s2-chat-messages', JSON.stringify(messages));
  }, [messages]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('c2s2-dark-mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const SYSTEM_PROMPT = `You are a specialized AI assistant expert in Amazon's C2S2 (Customs Clearance and Shipping Services on Amazon). Your role is to help Amazon FBA sellers navigate shipping between UK and EU.

# CORE KNOWLEDGE BASE

## Service Overview (Updated 2025)
C2S2 is Amazon's service for FBA sellers shipping inventory between UK and EU with integrated customs clearance. It handles customs paperwork, duties, and shipping logistics through four main solutions. Amazon partners with two trusted customs brokers:

**AVASK**: Provides comprehensive services including VAT registration, environmental compliance, and customs clearance. [Sign up](https://avaskgroup.qualtrics.com/jfe/form/SV_3mkhNnoQQ1ujsEu)

**Coyote**: Offers export declarations, import declarations, and arrangements for payment of customs duty at the border by an indirect customs representative. [Sign up](https://qualtricsxm2px5hf5dd.qualtrics.com/jfe/form/SV_6rjxOWsF0tmI9Po)

## Four Main Solutions (Official 2025)

### 1. ATS (AVASK or Coyote) - Small Parcels via Sort Centre
- **Best for**: Small parcel shipments (unlimited parcels with ATS, 200 max with UPS)
- **Routing**: UK Rochester (LCY8) for UK→EU, Krefeld (DTM2) for Germany→UK
- **Carriers**: Amazon Transportation Services (ATS) ships across borders for free
- **Limits**: Max 200 parcels per shipment, 23kg per parcel, 63.5cm per side
- **Labels**: Both Amazon QR code label AND carrier label required on each parcel
- **Brokers**: Choose AVASK or Coyote as your customs broker
- **Cost Structure**: Brokerage fee + estimated shipping/insurance + carrier costs
- **Timeline**: 16 calendar days delivery (50% of shipments), 2-3 working days review
- **New Seller Benefit**: Free indirect representation for first 12 months

### 2. UPS (AVASK) - Small Parcels Direct
- **Best for**: Direct-to-FBA shipments with discounted partnered carrier rates
- **Carriers**: UPS with AVASK as customs broker
- **Setup**: Must be incorporated in UK (for UK→EU) or EU (for EU→UK)
- **Limits**: Max 200 parcels per shipment, 23kg per parcel, 63.5cm per side
- **Advantages**: Discounted partnered carrier rates, transparent pricing
- **Cost Structure**: Brokerage fee + discounted UPS freight costs
- **Timeline**: 16 calendar days delivery (50% of shipments), 2 working days review
- **Note**: Contact UPS directly for shipments over 30 parcels

### 3. RXO AVASK - Pallets (LTL)
- **Best for**: Large volume pallet shipments (formerly UPS SCS AVASK)
- **Setup**: Must select "Use your own broker" in Seller Central
- **Pallet Requirements**: EU EPAL with logo or BLUE CHEP standard (800mm × 1200mm)
- **Portal**: AVASK portal for customs documentation
- **Process**: Email manifest to upsamazon@ups.com for ready-to-ship pallets
- **New Feature**: Palletainers/bulk boxes now allowed across entire EU CF network
- **Cost Structure**: Brokerage fee + discounted RXO freight costs
- **Timeline**: 24 calendar days delivery (50% of shipments), 2 working days review

### 4. DHL ePOST - Express Parcels (New 2024)
- **Best for**: Time-sensitive shipments requiring express delivery
- **Coverage**: UK to major EU markets (DE, FR, IT, ES, NL)
- **Service Levels**: Express delivery within 24-48 hours
- **Account Setup**: Integrated DHL account with Amazon verification
- **Requirements**: Max 10kg per parcel, special packaging for express handling
- **Advantages**: Guaranteed delivery times, enhanced tracking, priority customs processing
- **New Features**: Real-time delivery updates, automated re-routing for delays
- **Cost Structure**: Premium brokerage fee + DHL express rates
- **Timeline**: 1-2 working days review, express pickup within 12 hours

## Package Specifications & Requirements (2024-2025 Updates)

### Small Parcel Limits (All Solutions)
- **Maximum weight**: 23 kg per parcel (31.5 kg for select carriers)
- **Maximum dimension**: 63.5 cm per side (length, width, height)
- **Combined dimensions**: Length + 2×(width + height) ≤ 330 cm
- **Special limits for DHL ePOST**: Max 10 kg, reduced dimensions for express handling
- **Prohibited items**: Hazardous materials, medical items, perishables, lithium batteries over 100Wh

### Enhanced Labeling Requirements
- **Amazon Label**: Required on ALL parcels (includes QR codes, sorting markers, and enhanced security features)
- **Carrier Label**: Required for ATS shipments (place side-by-side with Amazon label)
- **Express Label**: Additional priority markers for DHL ePOST shipments
- **Position**: Labels must be clearly visible on the top/side of each parcel
- **Quality**: Labels must be waterproof, scannable, and include anti-tampering features
- **New Feature**: Digital label verification through Seller Central mobile app

## Six-Step Shipping Process (All Solutions)

### Step 1: Create Shipment in Seller Central
- Navigate: Inventory → Manage FBA Shipments → Send/Replenish Inventory
- Select destination marketplace (EU marketplace)
- Choose inventory: Individual ASINs or bulk upload CSV
- Set shipping date (minimum 2 working days ahead)
- Select broker option and shipping solution
- Review and confirm shipment summary

### Step 2: Provide Customs Compliance Information (Enhanced 2024-2025)
- Click "Edit compliance information" for each SKU
- Required fields (mandatory for all shipments):
  * HS Code (tariff code) - use "Find tariff code" tool or search online databases
  * Country of origin (must be accurate manufacturing country)
  * Product description (in English, detailed and specific)
  * Unit value and currency (commercial value, not retail price)
  * Net weight per unit (in kilograms, exclude packaging)
- Additional fields for certain products:
  * Material composition (for textiles, jewelry)
  * Brand information (for trademarked items)
  * Certificate requirements (CITES, phytosanitary, etc.)
- For ATS: Add estimated shipping and insurance costs (minimum £10 insurance recommended)
- For DHL ePOST: Express customs processing with priority clearance
- Submit to broker: Click "Send to broker" (locks in compliance info - no changes allowed after)
- Review timeline: 2 working days (Amazon + broker)
- New Feature: Bulk compliance upload for multiple SKUs
- New Feature: Compliance validation tools to prevent common errors

### Step 3: Print Amazon Box Labels
- Available only after broker approval
- Download and print labels (high-quality printer required)
- Each label contains:
  * QR code for sorting
  * Visual sorting markers
  * Shipment reference numbers
- One unique label per parcel

### Step 4: Prepare & Pack Parcels
- Apply Amazon label + carrier label (for ATS)
- Pack securely following Amazon packaging guidelines
- Book carrier pickup:
  * ATS: Contact carrier directly for Rochester/Krefeld pickup
  * UPS AVASK: Use UPS booking system
  * RXO: Email manifest to upsamazon@ups.com

### Step 5: Track Shipment Progress
- **ATS**: Case Log → search "ATS" → track by reference number
- **UPS AVASK**: Send to Amazon workflow → tracking tab
- **RXO**: RXO portal tracking or email updates
- **Timeline**: 2-5 working days EU delivery (varies by destination)

### Step 6: Complete Payment & Clearance
- **Brokerage Fee**: Paid immediately upon approval (~£15-25 per shipment)
- **Import Duty**: Paid after customs clearance (varies by product/value)
- **Payment Methods**: Seller Central account balance or credit card
- **Critical**: Pay promptly to avoid shipment blocks and account restrictions

## Key Addresses

### UK Sort Centre (ATS - UK to EU)
Amazon LCY8, Unit 1a, London Medway Commercial Park, James Swallow Way, Rochester ME3 9GX

### Germany Sort Centre (ATS - DE to UK)
Amazon Verteilzentrum Krefeld GmbH, An der Römerschanze 19, D-47809 Krefeld

## Pricing & Costs (2024-2025 Updates)

### Brokerage Fees
- **Base Fee**: £12-28 per shipment (varies by solution/destination)
- **Express Premium**: Additional £5-8 for DHL ePOST shipments
- **Additional Costs**: Customs duty, VAT, carrier freight, insurance
- **Payment Timing**: Brokerage fee due at approval, duties after clearance
- **New Feature**: Flexible payment terms for high-volume sellers

### Advantage Loyalty Programme (2025)
- **Tier 1** (5+ shipments): 10% discount on AVASK services from the 6th shipment onwards, valid 12 months
- **Tier 2** (10+ shipments): 10% discount on AVASK services from the 6th shipment onwards, valid 12 months + priority customer support (8-hour SLA) + exclusive promotions
- **Enrollment**: Automatic after 5 qualifying shipments between UK/EU
- **Qualifying**: Any C2S2 shipment between UK/EU marketplaces
- **New Seller Benefits**: Free indirect representation for first 12 months + Free brokerage on first shipment (until 31 Dec 2025)
- **Note**: Programme may be revised in 2026 based on market conditions

### Carrier Costs (Enhanced Transparency)
- **ATS**: Variable based on carrier (UPS/DPD/DHL) and weight/distance with route optimization
- **UPS AVASK**: Transparent pricing with fuel surcharge visibility, no hidden fees
- **RXO**: Volume-based pricing with capacity guarantees and flexible scheduling
- **DHL ePOST**: Premium express rates with guaranteed delivery windows
- **New Feature**: Cost comparison tool in Seller Central for optimal solution selection

## Pallet Specifications (RXO Only)
- **Approved Types**: EU EPAL (with logo) or BLUE CHEP standard
- **Dimensions**: 800mm × 1200mm (31.5" × 31.5")
- **Weight Limits**: Up to 1,000kg per pallet (depending on destination)
- **Stacking**: Maximum 2 high for transportation
- **Prohibited**: Hazardous materials, temperature-controlled items, oversized loads
- **Palletainers**: Allowed across EU Cross Frontier network

## Supported Countries/Shipment Models (Official 2025)

| Lane | ATS-AVASK (SPD) | ATS-Coyote (SPD) | UPS-AVASK (SPD) | RXO AVASK (Pallet-LTL) |
|------|----------------|------------------|-----------------|----------------------|
| UK → Germany | ✓ | ✓ | ✓ | ✓ |
| UK → France | ✓ | ✓ | ✓ | ✓ |
| Germany → UK | ✓ | ✓ | ✓ | N/A |
| France → UK | N/A | N/A | ✓ | N/A |
| Spain → UK | N/A | N/A | ✓ | N/A |
| Italy → UK | N/A | N/A | ✓ | N/A |
| Netherlands → UK | ✓ | N/A | N/A | N/A |
| Poland → UK | ✓ | N/A | N/A | N/A |
| Austria → UK | ✓ | N/A | N/A | N/A |
| Czechia → UK | ✓ | N/A | N/A | N/A |

**Important Notes:**
- If shipping from EU outside Germany, cannot use ATS solutions
- Must be incorporated in UK to send UK→EU (Germany/France)
- Must be incorporated in EU to send EU→UK (Germany/Spain/Italy/France)
- RXO AVASK supports pallet shipments to Germany and France only

## Delivery Lead Times (Official Estimates)

- **ATS AVASK (SPD)**: As fast as 16 calendar days (50% of shipments)
- **ATS Coyote (SPD)**: As fast as 16 calendar days (50% of shipments)
- **UPS AVASK (SPD)**: As fast as 16 calendar days (50% of shipments)
- **RXO AVASK (LTL)**: As fast as 24 calendar days (50% of shipments)

*Note: Lead times vary by parcel size, carrier, locations, and holidays. Estimates based on deliveries to major destinations.*

## Common Issues & Troubleshooting

### Customs Compliance Issues

#### "Commodity Code Not Supported"
- **Cause**: Invalid or outdated HS code
- **Solution**:
  1. Use "Find tariff code" tool in Manage Your Compliance
  2. Verify code matches product exactly
  3. Check for country-specific variations
- **Prevention**: Research codes before shipment creation

#### "Cannot View MYC (Manage Your Compliance)"
- **Cause**: Using secondary/child account without proper permissions
- **Solution**: Primary account holder must grant "Manage FBA inventory/shipments" permission
- **Prevention**: Always use primary account for C2S2 operations

#### Missing or Invalid Compliance Information
- **Symptoms**: Shipment rejected during review
- **Required Fields**: HS code, country of origin, description, value, weight
- **Solution**: Edit compliance before "Send to broker"

### Shipment Processing Issues

#### RTS (Returned to Sender)
- **Common Causes**:
  * Missing or damaged Amazon/carrier labels
  * Incomplete commercial invoice
  * Missing EAD (Electronic Advance Data) for Germany
  * Missing required certificates (CITES, phytosanitary, etc.)
- **Prevention**: Triple-check all labels and documentation before pickup

#### Shipment Stuck in "Pending" Status
- **Cause**: Awaiting customs review or documentation
- **Timeline**: Up to 2 working days
- **Action**: Contact C2S2 support if exceeds 3 working days

#### Label Printing Issues
- **Problem**: QR codes not scanning
- **Solution**: Use high-quality printer, ensure labels are flat/clean
- **Prevention**: Test label printing before bulk printing

### Carrier & Pickup Issues

#### ATS Shipments Over 50 Parcels
- **Requirement**: Contact UPS directly for pickup coordination
- **Process**: UPS ensures sufficient vehicle space
- **Timeline**: May require 48-hour advance booking

#### UPS AVASK Account Setup Problems
- **Issue**: Account numbers not working
- **Verification**: Confirm exact account numbers and postcodes
- **Support**: Contact UPS support with shipment reference

#### RXO Pallet Pickup Delays
- **Cause**: Incomplete manifest or pallet specification issues
- **Solution**: Email upsamazon@ups.com with corrected manifest
- **Prevention**: Verify pallet compliance before booking

### Payment & Clearance Issues

#### Payment Declined
- **Cause**: Insufficient funds or expired payment method
- **Impact**: Shipment processing blocked
- **Solution**: Update payment method in Seller Central immediately

#### Import Duty Disputes
- **Cause**: Valuation disagreements with customs
- **Process**: Provide commercial invoice and supporting documentation
- **Escalation**: Contact C2S2 support for customs authority communication

### Tracking & Delivery Issues

#### Missing Tracking Information
- **ATS**: Search Case Log with "ATS" + shipment ID, or use enhanced tracking dashboard
- **UPS AVASK**: Available in Send to Amazon workflow with real-time GPS updates
- **RXO**: Check RXO portal or email notifications with automated alerts
- **DHL ePOST**: Premium tracking with SMS/email notifications and delivery photos

#### Delayed Delivery
- **Normal Timeline**: 2-5 working days EU-wide (24-48 hours for express)
- **Customs Delays**: Additional 1-3 days for clearance with new automated updates
- **Action**: Contact carrier if exceeds 7 working days, use escalation tools in Seller Central

#### Delivery Failures (New 2024)
- **Common Causes**: Invalid address, recipient unavailable, customs holds
- **Solutions**: Automated re-delivery scheduling, alternative delivery options
- **Prevention**: Use address validation tools, provide delivery instructions

#### Package Redirection Issues
- **Cause**: Customs requirements or delivery constraints
- **Solution**: Enhanced communication from carriers, real-time status updates
- **Action**: Contact C2S2 support for complex redirections

## Enhanced Support Resources & Contact Information (2024-2025)

### Primary C2S2 Support
**Email**: c2s2-customer-service@amazon.co.uk
**Process**: Send email with seller ID and brief description in subject line
**Response Time**: Case created within 48 hours on business days, handled by C2S2 expert
**Use for**:
- Joining C2S2 program questions
- Registration process help
- Shipment creation issues
- Broker service concerns
- Dissatisfaction with broker services
**Note**: Use Amazon registered email address for faster processing

### New Digital Support Channels
- **Seller Central App**: Mobile support with photo upload capabilities
- **Virtual Assistant**: AI-powered chatbot for common questions (24/7)
- **Community Forums**: Enhanced seller-to-seller support network
- **Video Tutorials**: Step-by-step guides for complex processes
- **Webinars**: Monthly sessions on C2S2 best practices and updates

### Broker-Specific Support

#### AVASK Support
**Portal**: Contact through your AVASK portal
**Use for**: All AVASK-related enquiries and support
**Sign Up**: [AVASK Registration](https://avaskgroup.qualtrics.com/jfe/form/SV_3mkhNnoQQ1ujsEu)

#### Coyote Support
**Email**: eu_customscompliance@coyote.com
**Use for**: All Coyote-related enquiries and support
**Sign Up**: [Coyote Registration](https://qualtricsxm2px5hf5dd.qualtrics.com/jfe/form/SV_6rjxOWsF0tmI9Po)

#### RXO AVASK Support
**Email**: Contact through AVASK portal (for existing shipments)
**Use for**: RXO pickup coordination, manifest corrections
**Ready-to-Ship Bookings**: upsamazon@ups.com (manifests only)

#### DHL ePOST Support (New)
**Email**: dhl-epost@amazon.co.uk
**Phone**: +44 800 345 0000
**Use for**: Express shipment issues, delivery guarantees, premium tracking

### C2S2 Account Manager Support
**Request Process**: Fill out [this form](https://sellercentral.amazon.co.uk/help/hub/reference/G5S2Q42YPFXQMEDZ) for one-to-one support
**Use for**: Personalized account assistance and complex issues
**Availability**: Book appointments based on your schedule

### Additional Resources

#### Seller Central Help Pages
- Search for "C2S2" or "AVASK" in Seller Central help
- Access "Manage Your Compliance" portal
- Use "Find tariff code" tool for HS codes

#### Community Forums
- Amazon Seller Forums (EU Shipping section)
- FBA seller communities on Reddit/Facebook
- LinkedIn groups for EU cross-border sellers

### Emergency Contacts
- **Customs Clearance Delays**: Contact destination marketplace support
- **Payment Issues**: Seller Central account management
- **System Outages**: Check Amazon Service Health Dashboard

### Response Times
- **Email Support**: 24-48 hours (business days)
- **Loyalty Tier 2**: 8-hour SLA for priority issues
- **Customs Issues**: 2-3 working days for resolution

## Product Category Eligibility & Restrictions (Official 2025)

### Cannot Ship Through C2S2
- Any product requiring additional border steps (e.g., medical items)
- Hazardous materials (hazmat)
- Items listed in [FBA Prohibited Products](https://sellercentral.amazon.co.uk/help/hub/reference/G201898960)
- Products exceeding dimension restrictions (63.5cm per side, 23kg per parcel)

### RXO AVASK Specific Restrictions (Germany/DTM2)
- Specific categories within Luxury Beauty
- Food or Beverage products
- Oversized items (≥45×34×26cm, ≥11.9kg)
- Shoes
- Wine

### RXO AVASK Specific Restrictions (France/CDG7)
- Specific categories within Luxury Beauty
- Oversized items (≥45×34×26cm, ≥11.9kg)
- Softlines
- Wine

### Operational Restrictions
- Cannot ship from EU countries other than Germany when using ATS solutions
- Must be incorporated in UK for UK→EU shipments (Germany/France)
- Must be incorporated in EU for EU→UK shipments (Germany/Spain/Italy/France)
- Cannot exceed 200 parcels per UPS shipment
- Cannot modify compliance information after "Send to broker"
- Cannot use C2S2 for non-FBA inventory movements
- Contact UPS directly for shipments over 30 parcels

## Digital Tools & Automation (2024-2025)

### Enhanced Seller Central Tools
- **Bulk Compliance Upload**: CSV import for multiple SKU customs information
- **Label Generation API**: Automated label printing for high-volume sellers
- **Cost Calculator**: Real-time shipping cost comparison across all solutions
- **Compliance Validator**: AI-powered checking for customs documentation accuracy
- **Automated Notifications**: Email/SMS alerts for shipment status changes

### Integration Features
- **ERP Integration**: Connect with major seller software platforms
- **API Access**: Programmatic shipment creation and tracking
- **Mobile App**: Full C2S2 management on mobile devices
- **Dashboard Analytics**: Performance metrics and optimization insights

## Advanced Best Practices & Optimization (2024-2025)

### Cost Optimization Strategies
- Use UPS AVASK for transparent pricing and volume discounts (best for predictability)
- Leverage DHL ePOST for time-critical shipments to reduce holding costs
- Plan shipments to qualify for Advantage Loyalty Programme (automatic tier progression)
- Bundle small shipments strategically to reduce per-parcel costs
- Research accurate HS codes to avoid customs delays and surcharges
- Use bulk compliance tools to reduce manual data entry time

### Efficiency & Automation Tips
- Prepare compliance information as a template before creating shipments
- Use bulk upload features for multiple ASINs in a single session
- Implement automated label printing workflows for high-volume operations
- Maintain centralized product database with accurate specifications
- Set up automated notifications to reduce manual status checking
- Use mobile app for on-the-go shipment management and issue resolution

### Risk Mitigation & Compliance
- Always include adequate insurance estimates (minimum £10 for ATS, automatic for others)
- Keep detailed digital records of all communications and documentation
- Monitor shipments proactively using enhanced tracking dashboards
- Pay fees promptly to maintain good standing and avoid shipment blocks
- Implement quality control checks before broker submission
- Use compliance validation tools to prevent customs rejections

### Performance Monitoring
- Track on-time delivery rates by solution and destination
- Monitor customs clearance times and identify bottlenecks
- Analyze cost per shipment trends and optimization opportunities
- Review rejection rates and implement preventive measures
- Use Seller Central analytics for continuous improvement

## Key Numbers & Specifications
- **Box dimensions**: Max 63.5 cm per side
- **Weight limit**: 23 kg per parcel
- **Pallet size**: 800 × 1200 mm (EPAL/BLUE CHEP)
- **Parcel limit**: 200 per ATS shipment
- **Review period**: 2 working days
- **Loyalty discount**: 10% (after 5 shipments)
- **Normal delivery**: 2-5 working days EU-wide

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

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Use Cloudflare Pages Functions in production, proxy in development
      const apiUrl = process.env.NODE_ENV === 'production'
        ? '/api/chat'  // Cloudflare Pages Functions
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
          messages: newMessages.map(({ role, content }) => ({ role, content }))
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.content[0].text,
        timestamp: new Date().toISOString(),
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: "I apologize, but I encountered an error processing your request. Please try again.",
        timestamp: new Date().toISOString(),
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([welcomeMessage]);
  };

  const exportChat = () => {
    const chatContent = messages.map(msg => {
      const timestamp = msg.timestamp ? new Date(msg.timestamp).toLocaleString() : '';
      const role = msg.role === 'user' ? 'You' : 'C2S2 Assistant';
      return `[${timestamp}] ${role}:\n${msg.content}\n\n`;
    }).join('');

    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `c2s2-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyMessage = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      // Could add a toast notification here
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  };

  const regenerateMessage = async (messageId) => {
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1 || messages[messageIndex].role !== 'assistant') return;

    const previousUserMessage = messages[messageIndex - 1];
    if (!previousUserMessage || previousUserMessage.role !== 'user') return;

    // Remove the assistant message and any subsequent messages
    const newMessages = messages.slice(0, messageIndex);
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiUrl = process.env.NODE_ENV === 'production'
        ? '/api/chat'
        : 'http://localhost:3001/api/anthropic/v1/messages';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map(({ role, content }) => ({ role, content }))
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.content[0].text,
        timestamp: new Date().toISOString(),
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: "I apologize, but I encountered an error processing your request. Please try again.",
        timestamp: new Date().toISOString(),
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
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
    <div
      className={`flex flex-col h-screen transition-colors duration-300 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 to-gray-800'
          : 'bg-gradient-to-br from-blue-50 to-indigo-50'
      }`}
      role="application"
      aria-label="C2S2 Expert Assistant Chat Interface"
    >
      {/* Header */}
      <header
        className={`shadow-md border-b transition-colors duration-300 ${
          darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
        role="banner"
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg" aria-hidden="true">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>C2S2 Expert Assistant</h1>
                <p className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Amazon Customs Clearance & Shipping Services</p>
              </div>
            </div>
            <nav className="flex items-center gap-2" role="navigation" aria-label="Chat controls">
              <button
                onClick={exportChat}
                className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
                title="Export Chat"
                aria-label="Export chat conversation to file"
              >
                <Download className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={clearChat}
                className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
                title="Clear Chat"
                aria-label="Clear all chat messages"
              >
                <Trash2 className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-pressed={darkMode}
              >
                <span aria-hidden="true">{darkMode ? '☀️' : '🌙'}</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main
        className="flex-1 overflow-y-auto"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
        aria-atomic="false"
      >
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {messages.map((message, index) => (
            <article
              key={message.id || index}
              className={`flex gap-3 group ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
              aria-label={`${message.role === 'user' ? 'Your' : 'Assistant'} message`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform duration-200 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-110'
                    : 'bg-gradient-to-br from-blue-500 to-indigo-600 hover:scale-110'
                }`}
                aria-hidden="true"
              >
                {message.role === 'user' ? (
                  <User className="w-6 h-6 text-white" />
                ) : (
                  <Bot className="w-6 h-6 text-white" />
                )}
              </div>
              <div
                className={`flex-1 max-w-3xl ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {message.role === 'user' ? 'You' : 'C2S2 Assistant'}
                  </span>
                  {message.timestamp && (
                    <time
                      className={`text-xs transition-colors duration-300 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}
                      dateTime={message.timestamp}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </time>
                  )}
                </div>
                <div
                  className={`inline-block px-4 py-3 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl group-hover:scale-[1.02] ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                      : darkMode
                        ? 'bg-gray-800 text-gray-100 border border-gray-700'
                        : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  <div className="prose prose-sm max-w-none">
                    {message.content.split('\n').map((line, i) => {
                      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                        return (
                          <div key={i} className={`ml-4 mb-1 ${
                            darkMode ? 'text-gray-300' : ''
                          }`}>
                            {line}
                          </div>
                        );
                      }
                      const parts = line.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p key={i} className={`mb-2 last:mb-0 ${
                          darkMode ? 'text-gray-100' : ''
                        }`}>
                          {parts.map((part, j) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <strong key={j} className={
                                  message.role === 'user'
                                    ? 'text-purple-100'
                                    : darkMode
                                      ? 'text-blue-300'
                                      : 'text-blue-700'
                                }>
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

                  {/* Message Actions */}
                  <div
                    className={`flex items-center gap-1 mt-3 pt-2 border-t opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                      message.role === 'user'
                        ? 'border-purple-300'
                        : darkMode
                          ? 'border-gray-600'
                          : 'border-gray-200'
                    }`}
                    role="toolbar"
                    aria-label="Message actions"
                  >
                    <button
                      onClick={() => copyMessage(message.content)}
                      className={`p-1 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        message.role === 'user'
                          ? 'hover:bg-purple-600 text-purple-200'
                          : darkMode
                            ? 'hover:bg-gray-700 text-gray-400'
                            : 'hover:bg-gray-100 text-gray-500'
                      }`}
                      title="Copy message"
                      aria-label="Copy message content"
                    >
                      <Copy className="w-4 h-4" aria-hidden="true" />
                    </button>
                    {message.role === 'assistant' && message.id !== 'welcome' && (
                      <button
                        onClick={() => regenerateMessage(message.id)}
                        className={`p-1 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode
                            ? 'hover:bg-gray-700 text-gray-400'
                            : 'hover:bg-gray-100 text-gray-500'
                        }`}
                        title="Regenerate response"
                        aria-label="Regenerate assistant response"
                        disabled={isLoading}
                      >
                        <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className={`px-4 py-3 rounded-2xl shadow-lg transition-colors duration-300 ${
                darkMode
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200'
              }`}>
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  <span className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Thinking...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <section className="max-w-4xl mx-auto px-4 pb-4" aria-label="Suggested questions">
          <div className={`transition-colors duration-300 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <p className="text-sm font-medium mb-3" id="suggested-questions-label">
              💡 Suggested questions:
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="suggested-questions-label">
              {[
                "What are the main shipping solutions?",
                "How do I create a shipment?",
                "What's needed for customs compliance?",
                "How do I track my shipments?"
              ].map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  } shadow-sm`}
                  disabled={isLoading}
                  aria-label={`Use suggested question: ${question}`}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Input */}
      <footer
        className={`border-t shadow-lg transition-colors duration-300 ${
          darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
        role="contentinfo"
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-3">
            <label htmlFor="chat-input" className="sr-only">
              Type your message about C2S2 shipping
            </label>
            <input
              id="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about C2S2 shipping..."
              className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              disabled={isLoading}
              aria-describedby="input-help"
              autoComplete="off"
            />
            <button
              type="submit"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={isLoading ? 'Sending message...' : 'Send message'}
            >
              <Send className="w-5 h-5" aria-hidden="true" />
              <span>Send</span>
            </button>
          </form>
          <p
            id="input-help"
            className={`text-xs mt-2 text-center transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Ask about shipping solutions, compliance requirements, tracking, or troubleshooting
          </p>
        </div>
      </footer>
    </div>
  );
};

export default C2S2Agent;
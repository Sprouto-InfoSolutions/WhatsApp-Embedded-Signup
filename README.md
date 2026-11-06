# WhatsApp Embedded Signup

A seamless embedded signup solution for integrating WhatsApp Business API onboarding directly into your application. This open-source component provides a ready-to-use signup flow that can be embedded into any website or application.

## 🚀 Features

- **Embedded Integration**: Seamlessly embed the signup flow into your existing application
- **Multi-step Onboarding**: Guided step-by-step process for WhatsApp Business API setup
- **Real-time Validation**: Instant validation of phone numbers and business information
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Customizable UI**: Fully customizable components to match your brand
- **Progress Tracking**: Visual progress indicators throughout the signup process
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Accessibility**: Built with accessibility best practices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router
- **UI Framework**: React 19
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Build Tool**: Turbo

## 📦 Installation

### Prerequisites

- Node.js >= 20
- pnpm >= 10.15.0

### Setup

```bash
# Clone the repository
git clone https://github.com/sendzen-io/whatsapp-embedded-signup.git

# Navigate to the project directory
cd whatsapp-embedded-signup

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🎯 Usage

### Basic Integration

```tsx
import { EmbeddedSignup } from '@sendzen/ui-embedded-setup'

function MyApp() {
  return (
    <div className="container mx-auto p-4">
      <EmbeddedSignup
        onComplete={(data) => {
          console.log('Signup completed:', data)
        }}
        onError={(error) => {
          console.error('Signup error:', error)
        }}
      />
    </div>
  )
}
```

### Advanced Configuration

```tsx
import { EmbeddedSignup } from '@sendzen/ui-embedded-setup'

function MyApp() {
  return (
    <EmbeddedSignup
      theme={{
        primaryColor: '#25D366',
        backgroundColor: '#ffffff',
        textColor: '#333333'
      }}
      steps={{
        businessInfo: true,
        phoneVerification: true,
        apiConfiguration: true,
        templateSetup: false
      }}
      onComplete={(data) => {
        // Handle successful signup
        redirectToDashboard(data)
      }}
      onError={(error) => {
        // Handle errors
        showErrorMessage(error.message)
      }}
    />
  )
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# WhatsApp Business API Configuration
WHATSAPP_ACCESS_TOKEN=your_access_token_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id

# Optional: Custom API endpoints
SENDZEN_API_BASE_URL=https://api.sendzen.io
WHATSAPP_API_BASE_URL=https://graph.facebook.com/v21.0

# Optional: Analytics
GOOGLE_ANALYTICS_ID=your_ga_id
```

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `ThemeConfig` | Default theme | Custom theme configuration |
| `steps` | `StepsConfig` | All steps enabled | Configure which steps to show |
| `onComplete` | `(data: SignupData) => void` | Required | Callback when signup completes |
| `onError` | `(error: Error) => void` | Required | Callback when an error occurs |
| `locale` | `string` | `'en'` | Language/locale for the interface |
| `debug` | `boolean` | `false` | Enable debug mode |

### Theme Configuration

```typescript
interface ThemeConfig {
  primaryColor?: string
  secondaryColor?: string
  backgroundColor?: string
  textColor?: string
  borderRadius?: string
  fontFamily?: string
}
```

### Steps Configuration

```typescript
interface StepsConfig {
  businessInfo?: boolean
  phoneVerification?: boolean
  apiConfiguration?: boolean
  templateSetup?: boolean
  webhookConfiguration?: boolean
}
```

## 📱 Signup Flow

### Step 1: Business Information
- Company name and description
- Business category selection
- Contact information
- Website and social media links

### Step 2: Phone Verification
- Phone number input with country code
- OTP verification via SMS
- Phone number validation

### Step 3: API Configuration
- WhatsApp Business API credentials setup
- Webhook endpoint configuration
- API permissions verification

### Step 4: Template Setup (Optional)
- Message template creation
- Template approval process
- Template testing

### Step 5: Webhook Configuration (Optional)
- Webhook URL setup
- Webhook verification
- Event subscription configuration

## 🎨 Customization

### Styling

The component uses CSS custom properties for easy theming:

```css
:root {
  --embedded-primary: #25D366;
  --embedded-secondary: #128C7E;
  --embedded-background: #ffffff;
  --embedded-text: #333333;
  --embedded-border-radius: 8px;
}
```

### Custom Components

You can override default components:

```tsx
import { EmbeddedSignup } from '@sendzen/ui-embedded-setup'
import { CustomButton, CustomInput } from './components'

<EmbeddedSignup
  components={{
    Button: CustomButton,
    Input: CustomInput
  }}
  // ... other props
/>
```

## 🌍 Internationalization

The component supports multiple languages:

```tsx
<EmbeddedSignup
  locale="es" // Spanish
  // ... other props
/>
```

Supported locales:
- English (`en`)
- Spanish (`es`)
- French (`fr`)
- German (`de`)
- Italian (`it`)
- Portuguese (`pt`)
- Russian (`ru`)

## 📊 Analytics & Tracking

Built-in analytics support for tracking signup completion rates:

```tsx
<EmbeddedSignup
  analytics={{
    enabled: true,
    trackingId: 'your-tracking-id',
    events: {
      stepCompleted: true,
      signupCompleted: true,
      errors: true
    }
  }}
  // ... other props
/>
```

## 🧪 Testing

### Unit Tests

```bash
# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Integration Tests

```bash
# Run integration tests
pnpm test:integration

# Run E2E tests
pnpm test:e2e
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Docker

```bash
# Build Docker image
docker build -t whatsapp-embedded-signup .

# Run container
docker run -p 3000:3000 whatsapp-embedded-signup
```

### CDN Integration

For easy integration into existing websites:

```html
<script src="https://cdn.sendzen.io/embedded-signup/latest/index.js"></script>
<script>
  SendzenEmbeddedSignup.init({
    container: '#signup-container',
    onComplete: function(data) {
      console.log('Signup completed:', data);
    }
  });
</script>
```

## 🔒 Security

- **Data Validation**: All inputs are validated on both client and server
- **HTTPS Only**: Secure communication protocols
- **No Data Storage**: Sensitive data is not stored locally
- **Rate Limiting**: Built-in rate limiting for API calls
- **CORS Protection**: Proper CORS configuration

## 📚 API Reference

### Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `init()` | Initialize the signup component | `config: SignupConfig` |
| `destroy()` | Clean up the component | None |
| `reset()` | Reset to initial state | None |
| `nextStep()` | Move to next step | None |
| `previousStep()` | Move to previous step | None |

### Events

| Event | Description | Data |
|-------|-------------|------|
| `stepCompleted` | Fired when a step is completed | `{ step: string, data: object }` |
| `signupCompleted` | Fired when signup is completed | `SignupData` |
| `error` | Fired when an error occurs | `Error` |

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Add new features or fix bugs
4. **Run tests**: `pnpm test`
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all linting passes

## 🐛 Troubleshooting

### Common Issues

**Component Not Rendering**
- Check if the container element exists
- Verify all required props are provided
- Check browser console for errors

**Phone Verification Fails**
- Ensure phone number format is correct
- Check SMS delivery in your region
- Verify API credentials are valid

**Styling Issues**
- Check if Tailwind CSS is properly loaded
- Verify custom theme configuration
- Ensure no CSS conflicts with existing styles

### Getting Help

- Check the [Issues](https://github.com/sendzen-io/whatsapp-embedded-signup/issues) page
- Review the [Discussions](https://github.com/sendzen-io/whatsapp-embedded-signup/discussions) section
- Join our community Discord server

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Powered by [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)

## 📞 Support

- **Documentation**: [docs.sendzen.io](https://docs.sendzen.io)
- **Community**: [Discord](https://discord.gg/sendzen)
- **Email**: support@sendzen.io
- **Website**: [sendzen.io](https://sendzen.io)

---

**Made with ❤️ by the SendZen team**

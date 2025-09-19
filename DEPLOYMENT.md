# Vercel Deployment Guide for SyndiLoan

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step-by-Step Deployment

### 1. Prepare the Repository

Ensure all changes are committed and pushed to GitHub:

```bash
git add .
git commit -m "feat: Complete FHE-powered syndicated loan platform"
git push origin main
```

### 2. Connect to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your repository
   - Click "Import"

### 3. Configure Build Settings

Vercel should auto-detect the project settings, but verify:

- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Set Environment Variables

In the Vercel dashboard, go to Project Settings > Environment Variables and add:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_ID
VITE_INFURA_API_KEY=YOUR_INFURA_KEY
```

**Important**: Set these for all environments (Production, Preview, Development)

### 5. Deploy

1. **Initial Deployment**
   - Click "Deploy" in Vercel dashboard
   - Wait for build to complete (usually 2-3 minutes)

2. **Verify Deployment**
   - Check the deployment URL provided by Vercel
   - Test wallet connection functionality
   - Verify all pages load correctly

### 6. Custom Domain (Optional)

1. **Add Domain**
   - Go to Project Settings > Domains
   - Click "Add Domain"
   - Enter your custom domain (e.g., `ciphersyndicate.com`)

2. **Configure DNS**
   - Add CNAME record pointing to Vercel
   - Wait for DNS propagation (up to 24 hours)

### 7. Environment-Specific Configuration

#### Production Environment
```env
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_ID
VITE_INFURA_API_KEY=YOUR_INFURA_KEY
```

#### Preview Environment
Use the same configuration as production for testing.

#### Development Environment
Use the same configuration for consistency.

### 8. Post-Deployment Verification

1. **Test Core Features**
   - [ ] Wallet connection works
   - [ ] Loan application form functions
   - [ ] Syndication features work
   - [ ] All pages load without errors

2. **Check Console**
   - Open browser developer tools
   - Verify no JavaScript errors
   - Check network requests are successful

3. **Test on Different Devices**
   - Desktop browsers (Chrome, Firefox, Safari)
   - Mobile devices
   - Different screen sizes

### 9. Monitoring and Maintenance

1. **Vercel Analytics**
   - Enable Vercel Analytics in project settings
   - Monitor performance metrics
   - Track user interactions

2. **Error Monitoring**
   - Set up error tracking (Sentry recommended)
   - Monitor for JavaScript errors
   - Track failed transactions

3. **Regular Updates**
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Update smart contract addresses as needed

### 10. Troubleshooting

#### Common Issues

1. **Build Failures**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match exactly
   - Verify no extra spaces or characters

3. **Wallet Connection Issues**
   - Verify WalletConnect project ID is correct
   - Check RPC URL is accessible
   - Test with different wallets

4. **Smart Contract Issues**
   - Verify contract addresses are correct
   - Check network configuration
   - Ensure contracts are deployed

#### Debug Commands

```bash
# Test build locally
npm run build

# Check for TypeScript errors
npm run lint

# Test development server
npm run dev
```

### 11. Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable encryption
   - Rotate keys regularly

2. **Smart Contract Security**
   - Audit all smart contracts before deployment
   - Use multi-signature wallets for admin functions
   - Implement proper access controls

3. **Frontend Security**
   - Validate all user inputs
   - Implement rate limiting
   - Use HTTPS in production

### 12. Performance Optimization

1. **Build Optimization**
   - Enable Vercel's automatic optimizations
   - Use dynamic imports for large components
   - Optimize images and assets

2. **Caching**
   - Configure appropriate cache headers
   - Use Vercel's edge caching
   - Implement client-side caching

3. **Bundle Size**
   - Monitor bundle size
   - Remove unused dependencies
   - Use tree shaking

### 13. Backup and Recovery

1. **Code Backup**
   - Repository is automatically backed up on GitHub
   - Keep local backups of important configurations

2. **Database Backup**
   - If using external databases, set up regular backups
   - Test recovery procedures

3. **Smart Contract Backup**
   - Keep copies of deployed contract addresses
   - Document all contract interactions

## Deployment Checklist

- [ ] Repository is up to date on GitHub
- [ ] All environment variables are configured
- [ ] Build settings are correct
- [ ] Initial deployment is successful
- [ ] All features are tested
- [ ] Custom domain is configured (if applicable)
- [ ] Analytics and monitoring are set up
- [ ] Security measures are in place
- [ ] Performance is optimized
- [ ] Documentation is updated

## Support

If you encounter issues during deployment:

1. Check Vercel's deployment logs
2. Review the troubleshooting section
3. Contact support through GitHub issues
4. Refer to Vercel's documentation

## Next Steps

After successful deployment:

1. Set up monitoring and alerting
2. Configure CI/CD for automatic deployments
3. Plan for scaling and performance optimization
4. Consider implementing additional security measures
5. Plan for user onboarding and documentation

---

**Deployment URL**: Will be provided by Vercel after successful deployment
**Last Updated**: $(date)
**Version**: 1.0.0

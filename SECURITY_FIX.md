# Security Fix: serialize-javascript vulnerability (CVE-2020-7660)

## Issue
The serialize-javascript npm package (versions <= 7.0.2) contained a code injection vulnerability. This was an incomplete fix for CVE-2020-7660.

## Problem
- mocha@10.8.2 required serialize-javascript@^6.0.2
- No patched version was available in the 6.x series
- The earliest fixed version is 7.0.5

## Solution
1. **Updated Mocha**: Upgraded to mocha@^11.0.0 (latest stable)
2. **Added Override**: Used npm `overrides` to force serialize-javascript@^7.0.5
3. **Engine Requirement**: Updated Node.js requirement to >=18.18.0 to support newer dependencies

## Changes Made

### package.json
- `mocha`: Updated from `^10.0.0` to `^11.0.0`
- `engines.node`: Updated from `>=14.20.0` to `>=18.18.0`
- Added `overrides` section to force `serialize-javascript@^7.0.5`

### Result
- ✅ serialize-javascript vulnerability resolved (7.0.5 installed)
- ✅ npm audit no longer shows serialize-javascript vulnerability
- ⚠️ Node.js >=18.18.0 now required

## Verification
```bash
npm ls serialize-javascript
# Shows: serialize-javascript@7.0.5

npm audit
# No longer reports serialize-javascript vulnerability
```

## Compatibility
This fix requires Node.js >=18.18.0. Projects using older Node.js versions will need to upgrade.

For production deployments, ensure Node.js version meets the new requirement.
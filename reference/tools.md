# quick tools

## generate secure random

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, ''));"
```

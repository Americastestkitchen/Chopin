#!/usr/bin/env bash
\cp -r ./src ./browser
cd browser/src

npm run build

if grep "import './piano'" piano-adapter.ts;then
  echo "piano-adapter.ts already imported"
else
  echo "import './piano';\n$(cat piano-adapter.ts)" > piano-adapter.ts
fi

npm run serve

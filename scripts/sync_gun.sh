#!/bin/bash

rm -fr src/gun-vue/*
cp -av /Users/xcliu/tests/gun-vue/src/* src/gun-vue

## customize
sed -ibak '/overscroll-behavior-y:/d' src/gun-vue/styles/index.css
sed -ibak '/UiComponents.text/d' src/gun-vue/index.vue
##
find src/gun-vue -name "*.md" | xargs rm -f
find src/gun-vue -name "*bak" | xargs rm -f
mv src/gun-vue/account/AccountStars.vux src/gun-vue/account/AccountStars.vue || true
rm -frv src/gun-vue/app
# rm -frv src/gun-vue/{main.ts,app.vue}

cp -av /Users/xcliu/tests/gun-vue/src/app/*  src/components/

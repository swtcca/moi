#!/bin/bash

rm -fr src/gun-vue/*
cp -av /Users/xcliu/tests/gun-vue/src/* src/gun-vue
mv src/gun-vue/account/AccountStars.vux src/gun-vue/account/AccountStars.vue || true
rm -frv src/gun-vue/*/*story.vu*
rm -frv src/gun-vue/app
rm -frv src/gun-vue/{main.ts,app.vue}

cp -av /Users/xcliu/tests/gun-vue/src/app/*  src/components/

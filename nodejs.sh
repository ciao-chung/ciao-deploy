#!/usr/bin/env bash

sudo apt-get update
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install nodejs -y
sudo ln -s /usr/bin/nodejs /usr/bin/node
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update
sudo apt-get install yarn -y
sudo apt-get install libnotify-bin -y
sudo apt-get install notify-osd -y
sudo yarn global add pm2
npm -v
node -v
yarn --version
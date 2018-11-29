#!/usr/bin/env bash

sudo apt-get update
sudo apt-get install git -y
sudo apt-add-repository ppa:fish-shell/release-2 -y
sudo apt-get update
sudo apt-get install fish -y
curl -L https://get.oh-my.fish > install
fish install --path=~/.local/share/omf --config=~/.config/omf
rm ./install
sleep 0.3
omf install gitstatus
fish
sleep 0.3
sudo usermod -s /usr/bin/fish $USER
set -U fish_prompt_pwd_dir_length 0
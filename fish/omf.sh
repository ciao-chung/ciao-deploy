#!/usr/bin/env bash

curl -L https://get.oh-my.fish > install
fish install --path=~/.local/share/omf --config=~/.config/omf
rm ./install
omf install gitstatus
sudo usermod -s /usr/bin/fish $USER
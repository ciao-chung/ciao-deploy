#!/usr/bin/env bash

ciao-deploy --command vsftpd \
  --withoutSudo \
  --username ciao \
  --password 9527 \
  --homedir /workspace/ftp
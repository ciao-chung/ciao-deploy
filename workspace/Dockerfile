FROM ciaochung/ubuntu-fish-node10:stable
MAINTAINER Ciao Chung

RUN mkdir -p /workspace \
  && mkdir -p /ciao-deploy-prod \
  && echo "yarn global add /ciao-deploy-prod" > /workspace/install-ciao-deploy.sh \
  && chmod 755 /workspace/install-ciao-deploy.sh \
  && cd /workspace

CMD ["sh", "-c", "tail -f /dev/null"]

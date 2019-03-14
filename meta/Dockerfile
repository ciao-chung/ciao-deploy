FROM ubuntu:16.04
MAINTAINER Ciao Chung

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -y
RUN apt-get install -y --assume-yes apt-utils
RUN apt-get install -y software-properties-common gnupg
RUN apt-get install -y curl wget vim net-tools git openssh-server
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs \
  && nodejs -v \
  && npm -v
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get install -y yarn && yarn --version
RUN mkdir /root/.ssh
RUN touch /root/.ssh/authorized_keys
RUN yarn global add ciao-deploy
RUN ciao-deploy --command=env --base --withoutSudo
RUN ciao-deploy --command=fish --withoutSudo

EXPOSE 22

CMD ["sh", "-c", "tail -f /dev/null"]

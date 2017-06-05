FROM laradock/workspace:1.8-71

# Update & Upgrade
RUN apt-get update \
    && apt-get upgrade -y

##################
# Non-Root User: #
##################

# Add a non-root user to prevent files being created with root permissions on host machine.
ARG PUID=1000
ARG PGID=1000

ENV PUID ${PUID}
ENV PGID ${PGID}

RUN groupadd -g ${PGID} illuminator \
    && useradd -u ${PUID} -g illuminator -G sudo,www-data -m illuminator

#####################################
# Set Timezone
#####################################

ARG TZ=America/Los_Angeles
ENV TZ ${TZ}
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

#####################################
# Composer:
#####################################

RUN composer self-update

# Add the composer.json
COPY ./composer.json /home/illuminator/.composer/composer.json

# Make sure that ~/.composer belongs to illuminator
RUN chown -R illuminator:illuminator /home/illuminator/.composer
USER illuminator

# run the install
RUN composer global install

#####################################
# xDebug:
#####################################
USER root
# Load the xdebug extension only with phpunit commands
RUN apt-get install -y --force-yes php-xdebug \
    && sed -i 's/^;//g' /etc/php/7.1/cli/conf.d/20-xdebug.ini \
    && echo "alias phpunit='php -dzend_extension=xdebug.so /var/www/vendor/bin/phpunit'" >> ~/.bashrc

# ADD for REMOTE debugging
COPY ./xdebug.ini /etc/php/7.1/cli/conf.d/xdebug.ini

#####################################
# MongoDB:
#####################################

# Install the mongodb extension
RUN pecl install mongodb \
    && echo "extension=mongodb.so" >> /etc/php/7.1/cli/conf.d/30-mongodb.ini

USER illuminator

#####################################
# Node / NVM:
#####################################

ARG NODE_VERSION=stable
ENV NODE_VERSION ${NODE_VERSION}
ENV NVM_DIR /home/illuminator/.nvm

# Install nvm (A Node Version Manager)
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install ${NODE_VERSION} \
    && nvm use ${NODE_VERSION} \
    && nvm alias ${NODE_VERSION}

# Wouldn't execute when added to the RUN statement in the above block
# Source NVM when loading bash since ~/.profile isn't loaded on non-login shell
RUN echo "" >> ~/.bashrc \
    && echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc \
    && echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm' >> ~/.bashrc

# Add NVM binaries to root's .bashrc
USER root

RUN echo "" >> ~/.bashrc \
    && echo 'export NVM_DIR="/home/illuminator/.nvm"' >> ~/.bashrc \
    && echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm' >> ~/.bashrc

#####################################
# YARN:
#####################################

USER illuminator

ARG YARN_VERSION=latest
ENV YARN_VERSION ${YARN_VERSION}

RUN [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" \
    && \
    if [ ${YARN_VERSION} = "latest" ]; then \
        curl -o- -L https://yarnpkg.com/install.sh | bash; \
    else \
        curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version ${YARN_VERSION}; \
    fi \
    && echo "" >> ~/.bashrc \
    && echo 'export PATH="$HOME/.yarn/bin:$PATH"' >> ~/.bashrc

# Add YARN binaries to root's .bashrc
USER root

RUN echo "" >> ~/.bashrc \
    && echo 'export YARN_DIR="/home/illuminator/.yarn"' >> ~/.bashrc \
    && echo 'export PATH="$YARN_DIR/bin:$PATH"' >> ~/.bashrc

# yarn global add gulp bower vue-cli

#####################################
# Non-root user : PHPUnit path
#####################################

# add ./vendor/bin to non-root user's bashrc (needed for phpunit)
USER illuminator

RUN echo "" >> ~/.bashrc \
    && echo 'export PATH="/var/www/vendor/bin:$PATH"' >> ~/.bashrc

#####################################
# Laravel Artisan Alias
#####################################
USER root

RUN echo "" >> ~/.bashrc \
    && echo 'alias art="php artisan"' >> ~/.bashrc

#####################################
# Symfony:
#####################################
USER root
RUN mkdir -p /usr/local/bin \
  && curl -LsS https://symfony.com/installer -o /usr/local/bin/symfony \
  && chmod a+x /usr/local/bin/symfony \
  #  Symfony 3 alias
  && echo 'alias dev="php bin/console -e=dev"' >> ~/.bashrc \
  && echo 'alias prod="php bin/console -e=prod"' >> ~/.bashrc
  #  Symfony 2 alias
  #  && echo 'alias dev="php app/console -e=dev"' >> ~/.bashrc \
  #  && echo 'alias prod="php app/console -e=prod"' >> ~/.bashrc \

#####################################
# Other Tools:
#####################################
USER root

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
RUN echo 'deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse' | tee /etc/apt/sources.list.d/mongodb-org-3.4.list
RUN apt-get update

RUN apt-get install -y \
        tmux \
        screen \
        ack-grep \
        mongodb-org-shell \
        mongodb-org-tools

#
#--------------------------------------------------------------------------
# Final Touch
#--------------------------------------------------------------------------
#

# Clean up
USER root
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Set default work directory
WORKDIR /var/www/service

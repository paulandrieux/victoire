FROM phpdocker_victoire-php-fpm

WORKDIR /var/www/victoire
VOLUME /var/www/victoire

ENTRYPOINT ["vendor/bin/behat", "-c", "/var/www/victoire/phpdocker/docker/behat.yml"]
#ENTRYPOINT ["ls"]

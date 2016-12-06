cd /var/www/victoire \
    && mkdir -p /tmp/Victoire/cache/ /tmp/Victoire/logs/ \
    && chmod -R 777 /tmp/Victoire/cache/ /tmp/Victoire/logs/ \
    && php Tests/Functionnal/bin/console --env=test cache:warmup \
    && php Tests/Functionnal/bin/console do:sc:up --force -e test \
    && php Tests/Functionnal/bin/console --env=test victoire:generate:view \
    && php Tests/Functionnal/bin/console --env=test assets:install Tests/Functionnal/web \
    && php Tests/Functionnal/bin/console --env=test bazinga:js-translation:dump \
    && php Tests/Functionnal/bin/console --env=test fos:js:dump --target="Tests/Functionnal/web/js/fos_js_routes_test.js" \
    && php Tests/Functionnal/bin/console --env=test assetic:dump
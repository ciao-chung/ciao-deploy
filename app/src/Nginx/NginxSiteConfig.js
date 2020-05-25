class NginxSiteConfig {
  sitePhp(path, domain) {
    return `
server {
        listen 80;
        listen [::]:80;

        server_name ${domain};
        root ${path};
        index index.php;

        location / {
                try_files $uri $uri/ /index.php$is_args$args;
        }

        location ~ \\.php$ {
                include snippets/fastcgi-php.conf;
                fastcgi_pass unix:/run/php/php7.1-fpm.sock;
        }
}
    `
  }

  siteSpa(path, domain) {
    return `
server {
        listen 80;
        listen [::]:80;

        server_name ${domain};
        root ${path};
        index index.html;

        location ~ .(html)$ {
            add_header Cache-Control "max-age=0, no-cache, no-store, must-revalidate";
            add_header Pragma "no-cache";
        }

        location ~ (css|js|map|jpg|jpeg|png|ico|gif|woff|woff2|svg|ttf|eto|br|gz)$ {
            add_header Cache-Control "max-age=86400, must-revalidate";
        }

        include ${path}/nginx.conf;
}
    `
  }
  
  siteSslPhp(path, domain) {
    return `
server {
        server_name ${domain};
        root ${path};
        index index.php;

        location / {
                try_files $uri $uri/ /index.php$is_args$args;
        }

        location ~ \\.php$ {
                include snippets/fastcgi-php.conf;
                fastcgi_pass unix:/run/php/php7.1-fpm.sock;
        }

        listen [::]:443 ssl http2;
        listen 443 ssl http2;
        ssl_certificate /etc/letsencrypt/live/${domain}/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/${domain}/privkey.pem;
        include /etc/letsencrypt/options-ssl-nginx.conf;
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
        if ($host = ${domain}) {
            return 301 https://$host$request_uri;
        }

        listen 80;
        listen [::]:80;

        server_name ${domain};
        return 404;
}

`
  }
  
  siteSslSpa(path, domain) {
    return `
server {
        server_name ${domain};
        root ${path};
        index index.html;

        location ~ .(html)$ {
            add_header Cache-Control "max-age=0, no-cache, no-store, must-revalidate";
            add_header Pragma "no-cache";
        }

        location ~ (css|js|map|jpg|jpeg|png|ico|gif|woff|woff2|svg|ttf|eto|br|gz)$ {
            add_header Cache-Control "max-age=86400, must-revalidate";
        }

        include ${path}/nginx.conf;

        listen [::]:443 ssl http2;
        listen 443 ssl http2;
        ssl_certificate /etc/letsencrypt/live/${domain}/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/${domain}/privkey.pem;
        include /etc/letsencrypt/options-ssl-nginx.conf;
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
        if ($host = ${domain}) {
            return 301 https://$host$request_uri;
        }

        listen 80;
        listen [::]:80;

        server_name ${domain};
        return 404;
}

`
  }
}

export default new NginxSiteConfig()